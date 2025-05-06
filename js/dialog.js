// Sistema di gestione dei dialoghi
window.DialogSystem = class {
    constructor() {
        this.dialogContainer = document.querySelector('.dialog-container');
        this.dialogText = document.querySelector('.dialog-text');
        this.choicesContainer = document.querySelector('.choices-container');
        this.currentTarget = null;
    }

    /**
     * Mostra il dialogo associato a un target
     * @param {string} targetIndex - L'indice del target rilevato
     */
    showDialog(targetIndex) {
        if (!window.characterData[targetIndex]) return;

        const data = window.characterData[targetIndex];
        this.currentTarget = targetIndex;

        // Imposta il testo del dialogo
        this.dialogText.textContent = data.dialog;

        // Cancella le scelte precedenti
        this.choicesContainer.innerHTML = '';

        // Aggiungi le nuove scelte
        data.choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = choice.text;
            button.addEventListener('click', () => {
                this.handleChoice(choice.nextTarget);
            });
            this.choicesContainer.appendChild(button);
        });

        // Mostra il dialogo
        this.dialogContainer.style.display = 'block';
    }

    /**
     * Nasconde il dialogo corrente
     */
    hideDialog() {
        this.dialogContainer.style.display = 'none';
        this.currentTarget = null;
    }

    /**
     * Gestisce la scelta dell'utente
     * @param {string} nextTarget - L'indice del prossimo target da cercare
     */
    handleChoice(nextTarget) {
        // Nascondi il dialogo corrente
        this.hideDialog();

        // Mostra un messaggio che indica quale target cercare
        alert(`Cerca l'immagine ${parseInt(nextTarget) + 1} per continuare l'avventura!`);
    }
}