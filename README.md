# VIA — portfólio digital

![Prévia da landing page da VIA](./public/og-via.jpg)

Landing page institucional criada para apresentar a VIA, seus serviços e seus
cases em uma experiência rápida, responsiva e orientada à conversão.

O projeto também funciona como vitrine do sistema visual da marca: os tokens de
design ficam centralizados e podem ser consultados em um catálogo próprio na
rota `/design-system`.

## Destaques

- Interface responsiva construída com Next.js e React.
- Design system documentado, com tokens de cor, tipografia e espaçamento.
- Cases reais apresentados sem misturar a identidade dos clientes com a marca
  institucional.
- Metadados de SEO e Open Graph configurados para compartilhamento.
- Componentes testados e validação automatizada por lint.

## Tecnologias

- Next.js
- React
- TypeScript
- CSS Modules e design tokens
- Node.js Test Runner
- ESLint

## Arquitetura visual

`app/design-tokens.css` é a fonte única dos tokens usados pela interface. A
documentação detalhada vive em `design-system/via/MASTER.md`, enquanto
`/design-system` oferece uma referência visual navegável dos componentes e
decisões da marca.

Essa separação mantém a identidade da VIA consistente e isola as cores e
características particulares de cada case.

## Como executar

Requer Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Qualidade

```bash
npm run lint
npm test
npm run build
```

## Publicação

O projeto está preparado para deploy na Vercel. A plataforma fornece
`VERCEL_PROJECT_PRODUCTION_URL` automaticamente; em outra hospedagem, defina
`NEXT_PUBLIC_SITE_URL` com o domínio público para gerar URLs corretas nas
prévias sociais.

---

Desenvolvido por [João Pombo](https://github.com/JoOoJP).
