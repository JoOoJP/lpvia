# Portfólio VIA

Landing page institucional da VIA, construída com Next.js, React e Tailwind CSS.

## Desenvolvimento

Requer Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

O projeto abre por padrão em `http://localhost:3000`.

## Verificação

```bash
npm run lint
npm test
```

## Publicação na Vercel

Importe este diretório como um projeto Next.js. A Vercel detecta os comandos de
build e start automaticamente; não há configuração de Cloudflare ou OpenAI
Sites.

O endereço absoluto usado nas imagens de Open Graph vem de
`VERCEL_PROJECT_PRODUCTION_URL`, que a própria Vercel injeta. Em qualquer outra
hospedagem, defina `NEXT_PUBLIC_SITE_URL` com o domínio final — sem ela, a
prévia social aponta para `localhost`.
