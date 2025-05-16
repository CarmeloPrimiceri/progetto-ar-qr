
// Semplice script per il reset della fotocamera
// Aggiungi questo come file separato o alla fine del tuo file main.js esistente

// Aggiungi questo dopo il caricamento del documento
document.addEventListener('DOMContentLoaded', function() {
    // Crea il pulsante di reset della fotocamera se non esiste già
    if (!document.getElementById('resetCameraBtn')) {
        const resetBtn = document.createElement('button');
        resetBtn.id = 'resetCameraBtn';
        resetBtn.textContent = '🔄 Reset Camera';
        resetBtn.style.position = 'fixed';
        resetBtn.style.top = '80px';
        resetBtn.style.right = '20px';
        resetBtn.style.backgroundColor = 'rgba(0,0,0,0.7)';
        resetBtn.style.color = 'white';
        resetBtn.style.border = 'none';
        resetBtn.style.borderRadius = '5px';
        resetBtn.style.padding = '8px 12px';
        resetBtn.style.zIndex = '9999';

        // Aggiungi l'evento al click
        resetBtn.addEventListener('click', resetCameraZoom);

        // Aggiungi il pulsante al body
        document.body.appendChild(resetBtn);
    }

    // Esegui un reset automatico all'avvio
    setTimeout(resetCameraZoom, 2000);

    // Reset quando l'utente torna alla pagina
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            setTimeout(resetCameraZoom, 1000);
        }
    });
});

// Funzione per resettare lo zoom della fotocamera
function resetCameraZoom() {
    try {
        const videoEl = document.querySelector('video');
        if (videoEl && videoEl.srcObject) {
            const tracks = videoEl.srcObject.getVideoTracks();

            if (tracks && tracks.length > 0) {
                const track = tracks[0];

                // Verifica se getCapabilities è supportato
                if (track.getCapabilities) {
                    const capabilities = track.getCapabilities();
                    console.log('Capabilities fotocamera:', capabilities);

                    // Verifica se lo zoom è supportato
                    if (capabilities.zoom) {
                        console.log('Tentativo di reset dello zoom a 1.0...');

                        // Resetta lo zoom a 1.0
                        track.applyConstraints({
                            advanced: [{zoom: 1.0}]
                        }).then(() => {
                            console.log('Zoom resettato con successo');
                        }).catch(error => {
                            console.error('Errore nel reset dello zoom:', error);
                        });
                    } else {
                        console.log('Zoom non supportato su questo dispositivo');
                    }
                } else {
                    console.log('getCapabilities non supportato');
                }
            }
        }
    } catch (error) {
        console.error('Errore durante il reset della fotocamera:', error);
    }
}