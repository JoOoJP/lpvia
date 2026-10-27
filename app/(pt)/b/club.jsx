"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useId, useRef, useState } from "react";
import { buildWhatsappUrl, email, emailUrl } from "../../contact";
import { EngravedLogo } from "./engraved-logo";
import styles from "./club.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const whatsappUrl = buildWhatsappUrl("Oi, VIA. Quero conversar sobre a minha marca.");

/*
 * Conteúdo que a linha percorre. Em cada bloco com data-anchor a linha passa
 * pelo lado indicado em data-line; nas cenas (data-scene) ela some da página
 * e uma linha local, presa na tela, desenha o símbolo do benefício.
 */
const opening = {
  lead: "Toda marca tem um caminho. ",
  highlight: "A gente constrói a VIA.",
};

// Os seis serviços da VIA, agrupados em três frentes do trabalho com o cliente.
const benefits = [
  {
    key: "presenca",
    number: "01",
    name: "Presença",
    line: "Ser visto do jeito certo.",
    explain: "Criamos a marca e cuidamos de como ela aparece: identidade, conteúdo e redes.",
    items: ["Marca & identidade", "Conteúdo", "Social media", "Campanhas"],
    // Reels que passam dentro da lente, um por trecho de scroll.
    gallery: [
      {
        video: "/portfolio/galaticos-ft-preview.mp4",
        image: "/portfolio/galaticos-ft-poster.webp",
        title: "Cobertura de evento",
        detail: "Reels & conteúdo",
      },
      {
        video: "/portfolio/mundo-egipcio-preview.mp4",
        image: "/portfolio/mundo-egipcio-poster.webp",
        title: "Mundo Egípcio",
        detail: "Reels para loja",
      },
      {
        video: "/portfolio/salao-de-beleza-preview.mp4",
        image: "/portfolio/salao-de-beleza-poster.webp",
        title: "Salão de beleza",
        detail: "Reels de beleza",
      },
    ],
  },
  {
    key: "crescimento",
    number: "02",
    name: "Crescimento",
    line: "Atenção que vira negócio.",
    explain: "Planejamos e executamos o que traz cliente: tráfego, performance e processo comercial.",
    // Dossiê do caso Moikato (história do site principal): um degrau por
    // etapa, a etapa atual em tipografia grande e, no topo, o depoimento na
    // lente, a única imagem da cena.
    story: "Caso Moikato · Brasil → Reino Unido",
    steps: [
      {
        numeral: "I",
        title: "Marca",
        text: "Demos forma à essência: posicionamento, identidade e narrativa.",
      },
      {
        numeral: "II",
        title: "Expansão",
        text: "Levamos a marca a dois mercados: conteúdo e site bilíngue.",
      },
      // A última etapa não tem texto no palco: é a lente com o depoimento.
      { numeral: "III", title: "Resultado" },
    ],
    // Entregas do caso (site principal → system.deliveries). Cada uma
    // aparece no degrau em que aconteceu e fica: o rastro do que foi feito.
    // `at` é a posição na tela em frações (x, y); `step` é o degrau. A cor
    // percorre o gradiente do logo conforme a escada sobe: roxo → verde.
    deliveries: [
      { label: "Posicionamento", step: 0, at: [0.12, 0.62], color: "#8b5cff" },
      { label: "Marca", step: 0, at: [0.24, 0.58], color: "#6a6cff" },
      { label: "Narrativa", step: 0, at: [0.14, 0.54], color: "#4d8dff" },
      { label: "Conteúdo", step: 1, at: [0.27, 0.5], color: "#2aa6f5" },
      { label: "Site bilíngue", step: 1, at: [0.17, 0.46], color: "#1fd0e6" },
      { label: "Internacionalização", step: 2, at: [0.28, 0.41], color: "#45ec8c" },
    ],
    quote: "“Eles acreditaram no meu trabalho.”",
    quoteAuthor: "Samuel · Empresário em Londres",
    gallery: [
      {
        video: "/depoimento-samuel-moikato.mp4",
        image: "/depoimento-samuel-moikato.jpg",
        title: "Samuel",
        detail: "Depoimento",
        heavy: true,
      },
    ],
    items: ["Tráfego pago", "Performance", "Estratégia", "Comercial"],
  },
  {
    key: "tecnologia",
    number: "03",
    name: "Tecnologia",
    line: "O que sustenta, por trás.",
    explain: "Construímos a estrutura digital do negócio: sites, CRM, automações e IA.",
    /*
     * Mini navegador dentro da moldura: uma aba por site. `embed` mostra o
     * site ao vivo (só para sites que aceitam ser exibidos em outra página;
     * moikato.com responde X-Frame-Options: DENY). Sem embed, vale o print;
     * sem print, um esqueleto de página até chegar o material.
     */
    sites: [
      {
        name: "Moikato",
        url: "moikato.com",
        href: "https://moikato.com",
        image: "/projects/moikato-brand.webp",
        color: "#8b5cff",
      },
      {
        name: "A Tardinha",
        url: "tardinhariosolimões.com",
        href: "https://xn--tardinhariosolimes-82b.com/",
        embed: "https://xn--tardinhariosolimes-82b.com/",
        color: "#4d8dff",
      },
      { name: "Site 03", url: "aguardando print", color: "#1fd0e6" },
      { name: "Site 04", url: "aguardando print", color: "#2aa6f5" },
      { name: "Site 05", url: "aguardando print", color: "#45ec8c" },
    ],
    items: ["Sites & landing pages", "CRM", "Automação", "IA aplicada"],
  },
];

// Gradiente vertical da linha do site. As cenas leem a cor nos pontos de
// entrada e saída para emendar sem troca de cor.
const LINE_STOPS = [
  [0, "#1aa8ee"],
  [0.28, "#7b3cff"],
  [0.55, "#3d7bff"],
  [0.8, "#45ec8c"],
  [1, "#14d2ec"],
];

function colorAt(fraction) {
  const f = Math.min(1, Math.max(0, fraction));
  let i = 1;
  while (i < LINE_STOPS.length - 1 && LINE_STOPS[i][0] < f) i += 1;
  const [f0, c0] = LINE_STOPS[i - 1];
  const [f1, c1] = LINE_STOPS[i];
  const t = f1 === f0 ? 0 : (f - f0) / (f1 - f0);
  const channel = (c, k) => parseInt(c.slice(1 + k * 2, 3 + k * 2), 16);
  const mix = [0, 1, 2].map((k) => Math.round(channel(c0, k) + (channel(c1, k) - channel(c0, k)) * t));
  return `rgb(${mix.join(" ")})`;
}

/*
 * Símbolo de cada benefício, desenhado pela linha dentro de uma tela de
 * w × h. Devolve o caminho, os cantos que acendem (Tecnologia) e o x de
 * entrada e saída, onde a linha do site chega e continua.
 */
function benefitPath(key, w, h, word) {
  const cx = w / 2;
  if (key === "presenca") {
    // Uma lente se abre em volta da palavra: um círculo e meio. No celular a
    // lente sobe, para o texto caber embaixo sem a linha cruzá-lo.
    const narrow = w < 760;
    const r = Math.min(Math.max(word.width / 2 + 36, word.height * 1.4), h * 0.42, w * (narrow ? 0.42 : 0.46));
    const cy = narrow ? h * 0.42 : h / 2;
    const symbol =
      `M ${cx} 0 V ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r}` +
      ` A ${r} ${r} 0 1 1 ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r}`;
    return {
      d: `${symbol} V ${h}`,
      // Até aqui a linha desenha a lente; depois espera a galeria acabar.
      hold: symbol,
      lens: { cx, cy, r },
      corners: [],
      entry: cx,
      exit: cx,
    };
  }
  if (key === "crescimento") {
    // Escada fina à esquerda; do último patamar a linha segue para a direita
    // e desenha a lente do depoimento. A linha sai pelo pé da lente.
    const narrow = w < 760;
    const left = w * 0.08;
    const stairsEnd = narrow ? w * 0.92 : w * 0.46;
    const levels = narrow ? [h * 0.92, h * 0.86, h * 0.8] : [h * 0.9, h * 0.8, h * 0.7];
    const xs = [0, 1, 2, 3].map((i) => left + ((stairsEnd - left) * i) / 3);
    const r = narrow ? Math.min(w * 0.3, h * 0.17) : Math.min(h * 0.24, w * 0.2);
    const lensX = narrow ? cx : w * 0.72;
    const lensBottom = narrow ? h * 0.68 : levels[2];
    let d = `M ${cx} 0 V ${h * 0.1} H ${left} V ${levels[0]}`;
    levels.forEach((y, i) => {
      d += ` H ${xs[i + 1]}`;
      if (i < levels.length - 1) d += ` V ${levels[i + 1]}`;
    });
    // Do último patamar até o pé da lente, e a volta inteira nela.
    d += narrow ? ` V ${lensBottom} H ${lensX}` : ` H ${lensX}`;
    const symbol =
      `${d} A ${r} ${r} 0 1 1 ${lensX} ${lensBottom - 2 * r}` + ` A ${r} ${r} 0 1 1 ${lensX} ${lensBottom}`;
    const landings = levels.map((y, i) => ({ x0: xs[i], x1: xs[i + 1], y }));
    return {
      d: `${symbol} V ${h}`,
      hold: symbol,
      lens: { cx: lensX, cy: lensBottom - r, r },
      // Cada etapa acende quando a linha chega ao meio do seu patamar.
      marks: landings.map(({ x0, x1, y }) => [(x0 + x1) / 2, y]),
      landings,
      corners: [],
      entry: cx,
      exit: lensX,
    };
  }
  /*
   * Tecnologia: o circuito vira a moldura de uma tela. A linha entra onde a
   * cena anterior saiu, contorna a moldura quase toda (cada canto acende) e,
   * para sair, refaz o lado esquerdo e desce. Dentro da moldura as telas ligam.
   */
  const narrow = w < 760;
  const entry = narrow ? cx : w * 0.72;
  const left = narrow ? w * 0.08 : w * 0.28;
  const right = narrow ? w * 0.92 : w * 0.9;
  const top = narrow ? h * 0.42 : h * 0.14;
  const bottom = narrow ? h * 0.86 : h * 0.8;
  const close = narrow ? w * 0.42 : w * 0.66;
  // No celular o texto fica no alto, em toda a largura: a linha passa por
  // cima dele (a 8% da altura) e desce pela direita até a moldura.
  const corners = narrow
    ? [
        [entry, h * 0.08],
        [right, h * 0.08],
        [right, bottom],
        [left, bottom],
        [left, top],
      ]
    : [
        [entry, top],
        [right, top],
        [right, bottom],
        [left, bottom],
        [left, top],
      ];
  const symbol = `M ${entry} 0 ${corners.map(([x, y]) => `L ${x} ${y}`).join(" ")} H ${close}`;
  const inset = narrow ? 14 : 26;
  return {
    d: `${symbol} H ${left} V ${h}`,
    hold: symbol,
    screen: {
      x: left + inset,
      y: top + inset,
      w: right - left - inset * 2,
      h: bottom - top - inset * 2,
    },
    corners,
    entry,
    exit: left,
  };
}

/*
 * Luz: quatro trilhos invisíveis, paralelos às bordas do cartão e um pouco
 * afastados delas, atravessam a tela de ponta a ponta. De tempos em tempos
 * uma luz fina corre por um deles. `rail` é a borda do cartão, `reverse`
 * inverte o sentido e `start` é o segundo do ciclo em que a luz entra; as
 * duas últimas cruzam juntas, em espelho.
 */
const beams = [
  { rail: "top", reverse: false, color: "#a98bff", start: 0 },
  { rail: "right", reverse: false, color: "#6fa3ff", start: 4.5 },
  { rail: "bottom", reverse: true, color: "#37d4e5", start: 9 },
  { rail: "left", reverse: true, color: "#68e49b", start: 13.5 },
  { rail: "right", reverse: false, color: "#68e49b", start: 13.5 },
];
// Ciclo inteiro; o @keyframes beam usa 3,5 s de travessia (17,5% de 20 s).
const BEAM_CYCLE = 20;
// Escala do cartão quando ele termina de encolher (timeline da abertura).
const CARD_END_SCALE = 0.62;
// Fração do travamento em que a borda começa a sair do cartão.
const SNAKE_START = 0.8;
// Distância entre cada trilho e a borda do cartão.
const RAIL_OFFSET = 36;

// Ponto da tela, em fração da altura, onde a ponta da linha acompanha o scroll.
const TIP = 0.62;
// Raio do canto em fração da largura do cartão; o CSS usa o mesmo número.
const CARD_RADIUS = 0.02;
const SAMPLES = 480;

// Largura em que os sites são exibidos antes de reduzidos à janela: versão
// de computador, em miniatura.
const SITE_WIDTH = 1440;

function MiniBrowser({ sites }) {
  const [active, setActive] = useState(0);
  const [scale, setScale] = useState(0.5);
  const viewRef = useRef(null);
  const site = sites[active];

  useEffect(() => {
    const view = viewRef.current;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / SITE_WIDTH));
    observer.observe(view);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.browser}>
      <div className={styles.tabs} role="tablist" aria-label="Sites feitos pela VIA">
        {sites.map((item, index) => (
          <button
            aria-selected={index === active}
            className={styles.tab}
            key={item.name}
            onClick={() => setActive(index)}
            role="tab"
            style={{ "--tab": item.color }}
            type="button"
          >
            <span className={styles.tabDot} aria-hidden="true" />
            {item.name}
          </button>
        ))}
      </div>
      <div className={styles.browserBar}>
        <span className={styles.browserDots} aria-hidden="true" />
        <span className={styles.browserUrl}>{site.url}</span>
        {site.href ? (
          <a className={styles.browserOpen} href={site.href} target="_blank" rel="noreferrer">
            Abrir <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
      <div className={styles.browserView} ref={viewRef} role="tabpanel">
        {site.embed ? (
          <iframe
            className={styles.browserFrame}
            key={site.embed}
            loading="lazy"
            src={site.embed}
            style={{ width: `${SITE_WIDTH}px`, height: `${100 / scale}%`, transform: `scale(${scale})` }}
            title={`Site ${site.name}`}
          />
        ) : site.image ? (
          <span className={styles.browserShot} style={{ backgroundImage: `url("${site.image}")` }} />
        ) : (
          <span className={styles.skeleton}>
            <span />
            <span />
            <span />
          </span>
        )}
      </div>
    </div>
  );
}

export function Club() {
  const rootRef = useRef(null);
  const logoId = useId().replace(/[^a-zA-Z0-9]/g, "");

  useGSAP(
    () => {
      const root = rootRef.current;
      const q = (selector) => root.querySelector(selector);
      const hero = q(`.${styles.hero}`);
      const cardMove = q(`.${styles.cardMove}`);
      const cardTilt = q(`.${styles.cardTilt}`);
      const cardBody = q(`.${styles.cardBody}`);
      const card = q(`.${styles.card}`);
      const light = card.querySelector("[data-light]");
      const snakePath = q(`.${styles.snake}`);
      const snakeSvg = snakePath.ownerSVGElement;

      /*
       * Borda e linha são um traço só: o contorno do cartão, começando e
       * terminando no meio da borda de baixo, seguido de uma reta que desce
       * até o fim da tela. Fica dentro do cartão, então encolhe junto com ele.
       *
       * draw (0 → 1) acende o contorno; out (0 → 1) é a cobrinha: a ponta
       * desce pela reta enquanto a cauda esvazia o contorno, até sobrar só a
       * linha.
       */
      const snake = { draw: 0, out: 0, ring: 0, tail: 0 };

      function buildSnake() {
        const width = card.offsetWidth;
        const height = card.offsetHeight;
        const r = width * CARD_RADIUS;
        const mid = width / 2;
        // Do pé do cartão já encolhido até o fim da tela, em pixels do cartão.
        const tail = (window.innerHeight / 2 - (height * CARD_END_SCALE) / 2) / CARD_END_SCALE + 2;
        const ring =
          `M ${mid} ${height} H ${r} A ${r} ${r} 0 0 1 0 ${height - r}` +
          ` V ${r} A ${r} ${r} 0 0 1 ${r} 0 H ${width - r} A ${r} ${r} 0 0 1 ${width} ${r}` +
          ` V ${height - r} A ${r} ${r} 0 0 1 ${width - r} ${height} H ${mid}`;

        snakeSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        snakeSvg.querySelector("linearGradient").setAttribute("x2", width);
        snakePath.setAttribute("d", ring);
        snake.ring = snakePath.getTotalLength();
        snake.ringPath = ring;
        snake.height = height;
        setTail(tail);
        renderSnake();
      }

      function setTail(tail) {
        snake.tail = tail;
        snakePath.setAttribute("d", `${snake.ringPath} V ${snake.height + tail}`);
      }

      /*
       * Enquanto a cobrinha sai, a reta é medida na tela, não calculada: vai
       * do pé real do cartão (com escala, perspectiva e tudo) até o topo da
       * área da linha do site, onde a outra linha começa. Assim as duas se
       * encontram no mesmo ponto em qualquer tela e velocidade.
       */
      function measureTail() {
        const box = card.getBoundingClientRect();
        const scale = box.width / card.offsetWidth;
        const tail = Math.max(0, (flow.getBoundingClientRect().top - box.bottom) / scale);
        if (Math.abs(tail - snake.tail) > 0.5) setTail(tail);
      }

      function renderSnake() {
        if (snake.out > 0) measureTail();
        const head = snake.draw * snake.ring + snake.out * snake.tail;
        const end = snake.out * snake.ring;
        const visible = Math.max(0, head - end);
        // Com comprimento zero a ponta redonda ainda pintaria um ponto.
        snakePath.style.visibility = visible > 0.5 ? "visible" : "hidden";
        snakePath.style.strokeDasharray = `${visible} ${snake.ring + snake.tail + 10}`;
        snakePath.style.strokeDashoffset = `${-end}`;
      }
      const ambient = q(`.${styles.ambient}`);
      const routeEls = gsap.utils.toArray(`.${styles.route}`, root);

      // Trilhos em pixels reais, presos às bordas do cartão.
      function buildRoutes() {
        const width = ambient.clientWidth;
        const height = ambient.clientHeight;
        // Tamanho do cartão em repouso: offsetWidth ignora as transformações.
        const left = Math.round((width - card.offsetWidth) / 2 - RAIL_OFFSET) + 0.5;
        const right = Math.round((width + card.offsetWidth) / 2 + RAIL_OFFSET) + 0.5;
        const top = Math.round((height - card.offsetHeight) / 2 - RAIL_OFFSET) + 0.5;
        const bottom = Math.round((height + card.offsetHeight) / 2 + RAIL_OFFSET) + 0.5;
        ambient.setAttribute("viewBox", `0 0 ${width} ${height}`);

        const lines = {
          top: [0, top, width, top],
          bottom: [0, bottom, width, bottom],
          left: [left, 0, left, height],
          right: [right, 0, right, height],
        };
        routeEls.forEach((group, index) => {
          const { rail, reverse } = beams[index];
          const [x1, y1, x2, y2] = lines[rail];
          const d = reverse ? `M ${x2} ${y2} L ${x1} ${y1}` : `M ${x1} ${y1} L ${x2} ${y2}`;
          const paths = group.querySelectorAll("path");
          paths.forEach((path) => path.setAttribute("d", d));
          group.style.setProperty("--len", paths[0].getTotalLength().toFixed(1));
        });
      }
      buildRoutes();
      window.addEventListener("resize", buildRoutes);
      const trailGroup = q(`.${styles.trailGroup}`);
      const flow = q(`.${styles.flow}`);
      const svg = q(`.${styles.line}`);
      const pieceEls = gsap.utils.toArray("[data-piece]", flow);
      const tip = q(`.${styles.tip}`);
      const anchorEls = gsap.utils.toArray("[data-anchor]", flow);
      const sceneEls = gsap.utils.toArray("[data-scene]", flow);
      const finalCard = q(`.${styles.finalCard}`);

      /*
       * Geometria da linha, refeita a cada refresh (resize, fontes carregadas).
       * A linha é dividida em trechos, um entre cada cena: o navegador
       * recomeça o tracejado a cada "M" de um caminho, então um caminho só
       * com saltos desenharia pedaços a mais depois de cada salto.
       */
      const line = { pieces: [], cardTop: 0, outlineSpan: 1, anchors: [], scenes: [] };

      function buildLine() {
        for (const scene of scenes.values()) buildScene(scene);
        const flowBox = flow.getBoundingClientRect();
        const width = flowBox.width;
        const height = flow.offsetHeight;
        const narrow = width < 760;
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        svg.querySelector("linearGradient").setAttribute("y2", height);
        paintScenes(height, flowBox.top);

        let points = [{ x: width / 2, y: 0 }];
        const pieceList = [points];
        const gutter = narrow ? 18 : width * 0.16;
        line.anchors = [];
        line.scenes = [];
        for (const el of anchorEls) {
          const box = el.getBoundingClientRect();
          const top = box.top - flowBox.top;
          if (el.hasAttribute("data-scene")) {
            // O trecho atual termina no topo da cena; o próximo começa no pé
            // dela. No meio, quem desenha é a linha local da cena.
            const scene = scenes.get(el);
            points.push({ x: scene.entry, y: top });
            points = [{ x: scene.exit, y: top + box.height }];
            pieceList.push(points);
            line.scenes.push({ scene, top, bottom: top + box.height });
            continue;
          }
          const x = el.dataset.line === "right" ? width - gutter : gutter;
          const y = top + box.height / 2;
          points.push({ x, y });
          line.anchors.push({ el, y });
        }

        const cardBox = finalCard.getBoundingClientRect();
        const left = cardBox.left - flowBox.left;
        const right = left + cardBox.width;
        const top = cardBox.top - flowBox.top;
        const bottom = top + cardBox.height;
        const centerX = left + cardBox.width / 2;
        const r = cardBox.width * CARD_RADIUS;
        points.push({ x: centerX, y: top });
        line.cardTop = top;

        line.pieces = pieceList.map((piecePoints, index) => {
          const paths = pieceEls[index].querySelectorAll(`.${styles.linePath}`);
          const last = index === pieceList.length - 1;

          // Curvas em S com tangente vertical: y nunca volta, então dá para
          // achar o comprimento da linha a partir da altura da ponta.
          let d = `M ${piecePoints[0].x} ${piecePoints[0].y}`;
          for (let i = 1; i < piecePoints.length; i += 1) {
            const a = piecePoints[i - 1];
            const b = piecePoints[i];
            const half = (b.y - a.y) / 2;
            d += ` C ${a.x} ${a.y + half} ${b.x} ${b.y - half} ${b.x} ${b.y}`;
          }
          paths[0].setAttribute("d", d);
          const span = paths[0].getTotalLength();

          // No último trecho, ao chegar no cartão final, a linha contorna a borda.
          if (last) {
            d +=
              ` H ${right - r} A ${r} ${r} 0 0 1 ${right} ${top + r}` +
              ` V ${bottom - r} A ${r} ${r} 0 0 1 ${right - r} ${bottom}` +
              ` H ${left + r} A ${r} ${r} 0 0 1 ${left} ${bottom - r}` +
              ` V ${top + r} A ${r} ${r} 0 0 1 ${left + r} ${top} H ${centerX}`;
          }
          for (const path of paths) path.setAttribute("d", d);
          const total = paths[0].getTotalLength();
          for (const path of paths) path.style.strokeDasharray = `${total} ${total + 10}`;

          const ys = [];
          for (let i = 0; i <= SAMPLES; i += 1) {
            ys.push(paths[0].getPointAtLength((span * i) / SAMPLES).y);
          }
          return { paths, span, total, ys, last };
        });

        // O contorno termina junto com o fim da página.
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
        const flowTopAtMax = flowBox.top + window.scrollY - scrollMax;
        const lastTarget = window.innerHeight * TIP - flowTopAtMax;
        line.outlineSpan = Math.max(80, (lastTarget - top) * 0.85);
      }

      /*
       * Cenas dos benefícios. Cada uma tem um SVG preso à tela (sticky) com
       * o símbolo; o progresso do scroll na cena vira o comprimento desenhado.
       * A cor vai da cor da linha do site na entrada à cor na saída.
       */
      const scenes = new Map();
      for (const el of sceneEls) {
        scenes.set(el, {
          el,
          key: el.dataset.scene,
          svg: el.querySelector("svg"),
          paths: el.querySelectorAll(`.${styles.scenePath}`),
          nodes: el.querySelector(`.${styles.sceneNodes}`),
          tip: el.querySelector(`.${styles.sceneTip}`),
          lens: el.querySelector(`.${styles.lens}`),
          slides: el.querySelectorAll(`.${styles.slide}`),
          captions: el.querySelectorAll(`.${styles.slideCaption}`),
          stepEls: el.querySelectorAll(`.${styles.step}`),
          storyEl: el.querySelector(`.${styles.story}`),
          panel: el.querySelector(`.${styles.panel}`),
          panelSlides: el.querySelectorAll(`.${styles.panelSlide}`),
          quote: el.querySelector(`.${styles.quote}`),
          chips: el.querySelectorAll(`.${styles.chip}`),
          marks: [],
          // Janela do progresso em que a linha para e a galeria corre.
          window: el.dataset.window ? el.dataset.window.split(" ").map(Number) : null,
          holdLength: 0,
          activeSlide: -1,
          timeline: null,
          word: el.querySelector(`.${styles.benefitName}`),
          gradient: el.querySelector("linearGradient"),
          length: 0,
          corners: [],
          entry: 0,
          exit: 0,
          progress: 0,
        });
      }

      function buildScene(scene) {
        const stage = scene.svg.parentElement;
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        const wordBox = scene.word.getBoundingClientRect();
        const shape = benefitPath(scene.key, w, h, wordBox);
        scene.svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
        for (const path of scene.paths) path.setAttribute("d", shape.d);
        scene.length = scene.paths[0].getTotalLength();
        if (shape.hold) {
          scene.paths[0].setAttribute("d", shape.hold);
          scene.holdLength = scene.paths[0].getTotalLength();
          scene.paths[0].setAttribute("d", shape.d);
        }
        if (shape.lens && scene.lens) {
          // A galeria preenche a lente até o fio: o neon é a moldura do vídeo.
          const inner = shape.lens.r;
          Object.assign(scene.lens.style, {
            left: `${shape.lens.cx - inner}px`,
            top: `${shape.lens.cy - inner}px`,
            width: `${inner * 2}px`,
            height: `${inner * 2}px`,
          });
          scene.el.style.setProperty("--lens-r", `${shape.lens.r}px`);
          scene.el.style.setProperty("--lens-cy", `${shape.lens.cy}px`);
        }
        if (shape.screen && scene.lens) {
          Object.assign(scene.lens.style, {
            left: `${shape.screen.x}px`,
            top: `${shape.screen.y}px`,
            width: `${shape.screen.w}px`,
            height: `${shape.screen.h}px`,
          });
        }
        scene.entry = shape.entry;
        scene.exit = shape.exit;

        // Comprimento da linha até um ponto do desenho (o mais próximo).
        const lengthTo = ([x, y]) => {
          let best = 0;
          let bestDistance = Infinity;
          for (let i = 0; i <= 400; i += 1) {
            const at = (scene.length * i) / 400;
            const point = scene.paths[0].getPointAtLength(at);
            const distance = Math.hypot(point.x - x, point.y - y);
            if (distance < bestDistance) {
              bestDistance = distance;
              best = at;
            }
          }
          return best;
        };

        // Cantos do circuito, que acendem quando a linha passa.
        scene.corners = shape.corners.map(([x, y]) => ({ x, y, at: lengthTo([x, y]) }));
        // Marcos que revelam as etapas dos degraus.
        scene.marks = (shape.marks ?? []).map((point) => lengthTo(point));

        /*
         * Ritmo dos degraus: [progresso da cena, comprimento desenhado]. A
         * linha para em cada patamar enquanto o painel mostra a etapa, sobe
         * ao próximo, fecha a lente e espera o depoimento antes de sair.
         * O trecho da lente bate com data-window da cena (0.72 0.92).
         */
        if (scene.key === "crescimento") {
          const [first, second, third] = scene.marks;
          scene.timeline = [
            [0, 0],
            [0.12, first],
            [0.3, first],
            [0.38, second],
            [0.56, second],
            [0.62, third],
            [0.72, scene.holdLength],
            [0.92, scene.holdLength],
            [1, scene.length],
          ];
        }

        // Dossiê: rótulos sobre os patamares, painel à direita e citação
        // acima da lente.
        if (shape.landings) {
          shape.landings.forEach(({ x0, y }, i) => {
            const label = scene.stepEls[i];
            if (label) Object.assign(label.style, { left: `${x0 + 10}px`, bottom: `${h - y + 12}px` });
          });
          if (scene.storyEl) {
            const { x0, y } = shape.landings[0];
            Object.assign(scene.storyEl.style, { left: `${x0}px`, top: `${y + 16}px` });
          }
          if (scene.panel) {
            // Computador: metade direita. Celular: faixa larga no meio da tela.
            const narrow = w < 760;
            const top = narrow ? h * 0.34 : h * 0.14;
            const bottom = narrow ? h * 0.66 : shape.landings[2].y - 28;
            Object.assign(scene.panel.style, {
              left: `${narrow ? w * 0.08 + 28 : w * 0.52}px`,
              top: `${top}px`,
              width: `${narrow ? w * 0.84 - 28 : w * 0.4}px`,
              height: `${bottom - top}px`,
            });
          }
          if (scene.quote && shape.lens) {
            Object.assign(scene.quote.style, {
              left: `${shape.lens.cx}px`,
              bottom: `${h - (shape.lens.cy - shape.lens.r) + 24}px`,
            });
          }
        }

        scene.nodes.replaceChildren(
          ...scene.corners.map(({ x, y }) => {
            const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            dot.setAttribute("cx", x);
            dot.setAttribute("cy", y);
            dot.setAttribute("r", 3);
            return dot;
          }),
        );
      }

      function paintScenes(flowHeight, flowTop) {
        for (const scene of scenes.values()) {
          const box = scene.el.getBoundingClientRect();
          const top = (box.top - flowTop) / flowHeight;
          const bottom = (box.bottom - flowTop) / flowHeight;
          const stops = scene.gradient.querySelectorAll("stop");
          stops[0].setAttribute("stop-color", colorAt(top));
          stops[1].setAttribute("stop-color", colorAt(bottom));
          scene.gradient.setAttribute("y2", scene.svg.parentElement.clientHeight);
        }
      }

      function renderScene(scene, progress) {
        scene.progress = progress;
        let drawn = scene.length * progress;
        let symbolDone = progress > 0.8;
        if (scene.window) {
          // Três tempos: desenha a lente, para enquanto a galeria corre e
          // depois sai pelo pé da cena.
          const [from, to] = scene.window;
          if (scene.timeline) {
            const points = scene.timeline;
            let i = 1;
            while (i < points.length - 1 && points[i][0] < progress) i += 1;
            const [p0, l0] = points[i - 1];
            const [p1, l1] = points[i];
            drawn = l0 + (l1 - l0) * Math.min(1, Math.max(0, (progress - p0) / (p1 - p0)));
          } else if (progress < from) drawn = scene.holdLength * (progress / from);
          else if (progress < to) drawn = scene.holdLength;
          else drawn = scene.holdLength + (scene.length - scene.holdLength) * ((progress - to) / (1 - to));
          symbolDone = progress >= from;

          const inGallery = progress >= from;
          scene.el.classList.toggle(styles.gallery, inGallery);
          const count = scene.slides.length;
          const index = inGallery
            ? Math.min(count - 1, Math.floor(((progress - from) / (to - from)) * count))
            : -1;
          if (index !== scene.activeSlide) {
            scene.activeSlide = index;
            scene.slides.forEach((slide, i) => {
              slide.classList.toggle(styles.lit, i === index);
              const video = slide.querySelector("video");
              if (video) {
                if (i === index) {
                  // Vídeo pesado só começa a baixar quando entra na lente.
                  video.preload = "auto";
                  video.play().catch(() => {});
                }
                else video.pause();
              }
            });
            scene.captions.forEach((caption, i) => caption.classList.toggle(styles.lit, i === index));
          }
        }
        for (const path of scene.paths) {
          path.style.strokeDasharray = `${drawn} ${scene.length + 10}`;
          path.style.visibility = drawn > 0.5 ? "visible" : "hidden";
        }
        // A ponta branca mostra a linha andando, como na linha do site.
        if (drawn > 0.5 && progress < 1) {
          const point = scene.paths[0].getPointAtLength(drawn);
          scene.tip.setAttribute("cx", point.x);
          scene.tip.setAttribute("cy", point.y);
          scene.tip.style.opacity = "1";
        } else {
          scene.tip.style.opacity = "0";
        }
        scene.corners.forEach((corner, index) => {
          scene.nodes.children[index]?.classList.toggle(styles.lit, drawn >= corner.at);
        });
        // A palavra acende quando o símbolo fecha; o texto, logo depois.
        scene.el.classList.toggle(styles.lit, progress > 0.02);
        if (scene.marks.length) {
          // Cada etapa acende quando a linha chega ao seu patamar; a palavra
          // sai de cena na primeira, para os cartões ocuparem o palco.
          const reached = scene.marks.filter((mark) => drawn >= mark).length;
          scene.stepEls.forEach((label, i) => {
            label.classList.toggle(styles.lit, i < reached);
            label.classList.toggle(styles.current, i === reached - 1);
          });
          // O palco mostra a etapa atual; na última, sai para a lente do
          // depoimento entrar.
          scene.panelSlides.forEach((slide, i) => slide.classList.toggle(styles.lit, i === reached - 1));
          scene.chips.forEach((chip) => chip.classList.toggle(styles.lit, reached > Number(chip.dataset.step)));
          scene.panel?.classList.toggle(styles.lit, reached > 0 && reached <= scene.panelSlides.length);
          scene.quote?.classList.toggle(styles.lit, scene.window && progress >= scene.window[0]);
          const climbing = drawn >= scene.marks[0];
          scene.el.classList.toggle(styles.gallery, climbing);
          symbolDone = climbing;
        }
        scene.el.classList.toggle(styles.done, symbolDone);
      }

      function lengthAt(piece, targetY) {
        const { ys, span } = piece;
        if (span <= 0 || targetY <= ys[0]) return 0;
        if (targetY >= ys[ys.length - 1]) return span;
        let low = 0;
        let high = ys.length - 1;
        while (low < high) {
          const mid = (low + high) >> 1;
          if (ys[mid] < targetY) low = mid + 1;
          else high = mid;
        }
        if (low === 0) return 0;
        const y0 = ys[low - 1];
        const y1 = ys[low];
        const t = y1 === y0 ? 0 : (targetY - y0) / (y1 - y0);
        return ((low - 1 + t) * span) / SAMPLES;
      }

      function drawPiece(piece, length) {
        for (const path of piece.paths) {
          path.style.strokeDashoffset = `${piece.total - length}`;
          // Comprimento zero ainda pintaria a ponta redonda.
          path.style.visibility = length > 0.5 ? "visible" : "hidden";
        }
      }

      function drawAll() {
        for (const piece of line.pieces) drawPiece(piece, piece.total);
        tip.style.opacity = "0";
      }

      function update() {
        const target = window.innerHeight * TIP - flow.getBoundingClientRect().top;
        let outline = 0;
        let head = null;
        for (const piece of line.pieces) {
          let length;
          if (piece.last && target >= line.cardTop) {
            outline = Math.min(1, (target - line.cardTop) / line.outlineSpan);
            length = piece.span + outline * (piece.total - piece.span);
          } else {
            length = lengthAt(piece, target);
          }
          drawPiece(piece, length);
          if (length > 0.5 && length < piece.total) head = { piece, length };
        }

        /*
         * Cenas: a linha local é desenhada aqui, pelo mesmo número de scroll
         * da linha do site, e não por gatilhos próprios; assim as duas nunca
         * se desencontram. A local vai do topo da cena (chegando a esse ponto
         * da tela) até o pé da cena (chegando ao mesmo ponto).
         */
        let insideScene = false;
        for (const { scene, top, bottom } of line.scenes) {
          renderScene(scene, Math.min(1, Math.max(0, (target - top) / (bottom - top))));
          if (target > top && target < bottom) insideScene = true;
        }

        // Dentro de uma cena a ponta é a da linha local.
        if (head && !insideScene) {
          const point = head.piece.paths[0].getPointAtLength(head.length);
          tip.setAttribute("cx", point.x);
          tip.setAttribute("cy", point.y);
          tip.style.opacity = "1";
        } else {
          tip.style.opacity = "0";
        }

        for (const { el, y } of line.anchors) {
          el.classList.toggle(styles.lit, target >= y - 12);
        }
        finalCard.classList.toggle(styles.lit, outline >= 1);
      }

      const media = gsap.matchMedia();

      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
          fine: "(hover: hover) and (pointer: fine)",
        },
        (context) => {
          const { reduce, fine } = context.conditions;

          if (reduce) {
            buildLine();
            drawAll();
            for (const { el } of line.anchors) el.classList.add(styles.lit);
            for (const scene of scenes.values()) renderScene(scene, 1);
            finalCard.classList.add(styles.lit);
            snake.draw = 1;
            buildSnake();
            const onRefresh = () => {
              buildLine();
              drawAll();
              buildSnake();
            };
            window.addEventListener("resize", onRefresh);
            return () => window.removeEventListener("resize", onRefresh);
          }

          gsap.fromTo(
            cardBody,
            { autoAlpha: 0, y: 50, rotateX: 34, scale: 0.92 },
            { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, duration: 1.8, ease: "expo.out", delay: 0.2 },
          );

          gsap.fromTo(trailGroup, { autoAlpha: 0 }, { autoAlpha: 1, duration: 2.4, delay: 1.4, ease: "power1.out" });

          const heroTimeline = gsap.timeline({
            defaults: { ease: "none" },
            // scrub: true (sem atraso) em toda a abertura: a linha do site segue
            // o scroll na hora, e a cobrinha precisa chegar junto com ela para
            // não abrir buraco no encontro quando se rola rápido.
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom bottom", scrub: true },
          });
          // Enquanto a tela está travada: a borda acende, do pé para os dois
          // lados, e o cartão encolhe e volta de frente.
          heroTimeline
            .to(ambient, { autoAlpha: 0, duration: 0.15 }, 0)
            .fromTo(
              snake,
              { draw: 0 },
              { draw: 1, duration: 0.25, ease: "power2.out", onUpdate: renderSnake },
              0,
            )
            .to(cardMove, { scale: CARD_END_SCALE, rotateX: 12, duration: 0.4, ease: "power2.inOut" }, 0.15)
            .to(cardMove, { rotateX: 0, duration: 0.2, ease: "power2.out" }, 0.55);

          // A cobrinha tem gatilho próprio: começa no fim do travamento e segue
          // depois que a tela destrava, com o cartão já subindo. Termina quando
          // o pé do cartão chega ao ponto da tela onde a linha do site assume.
          gsap.fromTo(
            snake,
            { out: 0 },
            {
              out: 1,
              ease: "power1.in",
              onUpdate: renderSnake,
              scrollTrigger: {
                trigger: hero,
                start: () => `top+=${(hero.offsetHeight - window.innerHeight) * SNAKE_START} top`,
                end: `bottom ${TIP * 100}%`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );

          const lineTrigger = ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: update,
            onRefresh: () => {
              buildLine();
              update();
              buildSnake();
            },
          });
          buildLine();
          update();
          buildSnake();

          let removeTilt = () => {};
          if (fine) {
            // Inclinação mínima e resposta lenta: o cartão flutua, não persegue o mouse.
            const rotateX = gsap.quickTo(cardTilt, "rotationX", { duration: 2.2, ease: "power2.out" });
            const rotateY = gsap.quickTo(cardTilt, "rotationY", { duration: 2.2, ease: "power2.out" });
            // A inclinação vale só na primeira tela: ao rolar, o cartão volta a
            // ficar reto para a linha sair dele na vertical.
            const scrolled = () => window.scrollY > 4;
            const onMove = (event) => {
              if (scrolled()) return;
              const box = card.getBoundingClientRect();
              const x = (event.clientX - box.left) / box.width;
              const y = (event.clientY - box.top) / box.height;
              rotateY((x - 0.5) * 5);
              rotateX((0.5 - y) * 3.5);
              card.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
              card.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
              // Coordenadas do viewBox do logo: a luz passeia sobre o foil.
              light.setAttribute("x", (-30 + x * 152).toFixed(1));
              light.setAttribute("y", (-50 + y * 140).toFixed(1));
            };
            const onLeave = () => {
              rotateX(0);
              rotateY(0);
            };
            const onScroll = () => {
              if (scrolled()) onLeave();
            };
            hero.addEventListener("pointermove", onMove);
            hero.addEventListener("pointerleave", onLeave);
            window.addEventListener("scroll", onScroll, { passive: true });

            removeTilt = () => {
              hero.removeEventListener("pointermove", onMove);
              hero.removeEventListener("pointerleave", onLeave);
              window.removeEventListener("scroll", onScroll);
            };
          }

          // Fontes mudam a altura dos textos, e com ela o traçado.
          document.fonts?.ready.then(() => ScrollTrigger.refresh());

          return () => {
            lineTrigger.kill();
            removeTilt();
          };
        },
      );

      return () => {
        media.revert();
        window.removeEventListener("resize", buildRoutes);
      };
    },
    { scope: rootRef },
  );

  return (
    <main className={styles.root} id="conteudo-principal" ref={rootRef}>

      <section className={styles.hero} aria-labelledby="club-title">
        <div className={styles.sticky}>
          <h1 className={styles.srOnly} id="club-title">
            VIA. Acesso por convite.
          </h1>

          <svg className={styles.ambient} aria-hidden="true" focusable="false">
            <g
              className={styles.trailGroup}
              style={{ "--cycle": `${BEAM_CYCLE}s` }}
            >
              {beams.map((beam, index) => (
                <g
                  className={styles.route}
                  key={index}
                  style={{ "--delay": `${beam.start}s`, "--color": beam.color }}
                >
                  <path className={`${styles.trail} ${styles.trailTail}`} />
                  <path className={styles.trail} />
                </g>
              ))}
            </g>
          </svg>

          <div className={styles.stage}>
            <div className={styles.cardMove}>
              <div className={styles.cardTilt}>
                <div className={styles.cardBody}>
                  <div className={styles.card} aria-hidden="true">
                    <span className={styles.paper} />
                    <span className={styles.sheen} />
                    <EngravedLogo id={`${logoId}-card`} className={styles.logo} />
                    <svg className={styles.snakeSvg} aria-hidden="true" focusable="false">
                      <defs>
                        <linearGradient
                          id={`${logoId}-snake`}
                          x1="0"
                          y1="0"
                          x2="100"
                          y2="0"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopColor="#7b3cff" />
                          <stop offset="0.38" stopColor="#3d7bff" />
                          <stop offset="0.5" stopColor="#1aa8ee" />
                          <stop offset="0.62" stopColor="#14d2ec" />
                          <stop offset="1" stopColor="#45ec8c" />
                        </linearGradient>
                      </defs>
                      <path className={styles.snake} stroke={`url(#${logoId}-snake)`} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div className={styles.flow}>
        <svg className={styles.line} aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="club-line" x1="0" y1="0" x2="0" y2="1000" gradientUnits="userSpaceOnUse">
              {LINE_STOPS.map(([offset, color]) => (
                <stop key={offset} offset={offset} stopColor={color} />
              ))}
            </linearGradient>
            {/*
              O brilho cresce nos primeiros 400 px: a linha nasce fina como a
              que sai do cartão e só depois ganha halo, sem quebra no encontro.
            */}
            <linearGradient id="club-line-fade" x1="0" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="1" stopColor="#fff" stopOpacity="1" />
            </linearGradient>
            <mask id="club-line-glow" maskUnits="userSpaceOnUse" x="-5000" y="-100" width="20000" height="100000">
              <rect x="-5000" y="-100" width="20000" height="100000" fill="url(#club-line-fade)" />
            </mask>
          </defs>
          {/* Um trecho antes de cada cena e um depois da última. */}
          {[...benefits, null].map((benefit) => (
            <g data-piece="" key={benefit?.key ?? "end"}>
              <g mask="url(#club-line-glow)">
                <path className={`${styles.linePath} ${styles.lineHalo}`} />
                <path className={`${styles.linePath} ${styles.lineGlow}`} />
              </g>
              <path className={`${styles.linePath} ${styles.lineCore}`} />
            </g>
          ))}
          <circle className={styles.tip} r="5" />
        </svg>

        <section className={styles.chapter} data-side="left">
          <div className={styles.phrase} data-anchor="" data-line="right">
            <p className={styles.kicker}>I</p>
            <h2 className={styles.title}>
              {opening.lead}
              <span className={styles.highlight}>{opening.highlight}</span>
            </h2>
          </div>
        </section>

        <section className={styles.chapter} data-side="right">
          <div className={styles.phrase} data-anchor="" data-line="left">
            <p className={styles.kicker}>II · O que fazemos</p>
            <h2 className={styles.title}>
              Três frentes. <span className={styles.highlight}>Um só cliente: você.</span>
            </h2>
          </div>
        </section>

        {benefits.map((benefit) => (
          <section
            className={styles.scene}
            data-anchor=""
            data-scene={benefit.key}
            data-window={
              benefit.steps ? "0.72 0.92" : benefit.gallery ? "0.24 0.88" : benefit.sites ? "0.25 0.9" : undefined
            }
            key={benefit.key}
            aria-labelledby={`beneficio-${benefit.key}`}
          >
            <div className={styles.sceneStage}>
              <svg className={styles.sceneSvg} aria-hidden="true" focusable="false">
                <defs>
                  <linearGradient
                    id={`${logoId}-${benefit.key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1000"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#1aa8ee" />
                    <stop offset="1" stopColor="#1aa8ee" />
                  </linearGradient>
                </defs>
                <g stroke={`url(#${logoId}-${benefit.key})`}>
                  <path className={`${styles.scenePath} ${styles.sceneGlow}`} />
                  <path className={`${styles.scenePath} ${styles.sceneCore}`} />
                </g>
                <g className={styles.sceneNodes} />
                <circle className={`${styles.tip} ${styles.sceneTip}`} r="5" />
              </svg>

              <p className={`${styles.kicker} ${styles.benefitKicker}`}>
                {benefit.number} / 03 · {benefit.name}
              </p>
              {benefit.sites ? (
                <div className={`${styles.lens} ${styles.screen}`}>
                  <MiniBrowser sites={benefit.sites} />
                  <p className={styles.browserHint}>Clique nas abas · navegue pelo site</p>
                </div>
              ) : null}

              {benefit.gallery ? (
                <div className={styles.lens} aria-hidden="true">
                  {benefit.gallery.map((item) => (
                    <div className={styles.slide} key={item.image}>
                      {item.video ? (
                        <video
                          src={item.video}
                          poster={item.image}
                          muted
                          loop
                          playsInline
                          preload={item.heavy ? "none" : "auto"}
                        />
                      ) : (
                        <span className={styles.slideImage} style={{ backgroundImage: `url("${item.image}")` }} />
                      )}
                    </div>
                  ))}
                </div>
              ) : null}

              <h3 className={styles.benefitName} id={`beneficio-${benefit.key}`}>
                {benefit.name}
              </h3>

              {benefit.steps ? (
                <>
                  <div className={styles.panel}>
                    {benefit.steps
                      .filter((step) => step.text)
                      .map((step) => (
                        <div className={styles.panelSlide} key={step.title}>
                          <span className={styles.panelNumeral}>{step.numeral}</span>
                          <span className={styles.panelTitle}>{step.title}</span>
                          <span className={styles.panelText}>{step.text}</span>
                        </div>
                      ))}
                  </div>
                  {benefit.steps.map((step) => (
                    <p className={styles.step} key={step.title}>
                      <span className={styles.stepNumeral}>{step.numeral}</span>
                      <span className={styles.stepTitle}>{step.title}</span>
                    </p>
                  ))}
                  <ul className={styles.chips} aria-label="Entregas do caso">
                    {benefit.deliveries.map((item) => (
                      <li
                        className={styles.chip}
                        data-step={item.step}
                        key={item.label}
                        style={{
                          left: `${item.at[0] * 100}%`,
                          top: `${item.at[1] * 100}%`,
                          "--chip": item.color,
                        }}
                      >
                        <span className={styles.chipLabel}>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                  <p className={styles.story}>{benefit.story}</p>
                  <blockquote className={styles.quote}>
                    <p className={styles.quoteText}>{benefit.quote}</p>
                    <footer className={styles.quoteAuthor}>{benefit.quoteAuthor}</footer>
                  </blockquote>
                </>
              ) : null}

              {benefit.gallery && !benefit.steps ? (
                <ul className={styles.slideCaptions}>
                  {benefit.gallery.map((item) => (
                    <li className={styles.slideCaption} key={item.image}>
                      <span className={styles.slideTitle}>{item.title}</span>
                      <span className={styles.slideDetail}>{item.detail}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className={styles.benefitText}>
                <p className={styles.benefitLine}>{benefit.line}</p>
                <p className={styles.benefitExplain}>{benefit.explain}</p>
                <p className={styles.benefitItems}>{benefit.items.join("  ·  ")}</p>
              </div>
            </div>
          </section>
        ))}

        <section className={styles.chapter} data-side="right">
          <div className={styles.phrase} data-anchor="" data-line="left">
            <p className={styles.kicker}>III</p>
            <h2 className={styles.title}>
              Sem pacotes. Sem fórmulas. <span className={styles.highlight}>Cada marca, um caminho.</span>
            </h2>
            <p className={styles.note}>Cada projeto começa numa conversa, não num formulário.</p>
          </div>
        </section>

        <section className={styles.finale} id="convite" aria-labelledby="convite-title">
          <div className={styles.finalCard}>
            <span className={styles.paper} />
            <EngravedLogo id={`${logoId}-final`} className={styles.finalLogo} />
            <h2 className={styles.finalTitle} id="convite-title">
              A próxima marca pode ser a sua.
            </h2>
            <a className={styles.cta} href={whatsappUrl} target="_blank" rel="noreferrer">
              Conversar com a VIA <span aria-hidden="true">→</span>
            </a>
            <a className={styles.mail} href={emailUrl}>
              {email}
            </a>
          </div>
          <p className={styles.fine}>VIA · Presença, crescimento e tecnologia</p>
        </section>
      </div>
    </main>
  );
}
