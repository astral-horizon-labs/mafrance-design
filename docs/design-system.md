# Design System — Ouvama France

**Nom** : "Editorial Tricolore"
**Inspiration** : Le Monde Data x INSEE x The Economist

---

## Couleurs (vuetify.js)

```js
light: {
  colors: {
    primary: "#B71C1C",          // Rouge profond (accents, alertes)
    secondary: "#1B3A5C",        // Bleu marine (texte, headers, nav)
    accent: "#E65100",           // Orange (warnings)
    error: "#C62828",
    info: "#1565C0",
    success: "#2E7D32",
    warning: "#E65100",
    surface: "#FAFAF8",          // Fond chaud
    background: "#FFFFFF",
    "on-surface": "#1A1A1A",
    "on-background": "#1A1A1A",
    outline: "#E0DCD4",          // Bordures douces
  }
}
```

### Fond de page

Le fond de page principal est **warm beige (#F5F3EF)**, pas blanc. Les cards sont blanches sur ce fond beige.

### Couleurs categories (ScoreTable)

| Categorie | Couleur accent | Fond pastel |
|---|---|---|
| Total | #B71C1C (rouge sombre) | #FFF5F5 |
| Insecurite | #BF650A (orange brule) | #FFF8F0 |
| Immigration | #8D6E0A (ambre) | #FFFDF0 |
| Islamisation | #2E7D32 (vert foret) | #F0FAF1 |
| Defrancisation | #1565C0 (bleu royal) | #F0F6FF |
| Wokisme | #6A1B9A (violet profond) | #F9F0FF |

### Couleurs score chips

| Plage | Fond | Texte |
|---|---|---|
| < 80 | #E8F5E9 | #2E7D32 |
| 80-95 | #F1F8E9 | #558B2F |
| 95-105 | #ECEFF1 | #78909C |
| 105-125 | #FFF3E0 | #E65100 |
| 125-150 | #FBE9E7 | #EF6C00 |
| > 150 | #FFEBEE | #C62828 |

### Couleurs partis politiques

| Parti | Couleur |
|---|---|
| Renaissance | #FFCA28 (ambre) |
| RN | #1B3A5C (navy) |
| LFI | #EF5350 (rouge) |
| LR | #1565C0 (bleu) |
| EELV | #43A047 (vert) |
| Autres | #BDBDBD (gris) |

### Couleurs marqueurs carte (Landmarks)

| Type | Couleur |
|---|---|
| Centres d'accueil migrants | #B71C1C (rouge) |
| Centres d'accompagnement | #E65100 (orange) |
| Hebergements generaux | #2E7D32 (vert) |
| QPV | #1565C0 (bleu) |
| Mosquees | #6A1B9A (violet) |

---

## Typographie

| Usage | Font | Poids |
|---|---|---|
| Titres de page | Source Serif 4, serif | 700 (bold) |
| Titres de section | DM Sans, sans-serif | 600 (semi-bold) |
| Donnees tabulaires | DM Sans | tabular-nums |
| Labels uppercase | DM Sans | 11px, letter-spacing 0.8px, uppercase |

---

## Espacement

| Token | Valeur |
|---|---|
| Section gap | 32px (var(--sp-8)) |
| Card padding | 24px (var(--sp-6)) |
| Row height | 48px minimum |
| Sub-row indent | 48px |

---

## Ombres & Bordures

| Element | Style |
|---|---|
| Cards | border: 1px solid #E0DCD4; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.04) |
| Tableaux | border-radius: 8px; overflow: hidden |
| Chips | border-radius: 100px (pill) |

---

## Design system resume (reference rapide)

```
Header : blanc, shield rouge + "Ouvama France" navy, 4 tabs navy, active = red 3px underline
Breadcrumb : barre beige chaude (#F5F3EF)
Cards : blanc, border 1px #E0DCD4, border-radius 12px, subtle shadow
Chips score : pill (border-radius 100px), vert/orange/rouge selon valeur
Typo : DM Sans sans-serif, navy (#1B3A5C), semi-bold headings
Accent : rouge (#B71C1C) pour logo, underlines, liens
KPI cards : blanc, grands chiffres bold, indicateur tendance vert/rouge
Table headers : navy blue (#1B3A5C) fond, texte blanc
ScoreTable : barres accent 4px a gauche, badges pastels ronds, chevrons expansion
```
