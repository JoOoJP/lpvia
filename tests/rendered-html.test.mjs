import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import net from "node:net";
import test, { after, before } from "node:test";

const projectDirectory = fileURLToPath(new URL("..", import.meta.url));
const nextBin = fileURLToPath(
  new URL("../node_modules/next/dist/bin/next", import.meta.url),
);

let server;
let pageUrl;

before(async () => {
  const port = await findAvailablePort();
  pageUrl = `http://127.0.0.1:${port}/`;
  server = spawn(process.execPath, [nextBin, "start", "-p", String(port)], {
    cwd: projectDirectory,
    stdio: "ignore",
  });

  await waitForServer(pageUrl, server);
});

after(() => {
  server?.kill();
});

test("renderiza a apresentação da VIA", async () => {
  const response = await fetch(pageUrl);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>VIA — Estratégia que ganha forma<\/title>/i);
  assert.match(html, /Estratégia que/);
  assert.match(html, /ganha forma\./);
  assert.match(html, /VIA — estratégia que ganha forma\./);
  assert.doesNotMatch(html, /V\.IA/);
  assert.match(html, /VIA . GROWTH COMPANY/);
  assert.match(html, /Fale com a VIA/);
  assert.match(html, /<h2[^>]*id="project-coverflow-title"[^>]*>/);
  assert.match(html, /A VIA pensa e faz\./);
  assert.match(html, /CASE \/ MOIKATO \/ BRASIL → REINO UNIDO/);
  assert.doesNotMatch(html, /GROWTH PLUS \/ PRODUTO PRINCIPAL/);
  assert.doesNotMatch(html, /Agendar diagnóstico/);
});

test("publica metadados sociais e navegação essenciais", async () => {
  const response = await fetch(pageUrl);
  const html = await response.text();

  assert.match(html, /property="og:image" content="[^"]*\/og-via\.jpg"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /aria-label="Navegação principal"/);
  assert.match(html, /href="#conteudo-principal"/);
  assert.match(html, /href="#fazemos"/);
  assert.match(html, /href="#moikato"/);
  assert.match(html, /href="#trabalhos"/);
  assert.match(html, /wa\.me\/5541987383806/);
});

test("mostra o escopo real da VIA", async () => {
  const response = await fetch(pageUrl);
  const html = await response.text();

  assert.match(html, /Marca &amp; identidade/);
  assert.match(html, /Sites &amp; landing pages/);
  assert.match(html, /Conteúdo &amp; campanhas/);
  assert.match(html, /Tráfego &amp; performance/);
  assert.match(html, /Estratégia &amp; comercial/);
  assert.match(html, /Tecnologia &amp; automação/);
  assert.match(html, /Crescimento orgânico e pago/);
  assert.doesNotMatch(html, /dark-capability-preview/);
  assert.doesNotMatch(html, /CASO APLICADO/);
});

test("publica o depoimento da Moikato antes do contato", async () => {
  const response = await fetch(pageUrl);
  const html = await response.text();

  assert.match(html, /depoimento-samuel-moikato\.mp4/);
  assert.match(html, /depoimento-samuel-moikato\.jpg/);
  assert.match(html, /Eles acreditaram no meu trabalho\./);
  assert.match(html, /Samuel · Moikato · Empresário em Londres/);
  assert.match(html, /Posicionamento/);
  assert.match(html, /Site bilíngue/);
  assert.match(html, /Internacionalização/);
  assert.match(html, /Samuel/);
  assert.equal(html.match(/class="moikato-proof-video"/g)?.length, 1);
  assert.doesNotMatch(html, /dark-testimonial/);
  assert.ok(html.indexOf("moikato-proof") < html.indexOf('id="contato"'));
});

test("entrega os trabalhos em um coverflow acessível", async () => {
  const response = await fetch(pageUrl);
  const html = await response.text();

  assert.match(html, /Projetos que ganharam forma/);
  assert.match(html, /aria-roledescription="carrossel"/);
  assert.match(html, /aria-label="Projetos da VIA"/);
  assert.match(html, /aria-label="Projeto anterior"/);
  assert.match(html, /aria-label="Próximo projeto"/);
  assert.match(html, /Um universo de marca enraizado na natureza/);
  assert.match(html, /A Tardinha/);
  assert.match(html, /Criação de landing pages para venda de ingressos/);
  assert.match(html, /tardinhariosolimes-82b\.com/);
  assert.doesNotMatch(html, /Design digital/);
  assert.doesNotMatch(html, /Comunicação do evento/);
  assert.match(html, /Clínicas na área da saúde/);
  assert.match(html, /Estratégia digital e comunicação para profissionais da área da/);
  assert.match(html, /Cuidado que/);
  assert.match(html, /Deslize, use o scroll lateral ou as setas/);
});

test("inclui os projetos adicionais construídos pela VIA", async () => {
  const response = await fetch(pageUrl);
  const html = await response.text();
  // O next/image serve os caminhos escapados; o literal só sobra no payload
  // RSC, que é fatiado em chunks e muda de lugar a cada alteração de markup.
  const assets = html.replaceAll("%2F", "/");

  assert.match(html, /In Tha Route/);
  assert.match(html, /Xangô 7 Cachoeiras/);
  assert.match(html, /Conteúdo visual/);
  assert.match(html, /Studio da Giu/);
  assert.match(html, /Sweet Popcorn Gourmet/);
  assert.match(html, /Sephie Tarot/);
  assert.match(html, /Carolina Carvalho/);
  assert.match(html, /Uma marca antiga transformada em uma identidade preparada/);
  assert.match(html, /Assinatura visual para trazer mais identidade\./);
  assert.match(html, /Panfletos, peças promocionais e campanhas para marcas e eventos\./);
  assert.match(html, /Construção de identidade visual e materiais gráficos\./);
  assert.match(html, /Identidade colorida aplicada à embalagem/);
  assert.match(html, /Logo, símbolo e assinatura visual\./);
  assert.match(assets, /route-before\.webp/);
  assert.match(assets, /route-primary\.webp/);
  assert.match(
    html,
    /Comparar a identidade antiga e a nova da In Tha Route/,
  );
  assert.match(assets, /projects\/tux7c-primary\.webp/);
  assert.match(assets, /projects\/latino-beats\.webp/);
  assert.match(assets, /projects\/in-tha-route-flyer-full\.webp/);
  assert.match(assets, /projects\/studio-giu-pricing\.webp/);
  assert.match(assets, /projects\/hero\/sweet-popcorn-cinematic\.webp/);
  assert.match(assets, /projects\/artes\/sephie-prancha\.webp/);
  assert.match(assets, /projects\/moikato-brand\.webp/);
  assert.match(assets, /projects\/hero\/tardinha-cinematic\.webp/);
  assert.match(assets, /projects\/ghetto-baile-funk\.webp/);
  assert.match(html, /Rebranding, paleta e manual de marca para podóloga\./);
  assert.match(assets, /projects\/carolina-antes\.webp/);
  assert.match(assets, /projects\/carolina-depois\.webp/);
  assert.match(
    html,
    /Comparar a marca antiga e a nova de Carolina Carvalho/,
  );
});

test("declara as fontes no mesmo escopo dos tokens", async () => {
  const response = await fetch(pageUrl);
  const html = await response.text();
  const tagHtml = html.match(/<html[^>]*>/)?.[0] ?? "";

  assert.match(tagHtml, /inter[^\"]*variable/);
  assert.match(tagHtml, /space_grotesk[^\"]*variable/);
  // A serifada saiu com os cards da hero antiga: só o catálogo ainda a usa.
  assert.doesNotMatch(html, /libre_bodoni/i);
});

test("mantém a serifada disponível no catálogo do design system", async () => {
  const response = await fetch(`${pageUrl}design-system`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /libre_bodoni[^\"]*variable/);
});

test("oferece contato fora do WhatsApp", async () => {
  const response = await fetch(pageUrl);
  const html = await response.text();

  assert.match(html, /href="mailto:agenciaviamkt@gmail\.com"/);
  assert.match(html, /aria-label="Contato"/);
});

test("publica canonical, sitemap e identidade da organização", async () => {
  const response = await fetch(pageUrl);
  const html = await response.text();

  assert.match(html, /<link rel="canonical" href="[^"]+"\/>/);
  assert.match(html, /"@type":"Organization"/);
  assert.match(html, /"telephone":"\+5541987383806"/);

  const sitemap = await fetch(`${pageUrl}sitemap.xml`);
  assert.equal(sitemap.status, 200);
  assert.match(await sitemap.text(), /<loc>/);

  const robots = await fetch(`${pageUrl}robots.txt`);
  assert.match(await robots.text(), /Sitemap: \S+\/sitemap\.xml/);
});

test("entrega a navegação compacta já no HTML", async () => {
  const response = await fetch(pageUrl);
  const html = await response.text();

  assert.match(html, /aria-controls="menu-mobile"/);
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /id="menu-mobile"[^>]*hidden/);
  assert.match(html, /class="site-header"/);
});

test("publica a versão em inglês em /en", async () => {
  const response = await fetch(`${pageUrl}en`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<html[^>]*lang="en"/);
  assert.match(html, /<title>VIA — Strategy that takes shape<\/title>/i);
  assert.match(html, /Strategy that/);
  assert.match(html, /takes shape\./);
  assert.match(html, /Talk to VIA/);
  assert.match(html, /VIA thinks and builds\./);
  assert.match(html, /CASE STUDY \/ MOIKATO \/ BRAZIL → UK/);
  assert.match(html, /wa\.me\/5541987383806/);
  assert.match(html, /text=Hi%2C%20I%20found%20VIA/);
  assert.match(html, /href="\/"[^>]*>\s*PT/);

  const ptResponse = await fetch(pageUrl);
  const ptHtml = await ptResponse.text();
  assert.match(ptHtml, /href="\/en"[^>]*>\s*EN/);
});

test("publica a aba de portfólio em português e inglês", async () => {
  const ptHtml = await (await fetch(`${pageUrl}portfolio`)).text();

  assert.match(ptHtml, /<title>Portfólio — VIA<\/title>/i);
  assert.match(ptHtml, /href="#contato"[^>]*>(?:(?!<\/a>)[\s\S])*Cobertura de eventos/);
  assert.match(ptHtml, /<h1[^>]*>Criar sempre foi minha forma de <span>ver o mundo\.<\/span><\/h1>/);
  assert.match(ptHtml, /Oii, eu sou a Sté e faço parte do pilar criativo da V\.IA/);
  assert.match(ptHtml, /Aos 10 anos, escrevia em blogs/);
  assert.match(ptHtml, /No fundo, continuo fazendo o que sempre amei: criando\./);
  assert.match(ptHtml, /Cobertura de eventos/);
  assert.doesNotMatch(ptHtml, /Marcas que já trabalharam com a VIA/);
  assert.match(ptHtml, /Falar com a Sté/);
  assert.match(ptHtml, /Oi%2C%20St%C3%A9!/);
  assert.match(ptHtml, /id="contato"/);
  assert.match(ptHtml, /E-mail · Clique para copiar/);
  const ptFooter = ptHtml.match(/<footer[\s\S]*<\/footer>/)?.[0] ?? "";
  assert.ok(ptFooter.length > 0);
  assert.doesNotMatch(ptFooter, /mailto:|wa\.me/);
  assert.match(ptHtml, /aria-current="page"[^>]*>Portfólio</);
  assert.match(ptHtml, /href="\/#fazemos"/);
  assert.match(ptHtml, /href="#contato"/);
  assert.doesNotMatch(ptHtml, /aria-label="Filtrar por tipo de mídia"/);
  assert.match(ptHtml, /Entre um take <span>e outro\.<\/span>/);
  assert.match(ptHtml, /Abrir vídeo: Depoimento — Samuel Moikato/);
  assert.doesNotMatch(ptHtml, /Abrir foto: (Still de produto|Evento ao pôr do sol|Editorial em Londres)/);
  assert.doesNotMatch(ptHtml, /Galáticos FT/);
  assert.match(ptHtml, /Abrir vídeo: Vídeo institucional — Clínica odontológica/);
  assert.match(ptHtml, /Abrir vídeo: Cobertura — Eventos/);
  assert.match(ptHtml, /Abrir vídeo: Reels para loja — Mundo Egípcio/);
  assert.match(ptHtml, /Abrir vídeo: Reels de beleza — Salão de beleza/);
  assert.match(ptHtml, /Abrir foto: Cobertura — Eventos/);
  assert.match(ptHtml, /Abrir foto: Fotos Urbanas — Londres/);
  assert.match(ptHtml, /Abrir foto: Foto Dump — Corporativo/);
  assert.match(ptHtml, /Abrir foto: Foto de Catálogo — Comercial/);
  assert.match(ptHtml, /portfolio%2Fcachoeira-jardim\.webp/);
  assert.match(ptHtml, /FOTOS<span[^>]*>11|Fotos<span[^>]*>11/i);
  assert.match(ptHtml, /Abrir foto: Retrato pet — Pets/);
  assert.match(ptHtml, /portfolio%2Fmundo-egipcio-poster\.webp/);
  assert.match(ptHtml, /rel="canonical" href="[^"]*\/portfolio"/);
  assert.match(ptHtml, /property="og:image" content="[^"]*\/og-portfolio\.jpg"/);
  assert.match(ptHtml, /name="twitter:image" content="[^"]*\/og-portfolio\.jpg"/);

  const enResponse = await fetch(`${pageUrl}en/portfolio`);
  const enHtml = await enResponse.text();

  assert.equal(enResponse.status, 200);
  assert.match(enHtml, /<html[^>]*lang="en"/);
  assert.match(enHtml, /<title>Portfolio — VIA<\/title>/i);
  assert.match(enHtml, /href="#contato"[^>]*>(?:(?!<\/a>)[\s\S])*Event coverage/);
  assert.match(enHtml, /Hii, I&#x27;m Sté|Hii, I'm Sté/);
  assert.match(enHtml, /Open video: Testimonial — Samuel Moikato/);
  assert.match(enHtml, /Open video: Beauty reels — Hair salon/);
  assert.match(enHtml, /Open photo: Garden waterfall — Landscapes/);
  assert.match(enHtml, /property="og:image" content="[^"]*\/og-portfolio-en\.jpg"/);
  assert.match(enHtml, /Talk to Sté/);
  assert.match(enHtml, /Email · Click to copy/);
  assert.match(enHtml, /rel="canonical" href="[^"]*\/en\/portfolio"/);

  const home = await (await fetch(pageUrl)).text();
  assert.match(home, /href="\/portfolio"[^>]*>Portfólio</);
});

test("o rodapé não repete o slogan growth company", async () => {
  const html = await (await fetch(pageUrl)).text();
  const footer = html.match(/<footer[\s\S]*<\/footer>/)?.[0] ?? "";

  assert.ok(footer.length > 0);
  assert.doesNotMatch(footer, /growth company/i);
});

function findAvailablePort() {
  return new Promise((resolve, reject) => {
    const listener = net.createServer();
    listener.once("error", reject);
    listener.listen(0, "127.0.0.1", () => {
      const address = listener.address();
      listener.close(() => resolve(address.port));
    });
  });
}

async function waitForServer(url, childProcess) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (childProcess.exitCode !== null) {
      throw new Error(`Next.js encerrou com código ${childProcess.exitCode}.`);
    }

    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // O servidor ainda está iniciando.
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error("Next.js não iniciou dentro do tempo esperado.");
}
