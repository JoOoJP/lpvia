import { Cases } from "./sections/cases";
import { Diagnosis } from "./sections/diagnosis";
import { FinalCta } from "./sections/final-cta";
import { Hero } from "./sections/hero";
import { Measurement } from "./sections/measurement";
import { Products } from "./sections/products";
import { ProofBar } from "./sections/proof-bar";
import { SiteFooter } from "./sections/site-footer";
import { SiteHeader } from "./sections/site-header";
import { System } from "./sections/system";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <ProofBar />
      <Diagnosis />
      <System />
      <Cases />
      <Products />
      <Measurement />
      <FinalCta />
      <SiteFooter />
    </main>
  );
}
