import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata() {
  const headerStore = await headers();
  const host = headerStore.get("host") || "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const base = new URL(`${protocol}://${host}`);
  const title = "VIA — Sistema de crescimento";
  const description =
    "Estratégia, marketing, comercial e tecnologia conectados para construir crescimento sustentável.";

  return {
    metadataBase: base,
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
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
