import { Capabilities } from "./sections/capabilities";
import { Cases } from "./sections/cases";
import { FinalCta } from "./sections/final-cta";
import { Hero } from "./sections/hero";
import { SiteFooter } from "./sections/site-footer";
import { SiteHeader } from "./sections/site-header";
import { System } from "./sections/system";
import { Testimonial } from "./sections/testimonial";

export default function Home() {
  return (
    <main className="via-dark-site" id="conteudo-principal">
      <SiteHeader />
      <Hero />
      <Capabilities />
      <System />
      <Cases />
      <Testimonial />
      <FinalCta />
      <SiteFooter />
    </main>
  );
}
