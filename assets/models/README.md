# Modelli 3D

Questa cartella è destinata a contenere i modelli 3D utilizzati nell'applicazione. Nel prototipo attuale, i modelli 3D sono caricati da URL esterni (ospitati su Glitch).

## Modelli utilizzati nel prototipo

1. **Robot Animato**: [animated_robot.glb](https://cdn.glitch.global/30af85b7-e880-4af1-a3be-82df84a91818/animated_robot.glb)
2. **Fantasma**: [ghost.glb](https://cdn.glitch.global/30af85b7-e880-4af1-a3be-82df84a91818/ghost.glb)

## Aggiungere modelli personalizzati

Se vuoi utilizzare modelli 3D personalizzati:

1. Salva i tuoi modelli in formato GLB o GLTF in questa cartella
2. Aggiorna i percorsi nel file `js/main.js` per puntare ai tuoi modelli locali
3. Assicurati che i modelli siano ottimizzati per dispositivi mobili (basso numero di poligoni, texture compresse)

## Risorse per modelli 3D gratuiti

Ecco alcune risorse dove puoi trovare modelli 3D gratuiti:

- [Sketchfab](https://sketchfab.com/features/free-3d-models)
- [TurboSquid](https://www.turbosquid.com/Search/3D-Models/free)
- [Poly Haven](https://polyhaven.com/)
- [Mixamo](https://www.mixamo.com/) (per personaggi animati)

## Formati supportati

A-Frame e AR.js supportano principalmente i seguenti formati:

- GLTF/GLB (raccomandato)
- OBJ con MTL
- FBX (supporto limitato)

Si consiglia di utilizzare il formato GLTF/GLB poiché offre il miglior supporto per le animazioni e le texture.
