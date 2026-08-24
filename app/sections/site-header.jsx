"use client";

import { useEffect, useRef, useState } from "react";
import { whatsappUrl } from "../contact";
import { Arrow } from "../ui/arrow";
import { ViaMark } from "../ui/via-mark";

const navItems = [
  { id: "fazemos", label: "O que fazemos" },
  { id: "moikato", label: "Moikato" },
  { id: "trabalhos", label: "Trabalhos" },
  { id: "contato", label: "Contato" },
];

// Faixa estreita no meio da tela: a seção que a cruza é a que o visitante lê.
const ACTIVE_BAND = "-45% 0px -50% 0px";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);
  // Um link do painel manda o foco para a seção; só Escape e o próprio botão
  // devolvem o foco ao hambúrguer.
  const returnFocusRef = useRef(true);

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

    const panel = panelRef.current;
    const toggle = toggleRef.current;
    const focusables = () =>
      Array.from(panel.querySelectorAll("a[href], button:not([disabled])"));

    // O painel cobre a tela inteira: sem prender o Tab, o foco sai por baixo e
    // passeia pela página escondida atrás dele.
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const items = focusables();
      if (!items.length) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const outside = !panel.contains(active);

      if (event.shiftKey && (outside || active === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (outside || active === last)) {
        event.preventDefault();
        first.focus();
      }
    };

    // Sem isso a página corre por baixo do painel aberto.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    focusables()[0]?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);

      if (returnFocusRef.current) toggle?.focus();
      returnFocusRef.current = true;
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
          className="header-cta"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          Fale com a VIA <Arrow />
        </a>

        <button
          className="menu-toggle"
          type="button"
          ref={toggleRef}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <div
        className="menu-panel"
        id="menu-mobile"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!menuOpen}
      >
        <nav aria-label="Navegação principal, versão compacta">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "true" : undefined}
              onClick={() => {
                returnFocusRef.current = false;
                setMenuOpen(false);
              }}
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
          onClick={() => {
            returnFocusRef.current = false;
            setMenuOpen(false);
          }}
        >
          Fale com a VIA <Arrow />
        </a>
      </div>
    </header>
  );
}
