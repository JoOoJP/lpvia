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

export function Capabilities({ content }) {
  return (
    <section className="dark-capabilities section" id="fazemos">
      <header className="dark-capabilities-head">
        <p className="dark-kicker">{content.kicker}</p>
        <h2>{content.title}</h2>
        <p>{content.description}</p>
      </header>

      <div className="dark-capability-grid">
        {content.items.map((capability, index) => (
          <CapabilityCard
            key={capability.title}
            number={String(index + 1).padStart(2, "0")}
            {...capability}
          />
        ))}
      </div>
    </section>
  );
}

function CapabilityCard({ accent, icon, number, title, text }) {
  return (
    <article className={`dark-capability-card dark-capability-${accent}`}>
      <div className="dark-capability-meta" aria-hidden="true">
        <CapabilityIcon name={icon} />
        <span>{number}</span>
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
