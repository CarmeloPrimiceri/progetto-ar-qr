// Database dei personaggi e dei dialoghi
const characterData = {
    "0": { // Corrisponde a targetIndex: 0
        modelId: "robot-model",
        position: "0 0 0",
        scale: "0.5 0.5 0.5",
        rotation: "0 0 0",
        animation: "idle",
        dialog: "Ciao! Sono il Robot Guida. Benvenuto nella nostra avventura interattiva! Cosa ti piacerebbe sapere?",
        choices: [
            { text: "Raccontami la storia di questo luogo", nextTarget: 1 },
            { text: "Quali sono le attività che posso fare qui?", nextTarget: 1 }
        ]
    },
    "1": { // Corrisponde a targetIndex: 1
        modelId: "ghost-model",
        position: "0 0 0",
        scale: "0.2 0.2 0.2",
        rotation: "0 0 0",
        animation: "idle",
        dialog: "Eccomi! Sono lo Spirito del Luogo. Ti mostrerò dei segreti nascosti. Dove vuoi andare?",
        choices: [
            { text: "Portami al giardino segreto", nextTarget: 0 },
            { text: "Voglio vedere la sala dei tesori", nextTarget: 0 }
        ]
    }
};

// Sistema di gestione dei marker e dei modelli 3D
class ARExperience {
    constructor() {
        this.dialogSystem = new DialogSystem();
        this.loadedModels = {};
        this.setupTargets();

        // Nascondi la schermata di caricamento dopo 3 secondi
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';

            // Nascondi le istruzioni dopo 10 secondi
            setTimeout(() => {
                document.querySelector('.instructions').style.display = 'none';
            }, 10000);
        }, 3000);
    }

    setupTargets() {
        const targets = document.querySelectorAll('a-entity[mindar-image-target]');

        targets.forEach(target => {
            const targetIndex = target.getAttribute('mindar-image-target').targetIndex;

            // Carica il modello 3D per questo target
            if (characterData[targetIndex]) {
                this.loadModel(target, targetIndex);
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
        if (!characterData[targetIndex]) return;

        const data = characterData[targetIndex];

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
    }
}

// Inizializza l'esperienza AR quando la pagina è caricata
window.addEventListener('load', () => {
    new ARExperience();
});