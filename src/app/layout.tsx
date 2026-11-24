import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const playfair = localFont({ src: "../../public/fonts/playfair-latin-variable.woff2", variable: "--font-playfair", weight: "300 900", display: "swap" });
const inter = localFont({ src: "../../public/fonts/inter-latin-variable.woff2", variable: "--font-inter", weight: "100 900", display: "swap" });

export const metadata: Metadata = {
  title: "Blackhawk Realty Group | Property Decisions, Made Personal",
  description: "Explore residential properties, commercial spaces, rentals, and investments with Blackhawk Realty Group. Start a conversation about your next property decision.",
  robots: { index: false, follow: false, noarchive: true, googleBot: { index: false, follow: false, noimageindex: true } },
  openGraph: { title: "Blackhawk Realty Group", description: "Property Decisions, Made Personal", type: "website", locale: "en_US", siteName: "Blackhawk Realty Group" },
  icons: { icon: "/icon.svg?v=brg-red" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${playfair.variable} ${inter.variable}`}><body><a href="#main-content" className="skip-link">Skip to content</a>{children}</body></html>;
}
