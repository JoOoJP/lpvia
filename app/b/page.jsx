import { Libre_Bodoni } from "next/font/google";
import { Capabilities } from "../sections/capabilities";
import { Cases } from "../sections/cases";
import { FinalCta } from "../sections/final-cta";
import { SiteFooter } from "../sections/site-footer";
import { SiteHeader } from "../sections/site-header";
import { System } from "../sections/system";
import { HeroB } from "./hero-b";

// A serifada só existe nos títulos dos cards desta hero. Carregada no layout
// raiz, ela viajaria em toda visita à landing page sem pintar um caractere.
const libreBodoni = Libre_Bodoni({
  variable: "--font-editorial",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hero /b — VIA",
  description: "Versão alternativa da hero da VIA, em teste.",
  robots: {
    index: false,
    follow: false,
  },
};

// Mesma página da raiz com a hero trocada: só a primeira dobra está em teste,
// e manter o resto vindo dos mesmos componentes garante que a comparação seja
// entre as duas heros, não entre duas páginas que foram divergindo.
export default function HeroBPage() {
  return (
    <main
      className={`via-dark-site ${libreBodoni.variable}`}
      id="conteudo-principal"
    >
      <SiteHeader />
      <HeroB />
      <Capabilities />
      <System />
      <Cases />
      <FinalCta />
      <SiteFooter />
    </main>
  );
}
