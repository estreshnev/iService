## Context

The current homepage is a static landing page in `index.html`. Its visible section order is hero, trust/why-choose, office locations, reviews, and footer. The hero already states broad repair coverage, but the page does not yet give visitors a dedicated early overview of the main work categories.

This change adds one intermediate landing-page section immediately after the hero. The project remains a static HTML/CSS/vanilla JS site with no build tool, framework, or new dependency.

The `site-baseline` change is currently active and defines the homepage baseline. This change should be implemented after the baseline is applied, or carefully rebased against it if both remain active.

## Goals / Non-Goals

**Goals:**
- Add a second homepage section that clearly answers "what do you repair or handle?"
- Present five large service-category blocks: Apple repair, Apple unlocking, phones, laptops, and other equipment.
- Preserve the existing visual language: clean premium cards, strong typography, responsive layout, existing colors, and existing animation conventions.
- Keep the section easy to scan on mobile and desktop.

**Non-Goals:**
- Do not add a separate HTML page.
- Do not add a full catalog, pricing table, calculator changes, forms, filters, modals, or back-end behavior.
- Do not change price-list data or price-check logic.
- Do not introduce new icon, animation, CSS, or JavaScript dependencies.
- Do not redesign existing sections beyond the integration needed for spacing and section order.

## Decisions

1. Implement as an in-page section, not a new document.
   - Rationale: The user described a "промежуточную страницу в лендинге" and specified its location as second. In the current static landing page, the natural implementation is a new section after `#hero`.
   - Alternative considered: create `services.html`. Rejected because it would be a new page and would not be second in the landing scroll flow.

2. Use large category blocks rather than detailed service lists.
   - Rationale: The section should orient visitors quickly before deeper trust/location content. Detailed services and prices already belong closer to price-check or future dedicated service specs.
   - Alternative considered: include full repair lists per category. Rejected to keep the change small and avoid duplicating price-list semantics.

3. Reuse the existing design system and static markup.
   - Rationale: The homepage already has CSS variables, responsive breakpoints, card styles, Font Awesome icons, and AOS/GSAP conventions.
   - Alternative considered: add a component library or new JS interaction. Rejected because the project is intentionally static and this change is presentational.

4. Make navigation integration optional but anchored.
   - Rationale: The section should have a stable id for scroll behavior and possible nav linking. If navbar space allows, the implementation can add a concise link such as "Услуги" or "Ремонт" without changing existing destinations.
   - Alternative considered: no anchor/id. Rejected because existing scroll state logic is built around section ids and anchor navigation.

## Risks / Trade-offs

- The new section could make the first screen sequence too long before trust/address content -> Mitigation: keep copy compact and use a responsive grid that avoids excessive vertical sprawl.
- Navigation may become crowded on desktop -> Mitigation: use a short label if adding a nav link, or keep the section reachable through scroll if layout becomes cramped.
- Category wording may overlap with price-check categories -> Mitigation: keep blocks high-level and avoid presenting prices or exhaustive model lists.
- Mobile cards could become visually heavy -> Mitigation: use stable spacing, compact headings, and avoid nested cards or oversized decorative elements.
