"use client";

import { useState } from "react";
import { home } from "@/content/home";
import { Brand } from "@/components/ui/Brand";

export function Values() {
  const [active, setActive] = useState<string | null>(null);
  return <div className="values-grid">{home.values.map(value => <article key={value.title} className={`value-card ${active === value.title ? "value-card--open" : ""}`} data-reveal="up" data-delay="0.3">
    <button type="button" aria-expanded={active === value.title} aria-controls={`value-${value.title}`} onClick={() => setActive(active === value.title ? null : value.title)}>
      <Brand compact /><span className="value-card__title">{value.title}</span><span className="value-card__line" /><span className="sr-only"> — Read our value</span>
    </button>
    <p id={`value-${value.title}`} className="value-card__description">{value.description}</p>
  </article>)}</div>;
}
