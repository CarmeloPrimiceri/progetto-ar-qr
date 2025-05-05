/**
 * Sistema di gestione dei dialoghi per l'applicazione AR
 * Questo file gestisce la visualizzazione dei dialoghi e la gestione delle scelte dell'utente
 */

// Sistema di gestione dei dialoghi
class DialogSystem {
    constructor() {
        this.dialogContainer = document.querySelector('.dialog-container');
        this.dialogText = document.querySelector('.dialog-text');
        this.choicesContainer = document.querySelector('.choices-container');
        this.currentMarker = null;
    }
    
    /**
     * Mostra il dialogo associato a un marker
     * @param {string} markerId - L'ID del marker rilevato
     */
    showDialog(markerId) {
        if (!characterData[markerId]) return;
        
        const data = characterData[markerId];
        this.currentMarker = markerId;
        
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
                this.handleChoice(choice.nextMarker);
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
        this.currentMarker = null;
    }
    
    /**
     * Gestisce la scelta dell'utente
     * @param {string} nextMarker - L'ID del prossimo marker da cercare
     */
    handleChoice(nextMarker) {
        // Nascondi il dialogo corrente
        this.hideDialog();
        
        // Mostra un messaggio che indica quale QR code cercare
        alert(`Cerca il QR code ${nextMarker === 'marker1' ? 'Hiro' : 'Kanji'} per continuare l'avventura!`);
    }
}
