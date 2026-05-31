# Site web — La Brassine

Reproduction statique fidèle du site Base44 `la-brassine-liege.base44.app`.
HTML/CSS/JS vanilla. **Aucune dépendance, aucun framework, aucun build, aucun lien vers Base44.**

## Contenu du dossier

- `index.html` — page unique (FR)
- `styles.css` — design complet (brasserie sombre & dorée)
- `script.js` — carrousel hero, animations (reveal, fade), compteurs animés, menu mobile
- `client-data.json` — brief / données d'origine (traçabilité — ne pas publier)
- `assets/photos/` — logo, images hero, bande, avatars (toutes locales)

> **Tier : Essentiel (starter).** One-page FR, contact en adresse texte + liens réseaux sociaux, SEO de base (title/description/OpenGraph/favicon). Pas de carte interactive, pas de réservation en ligne, pas de Schema.org / SEO local, pas de multilingue — ces modules relèvent du tier Signature+.

> **Polices** : Yeseva One (grands titres) + Playfair Display (sous-titres) + Lato (corps), via Google Fonts.

## Prévisualisation locale

Ouvrir `index.html` dans un navigateur (double-clic) ou servir le dossier :

```bash
cd la-brassine
python3 -m http.server 8080
# → http://localhost:8080
```

## Déploiement (3 minutes)

### Première mise en ligne

1. Crée un repo GitHub : `agence-mathis/site-la-brassine`
2. `git init && git add . && git commit -m "init La Brassine"`
3. `git remote add origin git@github.com:agence-mathis/site-la-brassine.git`
4. `git push -u origin main`
5. **GitHub Pages** : Settings → Pages → source `main` / racine → l'URL `…github.io/site-la-brassine/` est en ligne en ~1 min
   **OU Hostinger** : Sites → Add website → Connect from GitHub → sélectionner le repo (auto-deploy à chaque push)

### Modifications futures (maintenance)

```bash
# édite les fichiers
git add . && git commit -m "maj: horaires" && git push
```

## Maintenance courante

- **Horaires** : section `id="contact"` dans `index.html`
- **Menu** : section `id="menu"` dans `index.html`
- **Réseaux sociaux** : liens dans la section `id="contact"` (bloc `social-links`)
- **Photos** : remplacer dans `assets/photos/` (garder les mêmes noms)
- **⚠️ Cache-busting** : après toute modif de `styles.css` ou `script.js`, incrémenter le `?v=N` dans `index.html`. Sinon le navigateur sert l'ancienne version.

## À valider avant livraison client

- **Téléphone** `+32 4 123 45 67` et **email** `contact@labrassine.be` sont des valeurs de démo reprises du site Base44 → remplacer par les vraies coordonnées.
- **Réseaux sociaux** : liens Instagram / Facebook / TikTok actuellement **fictifs** (`labrassine.liege`) → remplacer par les vrais comptes, ou retirer ceux qui n'existent pas.
- **Photos** : actuellement images Unsplash + 1 visuel généré (repris de la démo). Pour un vrai client, remplacer par ses photos réelles.
- **Optimisation images** : `hero-1.png` (1.3 Mo), `band-carte.jpg` (790 Ko) et `hero-3.jpg` (400 Ko) gagneraient à être convertis en WebP avant prod (`cwebp -q 82`).
