# Asset sources

Reviewed 24 November 2026.

## Illustrative photography

All eleven images were downloaded from the Unsplash image CDN and converted locally to WebP. They are architectural illustrations, not Blackhawk listings, owner or agent photographs, premises, transactions, or confirmed service areas. No reference-company photography or branding is included. Location-inspired imagery must not be used to imply Blackhawk serves the photographed place.

License: [Unsplash License](https://unsplash.com/license), which permits downloading, copying, modifying and using imagery, including commercial use. Attribution is appreciated but not required. Photo-page metadata was independently checked where a page link and creator are supplied below. For the remaining images the exact CDN source is retained; creator attribution has not been independently resolved, and no photographer name is inferred.

| Local file under `public/images/` | Description | Creator | Source |
| --- | --- | --- | --- |
| `hero/hero.webp` | Modern white villa and pool | Attribution not independently resolved | [Original image](https://images.unsplash.com/photo-1600596542815-ffad4c1539a9) |
| `interiors/living.webp` | Sunlit living room | Attribution not independently resolved | [Original image](https://images.unsplash.com/photo-1600210492486-724fe5c67fb0) |
| `properties/residential.webp` | Modern house and lawn | Attribution not independently resolved | [Original image](https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde) |
| `properties/commercial.webp` | Glass office towers | Sean Pollock | [Original image](https://images.unsplash.com/photo-1486406146926-c627a92ad1ab) · [Photo page](https://unsplash.com/photos/PhYq704ffdA) |
| `properties/interior.webp` | Open plan dining / living interior | Attribution not independently resolved | [Original image](https://images.unsplash.com/photo-1600607687920-4e2a09cf159d) |
| `communities/city.webp` | Atlanta skyline at sunset | Mark Stuckey | [Original image](https://images.unsplash.com/photo-1696892590514-45130ca048fd) · [Photo page](https://unsplash.com/photos/UVBpibQjamg) |
| `communities/neighborhood.webp` | House and tree-lined lane | Rowan Heuvel | [Original image](https://images.unsplash.com/photo-1449844908441-8829872d2607) · [Photo page](https://unsplash.com/photos/bjej8BY1JYQ) |
| `communities/exterior.webp` | Modern home and pool | Frames For Your Heart | [Original image](https://images.unsplash.com/photo-1512917774080-9991f1c4c750) · [Photo page](https://unsplash.com/photos/2d4lAQAlbDA) |
| `office/office.webp` | Contemporary office interior | Attribution not independently resolved | [Original image](https://images.unsplash.com/photo-1497366811353-6870744d04b2) |
| `interiors/buyers.webp` | Bright living area opening to a kitchen | Attribution not independently resolved | [Original image](https://images.unsplash.com/photo-1600607687939-ce8a6c25118c) |
| `interiors/sellers.webp` | Home and landscaped pool | Attribution not independently resolved | [Original image](https://images.unsplash.com/photo-1564013799919-ab600027ffc6) |

## Processing and delivery

Hero: 2400px wide, WebP quality 85. About image: 1600px wide, WebP quality 84. Remaining images: 1600px wide, WebP quality 82. Natural aspect ratios are retained; component-level `object-fit: cover` determines on-page cropping. All images were visually inspected together for content and broken downloads. Total image assets: 2,646,844 bytes (approximately 2.52 MiB).

The images are served from local files. No Unsplash requests are made by visitors, and no paid Unsplash+ assets were used.

## Fonts

Playfair and Inter are self-hosted under the SIL Open Font License. License files are present at `public/fonts/Playfair-OFL.txt` and `public/fonts/Inter-OFL.txt`. The implementation agent acquired the WOFF2 font files through Fontsource. Exact font filenames: `playfair-latin-variable.woff2` and `inter-latin-variable.woff2`.

Sources: npm packages `@fontsource-variable/playfair@5.3.0` and `@fontsource-variable/inter@5.3.0`, their full Latin normal variable files. Playfair's unused `wdth` axis was instanced at 100 using `fontTools.varLib.instancer.instantiateVariableFont`; `opsz` 5–1200 and `wght` 300–900 remain variable. Final Playfair size: 112,128 bytes. Inter is unchanged at 72,920 bytes, retaining `opsz` 14–32 and `wght` 100–900. No unrelated typeface was substituted. Axis validation and SHA-256 hashes are in `audit/font-validation.json`.

## Client assets still needed

Approved Blackhawk logo/brand standards, Basil and Betty Sullivan portraits, team portraits and profiles, verified listing photography, actual office photography, and any approved social media imagery. The homepage preview must keep missing identity and listing assets clearly labeled.
