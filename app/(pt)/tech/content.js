// Tudo o que a página diz mora aqui. Um item com `placeholder: true` aparece
// na tela marcado como pendente, para não ir ao ar passando por definitivo.

export const tech = {
  meta: {
    title: "João Pombo, desenvolvedor full stack",
    description:
      "Desenvolvedor full stack, com foco em back-end. Construo e opero sistemas em produção: financeiro, CRM, tarefas e portal do cliente.",
  },

  intro: {
    name: "João Pombo",
    role: "Desenvolvedor full stack, com foco em back-end.",
    summary:
      "Construo e opero sistemas em produção: financeiro, CRM, tarefas e portal do cliente.",
    links: [
      { label: "GitHub", href: "https://github.com/JoOoJP" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/joaopombo-dev",
      },
    ],
  },

  projects: [
    {
      id: "viaclientes",
      name: "ViaClientes",
      kind: "Em produção",
      summary:
        "Plataforma de gestão de clientes da VIA, um SaaS single-tenant em produção.",
      details: [
        {
          term: "Módulos",
          items: [
            "Financeiro: contratos, cobranças e baixas",
            "CRM de prospecção",
            "Tarefas e agenda",
            "Portal do cliente",
            "Relatórios",
            "Roteiros de conteúdo",
          ],
        },
        {
          term: "Integrações",
          items: [
            "Meta Ads e Vercel, via API",
            "Rotinas agendadas (cron) e webhooks",
          ],
        },
        {
          term: "Stack",
          items: [
            "TypeScript",
            "Next.js (App Router, Server Components e Server Actions)",
            "Drizzle ORM",
            "PostgreSQL (Neon)",
            "Clerk",
            "Tailwind e shadcn/ui",
            "Deploy na Vercel",
          ],
          inline: true,
        },
      ],
      decisions: {
        title: "Decisões de arquitetura",
        items: [
          "Módulos em fatias verticais, cada um com uma porta pública única.",
          "Acesso ao banco só pela camada de dados, com a autorização verificada dentro de cada função.",
          "DTOs em vez de linhas cruas do banco.",
          "Sem acoplamento por dados entre módulos.",
          "Situação financeira derivada, em vez de guardada.",
        ],
      },
      // Quando a demo existir, troque por { label: "Ver a demo pública", href: "https://..." }.
      demo: { label: "Demo pública em preparação" },
    },
    {
      id: "pedidos-despesas",
      name: "Sistema interno de pedidos e despesas",
      kind: "Em produção",
      summary:
        "Sistema interno em produção para uma empresa de iluminação e decoração.",
      details: [
        {
          term: "Problema",
          items: [
            { text: "[que problema de pedidos e despesas o sistema resolve]", placeholder: true },
          ],
        },
        {
          term: "Stack",
          items: [{ text: "[stack do sistema]", placeholder: true }],
          inline: true,
        },
      ],
    },
    {
      id: "sites",
      name: "Sites e landing pages",
      summary: "Páginas para um evento real e para uma marca conceito.",
      sites: [
        {
          name: "Tardinha",
          description: "Landing page de um evento real.",
          link: "[link do site]",
          image: "[imagem]",
        },
        {
          name: "Fermenta",
          tag: "Projeto conceito",
          description: "Site de uma padaria fictícia, criado como projeto conceito.",
          link: "[link do site]",
          image: "[imagem]",
        },
      ],
    },
  ],

  experience: [
    {
      org: "VIA",
      role: "CTO e desenvolvedor",
      period: "Desde 2024",
      description:
        "Construção e operação de sistemas internos e para clientes.",
    },
    {
      org: "Agenc.ia",
      role: "Full stack",
      period: "Mar a set de 2026",
    },
    {
      org: "Smile University",
      role: "Full stack e arquitetura de sistemas",
      period: "Out de 2025 a ago de 2026",
    },
    {
      org: "BRF",
      role: "RPA Developer",
      period: "2022 a 2023",
      description: "UiPath.",
    },
  ],

  background: [
    { term: "Formação", value: "Engenharia Elétrica" },
    {
      term: "Idiomas",
      value: "Inglês fluente; espanhol e japonês intermediário",
    },
  ],

  stack: [
    "TypeScript",
    "Next.js",
    "React",
    "Node.js",
    "PostgreSQL",
    "Drizzle ORM",
    "Clerk",
    "Tailwind CSS",
    "Vercel",
    "Git/GitHub",
  ],

  contact: {
    title: "Vamos conversar",
    linkedin: "https://www.linkedin.com/in/joaopombo-dev",
    email: "jpombo2001@hotmail.com",
  },
};
