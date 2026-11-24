import { ChevronUp } from "lucide-react";
import { site } from "@/config/site";
import { Brand } from "@/components/ui/Brand";
import { ContactButton } from "@/components/ui/ContactDialog";

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-main" data-reveal="up">
      <a className="footer-brand" href="#home" aria-label="BRG Blackhawk Realty Group home"><Brand /></a>
      <div className="footer-contact"><h2>Blackhawk Realty Group</h2><address><a href={site.telephone}>{site.phone}</a><a href={site.mailto}>{site.email}</a><a href={site.directions} target="_blank" rel="noreferrer">1 West Court Square<br />Decatur, GA, USA</a></address></div>
      <nav className="footer-nav" aria-label="Footer navigation"><h2>Navigation</h2><ul>{site.navigation.map(item => <li key={item.label}>{item.label === "Blog" ? <ContactButton mode="blog" className="text-link">Blog</ContactButton> : <a href={item.href}>{item.label}</a>}</li>)}</ul></nav>
    </div>
    <div className="footer-note"><p>Private client presentation. Property and location photography is illustrative. Listing information, team profiles, and other unverified details are awaiting approval.</p><a href="#home" className="back-to-top"><ChevronUp size={17} /><span>Back to top</span></a></div>
    <div className="footer-bottom"><p>© 2026 Blackhawk Realty Group</p><span>Property decisions, made personal.</span></div>
  </footer>;
}
