// Sistema di gestione dei dialoghi
window.DialogSystem = class {
    constructor() {
        this.dialogContainer = document.querySelector('.dialog-container');
        this.dialogText = document.querySelector('.dialog-text');
        this.choicesContainer = document.querySelector('.choices-container');
        this.currentMarker = null;
        this.isDialogOpen = false;
        this.isUserInteracting = false; // Flag per tracciare se l'utente sta interagendo
        this.visitedMarkers = []; // Traccia i marker già visitati
        this.dialogState = {}; // Stato del dialogo per marker specifici
    }

    /**
     * Mostra il dialogo associato a un marker
     * @param {string} markerId - L'ID del marker rilevato
     */
    showDialog(markerId) {
        // Se il dialogo è già aperto e l'utente sta interagendo, non disturbiamo
        if (this.isDialogOpen && this.isUserInteracting) {
            console.log("L'utente sta interagendo, mantengo il dialogo corrente");
            return;
        }

        if (!window.characterData[markerId]) {
            console.warn(`Nessun dato carattere trovato per marker: ${markerId}`);
            return;
        }

        // Registra questo marker come visitato
        if (!this.visitedMarkers.includes(markerId)) {
            this.visitedMarkers.push(markerId);
        }

        const data = window.characterData[markerId];
        this.currentMarker = markerId;
        this.isDialogOpen = true;

        // Verifica se è la prima volta che visitiamo questo marker
        if (!this.dialogState[markerId]) {
            this.dialogState[markerId] = { step: 0 };
        }

        this.displayCurrentDialogStep(markerId);
    }

    /**
     * Mostra il passo corrente del dialogo per il marker specificato
     * @param {string} markerId - L'ID del marker
     */
    displayCurrentDialogStep(markerId) {
        const data = window.characterData[markerId];
        const state = this.dialogState[markerId];

        // Descrizione del personaggio (se presente)
        if (data.description && state.step === 0) {
            console.log("Descrizione:", data.description);
            // Qui potresti mostrare la descrizione in un elemento UI se desiderato
        }

        let dialogText = "";
        let choices = [];

        // Gestione per il QR code arcobaleno (finale con più personaggi)
        if (markerId === "arcobaleno" && state.step > 0 && data.dialogs) {
            // Se siamo nei dialoghi multipli del finale
            if (state.step <= data.dialogs.length) {
                const dialogItem = data.dialogs[state.step - 1];
                dialogText = `${dialogItem.character}: ${dialogItem.text}`;

                if (state.step < data.dialogs.length) {
                    choices = [{ text: "Continua", action: "nextStep" }];
                } else {
                    choices = data.finalChoices;
                }
            } else {
                // Mostra conclusione
                dialogText = data.conclusion || "Fine della storia.";
                choices = [];
            }
        } else {
            // Gestione normale dei dialoghi in base allo step
            switch (state.step) {
                case 0:
                    dialogText = data.dialog;
                    choices = data.choices || [];
                    break;
                case 1:
                    dialogText = data.nextDialog || data.dialog;
                    choices = data.nextChoices || data.choices || [];
                    break;
                case 2:
                    dialogText = data.finalDialog || data.nextDialog || data.dialog;
                    choices = data.finalChoices || data.nextChoices || data.choices || [];
                    break;
                case 3:
                    dialogText = data.conclusion || "Fine del dialogo.";
                    choices = data.conclusionChoices || [];

                    // Filtra le scelte in base alle condizioni (prima visita o non prima visita)
                    if (choices.length > 0 && (choices[0].condition === "firstChoice" || choices[0].condition === "notFirstChoice")) {
                        const isFirstChoice = this.wasFirstVisit(markerId);
                        choices = choices.filter(choice =>
                            (choice.condition === "firstChoice" && isFirstChoice) ||
                            (choice.condition === "notFirstChoice" && !isFirstChoice)
                        );
                    }
                    break;
                default:
                    dialogText = "Fine della conversazione.";
                    choices = [];
            }
        }

        // Imposta il testo del dialogo
        this.dialogText.textContent = dialogText;

        // Cancella le scelte precedenti
        this.choicesContainer.innerHTML = '';

        // Aggiungi le nuove scelte
        choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = choice.text;

            // Aggiungi evento per tracciare l'interazione dell'utente
            button.addEventListener('mousedown', () => {
                this.isUserInteracting = true;
            });

            button.addEventListener('click', () => {
                if (choice.action === "nextStep" || choice.nextStep === true) {
                    // Avanza al prossimo step dello stesso dialogo
                    this.dialogState[markerId].step++;
                    this.displayCurrentDialogStep(markerId);
                } else if (choice.nextMarker) {
                    // Vai a un altro marker
                    this.handleChoice(choice.nextMarker);
                } else {
                    // Comportamento predefinito
                    this.hideDialog();
                }

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
     * Verifica se questo marker è stato visitato per primo
     * @param {string} markerId - ID del marker
     * @returns {boolean} - True se questo marker è stato visitato prima di altri
     */
    wasFirstVisit(markerId) {
        // Se questo marker è il primo o il secondo nella lista dei visitati
        if (markerId === "giallo" || markerId === "blu") {
            return this.visitedMarkers.indexOf(markerId) === 0;
        }
        return false;
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
            this.currentMarker = null;
        }, 500);
    }

    /**
     * Gestisce la scelta dell'utente
     * @param {string} nextMarker - L'ID del prossimo marker da cercare
     */
    handleChoice(nextMarker) {
        // Prepara il testo appropriato per il QR code da cercare
        let qrDescription;
        switch (nextMarker) {
            case "giallo":
                qrDescription = "giallo";
                break;
            case "blu":
                qrDescription = "blu";
                break;
            case "blu2":
                qrDescription = "blu 2";
                break;
            case "blu3":
                qrDescription = "blu 3";
                break;
            case "rosa":
                qrDescription = "rosa";
                break;
            case "rosso":
                qrDescription = "rosso";
                break;
            case "arcobaleno":
                qrDescription = "arcobaleno";
                break;
            default:
                qrDescription = nextMarker;
        }

        // Prepara l'avviso con stile personalizzato
        const message = `Cerca il QR code ${qrDescription} per continuare l'avventura!`;

        // Nascondi il dialogo corrente con animazione
        this.dialogContainer.style.transition = "opacity 0.5s, transform 0.5s";
        this.dialogContainer.style.opacity = "0";
        this.dialogContainer.style.transform = "translateY(20px)";

        setTimeout(() => {
            this.dialogContainer.style.display = 'none';
            this.isDialogOpen = false;
            this.currentMarker = null;

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