export const pt = {
  locale: "pt-BR",
  htmlLang: "pt-BR",
  path: "/",

  meta: {
    title: "VIA — Você cuida do negócio. A gente cuida do marketing.",
    description:
      "Comercial, site, redes sociais e tráfego pago num time só, para o empresário que ainda toca a operação. Peça um diagnóstico gratuito com prévia de criativo.",
    ogImageAlt: "VIA — você cuida do negócio, a gente cuida do marketing.",
  },

  skipLinkLabel: "Ir para o conteúdo",

  organization: {
    availableLanguage: ["pt-BR"],
  },

  header: {
    logoLabel: "VIA, início",
    navAriaLabel: "Navegação principal",
    navCompactAriaLabel: "Navegação principal, versão compacta",
    nav: [
      { id: "metodo", label: "Método" },
      { id: "moikato", label: "Cases" },
      { id: "fazemos", label: "Serviços" },
      { id: "socios", label: "Quem somos" },
      { id: "portfolio", label: "Portfólio", href: "/portfolio" },
    ],
    ctaLabel: "Diagnóstico gratuito",
    menuAriaLabel: "Menu",
    openMenuLabel: "Abrir menu",
    closeMenuLabel: "Fechar menu",
    menuContactNote: "Sem custo, pelo WhatsApp",
    menuContactLabel: "Quero meu diagnóstico",
    langSwitch: {
      groupAriaLabel: "Idioma",
      current: "PT",
      other: "EN",
      otherHtmlLang: "en",
      href: "/en",
      ariaLabel: "Ver o site em inglês",
    },
  },

  hero: {
    logoLabel: "VIA, início",
    headlineAriaLabel: "Você cuida do negócio. A gente cuida do marketing.",
    headlineLead: "Você cuida do negócio.",
    headlineHighlight: "A gente cuida do marketing.",
    ctaLabel: "Quero meu diagnóstico",
    secondaryLabel: "Ver cases",
    secondaryHref: "#moikato",
    scrollLabel: "Descer para as frentes da VIA",
  },

  fronts: {
    ariaLabel: "As quatro frentes da VIA",
    items: ["Comercial", "Site e ferramentas", "Redes sociais e captação", "Tráfego pago"],
  },

  offer: {
    ariaLabel: "Diagnóstico gratuito",
    text: "Diagnóstico gratuito e uma prévia de criativo para o seu negócio.",
    ctaLabel: "Chamar no WhatsApp",
  },

  pain: {
    kicker: "Se isso parece familiar",
    title: "Você atende, vende e resolve. O marketing fica para depois.",
    items: [
      "“Posto quando sobra tempo, e quase nunca sobra.”",
      "“Já paguei anúncio e não sei se trouxe cliente.”",
      "“Minha marca não mostra o negócio que eu tenho.”",
      "“Cada fornecedor faz uma parte e ninguém conversa.”",
    ],
    closing:
      "A VIA assume essa frente inteira, para você voltar a cuidar do que só você faz.",
  },

  method: {
    kicker: "O método VIA",
    title: "Marketing se joga como xadrez: cada movimento prepara o próximo.",
    description:
      "Nada de post solto ou anúncio no escuro. Trabalhamos em três fases, e você sabe sempre em qual delas o seu negócio está.",
    steps: [
      {
        piece: "♙",
        phase: "Abertura",
        title: "Diagnóstico e posicionamento",
        text: "Entendemos o negócio, o cliente e a concorrência. Definimos para quem você vende e por que escolhem você.",
      },
      {
        piece: "♘",
        phase: "Meio-jogo",
        title: "Marca, site e conteúdo",
        text: "Montamos a estrutura: identidade, site ou landing page, perfil e linha de conteúdo prontos para receber cliente.",
      },
      {
        piece: "♔",
        phase: "Final",
        title: "Tráfego e vendas",
        text: "Ligamos o tráfego pago, medimos o que traz cliente e ajustamos o atendimento para transformar contato em venda.",
      },
    ],
  },

  /*
   * Resultados dos cases. Cada item é { value, label, client }: value é o
   * número em destaque ("+180%", "3x", "R$ 40 mil"), label diz o que ele mede
   * e em quanto tempo, client diz de quem é. Item sem value não vai ao ar; no
   * `npm run dev` ele aparece como espaço reservado, para ver onde vai cair.
   * A seção inteira some em produção enquanto nenhum item tiver value.
   */
  results: {
    kicker: "Resultados",
    title: "Números de clientes reais.",
    description: "Cada número vem de um projeto da VIA, com autorização do cliente.",
    placeholderLabel: "Número a preencher",
    items: [
      { value: null, label: "", client: "Moikato" },
      { value: null, label: "", client: "A Tardinha" },
      { value: null, label: "", client: "Clínicas na área da saúde" },
      { value: null, label: "", client: "In Tha Route" },
    ],
  },

  /*
   * Sócios. Para trocar a foto, coloque o arquivo em /public e aponte
   * image.src para ele; sem image, entra um monograma com as iniciais.
   */
  partners: {
    kicker: "Quem atende você",
    title: "Você fala direto com quem faz.",
    description:
      "Sem gerente de contas no meio. Os dois sócios estão em todos os projetos, do diagnóstico à entrega.",
    people: [
      {
        name: "Stephani",
        initials: "S",
        role: "Sócia · Criação e audiovisual",
        text: "Dirige, filma e fotografa. Cuida da marca, do conteúdo e de tudo o que o seu cliente vê.",
        image: {
          src: "/portfolio/stephani.webp",
          alt: "Stephani, sócia da VIA, com a câmera na mão durante um evento",
        },
      },
      {
        name: "João Pombo",
        initials: "JP",
        role: "Sócio · Tecnologia e performance",
        text: "Cuida de site, tráfego, dados e automação: a parte que transforma atenção em cliente.",
        image: null,
      },
    ],
  },

  howItWorks: {
    kicker: "Como funciona",
    title: "Do primeiro contato ao diagnóstico, sem compromisso.",
    steps: [
      {
        title: "Você chama no WhatsApp",
        text: "Conta em poucas linhas o que faz e o que quer melhorar. Leva um minuto.",
      },
      {
        title: "A gente estuda o seu negócio",
        text: "Antes da conversa, olhamos seu perfil, seu site, seus anúncios e a concorrência.",
      },
      {
        title: "Diagnóstico + prévia de criativo",
        text: "Mostramos o que está travando o crescimento e uma peça criada para o seu negócio. Fica com você, fechando ou não.",
      },
    ],
  },

  faq: {
    kicker: "Perguntas frequentes",
    title: "Antes de chamar.",
    items: [
      {
        question: "O diagnóstico é pago?",
        answer:
          "Não. O diagnóstico e a prévia de criativo são gratuitos e não obrigam você a contratar nada.",
      },
      {
        question: "Quanto custa trabalhar com a VIA?",
        answer:
          "Depende do que o seu negócio precisa. Depois do diagnóstico, enviamos uma proposta com escopo e valor fechados.",
      },
      {
        question: "Preciso contratar tudo de uma vez?",
        answer:
          "Não. Dá para começar por uma frente, como marca, site ou tráfego, e somar as outras quando fizer sentido.",
      },
      {
        question: "Vocês trabalham com clínicas?",
        answer:
          "Sim. Fazemos estratégia, conteúdo e tráfego para clínicas e profissionais da saúde.",
      },
      {
        question: "Atendem fora da minha cidade?",
        answer:
          "Sim. O atendimento é online, e hoje temos clientes no Brasil e no Reino Unido.",
      },
    ],
  },

  coverflow: {
    assistiveTitle: "Projetos que ganharam forma.",
    regionRoleDescription: "carrossel",
    regionLabel: "Projetos da VIA",
    prevLabel: "Projeto anterior",
    nextLabel: "Próximo projeto",
    selectLabelPrefix: "Selecionar projeto",
    slideLabelProjectWord: "Projeto",
    slideLabelOfWord: "de",
    byVia: "PROJETO VIA",
    gestureHint: "Deslize, use o scroll lateral ou as setas.",
    beforeAfter: {
      beforeLabel: "Antes",
      afterLabel: "Depois",
      valueTextSuffix: "da nova identidade visível",
    },
    health: {
      statement: "Cuidado que transforma vidas.",
      disciplines: ["Estratégia", "Conteúdo", "Mídia"],
      alertLabel: "Novo agendamento",
      ticketTitle: "Consulta confirmada",
      ticketMeta: "Vitae · Cardiologia",
      ticketDay: "Terça, 14h",
      ticketMode: "Presencial",
    },
  },

  portfolio: {
    path: "/portfolio",
    langHref: "/en/portfolio",
    meta: {
      title: "Portfólio — VIA",
      description:
        "Portfólio de foto e vídeo da Sté, videomaker, fotógrafa e sócia da VIA: eventos, filmes de marca, reels e fotografia de produto.",
      ogImage: "/og-portfolio.jpg",
      ogImageAlt:
        "VIA — Portfólio de foto e vídeo, com uma faixa de fotos e frames dos trabalhos.",
    },
    whatsappMessage:
      "Oi, Sté! Vi seu portfólio na VIA e quero conversar sobre uma produção de foto ou vídeo.",
    about: {
      skills: ["Direção", "Captação", "Fotografia", "Edição & cor"],
      titleLead: "Criar sempre foi minha forma de ",
      titleHighlight: "ver o mundo.",
      greeting: "Oii, eu sou a Sté e faço parte do pilar criativo da V.IA",
      paragraphs: [
        "Antes de ter uma câmera nas mãos, eu já encontrava mil maneiras de criar.",
        "Aos 10 anos, escrevia em blogs. Depois vieram os desenhos, as pinturas, os textos e tudo aquilo que me permitia transformar uma ideia em algo real.",
        "Me formei em Administração, mas foi na criatividade que sempre me reconheci. E, de alguma forma, encontrei no marketing e no audiovisual um lugar onde meu olhar criativo e minha visão estratégica se encontram.",
        "Hoje, conto histórias através de imagens, movimento e direção criativa. Da primeira ideia ao último ajuste de cor, gosto de estar presente em cada detalhe.",
        "No fundo, continuo fazendo o que sempre amei: criando.",
      ],
      image: {
        src: "/portfolio/stephani.webp",
        width: 840,
        height: 1050,
        alt: "Stephani, a Sté, com a câmera na mão durante a cobertura de um evento",
      },
    },
    // O showreel só aparece quando houver um vídeo em src (curto, 1–2 min,
    // em /public/portfolio). A versão "loop" é o trecho mudo do fundo.
    showreel: {
      kicker: "SHOWREEL",
      title: "Um minuto do que a Sté filma.",
      playLabel: "Assistir ao showreel",
      closeLabel: "Fechar",
      videoFallback: "Seu navegador não reproduz este vídeo.",
      src: null,
      loopSrc: null,
      poster: null,
    },
    specialties: {
      kicker: "SERVIÇOS",
      titleLead: "Da pauta à ",
      titleHighlight: "edição final.",
      items: [
        {
          title: "Cobertura de eventos",
          image: { src: "/portfolio/galaticos-bastidor.webp", width: 1066, height: 1600 },
        },
        {
          title: "Filmes de marca",
          image: { src: "/depoimento-samuel-moikato.jpg", width: 464, height: 832 },
        },
        {
          title: "Reels e conteúdo vertical",
          image: { src: "/portfolio/salao-de-beleza-poster.webp", width: 720, height: 1280 },
        },
        {
          title: "Produto, retrato e editorial",
          image: { src: "/portfolio/retrato-salao.webp", width: 1066, height: 1600 },
        },
      ],
    },
    finalCta: {
      kicker: "PRÓXIMA PRODUÇÃO",
      titleLine1: "Vamos filmar",
      titleLine2Lead: "a sua ",
      titleLine2Highlight: "história?",
      ctaNote: "Evento, marca ou produto?",
      ctaLabel: "Falar com a Sté",
      emailLabel: "E-mail",
      copyHint: "Clique para copiar",
      copiedLabel: "Copiado",
    },
    kicker: "PORTFÓLIO",
    titleLead: "Trabalhos ",
    titleHighlight: "selecionados.",
    gallery: {
      ariaLabel: "Galeria de fotos e vídeos da VIA",
      filters: { photo: "Fotos", video: "Vídeos" },
      typeLabels: { photo: "Foto", video: "Vídeo" },
      openLabel: "Abrir",
      viewerLabel: "Visualizador de mídia",
      closeLabel: "Fechar",
      prevLabel: "Mídia anterior",
      nextLabel: "Próxima mídia",
      photosTitleLead: "Entre um take ",
      photosTitleHighlight: "e outro.",
      videoFallback: "Seu navegador não reproduz este vídeo.",
    },
    // Para incluir uma mídia, coloque o arquivo em /public/portfolio e adicione
    // um item aqui (e o mesmo item em en.js). Vídeos precisam de um poster e
    // podem ter um "preview": um trecho leve que roda no card ao passar o mouse.
    items: [
      {
        id: "depoimento-samuel-moikato",
        type: "video",
        src: "/depoimento-samuel-moikato.mp4",
        poster: "/depoimento-samuel-moikato.jpg",
        width: 464,
        height: 832,
        duration: "1:28",
        title: "Depoimento",
        client: "Samuel Moikato",
        alt: "Samuel Moikato, empresário no Reino Unido, fala sobre o trabalho com a VIA",
      },
      {
        id: "reels-segredo-crianca-colaborar",
        type: "video",
        src: "/portfolio/segredo-crianca-colaborar.mp4",
        preview: "/portfolio/segredo-crianca-colaborar-preview.mp4",
        poster: "/portfolio/segredo-crianca-colaborar-poster.webp",
        width: 720,
        height: 1280,
        duration: "0:25",
        title: "Vídeo institucional",
        client: "Clínica odontológica",
        alt: "Dentista explica, em um reel legendado, como conduzir uma criança com cuidado antes da consulta",
      },
      {
        id: "reels-galaticos-ft",
        type: "video",
        src: "/portfolio/galaticos-ft.mp4",
        preview: "/portfolio/galaticos-ft-preview.mp4",
        poster: "/portfolio/galaticos-ft-poster.webp",
        width: 720,
        height: 1280,
        duration: "1:00",
        title: "Cobertura",
        client: "Eventos",
        alt: "Duas apresentadoras em um evento no gramado de um estádio, em vídeo vertical legendado",
      },
      {
        id: "reels-mundo-egipcio",
        type: "video",
        src: "/portfolio/mundo-egipcio.mp4",
        preview: "/portfolio/mundo-egipcio-preview.mp4",
        poster: "/portfolio/mundo-egipcio-poster.webp",
        width: 720,
        height: 1280,
        duration: "1:25",
        title: "Reels para loja",
        client: "Mundo Egípcio",
        alt: "Duas apresentadoras mostram cerâmicas e luminárias turcas dentro de uma loja",
      },
      {
        id: "reels-salao-de-beleza",
        type: "video",
        src: "/portfolio/salao-de-beleza.mp4",
        preview: "/portfolio/salao-de-beleza-preview.mp4",
        poster: "/portfolio/salao-de-beleza-poster.webp",
        width: 720,
        height: 1280,
        duration: "0:13",
        title: "Reels de beleza",
        client: "Salão de beleza",
        alt: "Cabeleireira arruma o cabelo ondulado de uma cliente em um salão",
      },
      {
        id: "galaticos-lounge",
        type: "photo",
        src: "/portfolio/galaticos-lounge.webp",
        width: 1066,
        height: 1600,
        title: "Cobertura",
        client: "Eventos",
        alt: "Duas mulheres conversam sentadas no gramado do estádio, cada uma com um copo de cerveja, em um lounge com poltronas claras",
      },
      {
        id: "galaticos-retrato",
        type: "photo",
        src: "/portfolio/galaticos-retrato.webp",
        width: 720,
        height: 1280,
        title: "Cobertura",
        client: "Eventos",
        alt: "Mulher de top vinho e calça jeans posa em frente à arquibancada de um estádio",
      },
      {
        id: "galaticos-bastidor",
        type: "photo",
        src: "/portfolio/galaticos-bastidor.webp",
        width: 1066,
        height: 1600,
        title: "Cobertura",
        client: "Eventos",
        alt: "Apresentadora lê o roteiro sentada a uma mesa alta no lounge do estádio",
      },
      {
        id: "retrato-salao",
        type: "photo",
        src: "/portfolio/retrato-salao.webp",
        width: 1066,
        height: 1600,
        title: "Foto de Catálogo",
        client: "Comercial",
        alt: "Cabeleireiro de blusa preta ao lado de uma cliente de camisa rosa, em um salão claro",
      },
      {
        id: "mesa-salgados",
        type: "photo",
        src: "/portfolio/mesa-salgados.webp",
        width: 1066,
        height: 1600,
        title: "Foto Dump",
        client: "Corporativo",
        alt: "Salgados e doces em travessas de vidro sobre uma mesa de madeira clara",
      },
      {
        id: "rede-infantil",
        type: "photo",
        src: "/portfolio/rede-infantil.webp",
        width: 1066,
        height: 1600,
        title: "Retrato infantil",
        client: "Ensaio",
        alt: "Menino sorrindo sentado em uma rede laranja numa varanda de madeira, com jardim ao fundo",
      },
      {
        id: "pet-golden",
        type: "photo",
        src: "/portfolio/pet-golden.webp",
        width: 1066,
        height: 1600,
        title: "Retrato pet",
        client: "Pets",
        alt: "Cachorro golden retriever sorrindo, com a língua de fora, olhando para a câmera sobre um deck de madeira",
      },
      {
        id: "ensaio-cachoeira",
        type: "photo",
        src: "/portfolio/ensaio-cachoeira.webp",
        width: 1066,
        height: 1600,
        title: "Ensaio ao ar livre",
        client: "Natureza",
        alt: "Mulher de perfil, com o rosto voltado para cima e o cabelo em movimento, diante de um lago e uma cachoeira",
      },
      {
        id: "cachoeira-jardim",
        type: "photo",
        src: "/portfolio/cachoeira-jardim.webp",
        width: 1066,
        height: 1600,
        title: "Cachoeira no jardim",
        client: "Paisagens",
        alt: "Pequena cachoeira caindo sobre pedras em um lago cercado por vegetação",
      },
      {
        id: "onibus-londres",
        type: "photo",
        src: "/portfolio/onibus-londres.webp",
        width: 1200,
        height: 1600,
        title: "Fotos Urbanas",
        client: "Londres",
        alt: "Ônibus vermelho de dois andares passando por uma rua de tijolos aparentes em Londres",
      },
      {
        id: "cabines-londres",
        type: "photo",
        src: "/portfolio/cabines-londres.webp",
        width: 1200,
        height: 1600,
        title: "Fotos Urbanas",
        client: "Londres",
        alt: "Fileira de cabines telefônicas vermelhas inclinadas como dominós ao longo de uma calçada",
      },
    ],
  },

  capabilities: {
    kicker: "O que a VIA faz",
    title: "Tudo o que o seu marketing precisa, num time só.",
    description:
      "Você não precisa juntar cinco fornecedores. A VIA cuida de cada frente e faz todas trabalharem juntas.",
    items: [
      {
        accent: "purple",
        icon: "marca",
        title: "Marca & identidade",
        text: "Posicionamento, naming, logo e um sistema visual que sustenta a marca.",
      },
      {
        accent: "blue",
        icon: "site",
        title: "Sites & landing pages",
        text: "Experiências digitais para apresentar, conduzir e converter.",
      },
      {
        accent: "cyan",
        icon: "conteudo",
        title: "Conteúdo & campanhas",
        text: "Social media, gestão de redes, roteiros e campanhas com direção criativa.",
      },
      {
        accent: "green",
        icon: "trafego",
        title: "Tráfego & performance",
        text: "Crescimento orgânico e pago com leitura, aprendizado e próxima ação.",
      },
      {
        accent: "blue",
        icon: "estrategia",
        title: "Estratégia & comercial",
        text: "Oferta e processo conectados para aproximar demanda de receita.",
      },
      {
        accent: "cyan",
        icon: "tecnologia",
        title: "Tecnologia & automação",
        text: "Sites, CRM, automações e IA aplicados ao negócio.",
      },
    ],
  },

  system: {
    videoAriaLabel: "Depoimento em vídeo de Samuel, da Moikato, sobre o trabalho da VIA",
    videoFallback: "Seu navegador não consegue reproduzir este vídeo.",
    videoBadge: "Depoimento real · Londres",
    quoteKicker: "Resultado em primeira pessoa",
    quote: "“Eles acreditaram no meu trabalho.”",
    quoteAttribution: "Samuel · Moikato · Empresário em Londres",
    caseKicker: "Case Moikato · Brasil → Reino Unido",
    title: "Uma história brasileira, contada por quem a vive.",
    description:
      "A Moikato cresceu do Brasil para o Reino Unido. A VIA conectou origem, marca e experiência digital para acompanhar esse movimento.",
    storyAriaLabel: "A história do projeto em três momentos",
    story: [
      {
        step: "01 · Origem",
        title: "Preservar a essência.",
        text: "Artesanato sustentável e uma identidade conectada à natureza.",
      },
      {
        step: "02 · Construção",
        title: "Dar forma à marca.",
        text: "Posicionamento, narrativa, conteúdo e experiência digital alinhados.",
      },
      {
        step: "03 · Expansão",
        title: "Atravessar fronteiras.",
        text: "Um site bilíngue e uma comunicação preparados para dois mercados.",
      },
    ],
    visualBrandLabel: "Marca e origem",
    visualSiteLabel: "Site e internacionalização",
    creditsAriaLabel: "Entregas realizadas pela VIA para a Moikato",
    deliveries: [
      { number: "01", title: "Posicionamento" },
      { number: "02", title: "Marca" },
      { number: "03", title: "Narrativa" },
      { number: "04", title: "Conteúdo" },
      { number: "05", title: "Site bilíngue" },
      { number: "06", title: "Internacionalização" },
    ],
  },

  finalCta: {
    kicker: "Próximo movimento",
    titleLine1: "Sua vez de jogar.",
    titleLine2Lead: "Peça o seu ",
    titleLine2Highlight: "diagnóstico.",
    description: "Diagnóstico + prévia de criativo para o seu negócio. Sem custo e sem compromisso.",
    ctaNote: "Resposta pelo WhatsApp",
    ctaLabel: "Quero meu diagnóstico",
    emailPrompt: "Prefere e-mail?",
  },

  footer: {
    logoLabel: "VIA, voltar ao início",
    contactAriaLabel: "Contato",
    whatsappLabel: "WhatsApp",
    copyright: "© 2026 VIA. Crescimento em movimento.",
  },

  contact: {
    whatsappMessage:
      "Olá! Vi o site da VIA e quero o diagnóstico gratuito com a prévia de criativo para o meu negócio.",
  },

  caseProjects: [
    {
      id: "case-moikato",
      name: "Moikato",
      label: "01 / MARCA INTERNACIONAL",
      tags: "MARCA · POSICIONAMENTO · DIGITAL",
      description:
        "Um universo de marca enraizado na natureza e preparado para ganhar presença internacional.",
      image: "/projects/moikato-brand.webp",
      alt: "Aplicação da identidade visual criada para a Moikato",
      fit: "cover",
      position: "center",
      surface: "moikato",
      href: "https://moikato.com",
      cta: "Ver projeto",
    },
    {
      id: "case-tardinha",
      name: "A Tardinha",
      label: "02 / LANDING PAGE",
      tags: "LANDING PAGE · INGRESSOS · EXPERIÊNCIA",
      description: "Criação de landing pages para venda de ingressos.",
      image: "/projects/hero/tardinha-cinematic.webp",
      alt: "Experiência ao pôr do sol apresentada no projeto A Tardinha",
      fit: "cover",
      position: "center",
      surface: "tardinha",
      href: "https://xn--tardinhariosolimes-82b.com/",
      cta: "Visitar site",
    },
    {
      id: "case-saude",
      name: "Clínicas na área da saúde",
      label: "03 / AQUISIÇÃO DIGITAL",
      tags: "ESTRATÉGIA · CONTEÚDO · TRÁFEGO",
      description:
        "Estratégia digital e comunicação para profissionais da área da saúde.",
      kind: "health",
      surface: "health",
      alt: "Composição digital criada para representar o trabalho da VIA com clínicas",
    },
    {
      id: "case-in-tha-route",
      name: "In Tha Route",
      label: "04 / IDENTIDADE VISUAL",
      tags: "REBRANDING · MARCA · DIREÇÃO",
      description: "Uma marca antiga transformada em uma identidade preparada para um novo momento.",
      image: "/projects/route-primary.webp",
      alt: "Nova identidade da In Tha Route criada pela VIA",
      fit: "contain",
      position: "center",
      surface: "route",
      compare: {
        before: {
          src: "/projects/route-before.webp",
          alt: "Identidade antiga da In Tha Kitchen, com facas cruzadas em um círculo vermelho",
        },
        after: {
          src: "/projects/route-primary.webp",
          alt: "Nova identidade da In Tha Route criada pela VIA",
        },
        ariaLabel: "Comparar a identidade antiga e a nova da In Tha Route",
        caption:
          "Arraste o controle ou use as setas do teclado para comparar o antes e o depois da marca.",
      },
    },
    {
      id: "case-conteudo-visual",
      name: "Conteúdo visual",
      label: "05 / PANFLETOS & PEÇAS",
      tags: "CAMPANHAS · EVENTOS · SOCIAL",
      description:
        "Panfletos, peças promocionais e campanhas para marcas e eventos.",
      image: "/projects/latino-beats.webp",
      alt: "Panfleto Latino Beats criado para evento em Londres",
      kind: "content",
      surface: "content",
      collage: [
        {
          src: "/projects/in-tha-route-flyer-full.webp",
          alt: "Panfleto promocional da In Tha Route",
        },
        {
          src: "/projects/latino-beats.webp",
          alt: "Panfleto Latino Beats criado para evento em Londres",
        },
        {
          src: "/projects/ghetto-baile-funk.webp",
          alt: "Panfleto do baile funk Ghetto Made in Brazil",
        },
      ],
    },
    {
      id: "case-sweet-popcorn",
      name: "Sweet Popcorn Gourmet",
      label: "06 / MARCA & EMBALAGEM",
      tags: "LOGO · BRANDING · EMBALAGEM",
      description: "Identidade colorida aplicada à embalagem para tornar o produto reconhecível.",
      image: "/projects/hero/sweet-popcorn-cinematic.webp",
      alt: "Embalagem da Sweet Popcorn Gourmet com a identidade criada pela VIA",
      fit: "cover",
      position: "center",
      surface: "sweet",
    },
    {
      id: "case-sephie-tarot",
      name: "Sephie Tarot",
      label: "07 / LOGO & IDENTIDADE",
      tags: "LOGO · SÍMBOLO · ASSINATURA",
      description: "Logo, símbolo e assinatura visual.",
      image: "/projects/artes/sephie-prancha.webp",
      alt: "Assinatura visual da Sephie Tarot criada pela VIA",
      fit: "contain",
      position: "center",
      surface: "sephie",
    },
    {
      id: "case-xango",
      name: "Xangô 7 Cachoeiras",
      label: "08 / MARCA & SÍMBOLO",
      tags: "LOGO · SÍMBOLO · IDENTIDADE",
      description: "Assinatura visual para trazer mais identidade.",
      image: "/projects/tux7c-primary.webp",
      alt: "Identidade do Terreiro de Umbanda Xangô 7 Cachoeiras",
      fit: "contain",
      position: "center",
      surface: "xango",
    },
    {
      id: "case-studio-giu",
      name: "Studio da Giu",
      label: "09 / MARCA & MATERIAIS",
      tags: "IDENTIDADE · PEÇAS GRÁFICAS",
      description: "Construção de identidade visual e materiais gráficos.",
      image: "/projects/studio-giu-pricing.webp",
      alt: "Tabela de preços criada para o Studio da Giu",
      fit: "contain",
      position: "center",
      surface: "studio",
    },
    {
      id: "case-carolina-carvalho",
      name: "Carolina Carvalho",
      label: "10 / REBRANDING",
      tags: "MARCA · PALETA · MANUAL",
      description: "Rebranding, paleta e manual de marca para podóloga.",
      image: "/projects/carolina-depois.webp",
      alt: "Nova marca de Carolina Carvalho criada pela VIA",
      fit: "contain",
      position: "center",
      surface: "carolina",
      compare: {
        before: {
          src: "/projects/carolina-antes.webp",
          alt: "Marca antiga da podóloga Carolina Carvalho",
        },
        after: {
          src: "/projects/carolina-depois.webp",
          alt: "Nova marca de Carolina Carvalho criada pela VIA",
        },
        ariaLabel: "Comparar a marca antiga e a nova de Carolina Carvalho",
        caption:
          "Arraste o controle ou use as setas do teclado para comparar o antes e o depois da marca.",
      },
    },
  ],
};
