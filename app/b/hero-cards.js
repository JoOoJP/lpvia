/*
 * Cena da hero /b: a marca no centro e os cases orbitando ao redor.
 *
 * Cada card tem duas camadas de imagem com papéis diferentes:
 *  - `art`    fica DENTRO da moldura, atrás do texto;
 *  - `recorte` fica FORA dela — é a peça que escapa do quadro e flutua por
 *    cima, com movimento próprio.
 *
 * Os recortes em `public/projects/recortes/` e as artes em
 * `public/projects/artes/` foram derivados do que já estava no site: fundo
 * chapado virou alpha, e a cena presa dentro de um selo virou arte de fundo.
 *
 * A regra da direção: o recorte precisa CRUZAR a borda — boa parte dele por
 * cima da moldura, o resto para fora. Peça pequena pairando acima do card lê
 * como adesivo colado, não como a marca escapando do quadro.
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
    tone: "toneNight",
    art: {
      src: "/projects/hero/moikato-cinematic.webp",
      alt: "Editorial da Moikato entre a origem brasileira e o mercado internacional",
      position: "center",
    },
    recorte: null,
  },
  {
    id: "sephie",
    kicker: "Identidade",
    title: "Sephie",
    line: "Beleza que transcende",
    href: "#trabalhos",
    slot: "slotLeftBottom",
    tone: "toneNight",
    art: {
      src: "/projects/hero/sephie-cinematic.webp",
      alt: "Universo visual escuro e dourado criado para a Sephie Tarot",
      position: "center",
    },
    recorte: null,
  },
  {
    id: "tardinha",
    kicker: "Evento",
    title: "A Tardinha",
    line: "O melhor fim de tarde da sua vida",
    href: "#case-tardinha",
    slot: "slotCenterBottom",
    tone: "toneSunset",
    art: {
      src: "/projects/hero/tardinha-cinematic.webp",
      alt: "Evento A Tardinha realizado ao pôr do sol às margens do Rio Solimões",
      position: "center",
    },
    recorte: null,
  },
  {
    id: "carolina",
    kicker: "Rebranding",
    title: "Carolina",
    line: "Beleza, essência, presença.",
    href: "#case-carolina-carvalho",
    slot: "slotRightTop",
    tone: "tonePurple",
    art: {
      src: "/projects/hero/carolina-cinematic.webp",
      alt: "Sistema visual roxo e dourado desenvolvido para Carolina",
      position: "center",
    },
    recorte: null,
  },
  {
    id: "sweet-popcorn",
    kicker: "Embalagem",
    title: "Sweet Popcorn",
    line: "Estourado com ingredientes reais",
    href: "#trabalhos",
    slot: "slotRightBottom",
    tone: "toneCream",
    art: {
      src: "/projects/hero/sweet-popcorn-cinematic.webp",
      alt: "Embalagem colorida da Sweet Popcorn Gourmet em fotografia de estúdio",
      position: "center",
    },
    recorte: null,
  },
];

/* Fragmentos fora de foco: só profundidade de campo, sem conteúdo a ler. */
export const heroShards = [
  { id: "shard-1", src: "/projects/route-primary.webp", slot: "shardOne" },
  { id: "shard-2", src: "/projects/latino-beats.webp", slot: "shardTwo" },
  { id: "shard-3", src: "/projects/carolina-antes.webp", slot: "shardThree" },
  { id: "shard-4", src: "/projects/ghetto-baile-funk.webp", slot: "shardFour" },
  { id: "shard-5", src: "/projects/in-tha-route-flyer-full.webp", slot: "shardFive" },
  { id: "shard-6", src: "/projects/tux7c-primary.webp", slot: "shardSix" },
];
