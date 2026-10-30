import { Libre_Bodoni } from "next/font/google";
import Image from "next/image";
import { buildWhatsappUrl, email } from "./contact";
import { PortfolioContact, PortfolioFooter } from "./sections/portfolio-contact";
import { PortfolioGallery } from "./sections/portfolio-gallery";
import { PortfolioShowreel } from "./sections/portfolio-showreel";
import { SiteHeader } from "./sections/site-header";
import styles from "./portfolio-page.module.css";

// A serifada itálica é o traço pessoal da Sté nos títulos do portfólio; só
// esta página a carrega, e só no estilo itálico.
const editorial = Libre_Bodoni({
  variable: "--font-editorial",
  subsets: ["latin"],
  style: ["italic"],
});

// O openGraph da página substitui o do layout por inteiro, então a imagem
// social precisa ser declarada de novo aqui, com a prévia própria do portfólio.
export function portfolioMetadata(content, languages) {
  const { title, description, ogImage, ogImageAlt } = content.portfolio.meta;

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
          url: ogImage,
          width: 1200,
          height: 630,
          type: "image/jpeg",
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function PortfolioPage({ content }) {
  const { portfolio } = content;
  const { about, specialties, testimonials } = portfolio;
  const whatsappUrl = buildWhatsappUrl(content.contact.whatsappMessage);
  // O convite do fim já chega na conversa como pedido de produção para a Sté.
  const productionWhatsappUrl = buildWhatsappUrl(portfolio.whatsappMessage);
  const header = {
    ...content.header,
    langSwitch: { ...content.header.langSwitch, href: portfolio.langHref },
  };

  return (
    <main
      className={`via-dark-site ${styles.page} ${editorial.variable}`}
      id="conteudo-principal"
    >
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
        <p className="mono-label">{about.kicker}</p>
        <h1 id="sobre-titulo">
          {about.titleLead}
          <span>{about.titleHighlight}</span>
        </h1>
        <div className={styles.aboutGrid}>
          <div className={styles.portrait}>
            <Image
              src={about.image.src}
              alt={about.image.alt}
              width={about.image.width}
              height={about.image.height}
              sizes="(max-width: 820px) 100vw, 42vw"
              priority
            />
          </div>
          <div className={styles.aboutCopy}>
            <p className={styles.greeting}>{about.greeting}</p>
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
        </div>
      </section>

      <PortfolioShowreel content={portfolio.showreel} />

      <PortfolioGallery
        content={portfolio.gallery}
        items={portfolio.items}
        heading={portfolio}
      />



      <section
        className={`${styles.testimonials} section`}
        aria-labelledby="depoimentos-titulo"
      >
        <p className="mono-label">{testimonials.kicker}</p>
        <h2 id="depoimentos-titulo">
          {testimonials.titleLead}
          <span>{testimonials.titleHighlight}</span>
        </h2>
        <ul className={styles.quotes}>
          {testimonials.items.map((item) => (
            <li key={item.name + item.role}>
              <blockquote>{item.quote}</blockquote>
              <div className={styles.person}>
                <span className={styles.avatar}>
                  <Image src={item.avatar} alt="" fill sizes="48px" />
                </span>
                <span>
                  <b>{item.name}</b>
                  <span>{item.role}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section
        className={`${styles.specialties} section`}
        aria-labelledby="especialidades-titulo"
      >
        <header>
          <p className="mono-label">{specialties.kicker}</p>
          <h2 id="especialidades-titulo">
            {specialties.titleLead}
            <span>{specialties.titleHighlight}</span>
          </h2>
        </header>
        <ol className={styles.specialtyList}>
          {specialties.items.map((item, index) => (
            <li key={item.title}>
              <a href="#contato">
                {item.title}
                <small aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </small>
              </a>
            </li>
          ))}
        </ol>
      </section>


      <PortfolioContact
        id="contato"
        cta={{ ...content.finalCta, ...portfolio.finalCta }}
        whatsappUrl={productionWhatsappUrl}
        email={email}
      />
      <PortfolioFooter footer={content.footer} />
    </main>
  );
}
