"use client";

import { useEffect, useState } from "react";
import { whatsappUrl } from "../contact";
import { Arrow } from "../ui/arrow";
import { ViaMark } from "../ui/via-mark";

const navItems = [
  { id: "como-funciona", label: "Como funciona" },
  { id: "cases", label: "Cases" },
  { id: "produtos", label: "Soluções" },
];

// Faixa estreita no meio da tela: a seção que a cruza é a que o visitante lê.
const ACTIVE_BAND = "-45% 0px -50% 0px";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const readScroll = () => setScrolled(window.scrollY > 24);
    readScroll();
    window.addEventListener("scroll", readScroll, { passive: true });
    return () => window.removeEventListener("scroll", readScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          } else {
            setActiveId((current) =>
              current === entry.target.id ? null : current,
            );
          }
        });
      },
      { rootMargin: ACTIVE_BAND },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    // Sem isso a página corre por baixo do painel aberto.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const headerClass = [
    "site-header",
    scrolled ? "site-header-solid" : "",
    menuOpen ? "site-header-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass}>
      <a className="logo" href="#inicio">
        <ViaMark title="VIA, início" />
      </a>

      <nav className="site-nav" aria-label="Navegação principal">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={activeId === item.id ? "true" : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <a
          className="secondary-link header-cta"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          <span>Fale conosco</span> <Arrow />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <div className="menu-panel" id="menu-mobile" hidden={!menuOpen}>
        <nav aria-label="Navegação principal, versão compacta">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "true" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="button button-gradient"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          Agendar diagnóstico <Arrow />
        </a>
      </div>
    </header>
  );
}
