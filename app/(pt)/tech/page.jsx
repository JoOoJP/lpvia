import Link from "next/link";
import { ViaMark } from "../../ui/via-mark";
import { tech } from "./content";
import styles from "./tech.module.css";

// A página substitui alternates, openGraph e twitter do layout por inteiro:
// assim o hreflang não aponta para /en e a prévia não herda a imagem da VIA.
// A imagem social vem de opengraph-image.jsx e twitter-image.jsx.
export const metadata = {
  title: tech.meta.title,
  description: tech.meta.description,
  alternates: { canonical: "/tech" },
  openGraph: {
    title: tech.meta.title,
    description: tech.meta.description,
    type: "profile",
    locale: "pt_BR",
    url: "/tech",
  },
  twitter: {
    card: "summary_large_image",
    title: tech.meta.title,
    description: tech.meta.description,
  },
};

function Pending({ children }) {
  return <span className={styles.pending}>{children}</span>;
}

function ExternalLink({ href, children }) {
  return (
    <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
      {children}
      <span className={styles.arrow} aria-hidden="true">
        ↗
      </span>
      <span className={styles.visuallyHidden}> (abre em nova aba)</span>
    </a>
  );
}

function Item({ item }) {
  if (typeof item === "string") return item;
  return item.placeholder ? <Pending>{item.text}</Pending> : item.text;
}

function SectionHead({ index, id, children }) {
  return (
    <div className={styles.sectionHead}>
      <span className={styles.index} aria-hidden="true">
        {index}
      </span>
      <h2 id={id}>{children}</h2>
    </div>
  );
}

function Project({ project, index }) {
  const titleId = `projeto-${project.id}`;

  return (
    <article className={styles.project} aria-labelledby={titleId}>
      <header className={styles.projectHead}>
        <span className={styles.projectIndex} aria-hidden="true">
          {index}
        </span>
        <h3 id={titleId}>{project.name}</h3>
        {project.kind && <span className={styles.status}>{project.kind}</span>}
      </header>

      <p className={styles.projectSummary}>{project.summary}</p>

      {project.details && (
        <dl className={styles.details}>
          {project.details.map((detail) => (
            <div key={detail.term} className={styles.detailRow}>
              <dt>{detail.term}</dt>
              <dd>
                <ul className={detail.inline ? styles.inlineList : styles.plainList}>
                  {detail.items.map((item, i) => (
                    <li key={i}>
                      <Item item={item} />
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      )}

      {project.decisions && (
        <div className={styles.decisions}>
          <h4>{project.decisions.title}</h4>
          <ol>
            {project.decisions.items.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ol>
        </div>
      )}

      {project.sites && (
        <ul className={styles.sites}>
          {project.sites.map((site) => (
            <li key={site.name} className={styles.site}>
              <div className={styles.siteMedia}>
                <Pending>{site.image}</Pending>
              </div>
              <div className={styles.siteCopy}>
                <h4>
                  {site.name}
                  {site.tag && <span className={styles.tag}>{site.tag}</span>}
                </h4>
                <p>{site.description}</p>
                <p>
                  <Pending>{site.link}</Pending>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {project.demo && (
        <p className={styles.demo}>
          {project.demo.href ? (
            <ExternalLink href={project.demo.href}>{project.demo.label}</ExternalLink>
          ) : (
            project.demo.label
          )}
        </p>
      )}
    </article>
  );
}

export default function Page() {
  const { intro, projects, experience, background, stack, contact } = tech;

  return (
    <main className={styles.page} id="conteudo-principal">
      <div className={styles.shell}>
        <header className={styles.intro} aria-labelledby="tech-titulo">
          <p className={styles.path} aria-hidden="true">
            viamkt.com/tech
          </p>
          <h1 id="tech-titulo">{intro.name}</h1>
          <p className={styles.role}>{intro.role}</p>
          <p className={styles.summary}>{intro.summary}</p>
          <ul className={styles.introLinks}>
            {intro.links.map((link) => (
              <li key={link.label}>
                <ExternalLink href={link.href}>{link.label}</ExternalLink>
              </li>
            ))}
          </ul>
        </header>

        <section className={styles.section} aria-labelledby="projetos-titulo">
          <SectionHead index="01" id="projetos-titulo">
            Projetos em destaque
          </SectionHead>
          <div className={styles.sectionBody}>
            {projects.map((project, i) => (
              <Project
                key={project.id}
                project={project}
                index={String.fromCharCode(97 + i)}
              />
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="experiencia-titulo">
          <SectionHead index="02" id="experiencia-titulo">
            Experiência
          </SectionHead>
          <div className={styles.sectionBody}>
            <ol className={styles.timeline}>
              {experience.map((job) => (
                <li key={job.org}>
                  <p className={styles.jobLine}>
                    <strong>{job.org}</strong>
                    <span>{job.role}</span>
                  </p>
                  <p className={styles.jobMeta}>
                    <span>{job.period}</span>
                    {job.description && <span>{job.description}</span>}
                  </p>
                </li>
              ))}
            </ol>
            <dl className={styles.background}>
              {background.map((row) => (
                <div key={row.term} className={styles.detailRow}>
                  <dt>{row.term}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="stack-titulo">
          <SectionHead index="03" id="stack-titulo">
            Stack
          </SectionHead>
          <div className={styles.sectionBody}>
            <ul className={styles.stack}>
              {stack.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="contato-titulo">
          <SectionHead index="04" id="contato-titulo">
            Contato
          </SectionHead>
          <div className={styles.sectionBody}>
            <p className={styles.contactTitle}>{contact.title}</p>
            <ul className={styles.contactLinks}>
              <li>
                <ExternalLink href={contact.linkedin}>LinkedIn</ExternalLink>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className={styles.link}>
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </section>

        <footer className={styles.footer}>
          <Link href="/" className={styles.footerMark} aria-label="VIA, início">
            <ViaMark />
          </Link>
          <p>João Pombo, CTO da VIA.</p>
        </footer>
      </div>
    </main>
  );
}
