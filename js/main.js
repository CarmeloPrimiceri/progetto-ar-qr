/**
 * Script principale per l'applicazione AR con QR Code
 * Gestisce il caricamento dei modelli 3D e l'interazione con i marker AR
 */

// Database dei personaggi e dei dialoghi
const characterData = {
    "marker1": {
        modelUrl: "https://cdn.glitch.global/30af85b7-e880-4af1-a3be-82df84a91818/animated_robot.glb",
        position: "0 0 0",
        scale: "0.5 0.5 0.5",
        rotation: "0 0 0",
        animation: "idle",
        dialog: "Ciao! Sono il Robot Guida. Benvenuto nella nostra avventura interattiva! Cosa ti piacerebbe sapere?",
        choices: [
            { text: "Raccontami la storia di questo luogo", nextMarker: "marker2" },
            { text: "Quali sono le attività che posso fare qui?", nextMarker: "marker2" }
        ]
    },
    "marker2": {
        modelUrl: "https://cdn.glitch.global/30af85b7-e880-4af1-a3be-82df84a91818/ghost.glb",
        position: "0 0 0",
        scale: "0.2 0.2 0.2",
        rotation: "0 0 0",
        animation: "idle",
        dialog: "Eccomi! Sono lo Spirito del Luogo. Ti mostrerò dei segreti nascosti. Dove vuoi andare?",
        choices: [
            { text: "Portami al giardino segreto", nextMarker: "marker1" },
            { text: "Voglio vedere la sala dei tesori", nextMarker: "marker1" }
        ]
    }
};

/**
 * Classe che gestisce l'esperienza AR
 */
class ARExperience {
    constructor() {
        this.dialogSystem = new DialogSystem();
        this.loadedModels = {};
        this.setupMarkerEvents();
        
        // Nascondi la schermata di caricamento dopo 3 secondi
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
            
            // Nascondi le istruzioni dopo 10 secondi
            setTimeout(() => {
                document.querySelector('.instructions').style.display = 'none';
            }, 10000);
        }, 3000);
    }
    
    /**
     * Configura gli eventi per i marker AR
     */
    setupMarkerEvents() {
        const markers = document.querySelectorAll('a-marker');
        
        markers.forEach(marker => {
            // Evento quando il marker viene trovato
            marker.addEventListener('markerFound', () => {
                const markerId = marker.id;
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
                const markerId = marker.id;
                console.log(`Marker perso: ${markerId}`);
                
                // Nascondi il dialogo solo se appartiene a questo marker
                if (this.dialogSystem.currentMarker === markerId) {
                    this.dialogSystem.hideDialog();
                }
            });
        });
    }
    
    /**
     * Carica un modello 3D per un marker specifico
     * @param {Element} marker - Elemento DOM del marker AR
     * @param {string} markerId - ID del marker
     */
    loadModel(marker, markerId) {
        if (!characterData[markerId]) return;
        
        const data = characterData[markerId];
        
        // Rimuovi eventuali modelli precedenti
        while (marker.firstChild) {
            marker.removeChild(marker.firstChild);
        }
        
        // Crea l'entità per il modello 3D
        const modelEntity = document.createElement('a-entity');
        modelEntity.setAttribute('gltf-model', data.modelUrl);
        modelEntity.setAttribute('position', data.position);
        modelEntity.setAttribute('scale', data.scale);
        modelEntity.setAttribute('rotation', data.rotation);
        
        // Aggiungi l'animation-mixer se è specificata un'animazione
        if (data.animation) {
            modelEntity.setAttribute('animation-mixer', `clip: ${data.animation}; loop: repeat; timeScale: 1`);
        }
        
        // Aggiungi il modello al marker
        marker.appendChild(modelEntity);
        
        // Segna il modello come caricato
        this.loadedModels[markerId] = true;
        
        console.log(`Modello caricato per ${markerId}: ${data.modelUrl}`);
    }
}

// Inizializza l'esperienza AR quando la pagina è caricata
window.addEventListener('load', () => {
    new ARExperience();
});
