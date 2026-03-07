# Architecture de prompts v5 (Gemini Imagen, 2K)

## Principes de prompt engineering (apres 5 iterations v1-v5)

1. **3 couches** : SCENE (quality + mood, 2 lignes) → COMPOSITION (layout parent-child) → FINAL RULES (contraintes en fin)
2. **Jamais de CSS** : pas de font-family, pas de px, pas de hex bruts comme specs. Langage visuel uniquement ("bold serif navy", "small grey uppercase")
3. **Hex codes OK** uniquement pour les couleurs que le modele doit reproduire, formules comme "warm beige (#F5F3EF)"
4. **Header** : "Copy EXACTLY from Image 2" en une ligne, ne pas re-decrire
5. **Donnees tables** : 3-4 rows exemples max + "...continuing with similar data"
6. **Fond beige** : mentionner 3 fois minimum (debut, milieu, FINAL RULES)
7. **FINAL RULES en fin** : Gemini priorise le milieu-fin du prompt
8. **Dual input** : Image 1 = screenshot live (donnees), Image 2 = design target (style)
9. **Quality modifiers** : "Professional, high-fidelity, pixel-perfect" en premiere ligne
10. **Nesting** : "WITHIN the card:" au lieu de descriptions plates

## Anti-patterns a eviter

- Font names dans le prompt → rendus comme texte visible ("DM Sans 600 16px")
- Dimensions en px (hauteurs, paddings) → ignores ou rendus comme annotations
- Plus de 4-5 rows de tableau → le modele boucle ou deforme le texte
- Description du header > 30 mots → resultat instable d'un screen a l'autre
- Rules au debut du prompt → oubliees en fin de generation
- Phrases ambigues comme "Small label below" → rendu comme tooltip flottant

## Batch de reference

Le batch v5 est dans `mockups/v5/batch-v5.json` (12 jobs, dual input, 2K resolution).

Les anciens prompts detailles (v1-v4) ont ete retires. Consulter les fichiers batch JSON dans chaque dossier `mockups/vN/` pour l'historique complet.
