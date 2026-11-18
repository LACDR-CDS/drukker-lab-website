# Drukker Research Group — React / Vite

A static React website preserving the original lab content, images, research pages and news, with a responsive design matching the Project Open Genesis navy/blue palette.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

Push to GitHub, then set **Settings → Pages → Source: GitHub Actions**. The included `.github/workflows/deploy.yml` builds and publishes automatically.

For the custom domain, set **Settings → Pages → Custom domain** to `drukkerlab.nl`, and configure STRATO A records for GitHub Pages and a `www` CNAME pointing to your GitHub username's `github.io` domain. Avoid changing DNS until ready to switch the live site.

Content is in `src/pages.json`, layout in `src/main.jsx`, and styles in `src/styles.css`. All images are in `public/images/`.
