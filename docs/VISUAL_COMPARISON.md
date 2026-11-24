# Final visual comparison and QA

Completed 24 November 2026. **Ready for a local client pitch.** Homepage only; no public deployment or backend. Development preview: http://127.0.0.1:3001. Production auditing used http://127.0.0.1:3002.

## Visual evidence

- Side-by-side comparison gallery (`comparisons/`): 17 pairs using existing reference captures and final implementation captures at identical source viewports. Because it contains third-party reference-site captures, it is kept locally and excluded from Git.
- BRG monogram captures at all nine widths, plus the favicon: [`implementation-screenshots/branding/`](implementation-screenshots/branding/).
- Final full pages: [1440px desktop](implementation-screenshots/final/desktop-full.png), [768px tablet](implementation-screenshots/final/tablet-full.png), [390px mobile](implementation-screenshots/final/mobile-full.png).
- Additional full pages: [1920](implementation-screenshots/final/1920-full.png), [1280](implementation-screenshots/final/1280-full.png), [1024](implementation-screenshots/final/1024-full.png), [430](implementation-screenshots/final/430-full.png), [375](implementation-screenshots/final/375-full.png), [320](implementation-screenshots/final/320-full.png).
- [Mobile menu](implementation-screenshots/final/mobile-menu.png) and [mobile inquiry preview](implementation-screenshots/final/mobile-inquiry.png). Every major section has desktop, tablet and mobile captures in the same directory.

The final collection waits for fonts and images, scrolls through every section, waits for reveal completion, and returns to the top before full-page capture. `audit/implementation-final.json` records dimensions, assets and browser errors. All nine widths report no horizontal overflow; all captured images loaded; no console or page errors occurred. Detailed visual review covered each section and the menu/form, using the nine review sheets in `comparisons/` and full-resolution captures. Native Chrome Computer Use verified the local page; Playwright provided screenshots because native capture returned blank surfaces.

## Typography and composition

Playfair's actual optical-size axis is now present and active. Binary inspection confirmed `opsz` 5–1200 and `wght` 300–900; unused width variation was pinned at 100%, saving 71,860 bytes. Inter retains its optical-size and weight axes. Both fonts remain self-hosted with OFL licenses. See [font validation](audit/font-validation.json), [asset sources](ASSET_SOURCES.md) and the [corrected reference measurements](REFERENCE_AUDIT.md#final-typography-refinement).

The final pass corrected visible section titles to the reference's 70px desktop / 8vw tablet / 36px mobile scale, rather than the smaller styles on their parent elements. The 70px hero, 60px About title, light serif weights, tracked Inter labels, thin square buttons, 174px transparent header, 93px black compact header, dark values grid, split compositions, centered community grid and light footer follow the reference. Approved Blackhawk text determines wrapping and section length. No overlapping or clipped headings were found at the nine tested widths.

## Motion and interaction

[Rendered motion samples](audit/motion/verification.json) verify opacity 0→1 and translateY(100px)→0, and community scaling .6→1. Samples progress through the measured CSS-ease curve and finish by 1.9s, including trigger batching/delays; configured duration is 1.5s. Hero entrance uses the same duration with a .3s delay. Repeated upward scrolling preserves the revealed state. Scrolled header measured exactly 93px and black/fixed.

Hover descriptions reveal with .4s transitions. The full light mobile menu opens over .4s, closes with Escape, and restores focus. Dismissal is immediate; an unverified exit effect was not added. Forms and menus contain keyboard focus. All 49 reveal elements become visible and untransformed under reduced motion; repeating preference changes leaves zero hidden elements. Match-media contexts own and clean up their triggers/tweens; reveal tweens are created on entry instead of all at hydration. No carousel, pinning, fake video controls, cursor effects or fabricated parallax were added.

## Final regression results

| Check | Result |
| --- | --- |
| ESLint | Passed, no errors or warnings |
| TypeScript (`tsc --noEmit`) | Passed |
| Next.js production build | Passed; `/` statically prerendered; only framework not-found route besides homepage |
| Playwright development | 19 passed in 16.1s (after BRG monogram update) |
| Playwright production | 19 passed in 12.8s (after BRG monogram update) |
| BRG monogram | Header, scrolled header, mobile menu, footer, value/team marks, connections mark, both watermarks and favicon render BRG at all nine widths; no clipping or overflow. Captures: `implementation-screenshots/branding/` |
| Widths | 1920, 1440, 1280, 1024, 768, 430, 390, 375, 320px |
| Automated accessibility | No WCAG A/AA violations in tested page, inquiry dialog and mobile-menu states |
| Browser errors in final capture | None |

The suite checks anchors and supplied contacts, noindex metadata/headers/robots, image loading, heading clipping and overflow, dropdowns, keyboard focus, Escape, local form validation, preview disclosures, zero form POST requests, reduced motion and reading without JavaScript. Automated results do not replace a full assistive-technology audit. Logs: `audit/eslint-final.txt`, `audit/typescript-final.txt`, `audit/build-final.txt`, `audit/playwright-dev-final.txt`, and `audit/playwright-production-final.txt`.

Final handoff: the existing Blackhawk development process (PID 67744, verified working directory) returns HTTP 200 on loopback port 3001 and remains running. Chrome is open to the Blackhawk homepage. Only the temporary owned production audit server on port 3002 was stopped after verification. The unrelated port-3000 application was not modified or stopped. The final screenshot directory contains 61 images.

## Lighthouse — production build

| Category / metric | Desktop | Mobile |
| --- | ---: | ---: |
| Performance | **100** | **91** |
| Accessibility | **100** | **100** |
| Best practices | **100** | **100** |
| SEO | 66 | 66 |
| First contentful paint | 0.3s | 0.9s |
| Largest contentful paint | 0.8s | 3.5s |
| Total blocking time | 0ms | 50ms |
| Cumulative layout shift | 0 | 0 |

Reports: [desktop HTML](audit/lighthouse/desktop.html), [mobile HTML](audit/lighthouse/mobile.html), [machine-readable summary](audit/lighthouse/summary.json). Chrome/Lighthouse 13.6 local laboratory runs; mobile uses simulated throttling and 4× CPU slowdown. These are not real-user Core Web Vitals, and scores vary between runs. Mobile LCP remains the largest performance opportunity despite meeting the requested 90+ score.

SEO's only failed scored audit is `is-crawlable`: intentional noindex metadata, response headers and robots exclusion protect the pitch from indexing. Those controls were preserved. Hero delivery is high priority, other images load lazily through Next's AVIF/WebP optimizer, fonts are local, and batched motion reduced main-thread blocking. Remaining diagnostics include unused framework/animation JavaScript, framework compatibility code, and small image/CSS delivery opportunities. There are no third-party widgets, analytics or font requests.

## Intentional differences and client information still needed

The photo subjects and crops differ because reference assets were not reused. Static licensed architecture replaces reference video. The original BRG wordmark is temporary. The owner portrait is explicitly marked as pending; biographies and licensing remain unverified. Three illustrative property categories replace six live listings; no prices, addresses, availability or statistics were invented. Property-type features replace reference performance numbers. Eight lifestyle cards replace unverified geographic service areas. The required team preview is visible although the reference's agent section was hidden. No unverified social feed is shown. Preview dialogs replace unavailable secondary pages and inquiry delivery.

Approved branding, owner/team photography and biographies/licenses, listing data and usage permission, actual office photos/hours, service areas, vendor relationships, full articles/social accounts, legal/privacy copy and inquiry routing remain client inputs before a real launch. These are documented in [the content source map](CONTENT_SOURCE_MAP.md) and [asset provenance](ASSET_SOURCES.md). Longer approved copy and these honest placeholders account for the remaining page-height and composition differences. The current frontend is complete for the requested pitch; production business content and live delivery are separate future work.
