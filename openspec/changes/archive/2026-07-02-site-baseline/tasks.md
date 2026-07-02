## 1. Baseline Documentation

- [x] 1.1 Review `proposal.md` and `design.md` to confirm the change is documentation-only and excludes UI/runtime behavior changes.
- [x] 1.2 Review the four baseline delta specs and confirm each requirement describes behavior that already exists in the repository.
- [x] 1.3 Confirm `AGENTS.md` documents the static-site workflow, price-list source of truth, OpenSpec usage, and verification commands.

## 2. Build and Validation Checks

- [x] 2.1 Run `ruby -c scripts/build-price-list.rb` to verify the existing price-list generator syntax.
- [x] 2.2 Run `ruby scripts/build-price-list.rb` and confirm it completes without errors.
- [x] 2.3 Run `openspec validate --all` to verify the baseline change artifacts.
- [x] 2.4 Confirm no HTML, CSS, JavaScript, image, legal page, sitemap, robots, or price data behavior was intentionally changed by this baseline work.
