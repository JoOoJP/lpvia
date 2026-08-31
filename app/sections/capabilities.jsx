import Image from "next/image";
import { Arrow } from "../ui/arrow";

const capabilities = [
  {
    accent: "purple",
    icon: "marca",
    title: "Marca & identidade",
    text: "Posicionamento, naming, logo e um sistema visual que sustenta a marca.",
    reference: {
      client: "In Tha Route",
      href: "#case-in-tha-route",
      image: "/projects/route-primary.webp",
      // Marca precisa caber inteira: recorte em faixa come o lettering.
      position: "right center",
      fit: "contain",
    },
  },
  {
    accent: "blue",
    icon: "site",
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
    icon: "conteudo",
    title: "Conteúdo & campanhas",
    text: "Social media, gestão de redes, roteiros e campanhas com direção criativa.",
    reference: {
      client: "Conteúdo visual",
      href: "#case-conteudo-visual",
      image: "/projects/latino-beats.webp",
      position: "center 34%",
    },
  },
  {
    accent: "green",
    icon: "trafego",
    title: "Tráfego & performance",
    text: "Crescimento orgânico e pago com leitura, aprendizado e próxima ação.",
    reference: {
      client: "Clínicas na área da saúde",
      href: "#case-saude",
    },
  },
  {
    accent: "blue",
    icon: "estrategia",
    title: "Estratégia & comercial",
    text: "Oferta e processo conectados para aproximar demanda de receita.",
    reference: {
      client: "Moikato",
      href: "#case-moikato",
      image: "/projects/moikato-brand.webp",
      // Letreiro largo: em miniatura quadrada, cover corta o lettering no meio.
      position: "center",
      fit: "contain",
    },
  },
  {
    accent: "cyan",
    icon: "tecnologia",
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

const capabilityIcons = {
  marca: (
    <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
  ),
  site: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 9h18M6.4 6.75h.01M9.1 6.75h.01" />
    </>
  ),
  conteudo: (
    <>
      <rect x="3" y="6" width="12" height="12" rx="2" />
      <path d="M15 10.5 21 7v10l-6-3.5" />
    </>
  ),
  trafego: (
    <path d="M3 17.5 9 11l4 3.5L21 6M21 6h-5m5 0v5" />
  ),
  estrategia: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" />
    </>
  ),
  tecnologia: (
    <>
      <rect x="7.5" y="7.5" width="9" height="9" rx="1.5" />
      <path d="M10 3.5v4M14 3.5v4M10 16.5v4M14 16.5v4M3.5 10h4M3.5 14h4M16.5 10h4M16.5 14h4" />
    </>
  ),
};

function CapabilityIcon({ name }) {
  return (
    <svg
      className="dark-capability-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {capabilityIcons[name]}
    </svg>
  );
}

export function Capabilities() {
  return (
    <section className="dark-capabilities section" id="fazemos">
      <header className="dark-capabilities-head">
        <p className="dark-kicker">DA IDEIA À OPERAÇÃO</p>
        <h2>A VIA pensa e faz.</h2>
        <p>
          Estratégia e execução caminham juntas para transformar ideias em
          marcas, experiências e crescimento real.
        </p>
      </header>

      <div className="dark-capability-grid">
        {capabilities.map((capability) => (
          <CapabilityCard key={capability.title} {...capability} />
        ))}
      </div>
    </section>
  );
}

function CapabilityCard({ accent, icon, title, text, reference }) {
  return (
    <article className={`dark-capability-card dark-capability-${accent}`}>
      <CapabilityIcon name={icon} />
      <h3>{title}</h3>
      <p>{text}</p>
      <a
        className="dark-capability-preview"
        href={reference.href}
        aria-label={`Ver ${reference.client} como exemplo de ${title}`}
      >
        {reference.image ? (
          <span className="dark-capability-art">
            <Image
              src={reference.image}
              alt=""
              fill
              sizes="84px"
              style={{
                objectPosition: reference.position,
                objectFit: reference.fit,
              }}
            />
          </span>
        ) : (
          <span className="dark-capability-art dark-capability-art-empty" aria-hidden="true">
            +
          </span>
        )}
        <strong>{reference.client}</strong>
        <Arrow />
      </a>
    </article>
  );
}
