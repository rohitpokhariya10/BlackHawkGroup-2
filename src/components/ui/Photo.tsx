import Image from "next/image";
import { photos, type PhotoKey } from "@/content/photos";

export function Photo({ name, className = "", sizes = "100vw", priority = false, decorative = false }: { name: PhotoKey; className?: string; sizes?: string; priority?: boolean; decorative?: boolean }) {
  const photo = photos[name];
  return <Image src={photo.src} alt={decorative ? "" : photo.alt} fill sizes={sizes} className={`photo ${className}`} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} quality={75} />;
}
