import { pt as content } from "../content/pt";
import { siteUrl } from "../site";
import { RootShell } from "../ui/root-shell";

const title = content.meta.title;
const description = content.meta.description;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
      en: "/en",
      "x-default": "/",
    },
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
        alt: content.meta.ogImageAlt,
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
  return (
    <RootShell lang={content.htmlLang} skipLinkLabel={content.skipLinkLabel}>
      {children}
    </RootShell>
  );
}
