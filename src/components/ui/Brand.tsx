export function Monogram({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 170 90" aria-hidden="true" focusable="false"><text x="85" y="75" textAnchor="middle" fontSize="100" letterSpacing="-12" fill="currentColor">BRG</text></svg>;
}

export function Brand({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={`brand ${compact ? "brand--compact" : ""} ${className}`} aria-hidden="true">
      <Monogram className="brand__monogram" />
      {!compact && <> <span className="brand__name">Blackhawk <span>Realty Group</span></span></>}
    </span>
  );
}
