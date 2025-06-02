// Il characterData rimane identico al tuo originale
// (copialo dal tuo file main.js originale)

// Sistema di gestione dei marker QR e dei modelli 3D
class ARExperience {
    constructor() {
        try {
            console.log("Inizializzazione ARExperience con QR codes...");
            this.dialogSystem = new window.DialogSystem();
            this.loadedModels = {};
            this.setupQRMarkerEvents();

            // Nascondi la schermata di caricamento
            setTimeout(() => {
                document.querySelector('.loading-screen').style.display = 'none';
                document.querySelector('.qr-scanner-frame').style.display = 'block';

                // Mostra istruzioni
                setTimeout(() => {
                    const instructions = document.querySelector('.instructions');
                    instructions.style.opacity = '0';
                    setTimeout(() => {
                        instructions.style.display = 'none';
                    }, 500);
                }, 8000);
            }, 3000);
        } catch (error) {
            console.error("Errore durante l'inizializzazione:", error);
            alert("Errore durante l'inizializzazione: " + error.message);
        }
    }

    setupQRMarkerEvents() {
        // Setup per marker QR code (barcode type)
        for (let i = 0; i <= 7; i++) {
            const marker = document.querySelector(`#qr-${i}`);
            if (!marker) continue;

            const characterId = window.qrToCharacterMap[i.toString()];
            console.log(`QR ${i} mappato a: ${characterId}`);

            // Evento quando il QR viene trovato
            marker.addEventListener('markerFound', () => {
                console.log(`QR Code ${i} trovato -> ${characterId}`);

                // Feedback visivo
                this.updateDebugInfo(`QR ${i} rilevato: ${characterId}`, 'success');

                // Vibrazione feedback (se supportata)
                if (navigator.vibrate) {
                    navigator.vibrate(100);
                }

                // Carica il modello 3D
                if (!this.loadedModels[characterId]) {
                    this.loadModel(marker, characterId);
                }

                // Mostra il dialogo
                this.dialogSystem.showDialog(characterId);
            });

            // Evento quando il QR viene perso
            marker.addEventListener('markerLost', () => {
                console.log(`QR Code ${i} perso`);

                if (this.dialogSystem.currentMarker === characterId) {
                    // Mantieni il dialogo visibile per qualche secondo
                    setTimeout(() => {
                        if (!this.isAnyMarkerVisible()) {
                            this.dialogSystem.hideDialog();
                        }
                    }, 3000);
                }
            });
        }
    }

    loadModel(marker, characterId) {
        if (!window.characterData[characterId]) {
            console.warn(`Nessun dato carattere trovato per: ${characterId}`);
            return;
        }

        const data = window.characterData[characterId];

        // Crea l'entità per il modello 3D
        const modelEntity = document.createElement('a-entity');
        modelEntity.setAttribute('gltf-model', `#${data.modelId}`);
        modelEntity.setAttribute('position', data.position || '0 0 0');
        modelEntity.setAttribute('scale', data.scale || '0.5 0.5 0.5');
        modelEntity.setAttribute('rotation', data.rotation || '0 0 0');

        // Animazione di entrata
        modelEntity.setAttribute('animation', {
            property: 'scale',
            from: '0 0 0',
            to: data.scale || '0.5 0.5 0.5',
            dur: 1000,
            easing: 'easeOutElastic'
        });

        // Aggiungi animation-mixer se specificato
        if (data.animation) {
            modelEntity.setAttribute('animation-mixer', `clip: ${data.animation}; loop: repeat`);
        }

        // Gestione speciale per il finale con più personaggi
        if (characterId === "arcobaleno") {
            this.loadGroupModels(marker);
        } else {
            marker.appendChild(modelEntity);
        }

        this.loadedModels[characterId] = true;
        console.log(`Modello caricato per ${characterId}`);
    }

    loadGroupModels(marker) {
        // Per il finale, posiziona più spiritelli
        const positions = [
            { pos: "-0.3 0 0", scale: "0.3 0.3 0.3" },
            { pos: "0.3 0 0", scale: "0.3 0.3 0.3" },
            { pos: "0 0 0.3", scale: "0.3 0.3 0.3" },
            { pos: "0 0 -0.3", scale: "0.3 0.3 0.3" }
        ];

        positions.forEach((config, index) => {
            const entity = document.createElement('a-entity');
            entity.setAttribute('gltf-model', '#spiritello-arcobaleno');
            entity.setAttribute('position', config.pos);
            entity.setAttribute('scale', config.scale);
            entity.setAttribute('animation-mixer', 'clip: idle; loop: repeat');

            // Animazione di rotazione per rendere la scena più viva
            entity.setAttribute('animation', {
                property: 'rotation',
                to: '0 360 0',
                dur: 10000 + (index * 2000),
                loop: true,
                easing: 'linear'
            });

            marker.appendChild(entity);
        });
    }

    isAnyMarkerVisible() {
        // Controlla se almeno un marker è visibile
        for (let i = 0; i <= 7; i++) {
            const marker = document.querySelector(`#qr-${i}`);
            if (marker && marker.object3D.visible) {
                return true;
            }
        }
        return false;
    }

    updateDebugInfo(message, type = 'info') {
        const debugInfo = document.getElementById('debug-info');
        if (debugInfo) {
            debugInfo.textContent = message;
            debugInfo.style.backgroundColor =
                type === 'success' ? 'rgba(0, 255, 0, 0.7)' :
                    type === 'error' ? 'rgba(255, 0, 0, 0.7)' :
                        'rgba(0, 0, 0, 0.7)';

            // Reset dopo 3 secondi
            setTimeout(() => {
                debugInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            }, 3000);
        }
    }
}

// Gestione dell'audio e dell'overlay iniziale
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM completamente caricato");

    const startOverlay = document.getElementById('start-overlay');
    const startButton = document.getElementById('startExperience');
    const toggleAudioBtn = document.getElementById('toggleAudio');
    const audioIcon = document.getElementById('audioIcon');

    let isAudioPlaying = false;
    let audioEntity = null;
    let arExperience = null;

    // Funzione per inizializzare l'esperienza AR
    function initARExperience() {
        try {
            arExperience = new ARExperience();
            console.log("AR Experience inizializzata con successo");
        } catch (error) {
            console.error("Errore durante l'inizializzazione di ARExperience:", error);
            alert("Errore: " + error.message);
        }
    }

    // Inizia l'esperienza quando si clicca sul pulsante
    if (startButton && startOverlay) {
        startButton.addEventListener('click', function() {
            startOverlay.style.display = 'none';

            // Avvia l'audio
            audioEntity = document.querySelector('a-entity[sound]');
            if (audioEntity) {
                // L'audio partirà automaticamente grazie all'interazione dell'utente
                isAudioPlaying = true;
            }

            // Inizializza l'esperienza AR
            initARExperience();
        });
    }

    // Gestione pulsante audio
    if (toggleAudioBtn && audioIcon) {
        toggleAudioBtn.addEventListener('click', function() {
            if (!audioEntity) {
                audioEntity = document.querySelector('a-entity[sound]');
            }

            if (audioEntity) {
                if (isAudioPlaying) {
                    audioEntity.setAttribute('sound', 'volume', 0);
                    audioIcon.textContent = '🔇';
                } else {
                    audioEntity.setAttribute('sound', 'volume', 0.5);
                    audioIcon.textContent = '🔊';
                }
                isAudioPlaying = !isAudioPlaying;
            }
        });
    }

    // Gestione visibilità pagina (pausa audio quando si cambia tab)
    document.addEventListener('visibilitychange', function() {
        if (audioEntity) {
            if (document.hidden) {
                audioEntity.components.sound.pauseSound();
            } else if (isAudioPlaying) {
                audioEntity.components.sound.playSound();
            }
        }
    });

    // Debug mode toggle con tasto D
    document.addEventListener('keypress', function(e) {
        if (e.key === 'd' || e.key === 'D') {
            const debugInfo = document.getElementById('debug-info');
            if (debugInfo) {
                debugInfo.style.display =
                    debugInfo.style.display === 'none' ? 'block' : 'none';
            }
        }
    });
});