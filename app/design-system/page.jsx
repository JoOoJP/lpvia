import Link from "next/link";
import styles from "./design-system.module.css";

export const metadata = {
  title: "Design System — VIA",
  description: "Fonte única de verdade visual da landing page da VIA.",
  robots: {
    index: false,
    follow: false,
  },
};

/*
 * O hexadecimal aqui é rótulo, não fonte: o swatch pinta com var(--token), de
 * modo que uma divergência aparece na tela. CSS puro não expõe o valor
 * computado em tempo de build — ler isso no cliente tornaria a rota dinâmica.
 */
const brandColors = [
  ["Roxo VIA", "--via-purple", "#5B12D1"],
  ["Azul VIA", "--via-blue", "#2E6BE8"],
  ["Ciano VIA", "--via-cyan", "#00B8D4"],
  ["Verde VIA", "--via-green", "#39D67A"],
];

const surfaces = [
  ["Página", "--color-surface-page", "#F8F7F4"],
  ["Elevada", "--color-surface-raised", "#FFFFFF"],
  ["Suave", "--color-surface-muted", "#F2F2F2"],
  ["Inversa", "--color-surface-inverse", "#0D0D0D"],
  ["Profunda", "--color-surface-deep", "#0A0A0A"],
];

const spacing = [
  ["04", "--space-1"],
  ["08", "--space-2"],
  ["16", "--space-4"],
  ["24", "--space-6"],
  ["32", "--space-8"],
  ["48", "--space-12"],
  ["64", "--space-16"],
  ["96", "--space-24"],
];

function Section({ index, title, description, children }) {
  return (
    <section className={styles.section}>
      <header className={styles.sectionHeader}>
        <span>{index}</span>
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
      </header>
      {children}
    </section>
  );
}

function Swatch({ name, token, value, inverse = false }) {
  return (
    <div className={styles.swatch}>
      <div
        className={styles.swatchColor}
        style={{ background: `var(${token})` }}
        aria-hidden="true"
      />
      <div className={inverse ? styles.swatchMetaInverse : styles.swatchMeta}>
        <strong>{name}</strong>
        <span>{token}</span>
        <small>{value}</small>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <main className={styles.catalog}>
      <header className={styles.topbar}>
        <Link className={styles.logo} href="/" aria-label="Voltar para a landing page da VIA">
          VIA
        </Link>
        <span>DESIGN SYSTEM / V2.0</span>
        <Link href="/">Voltar ao site ↗</Link>
      </header>

      <section className={styles.hero}>
        <p>SISTEMA VISUAL VIA</p>
        <h1>
          Crescimento em
          <span> movimento.</span>
        </h1>
        <div className={styles.heroFooter}>
          <p>
            Direta na mensagem, viva nas imagens e sistemática no uso da cor.
            Sofisticação sem distância e tecnologia sem clichê futurista.
          </p>
          <strong>ROXO → CIANO → VERDE</strong>
        </div>
      </section>

      <div className={styles.content}>
        <Section
          index="01"
          title="Marca"
          description="O gradiente é assinatura e movimento. Cada parada identifica um pilar: estratégia, marketing, comercial e tecnologia."
        >
          <div className={styles.gradientField}>
            <span>VIA</span>
            <small>ESTRATÉGIA · MARKETING · COMERCIAL · TECNOLOGIA</small>
          </div>
          <div className={styles.swatchGridBrand}>
            {brandColors.map(([name, token, value]) => (
              <Swatch key={token} name={name} token={token} value={value} />
            ))}
          </div>
          <p className={styles.rule}>
            A assinatura cromática pertence ao nome VIA, aos pontos de ação e à
            frase que carrega a tese — uma por página, nunca em corpo de texto.
            Sobre fundo escuro o recorte começa no ciano: o roxo da marca não
            alcança o contraste mínimo em texto.
          </p>
        </Section>

        <Section
          index="02"
          title="Superfícies"
          description="Claro e escuro convivem na mesma experiência. Não existe troca de tema: o contraste organiza a narrativa."
        >
          <div className={styles.surfaceGrid}>
            {surfaces.map(([name, token, value], index) => (
              <Swatch
                key={token}
                name={name}
                token={token}
                value={value}
                inverse={index > 2}
              />
            ))}
          </div>
          <div className={styles.surfacePair}>
            <article>
              <span>CAMPO CLARO</span>
              <h3>Problema, prova e explicação.</h3>
              <p>
                Fundo quente, texto quase preto e bordas finas. Sem sombra para
                fabricar profundidade.
              </p>
            </article>
            <article>
              <span>CAMPO ESCURO</span>
              <h3>Sistema, decisão e conversão.</h3>
              <p>
                Preto e grafite concentram atenção. O gradiente entra apenas
                como sinal de movimento.
              </p>
            </article>
          </div>
        </Section>

        <Section
          index="03"
          title="Tipografia"
          description="Space Grotesk cria impacto e Inter explica. A serifada é um sotaque raro para frases de clientes, nunca a voz principal da VIA."
        >
          <div className={styles.typeSpecimens}>
            <div className={styles.typeDisplay}>
              <span>DISPLAY / SPACE GROTESK 500</span>
              <p>Na mesma direção.</p>
            </div>
            <div className={styles.typeSection}>
              <span>TÍTULO DE SEÇÃO / SPACE GROTESK 500</span>
              <p>As partes mudam de cor. A direção continua a mesma.</p>
            </div>
            <div className={styles.typeBody}>
              <span>CORPO / INTER 400</span>
              <p>
                A VIA conecta estratégia, marketing, comercial e tecnologia em
                um único sistema de crescimento.
              </p>
            </div>
            <div className={styles.typeLabel}>
              <span>EYEBROW / INTER 750</span>
              <p>VIA GROWTH SYSTEM / OPERACIONAL</p>
            </div>
            <div className={styles.typeAccent}>
              <span>ACENTO EDITORIAL / LIBRE BODONI</span>
              <p>“A natureza feita joia.”</p>
            </div>
          </div>
        </Section>

        <Section
          index="04"
          title="Espaço e composição"
          description="Base de 4 px, densidade funcional e bordas como estrutura. O espaço separa tarefas, não cria telas vazias."
        >
          <div className={styles.spacingList}>
            {spacing.map(([label, token]) => (
              <div key={token}>
                <span>{label}</span>
                <i style={{ width: `var(${token})` }} aria-hidden="true" />
                <code>{token}</code>
              </div>
            ))}
          </div>
          <div className={styles.layoutRule}>
            <span>MARGEM</span>
            <div>
              <i />
              <strong>CONTEÚDO / MÁX. 1180 PX</strong>
              <i />
            </div>
            <span>MARGEM</span>
          </div>
        </Section>

        <Section
          index="05"
          title="Ações"
          description="Uma ação principal por contexto. O CTA de diagnóstico recebe a assinatura; ações secundárias permanecem silenciosas."
        >
          <div className={styles.actionPanel}>
            <div className={styles.actionRow}>
              <a className="button button-gradient" href="#principios">
                Agendar diagnóstico <span aria-hidden="true">↗</span>
              </a>
              <a className={styles.buttonOutline} href="#principios">
                Ver casos <span aria-hidden="true">↓</span>
              </a>
              <a className={styles.textLink} href="#principios">
                Entender o sistema <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p>
              Altura mínima de 44 px · foco verde visível · movimento curto de
              180 ms · formato pílula reservado a ações.
            </p>
          </div>
        </Section>

        <Section
          index="06"
          title="Superfícies de conteúdo"
          description="O portfólio usa duas famílias: módulos da VIA e cases de clientes. As cores do cliente nunca viram token institucional."
        >
          <div className={styles.cardGrid}>
            <article className={styles.systemCard}>
              <span>01 / MÓDULO VIA</span>
              <i aria-hidden="true" />
              <h3>Estratégia</h3>
              <p>Encontra a oportunidade e define onde concentrar energia.</p>
            </article>
            <article className={styles.caseCard}>
              <span>CASE / IDENTIDADE DO CLIENTE</span>
              <h3>Moikato</h3>
              <p>
                A fotografia e a cor pertencem ao projeto apresentado. A
                estrutura e a hierarquia pertencem à VIA.
              </p>
            </article>
          </div>
        </Section>

        <Section
          index="07"
          title="Navegação, movimento e foco"
          description="Poucos links, sublinhado em gradiente, animação funcional e uma única receita de acessibilidade."
        >
          <div className={styles.behaviorGrid}>
            <nav aria-label="Exemplo de navegação">
              <a href="#principios">Sistema</a>
              <a href="#principios">Cases</a>
              <a href="#principios">Soluções</a>
            </nav>
            <div className={styles.motionDemo}>
              <i aria-hidden="true" />
              <div>
                <strong>180 ms</strong>
                <span>hover e cor</span>
              </div>
              <div>
                <strong>300 ms</strong>
                <span>entrada sutil</span>
              </div>
              <div>
                <strong>700 ms</strong>
                <span>imagem protagonista</span>
              </div>
            </div>
            <a className={styles.focusDemo} href="#principios">
              Pressione Tab para conferir o foco
            </a>
          </div>
        </Section>

        <section className={styles.principles} id="principios">
          <span>PRINCÍPIOS</span>
          <ol>
            <li>Uma ideia forte e uma mudança visual clara por seção.</li>
            <li>Gradiente como assinatura, nunca como ruído.</li>
            <li>Space Grotesk cria impacto; Inter explica; a serifada cita o cliente.</li>
            <li>Cor de case não vira cor da marca.</li>
            <li>Fotografia real antes de decoração abstrata.</li>
            <li>Sem sombra, glow ou movimento sem função.</li>
          </ol>
        </section>
      </div>

      <footer className={styles.footer}>
        <span>VIA / DESIGN SYSTEM / 2026</span>
        <strong>Crescimento em movimento.</strong>
      </footer>
    </main>
  );
}
