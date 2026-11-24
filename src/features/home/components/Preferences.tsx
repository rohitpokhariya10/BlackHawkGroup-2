"use client";

import type { FormEvent } from "react";
import { useContact } from "@/components/ui/ContactDialog";

export function Preferences() {
  const open = useContact();
  const explore = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const place = String(data.get("location")).trim();
    open({ topic: String(data.get("intent")), message: `I’m interested in ${data.get("type")}${place ? ` in ${place}` : ""}. My preferred timeline is ${data.get("timeline")}.` });
  };
  return <div className="preferences">
    <form onSubmit={explore} className="preferences__form">
      <label>Property type<select name="type" defaultValue="residential property"><option value="residential property">Residential</option><option value="commercial property">Commercial</option><option value="a rental property">Rental</option><option value="an investment property">Investment</option></select></label>
      <label>Preferred location<input name="location" placeholder="City or ZIP" aria-label="Preferred city or ZIP" maxLength={100} /></label>
      <label>I’m looking to<select name="intent" defaultValue="Buying"><option>Buying</option><option>Selling</option><option>Leasing</option><option>Investing</option></select></label>
      <label>My timeline<select name="timeline" defaultValue="still taking shape"><option value="still taking shape">Just exploring</option><option value="as soon as possible">Soon</option><option value="within 3–6 months">3–6 months</option><option value="6 months or more">6+ months</option></select></label>
      <button type="submit" className="button button--light">Explore Options</button>
    </form>
    <p className="preferences__note">A starting point for your conversation. Property search preview; no live listings.</p>
  </div>;
}
