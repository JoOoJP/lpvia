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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const title = "VIA — Sistema de crescimento";
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
        url: "/og-via.png",
        width: 1200,
        height: 630,
        alt: "VIA — Quatro áreas. Uma direção de crescimento.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-via.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${spaceGrotesk.variable} ${libreBodoni.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
