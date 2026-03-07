# Mockups & References visuelles

## Mockups finaux — Onglets principaux (v5, 2K)

| Fichier | Page | Contenu |
|---|---|---|
| `mockups/v5/tab1-vue-ensemble_bi1g.jpg` | **Onglet 1 — Vue d'ensemble** | Carte France choropleth + ScoreTable 6 categories (barres accent, badges, pills, chevrons) + 4 KPI cards + Macron card + elections 65% bar |
| `mockups/v5/tab1-scoretable-zoom_7lq6.jpg` | **Zoom composant ScoreTable** | Colonnes FRANCE METRO / FRANCE ENTIERE, Score Total expande avec 7 sous-metriques chiffrees (Homicides 6.7/7.8, Violences 10.5/10.7, etc.), barres colorees, badges pastels, chevrons |
| `mockups/v5/tab2-donnees-detaillees_rxxs.jpg` | **Onglet 2 — Donnees** | 6 toggles (Centres, QPV, Mosquees, Subventions, Prenoms, Elections) + data table navy header (CADA, HUDA, PRAHDA, CPH) + pagination 2087 + Export CSV + 3 stats cards |
| `mockups/v5/tab3-tendances_wyhr.jpg` | **Onglet 3 — Tendances** | Chart prenoms (Mohammed, Marie, Lucas, Fatima, Jean) + toggle Simplifie/Detaille + grille 3x2 area charts criminalite (Homicides +8%, Violences -7%, etc.) + insight bar warning |
| `mockups/v5/tab4-articles-actus_9yqe.jpg` | **Onglet 4 — Articles** | 6 filtres + 5 article cards vrais extraits francais, chips categories, 'Lire la suite', 'Charger plus d articles', fond beige uniforme |

## Mockups finaux — Pages TOOLS (v5, 2K)

| Fichier | Page | Contenu |
|---|---|---|
| `mockups/v5/tool-landmarks-carte_wqva.jpg` | **TOOLS — Landmarks** | Recherche + GPS + 5 filtres chips + carte France marqueurs multi-couleurs + clusters (24, 18, 31) + popup ADOMA Nice + sidebar 8 lieux varies |
| `mockups/v5/tool-rankings-classement_5rwq.jpg` | **TOOLS — Rankings** | Dropdowns Scope/Metric + barre navy arrondie + Top 10 (1-3 rouge) + Bottom 10 (92-101) + Mentions Legales, fond beige propre |
| `mockups/v5/tool-correlations_scr1.jpg` | **TOOLS — Correlations** | 3 dropdowns + Analyser + scatter plot ~96 bleus + 3 outliers rouges + trend line + badge r2=0.72 + insight card orange |
| `mockups/v5/tool-demographie_81u5.jpg` | **TOOLS — Demography** | Selecteur FRANCE/dept + pyramide ages avec millions (navy/rouge) + 4 KPIs (67M, 41.2 ans, 119 hab/km2, +0.28%) + area chart 2000-2025 |
| `mockups/v5/tool-politique_fncz.jpg` | **TOOLS — Politics** | Dropdowns election/tour + carte Macron(amber)/Le Pen(navy) + 73.7% participation + stacked bar + tableau voix + evolution 5 partis (Renaissance, RN, LFI, LR, EELV) |
| `mockups/v5/tool-versus-comparaison_06pi.jpg` | **TOOLS — Versus** | Paris vs Marseille + bar chart 6 categories + mini cartes France + scores detailles Paris (113, 118, 142, 124, 89, 95) vs Marseille (145, 150, 160, 138, 92, 101) |
| `mockups/v5/tool-methodology_vq87.jpg` | **TOOLS — Methodology** | Grille 3x2 : Sources (INSEE, MI, OFPRA, Education), Calcul indices base 100, Echelle/seuils (vert/orange/rouge), Categories mesurees (6 badges), Mise a jour jan 2026, Limites |

---

## Explorations v6 — Directions de design (2K)

4 directions testees sur la page Tab 1 Vue d'ensemble pour comparer les aesthetiques :

| Fichier | Direction | Points forts | Limites |
|---|---|---|---|
| `mockups/v6/direction-A-dark-premium_vgop.jpg` | **A — Dark Mode Premium** | Dense, beaucoup d'infos visibles (articles, prenoms, centres, subventions en plus des indices). Fond slate fonce (#1E293B). | Texte petit difficile a lire sur les mini-cards. Layout tres charge. |
| `mockups/v6/direction-B-glassmorphism_ffvk.jpg` | **B — Glassmorphism** | Elegant, fond gradient lavande-rose. Cards frosted glass. Barres de progression horizontales pour indices. KPI cards bien aerees. | Aesthetic peut-etre trop "design" pour un outil data serieux. |
| `mockups/v6/direction-C-sidebar-nav_2m13.jpg` | **C — Sidebar Navigation** | Sidebar expose 4 onglets + 7 outils en un coup d'oeil (plus de dropdown TOOLS cache). Structure type Linear/Notion. | Contenu principal compresse par la sidebar. |
| `mockups/v6/direction-D-evolved-v5_1tpd.jpg` | **D — Evolved V5** | Le plus abouti : header propre sans duplication, indices en grille 2x3 avec icones, KPI avec sparklines, legende Faible/Moyen/Eleve/Critique. Fond beige uniforme. | Evolution incrementale, pas de rupture visuelle. |

Batch de reference : `mockups/v6/batch-v6-directions.json`

---

## Images de reference pour generation

| Image | Role |
|---|---|
| `screenshots/screenshot.png` | Screenshot complet de l'app live (donnees reelles) — **Image 1** dans les prompts |
| `mockups/v1/tab1-vue-ensemble_wxck.jpg` | Source du design system v1-v5 (aesthetic beige/navy/serif) — **Image 2** dans les prompts |

- Dual input : screenshot pour les donnees reelles + v1 pour le style
- Resolution v5/v6 : **2K** (2688x1536) pour meilleure lisibilite du texte
- Les versions precedentes sont archivees dans `mockups/v1/` a `mockups/v5/`

---

## Mockups conserves pour idees futures

| Fichier | Idee a retenir |
|---|---|
| `mockups/idee-scoretable-dual-column.webp` | **Colonnes "France metro / France entiere"** dans la ScoreTable — comparaison duale utile quand un departement ou une commune est selectionne |
| `mockups/idee-fiche-departement.webp` | **Fiche departement drill-down** : page "Paris (75)" avec carte zoom, badges Above/Below National Average, 4 mini area charts. Concept pour une V2 |
| `mockups/idee-comparaison-villes.webp` | **Comparaison de villes** : Paris vs Marseille, bar chart cote a cote, score cards detailles, mini cartes. Concept pour une V2 |
| `mockups/idee-badges-status-kpi.webp` | **Badges status** : "Conforme" (vert), "Attention" (orange), "Alerte" (rouge) a cote des gros chiffres KPI. Pattern utilisable dans les KPI cards de la vue d'ensemble |

---

## Idees a integrer (issues des mockups conserves)

1. **Double colonne ScoreTable** : quand l'utilisateur selectionne un departement, afficher 2 colonnes "Local / National" dans la ScoreTable pour comparaison directe. A prevoir dans la Phase 2.
2. **Page fiche departement** : page dediee au drill-down par departement avec carte zoomee + badges ecart vs moyenne nationale + mini charts par categorie. A prevoir en V2.
3. **Mode comparaison** : selecteurs de 2 villes/departements + visualisation comparative (bar charts horizontaux + score cards). A prevoir en V2.
4. **Badges status KPI** : ajouter un badge "Conforme"/"Attention"/"Alerte" sous chaque KPI card de la vue d'ensemble, base sur des seuils. Integreable en Phase 2.
