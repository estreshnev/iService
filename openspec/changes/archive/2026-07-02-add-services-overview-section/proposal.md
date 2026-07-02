## Why

The homepage currently jumps from the hero offer directly into trust and location content. Visitors need an early, scannable section that explains the main repair/service categories before they continue through the rest of the landing page.

## What Changes

- Add a new second section to the landing page immediately after the hero section.
- Present five large service-category blocks:
  - Apple repair
  - Apple unlocking
  - Phones
  - Laptops
  - Other equipment
- Keep the section consistent with the current static HTML/CSS/vanilla JS site and existing premium visual style.
- Do not add new pages, forms, back-end behavior, price-list logic, or external dependencies.
- Do not remove or materially change the existing hero, price-check, trust, addresses, reviews, footer, or legal pages.

## Capabilities

### New Capabilities
- `service-categories-section`: A second landing-page section that introduces the main categories of work through large, readable blocks.

### Modified Capabilities
- None.

## Impact

- Affected files during implementation: `index.html`, `css/styles.css`, and possibly `css/animations.css` if the section needs existing animation patterns.
- Affected navigation/scroll behavior: the new section will become part of the homepage scroll flow and may be linked from the navbar if implemented as an anchor section.
- Affected OpenSpec context: this change should be applied after or alongside the `site-baseline` change so the homepage baseline remains the source of truth.
- New dependencies: none.
