import { Inter, Libre_Bodoni, Space_Grotesk } from "next/font/google";
import "./design-tokens.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const libreBodoni = Libre_Bodoni({
  variable: "--font-editorial",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

// A Vercel expõe VERCEL_PROJECT_PRODUCTION_URL sozinha; NEXT_PUBLIC_SITE_URL
// existe para sobrescrever em outra hospedagem.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = "VIA — Crescimento com direção";
const description =
  "Estratégia, marketing, comercial e tecnologia conectados para construir crescimento sustentável.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
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
        alt: "VIA — Quatro áreas. Uma direção de crescimento.",
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
    <html
      lang="pt-BR"
      className={`${inter.variable} ${spaceGrotesk.variable} ${libreBodoni.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
