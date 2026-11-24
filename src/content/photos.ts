// Licensed illustrative photography; provenance is recorded in docs/ASSET_SOURCES.md.
export const photos = {
  hero: { src: "/images/hero/hero.webp", alt: "Illustrative modern white villa and swimming pool; not a Blackhawk listing" },
  living: { src: "/images/interiors/living.webp", alt: "Illustrative bright living room with considered architectural details" },
  residential: { src: "/images/properties/residential.webp", alt: "Illustrative residential architecture; not a Blackhawk listing" },
  commercial: { src: "/images/properties/commercial.webp", alt: "Illustrative commercial space; not a Blackhawk listing" },
  interior: { src: "/images/properties/interior.webp", alt: "Illustrative interior; not a Blackhawk listing" },
  city: { src: "/images/communities/city.webp", alt: "Illustrative city architecture; location inspiration" },
  neighborhood: { src: "/images/communities/neighborhood.webp", alt: "Illustrative neighborhood scenery; no service area implied" },
  exterior: { src: "/images/communities/exterior.webp", alt: "Illustrative landscaped home exterior" },
  office: { src: "/images/office/office.webp", alt: "Illustrative architectural backdrop; not the Blackhawk office" },
  buyers: { src: "/images/interiors/buyers.webp", alt: "Illustrative light-filled kitchen and living space" },
  sellers: { src: "/images/interiors/sellers.webp", alt: "Illustrative home exterior" },
} as const;
export type PhotoKey = keyof typeof photos;
