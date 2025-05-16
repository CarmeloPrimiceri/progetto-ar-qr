// Funzione per resettare lo zoom della fotocamera
function resetCameraSettings() {
    const videoEl = document.querySelector('video');
    if (videoEl && videoEl.srcObject) {
        const stream = videoEl.srcObject;
        const tracks = stream.getVideoTracks();

        tracks.forEach(track => {
            if (track.getCapabilities && track.getCapabilities().zoom) {
                track.applyConstraints({
                    advanced: [{zoom: 1}] // Reset zoom a 1x
                }).catch(e => console.error('Errore nel reset dello zoom:', e));
            }
        });

        console.log('Reset zoom della fotocamera completato');
    }
}

// Aggiungi un pulsante per il reset manuale dello zoom
function addResetButton() {
    const resetButton = document.createElement('button');
    resetButton.textContent = '🔄 Reset Camera';
    resetButton.style.position = 'fixed';
    resetButton.style.top = '80px'; // Posizionato sotto il pulsante audio
    resetButton.style.right = '20px';
    resetButton.style.padding = '8px';
    resetButton.style.backgroundColor = 'rgba(0,0,0,0.7)';
    resetButton.style.color = 'white';
    resetButton.style.border = 'none';
    resetButton.style.borderRadius = '5px';
    resetButton.style.zIndex = '9999';
    resetButton.addEventListener('click', resetCameraSettings);
    document.body.appendChild(resetButton);
}

// Reset zoom all'avvio e quando l'utente torna alla pagina
document.addEventListener('DOMContentLoaded', function() {
    // Reset zoom dopo che la fotocamera è stata inizializzata
    setTimeout(resetCameraSettings, 2000);

    // Aggiungi pulsante di reset
    addResetButton();

    // Reset zoom quando l'utente torna alla pagina
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            setTimeout(resetCameraSettings, 1000);
        }
    });
});