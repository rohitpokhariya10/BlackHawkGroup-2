"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);
CustomEase.create("referenceEase", "0.25,0.1,0.25,1");

export function HomeMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", (context) => {
      // Read restored positions together before writing transforms. Server HTML stays visible.
      const reveal = gsap.utils.toArray<HTMLElement>("[data-reveal]", root.current!).filter(el => el.getBoundingClientRect().bottom >= 0);
      gsap.set(reveal, {
        opacity: 0,
        y: (_: number, el: HTMLElement) => el.dataset.reveal === "up" ? 100 : 0,
        x: (_: number, el: HTMLElement) => el.dataset.reveal === "left" ? -100 : el.dataset.reveal === "right" ? 100 : 0,
        scale: (_: number, el: HTMLElement) => el.dataset.reveal === "scale" ? .6 : 1,
      });
      ScrollTrigger.batch(reveal, {
        start: "top 93%", once: true,
        // Create tweens only as content enters; register callbacks for matchMedia cleanup.
        onEnter: elements => context.add(() => {
          gsap.to(elements, {
            opacity: 1, x: 0, y: 0, scale: 1, duration: 1.5, ease: "referenceEase",
            delay: (_: number, el: HTMLElement) => Number(el.dataset.delay ?? 0),
          });
        }),
      });
      gsap.from("[data-hero-reveal]", { opacity: 0, y: 100, duration: 1.5, delay: 0.3, ease: "referenceEase", clearProps: "all" });
    });
    let active = true;
    document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad, { once: true });
    return () => { active = false; window.removeEventListener("load", onLoad); mm.revert(); };
  }, { scope: root });
  return <div ref={root}>{children}</div>;
}
