# SHRM Homepage Migration Plan

## Overview

Migrate the SHRM homepage (`https://www.shrm.org/home`) to AEM Edge Delivery Services. This is a **Document Authoring (DA)** project starting from a clean AEM boilerplate with standard blocks (cards, columns, footer, fragment, header, hero).

**Source URL:** https://www.shrm.org/home
**Project type:** DA (Document Authoring)
**Block Library:** `https://main--sta-boilerplate--aemdemos.aem.page/tools/sidekick/library.json`

## Approach

The migration will use the `excat-site-migration` skill to orchestrate the full pipeline:

1. **Site Analysis** — Classify the URL and create a page template skeleton
2. **Page Analysis** — Analyze the SHRM homepage structure, identify sections, blocks, and content patterns
3. **Block Mapping** — Map SHRM page elements to EDS block variants (reusing standard blocks where possible, creating custom variants where needed)
4. **Design Extraction** — Extract colors, fonts, and spacing from the original site and map to CSS custom properties
5. **Import Infrastructure** — Generate block parsers and page transformers for the content import
6. **Content Import** — Run the import to produce the HTML content file
7. **Preview & Validation** — Verify the migrated page renders correctly in the local preview

## Current Project State

| Area | Status |
|------|--------|
| Blocks | 6 standard boilerplate blocks (cards, columns, footer, fragment, header, hero) |
| Content | Empty — no pages imported yet |
| Styles | Boilerplate defaults only |
| Page Templates | None defined |
| Metadata | None defined |

## Checklist

- [ ] Configure project settings (update `project.json` with library URL)
- [ ] Run site analysis on `https://www.shrm.org/home`
- [ ] Analyze page structure (sections, content sequences, block candidates)
- [ ] Map page elements to EDS blocks (identify standard vs. custom variants)
- [ ] Extract design tokens (colors, typography, spacing) from SHRM
- [ ] Generate import infrastructure (parsers, transformers)
- [ ] Execute content import to produce HTML
- [ ] Preview migrated page and validate rendering
- [ ] Iterate on styling and block fixes as needed

## Risks & Considerations

- **Dynamic content**: SHRM homepage likely has JavaScript-rendered sections (carousels, feeds, personalized content) that may not be captured by static scraping — manual adjustments may be needed
- **Complexity**: Large homepages with many sections may require multiple custom block variants
- **Images**: Images will reference source URLs during migration; no local downloads

## Next Step

Switch to **Execute mode** to begin the migration using the `excat-site-migration` workflow.
