# Blackhawk homepage content source map

The complete supplied **Blackhawk Realty Group.pdf** (15 pages) was read. Pages 1–2 supply homepage wording; page 3 identifies missing verification; pages 4–15 were reviewed for context and publication constraints. Extracted text is retained in `audit/pdf-content.txt`, with rendered images of the primary pages. Page 8 is blank apart from whitespace.

| Homepage section / feature | Authoritative source | Implementation |
| --- | --- | --- |
| Header and footer identity / navigation | Supplied development brief; PDF p. 2 contact details, p. 14 confirms | `src/config/site.ts`, Header and Footer |
| Hero title, description and CTA | PDF p. 1, Hero | Exact wording; title visually breaks after the comma |
| About heading and both paragraphs | PDF p. 1, About Blackhawk Realty Group | Exact wording in `src/content/home.ts` |
| Six core values | PDF p. 1, Our Core Values | Exact titles and descriptions; hover, focus and tap reveal |
| Three property-type feature tiles | PDF p. 1, Three Feature Tiles | Exact titles and descriptions; substitutes unsupported reference metrics |
| Owner name and three introduction paragraphs | PDF p. 1, Meet the Owners | Exact wording, including the approval note; no unsupported credentials |
| Property heading, description, CTA | PDF p. 2, Featured Properties | Exact wording; images are illustrative category previews, not records |
| Communities heading and description | PDF p. 2, Communities | Exact wording; editorial lifestyle labels carry no geography or coverage claim |
| Office heading, address, phone and email | PDF p. 2, Office; PDF p. 14 confirms | Exact information, `tel:`, `mailto:`, and Google Maps directions links |
| Team heading, description and CTA | PDF p. 2, Team | Exact wording; profile preview awaits real roster/photographs |
| Connections heading, description and CTA | PDF p. 2, Professional Connections | Exact wording; no vendor logos, endorsements or partner claims |
| Buyers title, paragraph and CTA | PDF p. 2, Buyers | Exact wording |
| Sellers title, paragraph and CTA | PDF p. 2, Sellers | Exact wording |
| Closing CTA | PDF p. 2, Final Call to Action | First approved sentence is the heading; remaining sentence is the description |
| Blog preview dialog | PDF p. 11, hero and first three proposed article titles; p. 12 review note | Topic previews only; no links to nonexistent articles |
| Inquiry preview fields | PDF p. 14, Contact Form; explicit user requirement for frontend-only forms | Required names/email/message; optional phone; local validation; no delivery or storage |
| Missing-data labels | PDF pp. 3, 10, 12–15 and explicit development brief | Plain disclosure of preview status rather than fabricated content |

## Presentation-only content

Neutral navigation aids, eyebrows, image category captions, form help, and accessibility labels are written for this prototype. They do not assert business achievements or facts. The preference strip gathers a local inquiry draft, rather than simulating a listing feed. The original BRG wordmark is a temporary typographic identity; approved client branding remains outstanding. The owner portrait panel is explicitly labeled as awaiting approved photography.

## Material deliberately excluded

- The reference company's sales figures, owner portrait, legal and licensing statements, agent identities, listings, vendor links, and Instagram account.
- Unverified geography, prices, addresses, property dimensions, availability, client testimonials, business hours, awards, or qualifications.
- PDF pages 4–15 do not become internal pages. Only the proposed blog titles and contact-form fields inform optional homepage dialogs.
- The PDF's suggested “Message Sent” confirmation is not used: this prototype never claims delivery without a backend.

## Before production

Obtain approved branding, owner portraits and bios/licenses, agent roster, verified listing content and permissions, confirmed service areas, vendor relationships, approved full articles/social accounts, office hours, legal/privacy/consent language, contact routing, and production domain. Review all claims with the client. Indexing remains blocked in metadata, robots.txt and response headers; remove these protections only as part of an explicitly authorized production launch.

## Final refinement review — 24 November 2026

Typography, decorative SVG monograms, image priority and animation batching were refined without rewriting approved homepage content. The final browser suite verifies the exact owner introduction, hero title, supplied telephone/email, valid section links and honest local inquiry behavior. No listings, biographies, performance metrics, geographic coverage or message-delivery claims were added. See `VISUAL_COMPARISON.md` for the completed visual review and measured results.
