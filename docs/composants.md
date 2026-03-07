# Refonte composant par composant

Chaque section decrit l'etat **avant** (app actuelle) et **apres** (design cible v5).

Voir [design-system.md](./design-system.md) pour les tokens couleurs/typo/espacement.

---

## 1. HEADER

**Avant** : Barre rouge pleine #ee2000, texte blanc, icones sociales

**Apres** :
- Fond blanc (#FFFFFF)
- Logo : icone rouge (#B71C1C) + "Ouvama France" en bleu marine (#1B3A5C)
- Nav centre : 4 onglets texte bleu marine, onglet actif soulige rouge 3px
- Nav droite : bouton "TOOLS" (dropdown au clic, 8 pages outils) + icones langue/partage bleu marine discret
- Bordure basse : 1px solid #E0DCD4
- Pages TOOLS : aucun onglet n'est soulige (zone independante des 4 tabs)

**Vuetify** : `v-app-bar` + `v-tabs` + `v-menu` (dropdown TOOLS) + `elevation="0"` + `border-bottom`

---

## 2. CARTE INTERACTIVE

**Avant** : Marqueurs multicolores denses, legende petite

**Apres** :
- Choropleth par defaut (coloration par departement) au lieu des marqueurs
- Marqueurs uniquement au zoom > 8
- Legende integree a la carte (pas en overlay flottant)
- Click departement → navigation vers la fiche departement
- Taille : 55% de la largeur sur desktop

---

## 3. SELECTEUR DE NIVEAU

**Avant** : Bouton rouge "FRANCE" + dropdown + search

**Apres** :
- Breadcrumb interactif : France > [Departement] > [Commune]
- Chaque niveau est un v-autocomplete
- Le bouton "France" devient le premier element du breadcrumb
- Fond : surface subtle (#F5F3EF), bordure arrondie

---

## 4. SCORE TABLE (composant principal)

**Avant** :
- Fonds de categorie pleine couleur (rouge, orange, jaune, vert, bleu, violet)
- Pas de chevron d'expansion
- Sub-rows en `display: none` sans animation
- Header rouge plein

**Apres** :

### Header
- Fond blanc, texte bleu marine (#1B3A5C), uppercase 11px
- Ligne rouge fine 2px sous le header

### Lignes principales
- Fond blanc
- Barre d'accent 4px a gauche (couleur de la categorie, desaturee)
- Icone MDI dans un badge pastel 32x32
- Nom en font-weight 600, couleur texte primaire
- Score dans v-chip variant="tonal" (fond pastel + texte colore)
- Chevron mdi-chevron-down a droite, rotation animee 0.3s

### Sous-lignes
- Fond surface (#FAFAFA)
- Padding-left 48px (indentation)
- Transition max-height 0.4s (au lieu de display:none)
- Icone MDI discrete + nom metrique + valeurs alignees

---

## 5. ARTICLES FdS

**Avant** : Chips de filtre arc-en-ciel, articles en liste texte brut

**Apres** :
- Filtres : v-btn-toggle avec variant="outlined", couleur bleu marine
- Articles : v-card individuelles avec :
  - Date + lieu en caption gris
  - Titre en font-weight 600
  - Extrait 2 lignes max (line-clamp)
  - Tags en v-chip variant="outlined" size="small"
  - "Lire la suite" en lien rouge

---

## 6. EXECUTIVE LEADER

**Avant** : Card isolee avec texte simple

**Apres** :
- Integre dans la vue d'ensemble, sous la carte
- Format compact : avatar + nom + titre + parti en une ligne
- v-card variant="outlined" avec icone mdi-account-tie

---

## 7. FIRST NAMES CHART

**Avant** : 6 series superposees, legende en bandeau

**Apres** :
- Chart pleine largeur dans sa propre section
- Labels directement sur les courbes (pas en legende seulement)
- Series toggleables par clic
- Toggle [Vue simplifiee] (2-3 series) / [Vue detaillee] (toutes)
- Hauteur minimum 350px

---

## 8. CRIME CHARTS (7 graphiques)

**Avant** : 7 petits graphiques empiles en 2 colonnes, illisibles

**Apres** :
- Grille 3 colonnes sur desktop, 2 sur tablette, 1 sur mobile
- Hauteur minimum 250px par chart
- Area charts (au lieu de line) pour plus de lisibilite
- Palette coherente par type de crime
- Titre + valeur actuelle en gros dans le coin

---

## 9. TABLEAUX DE DONNEES (Centres, QPV, Mosquees)

**Avant** : Header rouge plein, tout affiche d'un coup, pas de pagination

**Apres** :
- Chacun dans un sous-onglet de "Donnees detaillees"
- Header : fond bleu marine (#1B3A5C), texte blanc
- v-data-table avec :
  - Pagination (20 items/page)
  - Tri par colonne
  - Barre de recherche
  - Bouton export CSV
  - Striping zebra subtle (#FAFAFA / #FFFFFF)

---

## 10. SUBVENTIONS

**Avant** : Petit tableau isole en bas de page

**Apres** :
- Integre dans l'onglet "Donnees detaillees" en sous-onglet
- Ou : resume en card de synthese dans la vue d'ensemble (ex: "300/hab/an de subventions")

---

## 11. POPULATION LEVEL SELECTION / HEATMAP

**Avant** :
- Mini carte de France heatmap choropleth a droite de la page
- Selecteur de fourchettes avec bouton rouge
- Carte tres petite, peu lisible, legende absente

**Apres** :
- Fusionner avec la carte interactive principale (section 2) — la mini heatmap devient la carte principale en mode choropleth
- Si conserve en composant separe :
  - Card blanche, 1px border, 12px radius
  - Titre : "Selection par population"
  - Carte France : choropleth gradient pale jaune (#FFF8E1) → rouge profond (#B71C1C)
  - Taille minimum : 280px de large
  - Departements cliquables avec hover effect
  - Legende gradient integree en bas
  - v-range-slider pour le filtrage
  - Bouton "Appliquer le filtre" outlined navy
  - Caption : "42 departements dans cette fourchette"

**Vuetify** : `v-card` + `v-range-slider` + carte SVG/Leaflet + `v-btn`

---

## 12. DONNEES ELECTORALES

**Avant** :
- Bloc texte dense avec donnees electorales brutes
- Lien bleu non style
- Pas de visualisation

**Apres** :

### Version resume (Vue d'ensemble)
- Card blanche avec :
  - Titre "Elections"
  - Sous-titre "Derniere election presidentielle — 2022"
  - Chiffre principal "65%" (participation) en grand bold navy
  - Barre horizontale empilee (segments colores par parti)
  - Hauteur barre : 12px, border-radius 6px
  - Legende compacte : pastilles couleur + nom parti + %
  - Lien "Voir les details" en rouge

### Version detaillee (onglet Donnees detaillees)
- Tableau : Parti | Candidat | Voix | % | Sieges
- Header navy, texte blanc (meme style que les autres data tables)
- Graphique donut ou barre horizontale en complement
- Filtres : type d'election (Presidentielle / Legislative / Municipale)

**Vuetify** : `v-card` + barre CSS custom (flexbox segments colores) + `v-data-table`

---

## Menu TOOLS — Style du dropdown

- Fond blanc, border 1px #E0DCD4, border-radius 12px, box-shadow 0 4px 12px rgba(0,0,0,0.08)
- Chaque item : 48px height, icone 20px navy a gauche, texte navy
- Hover : fond #F5F3EF (warm surface)
- Bouton "TOOLS" dans le header : semi-bold navy, avec chevron-down
