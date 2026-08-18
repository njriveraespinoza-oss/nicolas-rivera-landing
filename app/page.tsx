import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCta } from "@/components/layout/StickyCta";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { SystemRail } from "@/components/sections/SystemRail";
import { Diagnostic } from "@/components/sections/Diagnostic";
import { Dispersion } from "@/components/sections/Dispersion";
import { Mechanism } from "@/components/sections/Mechanism";
import { Demo } from "@/components/sections/Demo";
import { Offers } from "@/components/sections/Offers";
import { Orientation } from "@/components/sections/Orientation";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { Qualify } from "@/components/sections/Qualify";

export default function Home() {
  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <Header />
      <StickyCta />
      <main id="contenu">
        <Hero />
        <SystemRail />
        <Diagnostic />
        <Dispersion />
        <Mechanism />
        <Demo />
        <Offers />
        <Orientation />
        <About />
        <Faq />
        <Qualify />
      </main>
      <Footer />
    </>
  );
}
