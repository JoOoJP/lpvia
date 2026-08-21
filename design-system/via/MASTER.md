# VIA — Design System

Fonte única de verdade visual para a apresentação institucional da VIA.

## Essência

- Premium sem ostentação.
- Tecnológica sem clichê futurista.
- Direta, inteligente, estratégica e humana.
- Visual o bastante para demonstrar repertório; clara o bastante para explicar o negócio.

## Direção visual — Forma em movimento

A interface vive sobre preto profundo. A luz do gradiente VIA revela direção,
conexão e energia, sem transformar a página em um painel neon.

- Fundo preto com grade quase invisível e profundidade luminosa localizada.
- Inter é a voz única da apresentação: forte no display, simples no corpo.
- O logo VIA ganha escala no hero e funciona como objeto visual, não ornamento.
- Bordas finas e painéis grafite organizam o conteúdo sem criar uma página editorial.
- O gradiente aparece em marca, palavras-chave, conexões e ações principais.
- Projetos usam imagens reais e mockups contidos em cards horizontais.
- Movimento é sutil e opcional; a leitura não depende de animação.
- A página é mobile-first e nunca exige rolagem horizontal.

## Arquitetura da apresentação

A página é um portfólio institucional curto. Mostra primeiro, explica apenas o
necessário e encerra com um convite simples.

1. **Hero manifesto:** o que é a VIA, dois caminhos de navegação e a marca em escala.
2. **A VIA pensa e faz:** seis competências em módulos visuais compactos.
3. **Projetos pontuais:** serviços menores em uma grade objetiva.
4. **Growth Plus:** produto principal como sistema conectado de quatro frentes.
5. **Projetos selecionados:** três cases principais e uma grade compacta de
   projetos adicionais, sem transformar cada trabalho em uma seção longa.
6. **Depoimento:** prova humana em vídeo, logo depois dos trabalhos.
7. **Contato:** “Vamos construir o que vem a seguir.”

Diagnóstico, preços, planos e uma seção institucional longa não entram nesta
apresentação. A conversa comercial acontece depois do interesse.

## Marca

| Token | Valor | Uso |
|---|---:|---|
| `--via-purple` | `#5B12D1` | início do movimento, estratégia |
| `--via-blue` | `#2E6BE8` | marketing e demanda |
| `--via-cyan` | `#00B8D4` | conexão e conversão |
| `--via-green` | `#39D67A` | tecnologia, ação e escala |
| `--gradient-brand` | roxo → azul → ciano → verde | marca, CTA e conexões |

O gradiente é assinatura, não preenchimento padrão. Nos botões, roxo e azul
sustentam o texto branco; ciano e verde ficam concentrados na extremidade da
seta, que usa tinta escura. Tons puros também aparecem no logo, no brilho
decorativo e em grandes elementos gráficos.

Em CTAs, o gradiente é sempre horizontal e recortado dentro da borda neutra.
Isso mantém cada extremidade cromaticamente uniforme no raio da pílula.

## Tipografia

O manual da marca especifica Inter. Nesta direção, ela ocupa todos os papéis e
elimina a sensação editorial criada por misturas tipográficas.

- **Display:** Inter 500–600, tracking entre `-0.07em` e `-0.04em`.
- **Títulos de card:** Inter 540–650.
- **Corpo:** Inter 400, mínimo 16 px em texto corrido, line-height 1.55–1.65.
- **Rótulos:** Inter 700–750, caixa alta, tracking `0.12em`–`0.16em`.
- **Acentos:** gradiente e peso, nunca uma fonte decorativa.

Space Grotesk e Libre Bodoni permanecem carregadas por compatibilidade com o
catálogo antigo, mas não são usadas na landing page principal.

## Superfícies

- Página: `#060707`.
- Painel principal: `#0B0D0E`.
- Painel secundário: branco com 1.5%–4% de opacidade.
- Texto principal: `#F7F7F5`.
- Texto de apoio: cinza entre `#92989B` e `#AEB3B6`.
- Bordas: branco com 9%–13% de opacidade.
- Cards de projeto e produto: raio entre 16 e 18 px.
- Ações: pílulas; módulos e divisórias nunca viram pílulas.

## Componentes

- **Header:** preto translúcido, logo à esquerda e menu à direita em todas as telas.
- **CTA principal:** gradiente VIA vivo, com contraste localizado, altura mínima de 54 px.
- **CTA secundário:** contorno branco discreto.
- **Competências:** seis módulos com um sinal abstrato na cor de cada frente.
- **Projetos pontuais:** grade densa, duas colunas no mobile e três no desktop.
- **Growth Plus:** texto à esquerda e mapa 2 × 2 conectado a um hub VIA.
- **Cases:** texto e imagem no mesmo card; no mobile, texto vem antes do visual.
- **Projetos adicionais:** grade 2 × 2 no desktop, reunindo identidade e
  campanha; o case In Tha Route usa um comparador acessível de antes e depois.
  Um projeto adicional pode fechar a grade em largura total com imagem e texto
  lado a lado. No mobile, todos formam uma pilha com as aplicações preservadas.
- **Depoimento:** vídeo vertical preservado e prova textual ao lado ou abaixo.
- **Contato:** composição central com brilho vindo da base.

## Responsividade

- Referência mínima: 375 px.
- Hero empilha conteúdo e marca sem cortar o display.
- Competências usam duas colunas no mobile para reduzir rolagem.
- Projetos pontuais usam duas colunas até 375 px.
- Cards de case empilham texto e mídia, sempre contidos na largura útil.
- Alvos interativos têm pelo menos 44 × 44 px.
- Comparações de antes e depois aceitam toque, mouse e setas do teclado.

## Movimento e acessibilidade

- `180 ms`: hover, foco e microdeslocamento.
- `300 ms`: entradas opcionais.
- Sem parallax obrigatório ou scroll controlado.
- Respeitar `prefers-reduced-motion`.
- Corpo com contraste mínimo de `4.5:1`.
- Elementos não textuais e foco com mínimo de `3:1`.
- Foco visível de 3 px em verde VIA.
- Nunca depender apenas de cor para comunicar significado.

## Princípios

1. Mostrar o trabalho antes de explicar o processo.
2. Inter é a voz da marca nesta landing page.
3. Gradiente cria movimento; preto cria clareza.
4. Cases usam ativos reais ou mockups declaradamente visuais.
5. Serviços menores aparecem sem competir com o Growth Plus.
6. Nenhum efeito visual justifica texto difícil de ler ou conteúdo cortado.
