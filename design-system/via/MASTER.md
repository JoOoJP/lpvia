# VIA — Design System

Fonte única de verdade visual para a landing page institucional da VIA.

## Essência

- Premium sem ostentação.
- Tecnológica sem clichê futurista.
- Direta, inteligente, estratégica e humana.
- Respiro antes de decoração.

## Arquitetura de tokens

1. **Primitivos:** marca, neutros, espaço, forma e duração.
2. **Semânticos:** superfícies, texto, borda, foco, tipografia e composição.
3. **Componentes:** header, botões, cards e estados de foco.

Implementação: `app/design-tokens.css`.

## Marca

| Token | Valor | Uso |
|---|---:|---|
| `--via-purple` | `#5B12D1` | início do gradiente, estratégia |
| `--via-cyan` | `#00B8D4` | conexão, tecnologia |
| `--via-green` | `#39D67A` | ação, direção, foco |
| `--gradient-brand` | roxo → ciano → verde | logo, CTA principal, sinal de movimento |

O gradiente não é fundo decorativo recorrente. É assinatura.

## Tipografia

- **Voz principal e corpo:** Inter.
- **Display e cases:** Space Grotesk 500–600, tracking fechado, line-height entre `0.90` e `1.02`.
- **Corpo:** Inter 400, mínimo 16 px, line-height `1.65`.
- **Rótulos:** Inter 700–750, caixa alta, tracking `0.16em`.
- **Acento editorial:** Libre Bodoni apenas para frases, conceitos ou citações pertencentes ao cliente. Nunca em títulos institucionais da VIA.

## Superfícies

- Claro quente: problema, explicação e prova.
- Branco: conteúdo elevado, sem sombra.
- Grafite/preto: sistema, decisão e conversão.
- Bordas de 1 px organizam a composição.
- Cards institucionais não usam raio; pílulas ficam reservadas a ações.

## Componentes

- **CTA principal:** gradiente VIA, mínimo 54 px.
- **CTA secundário:** contorno ou link sublinhado.
- **Cards:** borda fina, sem sombra.
- **Cases:** podem usar fotografia e cores do cliente, mas esses valores ficam isolados no próprio case e nunca viram tokens da VIA.
- **Densidade de case:** abertura curta, imagem panorâmica e conteúdo factual visível no próximo movimento de rolagem. Impacto não pode esconder informação.
- **Header:** preto translúcido, navegação curta, uma ação.

## Movimento

- `180 ms`: hover, cor e sublinhado.
- `300 ms`: entrada sutil.
- `700 ms`: zoom de fotografia protagonista.
- Sempre respeitar `prefers-reduced-motion`.

## Acessibilidade

- Corpo com contraste mínimo de `4.5:1`.
- Componentes e foco com mínimo de `3:1`.
- Área interativa mínima de `44 × 44 px`.
- Foco global: 3 px verde VIA, offset de 4 px.
- Nunca depender apenas de cor para comunicar significado.

## Princípios

1. Uma ideia forte por seção.
2. Gradiente como assinatura, nunca como ruído.
3. Space Grotesk cria impacto; Inter explica; a serifada cita o cliente.
4. Cor de case não vira cor da marca.
5. Sem sombra, glow ou movimento sem função.
