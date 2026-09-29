# Swend — site vitrine

Site de présentation statique de Swend, déployé via GitHub Pages sur `www.swend.fr`.

Pas de build : les fichiers sont servis tels quels.

- `index.html` : les trois vues du site (« Découvrir Swend », « Pour les restaurants », « Contact »), adressables par `#restaurants` et `#contact`.
- `assets/site.css`, `assets/site.js` : styles et interactions (cartes retournables, navigation, copie de l’adresse), repris de la maquette validée du 29/09/2026.
- `assets/swend-logo.png`, `assets/swend-mains.png`, `assets/application-creation.jpg` : images originales.

Prévisualisation locale : `python3 -m http.server` à la racine, puis http://localhost:8000.
