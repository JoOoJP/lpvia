import { JetBrains_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ViaMark } from "../../ui/via-mark";
import { tech } from "./content";
import styles from "./tech.module.css";
import { Typing } from "./typing";

// A página inteira é uma sessão de terminal, e a digitação dos comandos é
// medida em `ch`: precisa de uma monoespaçada que seja a mesma em todo
// sistema, por isso ela vem da Google Fonts em vez da fonte do aparelho.
const mono = JetBrains_Mono({
  variable: "--font-tech-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

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

const shortUrl = (href) => href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function ExternalLink({ href, children }) {
  return (
    <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
      {children}
      <span className={styles.visuallyHidden}> (abre em nova aba)</span>
    </a>
  );
}

function Arrow() {
  return (
    <span className={styles.arrow} aria-hidden="true">
      →
    </span>
  );
}

/*
 * Um comando e a saída dele. O título da seção é o que o leitor de tela
 * anuncia; o comando é só desenho. `as` deixa o README de cada projeto
 * descer um nível na hierarquia.
 */
function Block({ id, cwd, command, title, as: Heading = "h2", children }) {
  const titleId = `${id}-titulo`;

  return (
    <section
      id={id}
      className={styles.block}
      aria-labelledby={titleId}
      data-typing=""
      style={{ "--chars": command.length }}
    >
      <Heading id={titleId} className={styles.prompt}>
        <span className={styles.visuallyHidden}>{title}</span>
        <span aria-hidden="true">
          <span className={styles.cwd}>{cwd}</span>
          <span className={styles.dollar}> $ </span>
          <span className={styles.command}>{command}</span>
        </span>
      </Heading>
      <div className={styles.output}>{children}</div>
    </section>
  );
}

function MdHeading({ level, children }) {
  return (
    <h4 className={styles.mdHeading}>
      <span className={styles.mdMark} aria-hidden="true">
        {"#".repeat(level)}{" "}
      </span>
      {children}
    </h4>
  );
}

function Readme({ project }) {
  return (
    <>
      <p className={styles.mdTitle}>
        <span className={styles.mdMark} aria-hidden="true">
          #{" "}
        </span>
        {project.name}
        {project.kind && <span className={styles.status}>{project.kind}</span>}
      </p>
      <p className={styles.muted}>{project.summary}</p>

      {project.details.map((detail) => (
        <div key={detail.term} className={styles.mdSection}>
          <MdHeading level={2}>{detail.term}</MdHeading>
          <ul className={detail.inline ? styles.inlineList : styles.bullets}>
            {detail.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}

      {project.decisions && (
        <div className={styles.mdSection}>
          <MdHeading level={2}>{project.decisions.title}</MdHeading>
          <ol className={styles.decisions}>
            {project.decisions.items.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ol>
        </div>
      )}

      {project.demo && (
        <p className={styles.demo}>
          <span aria-hidden="true">&gt; </span>
          {project.demo.href ? (
            <ExternalLink href={project.demo.href}>{project.demo.label}</ExternalLink>
          ) : (
            project.demo.label
          )}
        </p>
      )}
    </>
  );
}

// Print do computador numa janela com a barra de endereço, e o do celular
// sobreposto no canto: o mesmo site nas duas telas, de relance.
function Shots({ site }) {
  const domain = site.display ?? shortUrl(site.href);

  return (
    <figure className={styles.shots}>
      <div className={styles.browser}>
        <div className={styles.addressBar} aria-hidden="true">
          {domain}
        </div>
        <Image
          src={`/tech/${site.shots}-desktop.webp`}
          alt={`Página inicial do site ${site.name} no computador`}
          width={1600}
          height={1000}
          sizes="(max-width: 640px) 90vw, 600px"
        />
      </div>
      <div className={styles.phone}>
        <Image
          src={`/tech/${site.shots}-mobile.webp`}
          alt={`Página inicial do site ${site.name} no celular`}
          width={600}
          height={1298}
          sizes="(max-width: 640px) 26vw, 150px"
        />
      </div>
    </figure>
  );
}

export default function Page() {
  const { intro, projects, experience, background, stack, contact } = tech;
  const readmes = projects.filter((project) => !project.sites);
  const sites = projects.find((project) => project.sites);

  return (
    <main className={`${styles.page} ${mono.variable}`} id="conteudo-principal">
      <div className={styles.window}>
        <div className={styles.titleBar} aria-hidden="true">
          <span className={styles.titleMark}>
            <ViaMark />
          </span>
          <span>joao@via: ~/tech</span>
        </div>

        <div className={styles.screen}>
          <Block id="quem" cwd="~" command="whoami" title="Apresentação">
            <h1 className={styles.name}>{intro.name}</h1>
            <p className={styles.role}>{intro.role}</p>
            <p className={styles.muted}>{intro.summary}</p>
            <ul className={styles.links}>
              {intro.links.map((link) => (
                <li key={link.label}>
                  <span className={styles.key}>{link.label.toLowerCase()}</span>
                  <Arrow />
                  <ExternalLink href={link.href}>{shortUrl(link.href)}</ExternalLink>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="projetos" cwd="~" command="cd projetos && ls" title="Projetos em destaque">
            <ul className={styles.ls}>
              {projects.map((project) => (
                <li key={project.id}>
                  <a href={`#${project.id}`} className={styles.dir}>
                    {project.id}/
                  </a>
                </li>
              ))}
            </ul>
          </Block>

          {readmes.map((project) => (
            <Block
              key={project.id}
              id={project.id}
              cwd="~/projetos"
              command={`cat ${project.id}/README.md`}
              title={project.name}
              as="h3"
            >
              <Readme project={project} />
            </Block>
          ))}

          {sites && (
            <Block
              id={sites.id}
              cwd="~/projetos"
              command={`ls ${sites.id}/`}
              title={sites.name}
              as="h3"
            >
              <p className={styles.comment}># {sites.summary}</p>
              <ul className={styles.sites}>
                {sites.sites.map((site) => (
                  <li key={site.name} className={styles.site}>
                    <div className={styles.siteCopy}>
                      <h4 className={styles.siteName}>
                        <span className={styles.dir}>{site.dir ?? site.name.toLowerCase()}/</span>
                      </h4>
                      <p>{site.description}</p>
                      <p className={styles.siteLink}>
                        <Arrow />{" "}
                        <ExternalLink href={site.href}>
                          {site.display ?? shortUrl(site.href)}
                        </ExternalLink>
                      </p>
                    </div>
                    <Shots site={site} />
                  </li>
                ))}
              </ul>
            </Block>
          )}

          <Block
            id="experiencia"
            cwd="~/projetos"
            command="cd .. && cat experiencia.log"
            title="Experiência"
          >
            <ol className={styles.log}>
              {experience.map((job) => (
                <li key={job.org}>
                  <span className={styles.period}>[{job.period}]</span>
                  <span className={styles.logEntry}>
                    <strong>{job.org}</strong>
                    <span className={styles.muted}> · {job.role}</span>
                    {job.description && (
                      <span className={styles.logNote}>{job.description}</span>
                    )}
                  </span>
                </li>
              ))}
            </ol>
            <dl className={styles.background}>
              {background.map((row) => (
                <div key={row.term}>
                  <dt>{row.term.toLowerCase()}:</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block id="stack" cwd="~" command="cat stack.json" title="Stack">
            <div className={styles.json}>
              <span className={styles.punct}>{"{"}</span>
              <div className={styles.jsonBody}>
                <span className={styles.key}>&quot;stack&quot;</span>
                <span className={styles.punct}>: [</span>
                <ul className={styles.jsonArray}>
                  {stack.map((tool) => (
                    <li key={tool}>
                      <span className={styles.string}>&quot;{tool}&quot;</span>
                    </li>
                  ))}
                </ul>
                <span className={styles.punct}>]</span>
              </div>
              <span className={styles.punct}>{"}"}</span>
            </div>
          </Block>

          <Block id="contato" cwd="~" command="contato" title="Contato">
            <ul className={styles.links}>
              <li>
                <span className={styles.key}>linkedin</span>
                <Arrow />
                <ExternalLink href={contact.linkedin}>{shortUrl(contact.linkedin)}</ExternalLink>
              </li>
              <li>
                <span className={styles.key}>e-mail</span>
                <Arrow />
                <a href={`mailto:${contact.email}`} className={styles.link}>
                  {contact.email}
                </a>
              </li>
            </ul>
          </Block>

          <p className={styles.idle} aria-hidden="true">
            <span className={styles.cwd}>~</span>
            <span className={styles.dollar}> $ </span>
            <span className={styles.cursor} />
          </p>
        </div>
      </div>

      <footer className={styles.footer}>
        <Link href="/" className={styles.footerMark} aria-label="VIA, início">
          <ViaMark />
        </Link>
        <p>João Pombo, CTO da VIA.</p>
      </footer>

      <Typing />
    </main>
  );
}
