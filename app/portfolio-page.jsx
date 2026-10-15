import Image from "next/image";
import { buildWhatsappUrl } from "./contact";
import { FinalCta } from "./sections/final-cta";
import { PortfolioGallery } from "./sections/portfolio-gallery";
import { PortfolioShowreel } from "./sections/portfolio-showreel";
import { SiteFooter } from "./sections/site-footer";
import { SiteHeader } from "./sections/site-header";
import styles from "./portfolio-page.module.css";

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
  const { about, specialties, clients } = portfolio;
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
              <span className={styles.specialtyNumber} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
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

      <section className={`${styles.clients} section`} aria-label={clients.label}>
        <p>{clients.label}</p>
        <ul>
          {clients.names.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </section>

      <FinalCta
        content={{ ...content.finalCta, ...portfolio.finalCta }}
        whatsappUrl={productionWhatsappUrl}
      />
      <SiteFooter content={content.footer} whatsappUrl={whatsappUrl} />
    </main>
  );
}
