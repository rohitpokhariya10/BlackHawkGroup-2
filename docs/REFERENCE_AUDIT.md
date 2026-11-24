# Watch Realty Co. reference audit

Inspected live on 24 November 2026 at https://www.watchrealtyco.com/. This audit precedes homepage implementation. Public rendered design was measured using Playwright/Chrome. Native Computer Use opened and reloaded the reference and read the accessibility tree; native screenshots returned a solid blank surface, so the requested Playwright fallback supplies visual evidence. No proprietary source or photography is reused.

## Section order

1. Transparent navigation over full-width skyline video/poster hero; centered title, description, two outline buttons; search strip at the bottom.
2. About: approximately equal split, large interior photograph on the left, monogram and copy on the right.
3. Core values: centered heading above a full-width three-by-two charcoal grid; monograms, large serif names, fine horizontal rules; descriptions reveal on hover.
4. Track record: white section, centered title and three statistic columns. Blackhawk substitutes the three approved property-type feature tiles.
5. Broker: tall portrait left, faded edge, text right. Blackhawk uses a clearly labeled owner portrait placeholder and the PDF's exact introduction.
6. Featured listings: heading and CTA above six portrait image cards in a three-column/two-row grid. The observed desktop page has **no active carousel**.
7. Full-width video interlude. Blackhawk has no approved video; use illustrative architecture imagery, without a nonfunctional play button.
8. Communities: centered heading/copy, eight landscape image tiles in a three-column grid, final two centered. Blackhawk cannot claim these locations; adapt to lifestyle imagery without geographic claims.
9. Office: dark skyline background, centered title and thin outlined contact panel.
10. Agents section exists but is explicitly hidden (zero rendered height) on the observed reference. Blackhawk's brief nevertheless requires a visible team preview.
11. Brokerage/connections: split graphic/monogram left and copy/CTA right.
12. Buyers and sellers: image-led alternating split compositions.
13. Instagram heading/link section. No verified Blackhawk feed is available; omit rather than fabricate an account.
14. Large closing CTA over imagery.
15. Light `#f9f9f7` footer with black monogram, contact details, navigation, small-print row and back-to-top link.

## Verified desktop measurements (1440 × 1000)

Full raw measurements: `audit/reference-desktop.json`; screenshots: `reference-screenshots/`. Raw reference captures and data are kept locally only and are excluded from Git.

| Element | Measured treatment |
| --- | --- |
| Header at top | 174px tall, absolute, transparent; 20px left / 45px right padding |
| Scrolled header | Black, fixed, compact logo and approximately 92px tall |
| Navigation | Inter 13px/13px, regular, uppercase, 2.5px tracking |
| Hero | 900px tall including search strip; full-bleed image/video |
| Hero title | Playfair (not Playfair Display), 70px/70px, weight 300; text block 806px |
| Visible section title | Playfair 70px/63px, weight 300; the parent h2's 50px/400 style is overridden by a child span |
| About title | Playfair 60px/63px, weight 300 |
| Value title | Playfair 45px/63px, weight 300 |
| Buttons | Inter 12.5px; 1.5px tracking; 15px × 25px padding; square thin outline; ~47px high |
| Main surface | RGB 249,249,247 / `#f9f9f7` |
| Ink | Black, `#1e1e1e`; charcoal value cards |
| Values section | 998px overall; 56px top padding; ~389px card rows |
| Feature/statistic band | 516px; 113px top, 106px bottom, 88px sides |
| Broker section | 1002px; split image and copy |
| Listings | 1552px; 123px top, 135px bottom; three ~423×550px cards per row |
| Video interlude | 558px tall |
| Communities | 1229px; 83px top, 82px bottom, 109px sides; ~407×267px tiles |
| Office | 637px; 104px top, 144px bottom |
| Connections | 723px; 100px top |
| Buyers/sellers | 1048px combined |
| Footer and closing CTA | 1425px combined |

## Motion and interaction evidence

Measured heading transitions are 1.5s opacity/transform, with initial translateY(100px). Hero title has a 0.3s delay. Listings title uses translateX(-100px). Cards in the community grid start scaled to 0.6. Buttons and header transition for 0.4s ease-in-out. The header becomes a solid compact black bar when scrolled. Reference scroll inspection includes downward entry and upward return. No evidence yet supports custom cursor behavior, pinned storytelling, scrubbed line splitting or a smooth-scroll library; do not add those based on the generic brief alone.

Animation is to be independently recreated with scoped GSAP and ScrollTrigger and disabled for reduced motion. Server-rendered content remains visible before hydration and without JavaScript.

## Adaptation boundaries / missing assets

- Approved Blackhawk logo and owner portraits were not supplied. Use an original typographic monogram as a presentation placeholder and label the portrait placeholder.
- Exact open-source Playfair and Inter fonts can be hosted locally with their OFL licenses.
- No owner credentials, listing records, performance metrics, agent roster, social account, vendor partners, or service territories are verified.
- Licensed stock imagery is illustrative; it must not imply actual inventory, actual office appearance or confirmed coverage.
- Hero search is adapted to a clearly identified local preference preview; no MLS, filtering of real listings, inquiry delivery or submission is implied.
- Copy length differs substantially from the reference. Preserve Blackhawk PDF wording and adjust section height where required for legibility.
- Responsive measurements, interaction details and full-page screenshots are being collected in the same audit before component implementation.


## Completed responsive and interaction audit

- At 768px and 390px, the desktop navigation is replaced by a top-right three-line menu and the branding moves to the center of the hero. Mobile hero visual is 650px high; the search form sits below on black.
- At 390px, the hero title is 32px/32px; visible section titles are 36px/46.8px, with office/closing titles 32px/41.6px. At 768px, the hero is 46.08px/46.08px, visible section titles are 61.44px/79.872px (8vw/1.3), and office/closing titles are 46.08px/59.904px (6vw/1.3). These final child-span measurements replace the preliminary parent-h2 readings.
- Mobile values become one column; tablet uses two. Property cards become one column on mobile and two on tablet. Communities retain a compact two-column grid on mobile.
- About and broker split sections stack below 992px. Side padding is 24px on mobile and 40px on tablet.
- The mobile menu is a full light panel with centered serif navigation, large wordmark, close control, and contact details. Screenshot: `reference-screenshots/mobile-menu.png`.
- The About menu exposes company and broker links on hover. Value descriptions fade in on hover, while names/rules shift. Images scale subtly on card hover.
- Reverse scroll was measured: after revealing the values and returning to the top, all observed AOS elements retained opacity 1 and transform none. These are once-per-load entrance animations, with no verified exit replay. The implementation therefore uses once-only ScrollTriggers.
- The measured AOS easing is CSS `ease` (cubic-bezier .25,.1,.25,1), duration 1.5s, common delay .3s, displacement 100px. Recreated with GSAP CustomEase. Hero title, description and buttons animate together after .3s.
- Video was captured with Playwright during scrolling, reloads and menu interaction. No custom cursor, pinned section, line splitting, or Lenis behavior was observed. Static architectural imagery replaces unavailable approved video.
- Footer is light, not dark; the dark photographic CTA transitions into it. This corrects the preliminary interpretation from the text-only accessibility view.

## Fidelity limits

The live site has a third-party listing feed, video, actual portraits and social links unavailable for Blackhawk. These are intentionally adapted, not cloned. No carrier-specific animation event code or proprietary sources were read or copied. Trigger thresholds are visual estimates (~viewport bottom minus 7%); CSS timing, transforms, font families and dimensions are measured. Photographic image movement in the hero originates in video and is not recreated as fabricated parallax.

## Final typography refinement

Targeted measurements are retained in `audit/reference-typography-detail.json` and `audit/reference-responsive-title-detail.json`. The reference requests **Playfair**, not Playfair Display, with optical sizes 5–1200 and variable weights. CSS uses optical sizing `auto`, normal variation settings and normal width. The initial local weight-only file did not carry the optical-size axis; it was replaced before final QA.

The final local Playfair binary supports `opsz` 5–1200 and `wght` 300–900. Its unused width variation was instanced to the reference's normal 100% width, reducing the file from 183,988 to 112,128 bytes while retaining all optical sizes and weights. Inter retains `opsz` 14–32 and `wght` 100–900. `audit/font-validation.json` records actual binary axes, sizes and hashes; both OFL licenses are included.

Blackhawk uses `font-optical-sizing: auto`, Playfair weight 300, 70px/70px desktop hero, 60px/63px desktop About, and 70px/66.5px general desktop titles. The slightly more generous general title line height accommodates longer approved multi-line copy. Responsive title sizes follow the measured 8vw tablet / 36px mobile pattern. The owner title uses 68px with tight tracking. Inter remains the body, form, button and navigation face. See `VISUAL_COMPARISON.md` for final screenshots and QA results.
