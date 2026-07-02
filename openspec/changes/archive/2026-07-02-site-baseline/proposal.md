## Why

The site already has a working static baseline, but its current behavior is not yet captured as OpenSpec requirements. This change creates a source of truth for the existing website so future work can proceed through small, controlled changes without accidentally expanding scope.

## What Changes

- Document the current public homepage, contact/location, price-check, and legal/SEO/analytics behavior as baseline specs.
- Add Codex project guidance in `AGENTS.md` covering the static-site workflow, price-list generation, and verification expectations.
- Add documentation-only tasks for creating the baseline artifacts and verifying the existing build/generation path.
- No UI, content, runtime behavior, dependency, or feature changes are introduced.

## Capabilities

### New Capabilities
- `public-homepage`: Current homepage structure, navigation, hero, trust content, reviews, footer, responsive layout, and animation behavior.
- `repair-price-check`: Current repair price lookup widget, price-list data sources, search behavior, result rendering, and fallback contact behavior.
- `office-contact-channels`: Current office locations, phone/social contact links, Yandex Maps embeds, review links, and floating contact actions.
- `legal-seo-analytics`: Current legal documents, canonical URLs, sitemap/robots files, LocalBusiness structured data, and Yandex.Metrika tracking.

### Modified Capabilities
- None.

## Impact

- Affected documentation: `openspec/changes/site-baseline/**`, future `openspec/specs/**` after this change is applied or archived, and `AGENTS.md`.
- Affected verification commands: OpenSpec validation and the existing Ruby price-list generation path.
- Affected runtime code: none.
- External systems documented as current dependencies: CDN-hosted fonts/icons/animation libraries, Yandex.Metrika, Yandex Maps widgets, VK, Telegram, and telephone links.
