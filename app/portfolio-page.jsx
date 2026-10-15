import Image from "next/image";
import { buildWhatsappUrl } from "./contact";
import { FinalCta } from "./sections/final-cta";
import { PortfolioGallery } from "./sections/portfolio-gallery";
import { PortfolioShowreel } from "./sections/portfolio-showreel";
import { SiteFooter } from "./sections/site-footer";
import { SiteHeader } from "./sections/site-header";
import styles from "./portfolio-page.module.css";

const specialtyIcons = {
  camera: (
    <>
      <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.2l1.1-1.8A1.5 1.5 0 0 1 10.1 4.5h3.8a1.5 1.5 0 0 1 1.3.7L16.3 7h2.2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-9Z" />
      <circle cx="12" cy="13" r="3.4" />
    </>
  ),
  film: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="M7.5 5v14M16.5 5v14M3.5 9.5h4M3.5 14.5h4M16.5 9.5h4M16.5 14.5h4" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2.4" />
      <path d="m10.8 9.6 3.2 2.4-3.2 2.4V9.6Z" />
    </>
  ),
  image: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m4 17 4.6-4.4a1.5 1.5 0 0 1 2.1 0L14 16l2-2a1.5 1.5 0 0 1 2.1 0L20 15.8" />
    </>
  ),
};

function SpecialtyIcon({ name }) {
  return (
    <svg
      className={styles.specialtyIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {specialtyIcons[name]}
    </svg>
  );
}

// O openGraph da página substitui o do layout por inteiro, então a imagem
// social precisa ser declarada de novo aqui.
export function portfolioMetadata(content, languages) {
  const { title, description } = content.portfolio.meta;

  return {
    title,
    description,
    alternates: { canonical: content.portfolio.path, languages },
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
}

export function PortfolioPage({ content }) {
  const { portfolio } = content;
  const { about, specialties } = portfolio;
  const whatsappUrl = buildWhatsappUrl(content.contact.whatsappMessage);
  // O convite do fim já chega na conversa como pedido de produção para a Sté.
  const productionWhatsappUrl = buildWhatsappUrl(portfolio.whatsappMessage);
  const header = {
    ...content.header,
    langSwitch: { ...content.header.langSwitch, href: portfolio.langHref },
  };

  return (
    <main className="via-dark-site" id="conteudo-principal">
      <SiteHeader
        content={header}
        whatsappUrl={whatsappUrl}
        pageBase={content.path}
        localAnchors={["contato"]}
        currentPage="portfolio"
      />

      <section
        className={`${styles.intro} section`}
        id="inicio"
        aria-labelledby="sobre-titulo"
      >
        <div className={styles.portrait}>
          <Image
            src={about.image.src}
            alt={about.image.alt}
            width={about.image.width}
            height={about.image.height}
            sizes="(max-width: 760px) 100vw, 40vw"
            priority
          />
        </div>
        <div className={styles.aboutCopy}>
          <p className="dark-kicker">{about.kicker}</p>
          <h1 id="sobre-titulo">
            {about.titleLead}
            <span>{about.titleHighlight}</span>
          </h1>
          {about.paragraphs.map((paragraph) => (
            <p className={styles.lead} key={paragraph}>
              {paragraph}
            </p>
          ))}
          <ul className={styles.skills}>
            {about.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </section>

      <PortfolioShowreel content={portfolio.showreel} />

      <section
        className={`${styles.specialties} section`}
        aria-labelledby="especialidades-titulo"
      >
        <header>
          <p className="dark-kicker">{specialties.kicker}</p>
          <h2 id="especialidades-titulo">
            {specialties.titleLead}
            <span>{specialties.titleHighlight}</span>
          </h2>
        </header>
        <ol className={styles.specialtyList}>
          {specialties.items.map((item, index) => (
            <li key={item.title}>
              <div className={styles.specialtyTop}>
                <span className={styles.specialtyNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <SpecialtyIcon name={item.icon} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <PortfolioGallery content={portfolio.gallery} items={portfolio.items}>
        <header className={styles.galleryHeader}>
          <p className="dark-kicker">{portfolio.kicker}</p>
          <h2>
            {portfolio.titleLead}
            <span>{portfolio.titleHighlight}</span>
          </h2>
          <p className={styles.lead}>{portfolio.description}</p>
        </header>
      </PortfolioGallery>

      <FinalCta
        content={{ ...content.finalCta, ...portfolio.finalCta }}
        whatsappUrl={productionWhatsappUrl}
      />
      <SiteFooter content={content.footer} whatsappUrl={whatsappUrl} />
    </main>
  );
}
