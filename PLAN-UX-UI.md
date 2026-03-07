# Plan UX / UI — Ouvama France (mafrance.app)

## Direction esthetique

**Nom** : "Editorial Tricolore"
**Inspiration** : Le Monde Data x INSEE x The Economist
**Palette** : Blanc (fond) + Bleu marine (texte/nav) + Rouge (accents/alertes)
**Stack** : Vue 3 + Vuetify 3 + Options API

> Details complets : [docs/design-system.md](docs/design-system.md)

---

## Inventaire des sections actuelles (14 blocs)

| # | Section | Probleme principal |
|---|---|---|
| 1 | Header (barre rouge) | Trop agressif, ecrase la hierarchie |
| 2 | Carte interactive (marqueurs) | Markers denses, illisibles a cette echelle |
| 3 | Selection de niveau (France/dept/commune) | Bien place mais manque de contraste |
| 4 | Heatmap France | Trop petite, legende peu lisible |
| 5 | Donnees electorales | Texte dense, lien bleu non stylee |
| 6 | Score Table (Indices) | Fonds arc-en-ciel, pas d'affordance d'expansion |
| 7 | Articles FdS | Chips de filtre colores = bruit, articles empiles sans hierarchie |
| 8 | Executive leader | Card isolee, peu d'utilite visuelle |
| 9 | First Names Evolution | Chart correct mais legende trop chargee (6 series) |
| 10 | Crime Charts (7 graphiques) | Trop petits, illisibles, empiles sans respiration |
| 11 | Migrant centers (table) | Header rouge plein, tableau dense |
| 12 | Priority Districts QPV (table) | Meme probleme que #11 |
| 13 | Mosquees (table) | Meme probleme que #11 |
| 14 | Subventions associations | Petit tableau isole en bas |

**Constat** : 14 sections empilees verticalement sans groupement logique. La page fait ~4000px de haut. L'utilisateur doit scroller indefiniment sans savoir ou aller.

---

## Architecture proposee

### Principe : Navigation par onglets + sections regroupees

Au lieu d'une seule page monolithique, regrouper en **4 onglets principaux** :

```
[Vue d'ensemble]  [Donnees detaillees]  [Tendances]  [Articles & Actus]
```

### Onglet 1 : Vue d'ensemble (page d'accueil)

Ce que l'utilisateur voit en premier. Reponse a la question : "Quel est l'etat general ?"

```
+------------------------------------------------------------------+
|  [Logo rouge] Ouvama France    [Vue d'ensemble] [Donnees] [...]  |
+------------------------------------------------------------------+
|                                                                  |
|  [Selecteur de niveau]  France > Departement > Commune           |
|  ┌──────────────────────────────────────────────────────────┐    |
|  │   CARTE FRANCE (60% largeur)  │  SCORE TABLE            │    |
|  │   Choropleth heatmap          │  6 categories            │    |
|  │   Cliquable par departement   │  avec expansion          │    |
|  └───────────────────────────────┘                          │    |
|                                                              │    |
|  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │    |
|  │Score 113│  │Insec 118│  │Immig 142│  │Islam 124│        │    |
|  └─────────┘  └─────────┘  └─────────┘  └─────────┘        │    |
|                                                                  |
|  [Executive leader card]   [Donnees electorales resume]          |
+------------------------------------------------------------------+
```

**Changements** : Carte + ScoreTable cote a cote, 4 score cards de synthese avec tendances, le reste accessible via les autres onglets.

### Onglet 2 : Donnees detaillees

Les tableaux de donnees brutes. Reponse a : "Quelles sont les donnees source ?"

- Sous-onglets internes : Centres d'accueil | QPV | Mosquees | Subventions | Prenoms | Elections
- Chaque tableau avec pagination, recherche, export CSV
- Headers de tableau en bleu marine (pas rouge plein)

### Onglet 3 : Tendances

Les graphiques et evolutions temporelles. Reponse a : "Comment ca evolue ?"

- Chart prenoms pleine largeur + toggle simplifie/detaille
- Crime charts en grille 3 colonnes, hauteur minimum 250px
- Area charts avec series toggleables

### Onglet 4 : Articles & Actus

Reponse a : "Quoi de neuf ?"

- Filtres en toggle buttons (Tous, Insecurite, Immigration, Islamisation, Defrancisation, Wokisme)
- Articles en cards individuelles (date + lieu + titre + extrait + tags + lien)
- Chargement progressif ("Charger plus d'articles")

### Menu TOOLS (dropdown dans le header)

8 pages outils accessibles via un bouton "TOOLS" dans le header :

| # | Page | Description |
|---|---|---|
| 1 | Landmarks | Carte interactive des lieux (centres, QPV, mosquees) |
| 2 | Rankings | Classement des departements par metrique |
| 3 | Correlations | Nuages de points / matrices de correlation entre indices |
| 4 | Demography | Pyramides des ages, donnees demographiques |
| 5 | Politics | Cartes electorales, repartition par parti |
| 6 | Versus | Comparaison cote a cote de 2 territoires |
| 7 | Articles | Feed d'articles (meme contenu que l'onglet 4) |
| 8 | Methodology | Documentation du scoring et des sources |

> Specs detaillees de chaque page TOOLS : [docs/composants.md](docs/composants.md)

---

## Priorites d'implementation

### Phase 1 — Quick wins (impact immediat)

| # | Action | Fichier | Effort |
|---|---|---|---|
| 1 | Refonte couleurs vuetify.js | `vuetify.js` | 15 min |
| 2 | ScoreTable : barres d'accent + chevrons + transition | `ScoreTable.vue` | 2h |
| 3 | Header : blanc + logo rouge + nav bleu marine | `AppBar.vue` ou equivalent | 1h |
| 4 | Tableaux : header bleu marine au lieu de rouge | Tous les tableaux | 30 min |

### Phase 2 — Restructuration layout

| # | Action | Effort |
|---|---|---|
| 5 | Creer systeme d'onglets (4 tabs principaux) | 3h |
| 6 | Carte + ScoreTable cote a cote | 1h |
| 7 | Score cards de synthese (4 KPIs) | 1h |
| 8 | Deplacer tableaux dans onglet "Donnees" avec pagination | 2h |

### Phase 3 — Polish graphiques

| # | Action | Effort |
|---|---|---|
| 9 | Crime charts en grille 3 cols + taille augmentee | 1h |
| 10 | First Names chart pleine largeur + toggle simplifie | 1h |
| 11 | Articles en cards individuelles | 1h |
| 12 | Polices Google Fonts (Source Serif 4 + DM Sans) | 30 min |

### Phase 4 — Dark mode (optionnel)

| # | Action | Effort |
|---|---|---|
| 13 | Tokens dark mode dans vuetify.js | 30 min |
| 14 | Ajuster ScoreTable pour dark | 1h |
| 15 | Ajuster charts pour dark | 1h |

---

## Metriques de succes

- **Scroll distance** : reduire de ~4000px a ~1200px (vue d'ensemble)
- **Time to insight** : score global visible sans scroll (above the fold)
- **Lisibilite charts** : hauteur minimum 250px, toutes les series lisibles
- **Score Lighthouse Accessibility** : > 90
- **DFII cible** : 13/15

---

## Documentation associee

| Document | Contenu |
|---|---|
| [docs/design-system.md](docs/design-system.md) | Tokens Vuetify, couleurs, typographie, espacement, ombres |
| [docs/composants.md](docs/composants.md) | Refonte composant par composant (avant/apres + specs Vuetify) |
| [docs/mockups.md](docs/mockups.md) | Fichiers de reference, tables mockups v5, idees futures |
| [docs/prompt-engineering.md](docs/prompt-engineering.md) | Architecture de prompts Gemini Imagen v5, principes, anti-patterns |
