// Sistema di gestione dei dialoghi
window.DialogSystem = class {
    constructor() {
        this.dialogContainer = document.querySelector('.dialog-container');
        this.dialogText = document.querySelector('.dialog-text');
        this.choicesContainer = document.querySelector('.choices-container');
        this.currentTarget = null;
        this.isDialogOpen = false;
        this.isUserInteracting = false; // Flag per tracciare se l'utente sta interagendo
    }

    /**
     * Mostra il dialogo associato a un target
     * @param {string} targetIndex - L'indice del target rilevato
     */
    showDialog(targetIndex) {
        // Se il dialogo è già aperto e l'utente sta interagendo, non disturbiamo
        if (this.isDialogOpen && this.isUserInteracting) {
            console.log("L'utente sta interagendo, mantengo il dialogo corrente");
            return;
        }

        if (!window.characterData[targetIndex]) return;

        const data = window.characterData[targetIndex];
        this.currentTarget = targetIndex;
        this.isDialogOpen = true;

        // Imposta il testo del dialogo
        this.dialogText.textContent = data.dialog;

        // Cancella le scelte precedenti
        this.choicesContainer.innerHTML = '';

        // Aggiungi le nuove scelte
        data.choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = choice.text;

            // Aggiungi evento per tracciare l'interazione dell'utente
            button.addEventListener('mousedown', () => {
                this.isUserInteracting = true;
            });

            button.addEventListener('click', () => {
                this.handleChoice(choice.nextTarget);
                // Reset del flag di interazione dopo la scelta
                setTimeout(() => {
                    this.isUserInteracting = false;
                }, 500);
            });

            this.choicesContainer.appendChild(button);
        });

        // Mostra il dialogo con animazione
        this.dialogContainer.style.opacity = "0";
        this.dialogContainer.style.display = 'block';
        this.dialogContainer.style.transform = "translateY(20px)";

        // Animazione di entrata
        setTimeout(() => {
            this.dialogContainer.style.transition = "opacity 0.5s, transform 0.5s";
            this.dialogContainer.style.opacity = "1";
            this.dialogContainer.style.transform = "translateY(0)";
        }, 10);
    }

    /**
     * Nasconde il dialogo corrente con una transizione di fade-out
     */
    hideDialog() {
        // Se l'utente sta interagendo, non chiudere il dialogo
        if (this.isUserInteracting) {
            console.log("L'utente sta interagendo, non chiudo il dialogo");
            return;
        }

        // Animazione di uscita
        this.dialogContainer.style.transition = "opacity 0.5s, transform 0.5s";
        this.dialogContainer.style.opacity = "0";
        this.dialogContainer.style.transform = "translateY(20px)";

        // Rimuovi il dialogo dopo la transizione
        setTimeout(() => {
            this.dialogContainer.style.display = 'none';
            this.isDialogOpen = false;
            this.currentTarget = null;
        }, 500);
    }

    /**
     * Gestisce la scelta dell'utente
     * @param {string} nextTarget - L'indice del prossimo target da cercare
     */
    handleChoice(nextTarget) {
        // Prepara l'avviso con stile personalizzato
        const message = `Cerca l'immagine ${parseInt(nextTarget) + 1} per continuare l'avventura!`;

        // Nascondi il dialogo corrente con animazione
        this.dialogContainer.style.transition = "opacity 0.5s, transform 0.5s";
        this.dialogContainer.style.opacity = "0";
        this.dialogContainer.style.transform = "translateY(20px)";

        setTimeout(() => {
            this.dialogContainer.style.display = 'none';
            this.isDialogOpen = false;
            this.currentTarget = null;

            // Mostra messaggio personalizzato invece di alert
            this.showCustomAlert(message);
        }, 500);
    }

    /**
     * Mostra un avviso personalizzato più gradevole rispetto all'alert nativo
     * @param {string} message - Il messaggio da mostrare
     */
    showCustomAlert(message) {
        // Crea un elemento di avviso personalizzato se non esiste già
        let customAlert = document.querySelector('.custom-alert');
        if (!customAlert) {
            customAlert = document.createElement('div');
            customAlert.className = 'custom-alert';
            document.body.appendChild(customAlert);

            // Aggiunge stile CSS inline se non è già definito nel CSS
            if (!document.querySelector('style.custom-alert-style')) {
                const style = document.createElement('style');
                style.className = 'custom-alert-style';
                style.textContent = `
                    .custom-alert {
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background-color: rgba(0, 0, 0, 0.8);
                        color: white;
                        padding: 20px;
                        border-radius: 10px;
                        max-width: 80%;
                        text-align: center;
                        z-index: 9999;
                        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
                        font-family: Arial, sans-serif;
                        font-size: 18px;
                        opacity: 0;
                        transition: opacity 0.3s;
                    }
                `;
                document.head.appendChild(style);
            }
        }

        customAlert.textContent = message;
        customAlert.style.opacity = "1";

        // Nascondi l'avviso dopo alcuni secondi
        setTimeout(() => {
            customAlert.style.opacity = "0";
            setTimeout(() => {
                customAlert.style.display = "none";
            }, 300);
        }, 3000);

        // Rendi immediatamente visibile
        customAlert.style.display = "block";
    }
};