# Swend — site vitrine

Site de présentation statique de Swend, déployé via GitHub Pages sur `www.swend.fr`.

Pas de build : les fichiers sont servis tels quels.

- `index.html` : les trois vues du site (« Découvrir Swend », « Pour les restaurants », « Contact »), adressables par `#restaurants` et `#contact`.
- `assets/site.css`, `assets/site.js` : styles et interactions (cartes retournables, navigation, copie de l’adresse), repris de la maquette validée du 29/09/2026.
- Adresse de contact : jamais écrite en clair dans `index.html` (moins de collecte par les robots) ; `assets/site.js` la reconstitue à l’affichage dans les éléments `data-email` (lien `mailto:`, et texte si `data-email="texte"`). Sans JavaScript, la page affiche « contact [arobase] swend.fr ».
- Logos en haut et en bas de page : lien vers `/`, qui recharge l’accueil.
- `assets/swend-logo.png`, `assets/swend-mains.png`, `assets/application-creation.jpg` : images originales.

Prévisualisation locale : `python3 -m http.server` à la racine, puis http://localhost:8000.
