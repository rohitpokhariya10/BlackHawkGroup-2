# Blackhawk Realty Group

Complete homepage pitch prototype built with **Next.js 16.4.6 App Router, React 19.3.1, strict TypeScript, Tailwind CSS 4, GSAP, ScrollTrigger and @gsap/react**.

The live Watch Realty Co. homepage is the visual reference. The supplied 15-page Blackhawk PDF is the content authority. Only the `/` homepage is implemented. No backend, CRM, database, IDX, analytics, or external form delivery is connected. Nothing has been publicly deployed.

## Run locally

Node.js 20.9 or newer is required. Development was verified with Node.js 26.3.0 and npm.

```bash
npm ci
npm run dev -- --port 3001
```

Open **http://127.0.0.1:3001**.

For a production-mode local preview:

```bash
npm run build
npm run start -- --port 3002
```

Open **http://127.0.0.1:3002**. The server binds to loopback, not the local network. Stop it with `Ctrl+C`.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
npx playwright test
```

Playwright uses installed Google Chrome. Install Chrome from its official source if necessary. Tests default to the dev URL on port 3001; to test the running production build:

```bash
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3002 npx playwright test
LIGHTHOUSE_URL=http://127.0.0.1:3002 npm run audit:lighthouse
```

To regenerate visual captures against a running preview:

```bash
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3002 node scripts/inspect-local.mjs final
node scripts/compare-screenshots.mjs
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3002 node scripts/verify-motion.mjs
```

Tests exercise all requested widths: 1920, 1440, 1280, 1024, 768, 430, 390, 375 and 320px. They cover content/anchors, imagery, horizontal overflow, keyboard/focus behavior, dialogs, disclosure previews, local validation, reduced motion, no-JavaScript reading and automated WCAG checks. Lighthouse reports are lab measurements, not field Core Web Vitals.

Final QA on 24 November 2026: **19/19 browser tests passed in development and production** (including the BRG monogram check), ESLint/TypeScript/production build passed, and automated accessibility checks passed. Production Lighthouse: desktop **100 / 100 / 100 / 66**, mobile **91 / 100 / 100 / 66** (performance / accessibility / best practices / SEO). SEO is reduced by intentional indexing restrictions. Full screenshots exist at all nine widths, with detailed desktop/tablet/mobile sections and side-by-side comparisons (kept locally; see below). See [the final QA report](docs/VISUAL_COMPARISON.md) for metrics, limitations, motion evidence and remaining client inputs.

Playfair optical sizing is enabled using a verified variable font with `opsz` 5–1200 and `wght` 300–900. Its unused width axis was pinned at the reference's normal 100% width to reduce transfer size. Inter and both OFL licenses remain local. The development server is intentionally left on port 3001 for the client pitch; port 3000 belongs to another project.

## Project structure

- `src/app/`: root layout, homepage composition, responsive CSS and metadata.
- `src/features/home/`: server-rendered sections, preference/value interactions and scoped motion.
- `src/components/`: shared navigation, footer, typography, imagery and native dialog components.
- `src/content/home.ts`: approved homepage copy and editorial image labels.
- `src/content/photos.ts`: local image paths and descriptions.
- `src/config/site.ts`: business contact information and navigation.
- `src/styles/tokens.css`: measured colors, font roles and shared spacing.
- `public/fonts/`, `public/images/`: licensed local assets.
- `tests/e2e/`: Playwright browser tests.
- `docs/`: reference audit, content provenance, screenshots and actual QA reports. The client PDF and its extracts, reference-site screenshots/comparisons and scraped reference data are kept locally only and excluded by `.gitignore`.

## Interaction behavior

The desktop About dropdown supports pointer and keyboard access. Mobile navigation uses a native modal dialog with focus containment and Escape support. Section links and back-to-top work within the homepage. Property preferences prepare a local inquiry draft. All inquiry forms are explicitly marked **preview only**: validation happens in the browser, nothing is sent or stored. Phone, email and map links use the supplied business contact details.

The reference currently uses a static property grid, so no carousel or redundant carousel library has been added. Owner/team/listing/blog previews explain missing approved information. Reveals use the measured 1.5-second reference easing and remain visible on upward scrolling. Reduced motion skips entrance transforms. Fonts are hosted locally through `next/font/local`; responsive imagery uses `next/image` with AVIF/WebP delivery and lazy loading below the hero.

## Publication restrictions and missing client information

This is a local pitch presentation. Search indexing is disabled in metadata, `public/robots.txt`, and the `X-Robots-Tag` header. These controls are not access authentication; do not deploy it publicly without approval.

Before a real launch, obtain the approved logo, owner photographs and professional biographies/licenses, agent roster and team photographs, verified listings and usage permission, confirmed service areas, vendor relationships, approved full blog articles/social accounts, office hours, privacy/legal/consent language and actual inquiry routing. All stock images are illustrative. The office backdrop does not depict the actual office. The typographic BRG identity and owner portrait panel are presentation placeholders.

See [the reference audit](docs/REFERENCE_AUDIT.md), [content source map](docs/CONTENT_SOURCE_MAP.md), [asset provenance](docs/ASSET_SOURCES.md), and [visual comparison and measured QA](docs/VISUAL_COMPARISON.md).
