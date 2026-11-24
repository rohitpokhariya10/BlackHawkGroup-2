export function SectionHeading({ eyebrow, title, id, className = "", motion = true }: { eyebrow: string; title: string; id?: string; className?: string; motion?: boolean }) {
  return (
    <div className={`section-heading ${className}`} data-reveal={motion ? "up" : undefined}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id}>{title}</h2>
    </div>
  );
}
