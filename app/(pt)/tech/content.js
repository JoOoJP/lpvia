// Tudo o que a página diz mora aqui.

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
      // Print do sistema real com tudo o que identifica o cliente borrado:
      // nomes, valores, contadores, logo e usuário.
      screenshot: {
        src: "/tech/pedidos-kanban.webp",
        width: 1600,
        height: 748,
        label: "kanban",
        alt: "Quadro kanban do sistema com os pedidos divididos nas etapas orçamento, negociação, fechado, em obra, compras, instalação e finalizado; nomes e valores aparecem borrados",
        caption: "Pedidos por etapa, do orçamento à entrega. Dados do cliente borrados.",
      },
      details: [
        {
          term: "Problema",
          items: [
            "Pedidos de prazo longo se perdiam e se desorganizavam até a entrega.",
          ],
        },
        {
          term: "O que resolve",
          items: [
            "Acompanhamento organizado dos pedidos do início à entrega",
            "Organização das notas fiscais para conferência",
            "Organização da compra de produtos",
          ],
        },
        {
          term: "Detalhes técnicos",
          items: [
            "Autenticação própria: senhas derivadas e sessões revogáveis no banco",
            "Comprovantes privados no Vercel Blob, entregues por rota autenticada",
            "Leitura do XML das notas fiscais",
            "Migrações rodam no build de produção; se falharem, a versão anterior continua no ar",
            "Avisos por web push e resumos agendados (cron)",
          ],
        },
        {
          term: "Stack",
          items: [
            "TypeScript",
            "Next.js (App Router)",
            "React",
            "Drizzle ORM",
            "PostgreSQL (Neon)",
            "Zod",
            "Vercel Blob",
            "Tailwind CSS",
            "Vitest e Playwright",
            "Deploy na Vercel",
          ],
          inline: true,
        },
      ],
    },
    {
      id: "sites",
      name: "Sites, landing pages e e-commerce",
      summary: "Uma loja virtual completa, um site de conversão e landing pages, todos em produção.",
      // `shots` aponta para public/tech/<nome>-desktop.webp e -mobile.webp,
      // prints da página inicial pública de cada site.
      sites: [
        {
          name: "Moikato",
          description: "E-commerce completo: começou como página e virou a loja inteira.",
          href: "https://moikato.com",
          shots: "moikato",
        },
        {
          name: "Tardinha",
          description: "Landing pages para venda de ingressos de um evento.",
          href: "https://xn--tardinhariosolimes-82b.com/",
          display: "tardinhariosolimões.com",
          shots: "tardinha",
        },
        {
          name: "Dra. Camila Bresciani",
          dir: "camilabresciani",
          description: "Site de conversão para ortodontista.",
          href: "https://camilabresciani.viamkt.com/",
          shots: "camilabresciani",
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
