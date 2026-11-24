import { ContactProvider } from "@/components/ui/ContactDialog";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HomeMotion } from "@/features/home/animations/HomeMotion";
import { HomePage } from "@/features/home/components/HomePage";

export default function Page() {
  return <ContactProvider><Header /><HomeMotion><HomePage /><Footer /></HomeMotion></ContactProvider>;
}
