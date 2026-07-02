## 1. Preparation

- [x] 1.1 Confirm the `site-baseline` change is applied or account for its active baseline specs before implementation.
- [x] 1.2 Inspect `index.html` around the hero and why-choose sections to confirm the insertion point for the second landing-page section.
- [x] 1.3 Choose the final section id and optional navbar label, keeping the nav compact on desktop and mobile.

## 2. Homepage Markup

- [x] 2.1 Add a new static service categories section immediately after the hero section and before the existing why-choose section.
- [x] 2.2 Add five large category blocks for Apple repair, Apple unlocking, phones, laptops, and other equipment.
- [x] 2.3 Add concise headings and supporting text for each category without adding prices, forms, filters, or detailed catalog data.
- [x] 2.4 Add or update the in-page navigation link only if it fits the existing navbar without crowding.

## 3. Styling and Responsiveness

- [x] 3.1 Add CSS using existing variables, spacing patterns, card styling, and responsive breakpoints.
- [x] 3.2 Ensure the section is readable and non-overlapping on mobile, tablet, and desktop widths.
- [x] 3.3 Reuse existing animation conventions if animation is added, without introducing new runtime dependencies.

## 4. Verification

- [x] 4.1 Run `openspec validate --all`.
- [x] 4.2 Run the site through a local static server and verify the new section appears second in the landing-page scroll flow.
- [x] 4.3 Verify existing hero, price-check, why-choose, addresses, reviews, footer, and legal links still work.
- [x] 4.4 Confirm no new framework, package manager, external library, price-list change, or back-end behavior was introduced.
