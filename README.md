# My YouTube channel

```bash
pnpm add @netlify/functions
pnpm add -D @types/node
pnpm create astro@latest
```

Add port to `astro.config.mjs`:

```bash
export default defineConfig({
  server: { port: 3333 }
});
```

Add `netlify.toml`:

```bash
[build]
  command = "pnpm run build"
  publish = "dist"
```

Change `package.json`:

```bash
scripts": {
  "api": "netlify functions:serve -p 4444",
  "dev": "PUBLIC_API_URL=http://localhost:4444 astro dev"
}
```

```bash	
`${PUBLIC_API_URL ?? ''}/.netlify/functions/currencies`
```
