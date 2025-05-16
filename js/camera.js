// Script ottimizzato per risolvere il problema dello zoom su dispositivi mobili (Android)
// Aggiungi questo script separato o incorporalo nel tuo index.html

// Funzione migliorata per resettare lo zoom della fotocamera
function resetCameraZoom() {
    const videoEl = document.querySelector('video');
    if (!videoEl || !videoEl.srcObject) {
        console.log('Video element o srcObject non trovato');
        return;
    }

    const tracks = videoEl.srcObject.getVideoTracks();
    if (!tracks || tracks.length === 0) {
        console.log('Nessuna traccia video trovata');
        return;
    }

    const track = tracks[0];

    // Verifica se il browser supporta getCapabilities
    if (!track.getCapabilities) {
        console.log('getCapabilities non supportato');
        return;
    }

    const capabilities = track.getCapabilities();
    console.log('Capabilities fotocamera:', capabilities);

    // Verifica se lo zoom è supportato
    if (!capabilities.zoom) {
        console.log('Zoom non supportato su questo dispositivo');
        return;
    }

    // Resetta lo zoom a 1.0 (nessuno zoom)
    console.log('Tentativo di reset dello zoom a 1.0...');
    track.applyConstraints({
        advanced: [{zoom: 1.0}]
    }).then(() => {
        console.log('Zoom resettato con successo');
        // Verifica lo stato attuale
        const settings = track.getSettings();
        console.log('Impostazioni attuali fotocamera:', settings);
    }).catch(error => {
        console.error('Errore nel reset dello zoom:', error);
    });
}

// Soluzione più drastica: ferma e riavvia la fotocamera
function restartCamera() {
    console.log('Tentativo di riavvio della fotocamera...');

    // Riferimento alla scena AR
    const scene = document.querySelector('a-scene');
    if (!scene) {
        console.error('Scena AR non trovata');
        return;
    }

    // Arresta lo stream video corrente
    const video = document.querySelector('video');
    if (video && video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
        console.log('Stream video arrestato');
    }

    // Riavvia la scena AR
    try {
        // Forza il riavvio del sistema AR
        if (scene.systems && scene.systems.arjs) {
            scene.systems.arjs.restart();
            console.log('Sistema AR riavviato');
        } else {
            console.warn('Sistema arjs non trovato nella scena');
            // Riavvio alternativo
            scene.pause();
            setTimeout(() => {
                scene.play();
                console.log('Scena AR riavviata manualmente');

                // Riavvia la fotocamera con nuove impostazioni
                setTimeout(() => {
                    navigator.mediaDevices.getUserMedia({
                        video: {
                            facingMode: 'environment',
                            width: { ideal: 640 },
                            height: { ideal: 480 },
                            zoom: 1.0
                        }
                    }).then(stream => {
                        const newVideo = document.querySelector('video');
                        if (newVideo) {
                            newVideo.srcObject = stream;
                            console.log('Fotocamera riavviata con nuove impostazioni');
                        }
                    }).catch(err => {
                        console.error('Errore nel riavvio della fotocamera:', err);
                    });
                }, 500);
            }, 500);
        }
    } catch (error) {
        console.error('Errore durante il riavvio della scena AR:', error);
    }
}

// Aggiunge pulsanti UI per le funzioni di reset fotocamera
function addCameraControls() {
    // Contenitore per i controlli della fotocamera
    const controlsContainer = document.createElement('div');
    controlsContainer.style.position = 'fixed';
    controlsContainer.style.top = '140px'; // Sotto gli altri controlli
    controlsContainer.style.right = '20px';
    controlsContainer.style.display = 'flex';
    controlsContainer.style.flexDirection = 'column';
    controlsContainer.style.gap = '10px';
    controlsContainer.style.zIndex = '9999';

    // Pulsante Reset Zoom
    const resetZoomBtn = document.createElement('button');
    resetZoomBtn.textContent = '🔍 Reset Zoom';
    resetZoomBtn.style.backgroundColor = 'rgba(0,0,0,0.7)';
    resetZoomBtn.style.color = 'white';
    resetZoomBtn.style.border = 'none';
    resetZoomBtn.style.borderRadius = '5px';
    resetZoomBtn.style.padding = '8px 12px';
    resetZoomBtn.addEventListener('click', resetCameraZoom);

    // Pulsante Riavvia Fotocamera (soluzione più drastica)
    const restartCamBtn = document.createElement('button');
    restartCamBtn.textContent = '📸 Riavvia Fotocamera';
    restartCamBtn.style.backgroundColor = 'rgba(0,0,0,0.7)';
    restartCamBtn.style.color = 'white';
    restartCamBtn.style.border = 'none';
    restartCamBtn.style.borderRadius = '5px';
    restartCamBtn.style.padding = '8px 12px';
    restartCamBtn.addEventListener('click', restartCamera);

    // Aggiungi pulsanti al contenitore
    controlsContainer.appendChild(resetZoomBtn);
    controlsContainer.appendChild(restartCamBtn);

    // Aggiungi contenitore al documento
    document.body.appendChild(controlsContainer);
}

// Inizializzazione - esegui quando il DOM è caricato
document.addEventListener('DOMContentLoaded', function() {
    // Aggiungi i controlli della fotocamera
    addCameraControls();

    // Reset automatico dello zoom dopo il caricamento
    setTimeout(resetCameraZoom, 2000);

    // Reset automatico quando l'utente ritorna alla pagina
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            setTimeout(resetCameraZoom, 1000);
        }
    });

    // Controlla lo zoom ogni 10 secondi
    setInterval(() => {
        const video = document.querySelector('video');
        if (video && video.srcObject) {
            const track = video.srcObject.getVideoTracks()[0];
            if (track && track.getSettings) {
                const settings = track.getSettings();
                console.log('Controllo zoom:', settings.zoom);
                // Se lo zoom è maggiore di 1.1, resettalo
                if (settings.zoom && settings.zoom > 1.1) {
                    console.log('Zoom troppo alto, reset...');
                    resetCameraZoom();
                }
            }
        }
    }, 10000);
});