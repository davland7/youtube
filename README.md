# My YouTube channel

```bash
pnpm create astro@latest
pnpm add @netlify/functions
pnpm add -D @types/node
pnpm add -D @tailwindcss/forms @tailwindcss/typography
```

Add `netlify.toml`:

```bash
[build]
  command = "pnpm run build"
  publish = "dist"
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
  force = true
```

Change `package.json`:

```bash
scripts": {
  "start": "netlify dev",
}
```

[Icon](https://www.iconpacks.net/free-icon/youtube-logo-7128.html)
Icon by [Iconpacks](https://iconpacks.net/?utm_source=link-attribution&utm_content=7127)

[![Netlify Status](https://api.netlify.com/api/v1/badges/254ab723-ddc0-44f1-a1a9-592606b2c308/deploy-status)](https://app.netlify.com/sites/davland7/deploys)
