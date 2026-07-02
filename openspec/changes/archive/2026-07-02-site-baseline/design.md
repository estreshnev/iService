## Context

The repository contains a static website for iService35.ru. The current runtime surface is plain HTML, CSS, and vanilla JavaScript served as static files, with external CDN dependencies for fonts, icons, animations, Yandex.Metrika, and embedded Yandex Maps. OpenSpec has been initialized, but no baseline specs exist yet.

The existing site includes:
- A public homepage in `index.html`.
- Shared homepage styling in `css/styles.css` and animation styling in `css/animations.css`.
- Runtime behavior in `js/main.js` and `js/animations.js`.
- A repair price list stored in `config/price-list.csv` with generated fallback data in `config/price-list.js`.
- A Ruby generator at `scripts/build-price-list.rb`.
- Legal pages in `policy.html`, `consent.html`, and `offer.html`.
- SEO discovery files in `robots.txt` and `sitemap.xml`.

This change is documentation-only. It records the current site as baseline requirements and adds Codex guidance for future changes.

## Goals / Non-Goals

**Goals:**
- Establish OpenSpec specs for the site's current user-visible capabilities.
- Keep the specs grounded in the current repository state, not the broader aspirational roadmap.
- Document operational constraints in `AGENTS.md` so future Codex work preserves the static-site workflow.
- Include verification tasks for OpenSpec validation and the existing price-list generation path.

**Non-Goals:**
- No changes to homepage UI, copy, layout, animations, links, or behavior.
- No new pages, forms, integrations, tracking, build tools, package managers, frameworks, or dependencies.
- No refactor of legal pages, CSS organization, JavaScript structure, or price-list loading.
- No validation of business/legal content correctness beyond documenting its current presence.

## Decisions

1. Capture baseline specs as new capabilities instead of modifying existing specs.
   - Rationale: `openspec/specs` is currently empty, so the current website needs first-class capability specs.
   - Alternative considered: one broad `site-baseline` capability. Rejected because future small changes would be harder to scope and review.

2. Use four capability boundaries: `public-homepage`, `repair-price-check`, `office-contact-channels`, and `legal-seo-analytics`.
   - Rationale: these match the current user-facing surfaces and likely future change areas.
   - Alternative considered: splitting animations, styling, and responsive behavior into separate capabilities. Rejected because those are cross-cutting implementation/design constraints rather than independent user capabilities.

3. Treat `config/price-list.csv` as the source of truth and `config/price-list.js` as generated fallback data.
   - Rationale: the existing Ruby generator reads the CSV and writes the JS runtime list; documenting this prevents accidental manual edits to generated output.
   - Alternative considered: documenting both files as editable sources. Rejected because it would make price updates drift-prone.

4. Add `AGENTS.md` in the repository root as part of the baseline documentation change.
   - Rationale: the user explicitly wants Codex rules documented, and future changes need a local project guide.
   - Alternative considered: putting the guidance only in OpenSpec design/tasks. Rejected because agent rules should be easy to find before starting any change.

## Risks / Trade-offs

- Baseline specs could overstate current behavior -> Mitigation: phrase requirements around visible current files and avoid roadmap-only features.
- Static-site workflow has limited automated checks -> Mitigation: document concrete manual/static commands and keep verification tasks focused on existing tooling.
- CDN and Yandex integrations require network access for full visual/runtime verification -> Mitigation: document that offline checks are partial.
- Legal document content may need professional review later -> Mitigation: baseline only records that the pages exist and are linked; it does not assert legal sufficiency.
