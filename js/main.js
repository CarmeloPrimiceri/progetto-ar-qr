// Database dei personaggi e dei dialoghi
window.characterData = {
    "inizio": { // QR code iniziale della brochure
        modelId: "spiritello-inizio",
        position: "0 0 0.5",
        scale: "0.5 0.5 0.5",
        rotation: "0 0 0",
        animation: "idle",
        character: "spiritello-inizio",
        dialog: "Sei arrivato, giovane avventuriero. Il mondo fantastico ha bisogno del tuo aiuto...un'entità cattiva sta facendo dispetti! Gli abitanti non sono per niente felici...",
        choices: [
            { text: "Come posso aiutare?", nextStep: true },
            { text: "Che dovrei fare?", nextStep: true }
        ],
        nextDialog: "Ho sentito che uno spiritello sta lasciando pacchi in giro...e un altro sta raccogliendo acqua da un tubo che perde. Da chi vuoi andare prima?",
        nextChoices: [
            { text: "Pacchi (marker giallo)", nextMarker: "giallo" },
            { text: "Tubo (marker blu)", nextMarker: "blu" }
        ]
    },
    "giallo": { // QR code giallo - spiritello con i pacchi
        modelId: "spiritello-giallo",
        position: "0 0 0.5",
        scale: "1.5 1.5 1.5",
        rotation: "180 0 0",
        animation: "idle",
        character: "spiritello-giallo",
        description: "Il personaggio entra in scena con i pacchi che gli cadono.",
        dialog: "Hey aspetta! I tuoi pacchi...!",
        choices: [
            { text: "Hey aspetta!", nextStep: true },
            { text: "I tuoi pacchi...!", nextStep: true }
        ],
        nextDialog: "Mh? I miei pacchi...? I miei pacchi! Qualcuno mi ha aperto lo zaino...",
        nextChoices: [
            { text: "Vuoi una mano?", nextStep: true },
            { text: "Te li raccolgo io!", nextStep: true }
        ],
        finalDialog: "davvero? Grazie, mi hai salvato...",
        finalChoices: [
            { text: "Tocchi lo spiritello per ridargli i pacchi", nextStep: true }
        ],
        conclusion: "Grazie davvero...credo che qualcun altro abbia bisogno del tuo aiuto!",
        conclusionChoices: [
            { text: "Vai al marker blu", nextMarker: "blu", condition: "firstChoice" },
            { text: "Vai al marker rosa", nextMarker: "rosa", condition: "notFirstChoice" }
        ]
    },
    "blu": { // QR code blu - spiritello con l'acqua
        modelId: "spiritello-blu",
        position: "0 0 0.5",
        scale: "1.5 1.5 1.5",
        rotation: "0 180 0",
        animation: "idle",
        character: "spiritello-blu",
        description: "Spiritello che entra correndo in scena con tanta acqua in un pancione.",
        dialog: "Scusa, hai bisogno di aiuto?",
        choices: [
            { text: "Scusa, hai bisogno di aiuto?", nextStep: true },
            { text: "Dove corri?", nextStep: true }
        ],
        nextDialog: "Lo spiritello sembra andare troppo di fretta, ma ti indica una direzione.",
        nextChoices: [
            { text: "Vai al tubo che perde (Vai al marker blu 2)", nextMarker: "blu2" }
        ]
    },
    "blu2": { // QR code blu 2 - continuazione tubo
        modelId: "spiritello-blu",
        position: "0 0 0.5",
        scale: "1.5 1.5 1.5",
        rotation: "0 0 180",
        animation: "idle",
        character: "spiritello-blu",
        dialog: "Chiudi il tubo.",
        choices: [
            { text: "Chiudi il tubo (Vai al marker blu 3)", nextMarker: "blu3" }
        ]
    },
    "blu3": { // QR code blu 3 - tubo chiuso
        modelId: "spiritello-blu",
        position: "0 0 0.5",
        scale: "1.5 1.5 1.5",
        rotation: "0 180 0",
        animation: "idle",
        character: "spiritello-blu",
        description: "Lo spiritello ora ha la pancia meno piena.",
        dialog: "giovane avventuriero mi hai salvato! Non riuscivo a guardare tutta quell'acqua che veniva sprecata...ricordati sempre di chiudere i rubinetti!",
        choices: [
            { text: "Lo farò", nextStep: true },
            { text: "Farò più attenzione in futuro", nextStep: true }
        ],
        nextDialog: "che bello, noi spiritelli ti ringraziamo. Forse c'è ancora qualcuno che devi aiutare...perché non vai a dare un'occhiata?",
        nextChoices: [
            { text: "Vai al marker giallo", nextMarker: "giallo", condition: "notFirstChoice" },
            { text: "Vai al marker rosa", nextMarker: "rosa", condition: "firstChoice" }
        ]
    },
    "rosa": { // QR code rosa 1
        modelId: "spiritello-rosa",
        position: "0 0 0.5",
        scale: "1.5 1.5 1.5",
        rotation: "0 180 0",
        animation: "idle",
        character: "spiritello-rosa",
        description: "Spiritello rosa stava camminando quando all'improvviso passa rotolando lo spiritello cattivo sopra i fiori.",
        dialog: "oh no! I miei fiori...",
        choices: [
            { text: "Oh non essere triste", nextStep: true },
            { text: "Ora ci vado a parlare io!", nextStep: true }
        ],
        nextDialog: "mhm...",
        nextChoices: [
            { text: "Segui i Qr code rossi", nextMarker: "rosso" }
        ]
    },
    "rosso": { // QR code rosso - spiritello cattivo
        modelId: "spiritello-rosso",
        position: "0 0 0.5",
        scale: "1.5 1.5 1.5",
        rotation: "0 180 0",
        animation: "idle",
        character: "spiritello-rosso",
        description: "Metti all'angolo lo spiritello cattivo.",
        dialog: "Perché sei cattivo?",
        choices: [
            { text: "Perché sei cattivo?", nextStep: true },
            { text: "Smetti di fare dispetti!", nextStep: true }
        ],
        nextDialog: "Perché dovrei? Loro sono stati cattivi con me!",
        nextChoices: [
            { text: "Cattivi?", nextStep: true },
            { text: "Che intendi dire?", nextStep: true }
        ],
        finalDialog: "mi hanno lasciato nell'area arida del bosco! Per colpa del cambiamento climatico sono stato davvero male!",
        finalChoices: [
            { text: "Gliel'hai detto?", nextStep: true }
        ],
        conclusion: "no però...",
        conclusionChoices: [
            { text: "Lo prendi e lo porti al Qrcode arcobaleno vicino l'entrata", nextMarker: "arcobaleno" }
        ]
    },
    "arcobaleno": { // QR code arcobaleno - finale
        modelId: "spiritello-arcobaleno",
        position: "0 0 0.5",
        scale: "1.5 1.5 1.5",
        rotation: "0 180 0",
        animation: "idle",
        character: "spiritello-arcobaleno",
        description: "Compaiono tutti gli spiritelli.",
        dialog: "Quindi eri tu a fare i dispetti?",
        choices: [
            { text: "Ascoltate la storia", nextStep: true }
        ],
        dialogs: [
            { character: "spiritello-rosso", text: "sì! Perché mi avete abbandonato!" },
            { character: "spiritello-verde", text: "ci dispiace che non abbiamo notato il tuo malessere...ma ora siamo qui, pronti ad aiutare te e la natura." },
            { character: "spiritello-blu", text: "tutto grazie al giovane avventuriero che, aiutandoci, ci ha fatto aprire gli occhi!" },
            { character: "spiritello-rosso", text: "mi dispiace...avrei dovuto parlare invece di pianificare una stupida vendetta..." },
            { character: "spiritello-rosa", text: "Ti perdoniamo! (ridiventa felice, sia lui sia quello rosso)" },
            { character: "spiritello-celeste", text: "ora però, giovane avventuriero, ci devi promettere una cosa. Come tu hai aiutato il nostro mondo, tu devi aiutare il tuo." },
            { character: "spiritello-viola", text: "Come hai visto, l'inquinamento e il cambiamento climatico cambiano le cose per il peggio!" }
        ],
        finalChoices: [
            { text: "Prometto che farò la mia parte!", nextStep: true }
        ],
        conclusion: "Spiritello viola: ora però, goditi la tua meritata ricompensa! Inquadra il Qr code sulla facciata e guarda il nostro mondo prendere vita!"
    }
};

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