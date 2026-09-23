import { Analytics } from "@vercel/analytics/next";
import { Inter, Space_Grotesk } from "next/font/google";
import "../design-tokens.css";
import "../globals.css";
import "../reference-redesign.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  // Só pinta o painel do menu no mobile: não precisa disputar a primeira dobra.
  preload: false,
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export function RootShell({ lang, skipLinkLabel, children }) {
  // As variáveis das fontes precisam viver no mesmo elemento que :root, onde
  // design-tokens.css monta --font-sans. No <body> elas ficariam abaixo do
  // escopo, e o token cairia na serifada padrão do navegador.
  return (
    <html lang={lang} className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <a className="skip-link" href="#conteudo-principal">
          {skipLinkLabel}
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
