"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Mail, Phone, X } from "lucide-react";
import { site } from "@/config/site";
import { Brand } from "@/components/ui/Brand";
import { useContact } from "@/components/ui/ContactDialog";
import { containDialogFocus } from "@/lib/dialog";

const aboutLinks = [
  { label: "Our Company", href: "#about" },
  { label: "Our Core Values", href: "#values" },
  { label: "Basil & Betty Sullivan", href: "#owners" },
  { label: "Our Team", href: "#team" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const openContact = useContact();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 120);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const closeMenu = () => menu.current?.close();
  const showMenu = () => {
    menu.current?.showModal();
    setMenuOpen(true);
    document.body.style.overflow = "hidden";
  };
  const openBlog = () => { closeMenu(); openContact({ mode: "blog" }); };

  return (
    <>
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <a href="#home" className="header-brand" aria-label="BRG Blackhawk Realty Group home"><Brand /></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <ul>
            {site.navigation.map((item) => <li key={item.label} className={item.label === "About" ? "nav-about" : ""} onMouseEnter={item.label === "About" ? () => setDropdown(true) : undefined} onMouseLeave={item.label === "About" ? () => setDropdown(false) : undefined} onBlur={item.label === "About" ? (e) => { if (!e.currentTarget.contains(e.relatedTarget)) setDropdown(false); } : undefined}>
              {item.label === "Blog" ? <button type="button" onClick={openBlog}>Blog</button> : item.label === "About" ? <>
                <button type="button" aria-expanded={dropdown} aria-controls="about-dropdown" onClick={(event) => setDropdown(event.detail === 0 ? !dropdown : true)} onKeyDown={(e) => { if (e.key === "Escape") setDropdown(false); }}>About<ChevronDown size={11} /></button>
                <ul className="nav-dropdown" id="about-dropdown" hidden={!dropdown}>{aboutLinks.map(link => <li key={link.href}><a href={link.href} onClick={() => setDropdown(false)}>{link.label}</a></li>)}</ul>
              </> : <a href={item.href}>{item.label}</a>}
            </li>)}
          </ul>
        </nav>
        <div className="header-contact"><a className="icon-button" href={site.telephone} aria-label={`Call Blackhawk at ${site.phone}`}><Phone size={19} strokeWidth={1.5} /></a><a className="icon-button" href={site.mailto} aria-label="Email Blackhawk Realty Group"><Mail size={23} strokeWidth={1.4} /></a></div>
        <button ref={menuButton} type="button" className="menu-toggle" aria-label="Open navigation menu" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={showMenu}><span className="menu-lines"><i /><i /><i /></span><span>Menu</span></button>
      </header>
      <dialog id="mobile-menu" ref={menu} className="mobile-menu" aria-label="Navigation menu" onKeyDown={containDialogFocus} onClose={() => { setMenuOpen(false); if (!document.querySelector("dialog[open]")) document.body.style.overflow = ""; menuButton.current?.focus({ preventScroll: true }); }}>
        <div className="mobile-menu__top"><a href="#home" aria-label="BRG Blackhawk Realty Group home" onClick={closeMenu}><Brand /></a><button type="button" className="icon-button" onClick={closeMenu} aria-label="Close navigation menu"><X size={28} /></button></div>
        <nav aria-label="Mobile navigation"><ul>{site.navigation.map(item => <li key={item.label}>{item.label === "Blog" ? <button type="button" onClick={openBlog}>Blog</button> : <a href={item.href} onClick={closeMenu}>{item.label}</a>}{item.label === "About" && <div className="mobile-sublinks"><a href="#owners" onClick={closeMenu}>Meet the Owners</a><a href="#values" onClick={closeMenu}>Our Values</a></div>}</li>)}</ul></nav>
        <div className="mobile-menu__contact"><span className="eyebrow">Let’s connect</span><a href={site.telephone}>{site.phone}</a><a href={site.mailto}>{site.email}</a></div>
      </dialog>
    </>
  );
}
