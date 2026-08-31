import { Analytics } from "@vercel/analytics/next";
import { Inter, Space_Grotesk } from "next/font/google";
import { siteDescription, siteTitle, siteUrl } from "./site";
import "./design-tokens.css";
import "./globals.css";
import "./reference-redesign.css";

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

const title = siteTitle;
const description = siteDescription;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    type: "website",
    images: [
      {
        url: "/og-via.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "VIA — Estratégia que ganha forma.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-via.jpg"],
  },
};

export default function RootLayout({ children }) {
  // As variáveis das fontes precisam viver no mesmo elemento que :root, onde
  // design-tokens.css monta --font-sans. No <body> elas ficariam abaixo do
  // escopo, e o token cairia na serifada padrão do navegador.
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <a className="skip-link" href="#conteudo-principal">
          Ir para o conteúdo
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
