# Swend — site vitrine

Site de présentation statique de Swend, déployé via GitHub Pages sur `www.swend.fr`.

Pas de build : les fichiers sont servis tels quels.

- `index.html` : les trois vues du site (« Découvrir Swend », « Pour les restaurants », « Contact »), adressables par `#restaurants` et `#contact`.
- `assets/site.css`, `assets/site.js` : styles et interactions (cartes retournables, navigation, copie de l’adresse), repris de la maquette validée du 29/09/2026.
- Adresse de contact : jamais écrite en clair dans `index.html` (moins de collecte par les robots) ; `assets/site.js` la reconstitue à l’affichage dans les éléments `data-email` (lien `mailto:`, et texte si `data-email="texte"`). Les boutons de la page restaurants écrivent à restaurant@ (`data-email-boite="restaurant"`). Sans JavaScript, la page affiche « contact [arobase] swend.fr ».
- Logos en haut et en bas de page : lien vers `/`, qui recharge l’accueil.
- `assets/swend-logo.png`, `assets/swend-mains.png`, `assets/application-creation.jpg` : images originales.

Prévisualisation locale : `python3 -m http.server` à la racine, puis http://localhost:8000.
- Avant le lancement : aucun lien vers l’application (`kevinarner.github.io/le_pacte`) ; lien « Être prévenu du lancement » (e-mail prérempli vers contact@, aucune donnée collectée par le site) dans l’en-tête et en fin de page, et phrases d’annonce (`sw-soon`). L’application reste accessible à son adresse pour les fondateurs et les testeurs.
- Écriture manuscrite : Segoe Print ou Bradley Hand quand l’appareil les a, sinon Caveat (licence OFL, `assets/fonts/`, hébergée sur le site : aucun appel à un service tiers).
- Animations : apparition au défilement, sceau « tamponné », chevalet qui se pose, en-tête fixé en haut (`assets/site.js`). Désactivées avec le réglage « réduire les animations » ; sans JavaScript, tout reste visible.
- Menus des pages (`.sw-menu`) : au survol sur ordinateur ; sur téléphone, toucher l'onglet ouvre la page et déplie le menu. Les entrées mènent aux sections par leur `id` (`data-goto` + `data-section`).
