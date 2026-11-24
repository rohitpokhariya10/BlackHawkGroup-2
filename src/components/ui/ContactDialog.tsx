"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { X, Mail, Phone } from "lucide-react";
import { site } from "@/config/site";
import { containDialogFocus } from "@/lib/dialog";

type PreviewMode = "inquiry" | "listings" | "team" | "blog";
type Request = { mode?: PreviewMode; topic?: string; message?: string };
const ContactContext = createContext<((request?: Request) => void) | null>(null);

export function useContact() {
  const open = useContext(ContactContext);
  if (!open) throw new Error("Contact controls require ContactProvider");
  return open;
}

export function ContactButton({ children, className = "button", mode = "inquiry", topic, message, ariaLabel }: { children: ReactNode; className?: string; mode?: PreviewMode; topic?: string; message?: string; ariaLabel?: string }) {
  const open = useContact();
  return <button type="button" className={className} onClick={() => open({ mode, topic, message })} aria-label={ariaLabel}>{children}</button>;
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [request, setRequest] = useState<Request | null>(null);
  const [reviewed, setReviewed] = useState(false);
  const open = useCallback((next: Request = {}) => {
    if (!dialog.current?.open) returnFocus.current = document.activeElement as HTMLElement;
    setReviewed(false);
    setRequest({ mode: "inquiry", ...next });
  }, []);

  useEffect(() => {
    if (request) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    }
    return () => { if (!document.querySelector("dialog[open]")) document.body.style.overflow = ""; };
  }, [request]);

  const close = () => dialog.current?.close();
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    for (const field of form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[required]")) {
      field.setCustomValidity(field.value.trim() ? "" : "Please complete this field.");
    }
    if (form.reportValidity()) setReviewed(true);
  };

  const preview = request?.mode !== "inquiry";
  const title = reviewed ? "Your preview is ready" : request?.mode === "listings" ? "Listing details are coming soon" : request?.mode === "team" ? "Meet the people behind Blackhawk" : request?.mode === "blog" ? "Notes From the Property Search" : "Tell us what you have in mind";

  return (
    <ContactContext.Provider value={open}>
      {children}
      <dialog ref={dialog} className="contact-dialog" aria-labelledby="dialog-title" aria-describedby="dialog-notice" onKeyDown={containDialogFocus} onClose={() => { setRequest(null); setReviewed(false); document.body.style.overflow = ""; returnFocus.current?.focus({ preventScroll: true }); }} onClick={(e) => { if (e.target === e.currentTarget) { const r = e.currentTarget.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close(); } }}>
        {request && <div className="dialog-content">
          <button type="button" className="icon-button dialog-close" onClick={close} aria-label="Close preview"><X size={23} /></button>
          <span className="eyebrow">Blackhawk Realty Group</span>
          <h2 id="dialog-title">{title}</h2>
          {reviewed ? <>
            <p id="dialog-notice" className="preview-notice" role="status">Nothing has been sent. This demonstration validates the form locally and does not store your information.</p>
            <p>To reach Blackhawk Realty Group, call or email the team directly.</p>
            <div className="dialog-contact"><a href={site.telephone}><Phone size={17} />{site.phone}</a><a href={site.mailto}><Mail size={17} />{site.email}</a></div>
            <button type="button" className="button" onClick={close}>Return to Homepage</button>
          </> : preview ? <>
            <p id="dialog-notice" className="preview-notice">Presentation preview</p>
            {request.mode === "listings" && <><p>The property photographs on this page are illustrative. Verified listings, availability, and property details will be added after approval.</p><p>Contact Blackhawk Realty Group to discuss current opportunities and your requirements.</p></>}
            {request.mode === "team" && <><p>Basil Sullivan and Betty Sullivan are the owners of Blackhawk Realty Group.</p><p>Team profiles and approved photographs are coming soon. Professional biographies and licensing details will be added after they are provided and approved.</p></>}
            {request.mode === "blog" && <><p>Articles are being prepared. These proposed topics are previews, not published articles.</p><ul className="article-previews"><li>Before You Buy: Questions Worth Asking</li><li>Preparing Your Property for the Market</li><li>What to Consider Before Signing a Lease</li></ul></>}
            <button type="button" className="button" onClick={() => open({ topic: request.topic ?? (request.mode === "listings" ? "Property options" : "General inquiry") })}>Start a Conversation</button>
          </> : <>
            <p id="dialog-notice" className="preview-notice">Preview only. This form does not send or store your information.</p>
            <form method="dialog" onSubmit={submit} onInput={(e) => { const field = e.target; if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) field.setCustomValidity(""); }}>
              <div className="form-grid">
                <label>First name<input name="firstName" autoComplete="given-name" required maxLength={80} /></label>
                <label>Last name<input name="lastName" autoComplete="family-name" required maxLength={80} /></label>
                <label>Email<input name="email" type="email" autoComplete="email" required maxLength={160} /></label>
                <label>Phone <span className="optional">(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={30} /></label>
              </div>
              <label>I’m interested in<select name="interest" defaultValue={request.topic ?? "General inquiry"}><option>General inquiry</option><option>Buying</option><option>Selling</option><option>Leasing</option><option>Investing</option><option>Property options</option><option>Professional connections</option><option>Locations</option></select></label>
              <label>Your message<textarea name="message" rows={3} required minLength={10} maxLength={2000} defaultValue={request.message ?? ""} placeholder="Tell us about your priorities, questions, or timeline." /></label>
              <button type="submit" className="button button--solid">Preview Inquiry</button>
              <p className="form-contact">Prefer to talk? <a href={site.telephone}>{site.phone}</a></p>
            </form>
          </>}
        </div>}
      </dialog>
    </ContactContext.Provider>
  );
}
