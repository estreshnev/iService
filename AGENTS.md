# Codex Project Guide

## Project Shape

This repository is a static website for iService35.ru. The current runtime stack is plain HTML, CSS, and vanilla JavaScript served as static files.

- Main page: `index.html`
- Legal pages: `policy.html`, `consent.html`, `offer.html`
- Styles: `css/styles.css`, `css/animations.css`
- Runtime scripts: `js/main.js`, `js/animations.js`
- Price-list source: `config/price-list.csv`
- Generated price-list fallback: `config/price-list.js`
- Price-list generator: `scripts/build-price-list.rb`
- OpenSpec artifacts: `openspec/`

## Working Rules

- Do not add a frontend framework, package manager, bundler, build system, or new runtime dependency without an OpenSpec change that explicitly calls for it.
- Do not change UI, copy, layout, links, analytics, or behavior while working on documentation-only baseline changes.
- Treat `config/price-list.csv` as the editable source of truth for repair prices.
- Do not edit `config/price-list.js` by hand. Regenerate it with `ruby scripts/build-price-list.rb` after changing the CSV.
- Use a local HTTP server for browser verification of price-check behavior. Opening `index.html` through `file://` skips CSV fetching and only exercises fallback behavior.
- Keep legal pages as standalone HTML documents with inline styles unless a dedicated OpenSpec change says to refactor them.
- Keep `sitemap.xml` and `robots.txt` in sync with public pages when pages are added, removed, or renamed.
- `CONTEXT.md` and `ROADMAP.md` include aspirational ideas. Specs and implementation work must be grounded in the current repository unless a change explicitly expands scope.

## Common Commands

Start a static local server:

```bash
python3 -m http.server 8000
```

Regenerate the price-list fallback:

```bash
ruby scripts/build-price-list.rb
```

Check Ruby syntax:

```bash
ruby -c scripts/build-price-list.rb
```

Inspect OpenSpec changes:

```bash
openspec list --json
```

Validate OpenSpec artifacts:

```bash
openspec validate --all
```

## Verification Notes

- Full visual verification requires network access for CDN assets, Yandex.Metrika, Yandex Maps widgets, VK, and Telegram links.
- Static verification should at minimum confirm that `index.html` loads over HTTP, legal pages open, anchor navigation works, and the price-check widget can load data.
- For price-list work, verify both the CSV-backed path over HTTP and the generated JS fallback path when relevant.
