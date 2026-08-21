import Image from "next/image";
import { Arrow } from "../ui/arrow";

const projectServices = [
  { slug: "logo", title: "Logo e identidade visual" },
  { slug: "landing", title: "Landing pages" },
  { slug: "sites", title: "Sites institucionais" },
  { slug: "naming", title: "Naming e posicionamento" },
  { slug: "content", title: "Conteúdo e criativos" },
  { slug: "traffic", title: "Gestão de tráfego pago" },
  { slug: "brand", title: "Registro de marca" },
  { slug: "automation", title: "Automações e IA" },
  { slug: "consulting", title: "Consultoria comercial" },
  { slug: "advisory", title: "Assessoria de marketing" },
  { slug: "social", title: "Social media e gestão de redes" },
  { slug: "scripts", title: "Construção de roteiros" },
];

const capabilities = [
  {
    accent: "purple",
    title: "Marca & identidade",
    text: "Posicionamento, naming, logo e um sistema visual que sustenta a marca.",
    reference: {
      client: "In Tha Route",
      href: "#case-in-tha-route",
      image: "/projects/route-primary.webp",
      position: "center",
    },
  },
  {
    accent: "blue",
    title: "Sites & landing pages",
    text: "Experiências digitais para apresentar, conduzir e converter.",
    reference: {
      client: "A Tardinha",
      href: "#case-tardinha",
      image: "/tardinha.webp",
      position: "center",
      fit: "contain",
    },
  },
  {
    accent: "cyan",
    title: "Conteúdo & campanhas",
    text: "Social media, gestão de redes, roteiros e campanhas com direção criativa.",
    reference: {
      client: "Latino Beats",
      href: "#case-latino-beats",
      image: "/projects/latino-beats.webp",
      position: "center 34%",
    },
  },
  {
    accent: "green",
    title: "Tráfego & performance",
    text: "Crescimento orgânico e pago com leitura, aprendizado e próxima ação.",
    reference: {
      client: "Clínicas na área da saúde",
      href: "#case-saude",
      kind: "health",
    },
  },
  {
    accent: "blue",
    title: "Estratégia & comercial",
    text: "Oferta e processo conectados para aproximar demanda de receita.",
    reference: {
      client: "Moikato",
      href: "#case-moikato",
      image: "/projects/moikato-brand.webp",
      position: "center",
    },
  },
  {
    accent: "cyan",
    title: "Tecnologia & automação",
    text: "Sites, CRM, automações e IA aplicados ao negócio.",
    reference: {
      client: "Moikato",
      href: "#case-moikato",
      image: "/via-moikato-london.webp",
      position: "center 38%",
    },
  },
];

export function Capabilities() {
  return (
    <section className="dark-capabilities section" id="fazemos">
      <header className="dark-capabilities-head">
        <div>
          <p className="dark-kicker">DA IDEIA À OPERAÇÃO</p>
          <h2>A VIA pensa e faz.</h2>
          <p>
            Estratégia e execução caminham juntas para transformar ideias em
            marcas, experiências e crescimento real.
          </p>
        </div>
        <div className="dark-capabilities-signal" aria-hidden="true">
          <i />
          <i />
          <span />
        </div>
      </header>

      <div className="dark-capability-grid">
        {capabilities.map((capability, index) => (
          <CapabilityCard
            key={capability.title}
            index={String(index + 1).padStart(2, "0")}
            {...capability}
          />
        ))}
      </div>

      <aside
        className="dark-project-services"
        id="projetos-pontuais"
        aria-labelledby="project-services-title"
      >
        <header>
          <p className="dark-kicker">PROJETOS PONTUAIS</p>
          <h3 id="project-services-title">
            Uma peça específica também move o todo.
          </h3>
          <p>Escopo fechado, entrega clara e a mesma direção estratégica.</p>
        </header>
        <ol>
          {projectServices.map((service, index) => (
            <li key={service.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{service.title}</strong>
            </li>
          ))}
        </ol>
      </aside>
    </section>
  );
}

function CapabilityCard({ index, accent, title, text, reference }) {
  return (
    <article className={`dark-capability-card dark-capability-${accent}`}>
      <span>{index}</span>
      <div className="dark-capability-icon" aria-hidden="true">
        <i />
        <i />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
      <a
        className={`dark-capability-preview${reference.kind ? ` dark-capability-preview-${reference.kind}` : ""}`}
        href={reference.href}
        aria-label={`Ver ${reference.client} como exemplo de ${title}`}
      >
        {reference.image ? (
          <Image
            src={reference.image}
            alt=""
            fill
            sizes="(max-width: 720px) 50vw, 33vw"
            style={{
              objectPosition: reference.position,
              objectFit: reference.fit,
            }}
          />
        ) : null}
        <strong>{reference.client}</strong>
        <Arrow />
      </a>
    </article>
  );
}
