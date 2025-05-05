# Esperienza AR con QR Code

Un'applicazione web di realtà aumentata che permette agli utenti di interagire con personaggi 3D attraverso QR code. Questo progetto usa AR.js e A-Frame per creare un'esperienza interattiva senza necessità di installare app native.

## Funzionalità

- Visualizzazione di modelli 3D ancorati a QR code
- Animazioni dei personaggi 3D
- Sistema di dialogo interattivo
- Navigazione guidata tra diversi QR code
- Esperienza completamente basata su web

## Requisiti Tecnici

- Browser moderno con supporto WebGL (Chrome, Safari, Firefox, Edge)
- Dispositivo con fotocamera (smartphone o tablet)
- Connessione internet

## Struttura del Progetto

```
/
├── index.html              # File principale dell'applicazione
├── css/                    # Stili CSS
│   └── style.css
├── js/                     # Script JavaScript
│   ├── main.js             # Logica principale dell'applicazione
│   └── dialog.js           # Sistema di gestione dei dialoghi
└── assets/                 # Risorse
    ├── models/             # Modelli 3D (non inclusi nel repository)
    └── markers/            # Immagini dei marker QR code
        ├── hiro.png        # Marker predefinito Hiro
        └── kanji.png       # Marker predefinito Kanji
```

## Come Iniziare

1. Clona questo repository
2. Ospita i file su un server web (GitHub Pages, Netlify, ecc.)
3. Stampa i marker Hiro e Kanji dalla cartella `assets/markers/`
4. Accedi all'applicazione da un dispositivo mobile e punta la fotocamera verso i marker

## Personalizzazione

Per personalizzare l'applicazione:

1. Modifica i modelli 3D modificando gli URL in `js/main.js`
2. Personalizza i dialoghi e le opzioni nel database `characterData`
3. Aggiungi più marker e personaggi aggiornando la configurazione
4. Personalizza l'interfaccia utente modificando `css/style.css`

## Crediti

Questo progetto utilizza:
- [AR.js](https://github.com/AR-js-org/AR.js) per la realtà aumentata basata su web
- [A-Frame](https://aframe.io/) per la creazione di scene 3D
- Modelli 3D di esempio da [Glitch](https://glitch.com/)

## Licenza

Questo progetto è rilasciato sotto licenza MIT.
