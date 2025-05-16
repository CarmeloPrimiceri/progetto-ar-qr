// Database dei personaggi e dei dialoghi
window.characterData = {
    "inizio": { // QR code iniziale della brochure
        modelId: "spiritello-inizio",
        position: "0 0.75 0",
        scale: "1.5 1.5 1.5",
        rotation: "0 0 0",
        animation: "idle",
        character: "spiritello-base",
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
        position: "0 0.75 0",
        scale: "1.5 1.5 1.5",
        rotation: "0 0 0",
        animation: "dropping",
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
        position: "0 0.75 0",
        scale: "1.5 1.5 1.5",
        rotation: "0 0 0",
        animation: "running",
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
        modelId: "spiritello-blu2",
        position: "0 0.75 0",
        scale: "1.5 1.5 1.5",
        rotation: "0 0 0",
        animation: "fixing",
        character: "spiritello-blu",
        dialog: "Chiudi il tubo.",
        choices: [
            { text: "Chiudi il tubo (Vai al marker blu 3)", nextMarker: "blu3" }
        ]
    },
    "blu3": { // QR code blu 3 - tubo chiuso
        modelId: "spiritello-blu3",
        position: "0 0.75 0",
        scale: "1.5 1.5 1.5",
        rotation: "0 0 0",
        animation: "relieved",
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
        position: "0 0.75 0",
        scale: "1.5 1.5 1.5",
        rotation: "0 0 0",
        animation: "walking",
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
        position: "0 0.75 0",
        scale: "1.5 1.5 1.5",
        rotation: "0 0 0",
        animation: "angry",
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
        position: "0 0.75 0",
        scale: "1.5 1.5 1.5",
        rotation: "0 0 0",
        animation: "gathering",
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

// Gestione degli errori globale
window.addEventListener('error', function(e) {
    console.error('Errore JavaScript:', e.message);
    alert('Si è verificato un errore: ' + e.message);
});

// Sistema di gestione dei marker e dei modelli 3D
class ARExperience {
    constructor() {
        try {
            console.log("Inizializzazione ARExperience...");
            // Crea una nuova istanza di DialogSystem
            this.dialogSystem = new DialogSystem();
            this.loadedModels = {};
            console.log("Setup markers...");
            this.setupMarkerEvents();

            // Nascondi la schermata di caricamento dopo 3 secondi
            setTimeout(() => {
                document.querySelector('.loading-screen').style.display = 'none';

                // Nascondi le istruzioni dopo 10 secondi
                setTimeout(() => {
                    document.querySelector('.instructions').style.display = 'none';
                }, 10000);
            }, 3000);
        } catch (error) {
            console.error("Errore durante l'inizializzazione:", error);
            alert("Errore durante l'inizializzazione: " + error.message);
        }
    }

    setupMarkerEvents() {
        const markers = document.querySelectorAll('a-marker');

        markers.forEach(marker => {
            const markerId = marker.id;
            console.log("Marker configurato:", markerId);

            // Evento quando il marker viene trovato
            marker.addEventListener('markerFound', () => {
                console.log(`Marker trovato: ${markerId}`);

                // Carica il modello 3D se non è già stato caricato
                if (!this.loadedModels[markerId]) {
                    this.loadModel(marker, markerId);
                }

                // Mostra il dialogo
                this.dialogSystem.showDialog(markerId);
            });

            // Evento quando il marker viene perso
            marker.addEventListener('markerLost', () => {
                console.log(`Marker perso: ${markerId}`);

                // Nascondi il dialogo solo se appartiene a questo marker
                if (this.dialogSystem.currentMarker === markerId) {
                    // Commenta questa riga se preferisci che il dialogo rimanga visibile
                    // this.dialogSystem.hideDialog();
                }
            });
        });
    }

    loadModel(marker, markerId) {
        if (!window.characterData[markerId]) {
            console.warn(`Nessun dato carattere trovato per marker: ${markerId}`);
            return;
        }

        const data = window.characterData[markerId];

        // Crea l'entità per il modello 3D
        const modelEntity = document.createElement('a-entity');
        modelEntity.setAttribute('gltf-model', `#${data.modelId}`);
        modelEntity.setAttribute('position', data.position);
        modelEntity.setAttribute('scale', data.scale);
        modelEntity.setAttribute('rotation', data.rotation);

        // Aggiungi l'animation-mixer se è specificata un'animazione
        if (data.animation) {
            modelEntity.setAttribute('animation-mixer', `clip: ${data.animation}; loop: repeat; timeScale: 1`);
        }

        // Se siamo nel QR code arcobaleno, posiziona più modelli per ogni spiritello
        if (markerId === "arcobaleno") {
            // Qui potresti aggiungere un gruppo di modelli spiritello in posizioni diverse
            this.loadGroupModels(marker);
        } else {
            // Aggiungi il modello al marker
            marker.appendChild(modelEntity);
        }

        // Segna il modello come caricato
        this.loadedModels[markerId] = true;

        console.log(`Modello caricato per ${markerId}: ${data.modelId}`);
    }

    loadGroupModels(marker) {
        // Per il QR code arcobaleno, posiziona diversi spiritelli in un semicerchio
        const spiritelli = [
            { id: "viola", position: "-0.5 0.75 0", scale: "1.0 1.0 1.0", color: "#8a2be2" },
            { id: "rosso", position: "-1.5 0.75 0.5", scale: "1.0 1.0 1.0", color: "#ff0000" },
            { id: "verde", position: "0 0.75 1", scale: "1.0 1.0 1.0", color: "#00ff00" },
            { id: "blu", position: "1.5 0.75 0.5", scale: "1.0 1.0 1.0", color: "#0000ff" },
            { id: "rosa", position: "0.5 0.75 0", scale: "1.0 1.0 1.0", color: "#ff69b4" },
            { id: "celeste", position: "0 0.75 -1", scale: "1.0 1.0 1.0", color: "#87ceeb" }
        ];

        spiritelli.forEach(spiritello => {
            const entity = document.createElement('a-entity');
            entity.setAttribute('gltf-model', "#spiritello-model");
            entity.setAttribute('position', spiritello.position);
            entity.setAttribute('scale', spiritello.scale);
            entity.setAttribute('rotation', "0 0 0");
            entity.setAttribute('animation-mixer', "clip: idle; loop: repeat; timeScale: 1");

            // Opzionale: Aggiungi colore al modello se supporta i materiali
            if (spiritello.color) {
                entity.setAttribute('material', `color: ${spiritello.color}`);
            }

            marker.appendChild(entity);
        });
    }
}

// Gestione dell'audio e dell'overlay iniziale
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM completamente caricato e analizzato");

    const startOverlay = document.getElementById('start-overlay');
    const startButton = document.getElementById('startExperience');
    const toggleAudioBtn = document.getElementById('toggleAudio');
    const audioIcon = document.getElementById('audioIcon');

    // Variabile per tenere traccia dello stato dell'audio
    let isAudioPlaying = false;
    let audioEntity = null;

    // Funzione per inizializzare l'esperienza AR
    function initARExperience() {
        try {
            const arExperience = new ARExperience();
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
                audioEntity.setAttribute('sound', 'volume', 0.5);
                isAudioPlaying = true;
            }

            // Inizializza l'esperienza AR
            initARExperience();
        });
    } else {
        // Se non c'è l'overlay, inizializza direttamente l'esperienza
        initARExperience();
    }

    // Gestione pulsante audio
    if (toggleAudioBtn && audioIcon) {
        toggleAudioBtn.addEventListener('click', function() {
            if (!audioEntity) {
                audioEntity = document.querySelector('a-entity[sound]');
            }

            if (audioEntity) {
                if (isAudioPlaying) {
                    // Disattiva l'audio
                    audioEntity.setAttribute('sound', 'volume', 0);
                    audioIcon.textContent = '🔇';
                } else {
                    // Attiva l'audio
                    audioEntity.setAttribute('sound', 'volume', 0.5);
                    audioIcon.textContent = '🔊';
                }
                isAudioPlaying = !isAudioPlaying;
            }
        });
    }
});