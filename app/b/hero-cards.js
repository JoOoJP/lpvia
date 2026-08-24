/*
 * Cena da hero /b: os cards que flutuam ao redor da marca.
 *
 * Só dados — posição, profundidade e inclinação viram classe no CSS module.
 * A hero é client component por causa do parallax; manter a lista aqui evita
 * que a cena vire um bloco de JSX repetido cinco vezes.
 */
export const heroCards = [
  {
    id: "moikato",
    kicker: "Editorial",
    title: "Moikato",
    line: "Brazil meets Europe",
    href: "https://moikato.com",
    external: true,
    slot: "slotLeftTop",
    tone: "toneNeutral",
    image: {
      src: "/via-moikato-london.webp",
      alt: "Site internacional da Moikato",
    },
  },
  {
    id: "sephie",
    kicker: "Identidade",
    title: "Sephie",
    line: "Beleza que transcende",
    href: "#trabalhos",
    slot: "slotLeftBottom",
    tone: "toneParchment",
    image: {
      src: "/projects/sephie-tarot-signature.webp",
      alt: "Assinatura visual da Sephie Tarot",
    },
  },
  {
    id: "tardinha",
    kicker: "Evento",
    title: "A Tardinha",
    line: "O melhor fim de tarde da sua vida",
    href: "#case-tardinha",
    slot: "slotCenterBottom",
    tone: "toneNeutral",
    image: {
      src: "/tardinha.webp",
      alt: "Marca do evento A Tardinha",
    },
  },
  {
    id: "carolina",
    kicker: "Rebranding",
    title: "Carolina",
    line: "Beleza, essência, presença.",
    href: "#case-carolina-carvalho",
    slot: "slotRightTop",
    tone: "tonePurple",
    image: {
      src: "/projects/carolina-depois.webp",
      alt: "Nova marca de Carolina Carvalho",
    },
  },
  {
    id: "sweet-popcorn",
    kicker: "Embalagem",
    title: "Sweet Popcorn",
    line: "Estourado com ingredientes reais",
    href: "#trabalhos",
    slot: "slotRightBottom",
    tone: "toneCream",
    image: {
      src: "/projects/sweet-popcorn-gourmet.webp",
      alt: "Embalagem da Sweet Popcorn Gourmet",
    },
  },
];

/* Fragmentos fora de foco: só profundidade de campo, sem conteúdo a ler. */
export const heroShards = [
  { id: "shard-1", src: "/projects/route-primary.webp", slot: "shardOne" },
  { id: "shard-2", src: "/projects/latino-beats.webp", slot: "shardTwo" },
  { id: "shard-3", src: "/projects/carolina-antes.webp", slot: "shardThree" },
  { id: "shard-4", src: "/projects/ghetto-baile-funk.webp", slot: "shardFour" },
  { id: "shard-5", src: "/projects/in-tha-route-flyer-full.webp", slot: "shardFive" },
  { id: "shard-6", src: "/projects/sweet-popcorn-gourmet.webp", slot: "shardSix" },
];
