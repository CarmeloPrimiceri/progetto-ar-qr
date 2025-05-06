// Database dei personaggi e dei dialoghi
window.characterData = {
    "0": { // Corrisponde a targetIndex: 0
        modelId: "fiorellino-model",
        position: "0 0 0",
        scale: "0.5 0.5 0.5",
        rotation: "0 0 0",
        animation: "idle",
        dialog: "Ciao! Sono Fiorellino. Benvenuto nella nostra avventura interattiva! Cosa ti piacerebbe sapere?",
        choices: [
            { text: "Raccontami la storia di questo luogo", nextTarget: 1 },
            { text: "Quali sono le attività che posso fare qui?", nextTarget: 1 }
        ]
    },
    "1": { // Corrisponde a targetIndex: 1
        modelId: "fiorellino-model",
        position: "0 0 0",
        scale: "0.2 0.2 0.2",
        rotation: "0 0 0",
        animation: "idle",
        dialog: "Eccomi! Sono di nuovo Fiorellino. Ti mostrerò dei segreti nascosti. Dove vuoi andare?",
        choices: [
            { text: "Portami al giardino segreto", nextTarget: 0 },
            { text: "Voglio vedere la sala dei tesori", nextTarget: 0 }
        ]
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
            console.log("Setup targets...");
            this.setupTargets();

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

    setupTargets() {
        const targets = document.querySelectorAll('a-entity[mindar-image-target]');

        targets.forEach((target, index) => {
            // Usa direttamente l'indice del ciclo invece di tentare di estrarlo dall'attributo
            const targetIndex = index;
            console.log("Target trovato con indice:", targetIndex);

            // Carica il modello 3D per questo target
            if (window.characterData[targetIndex]) {
                this.loadModel(target, targetIndex);
            } else {
                console.warn(`Nessun dato carattere trovato per targetIndex: ${targetIndex}`);
            }

            // Aggiungi eventi per il rilevamento del target
            target.addEventListener('targetFound', () => {
                console.log(`Target trovato: ${targetIndex}`);
                this.dialogSystem.showDialog(targetIndex);
            });

            target.addEventListener('targetLost', () => {
                console.log(`Target perso: ${targetIndex}`);
                this.dialogSystem.hideDialog();
            });
        });
    }

    loadModel(target, targetIndex) {
        if (!window.characterData[targetIndex]) {
            console.warn(`Nessun dato per il target ${targetIndex}`);
            return;
        }

        const data = window.characterData[targetIndex];
        console.log(`Caricamento modello per target ${targetIndex}:`, data.modelId);

        try {
            // Verifica che il modello esista
            const modelAsset = document.querySelector(`#${data.modelId}`);
            if (!modelAsset) {
                console.error(`Modello #${data.modelId} non trovato nelle risorse`);
                return;
            }

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

            // Aggiungi il modello al target
            target.appendChild(modelEntity);

            console.log(`Modello caricato per target ${targetIndex}`);
        } catch (error) {
            console.error(`Errore nel caricamento del modello per target ${targetIndex}:`, error);
        }
    }
}

// Inizializza l'esperienza AR quando la pagina è caricata
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM completamente caricato e analizzato");
    try {
        const arExperience = new ARExperience();
        console.log("AR Experience inizializzata con successo");
    } catch (error) {
        console.error("Errore durante l'inizializzazione di ARExperience:", error);
        alert("Errore: " + error.message);
    }
});