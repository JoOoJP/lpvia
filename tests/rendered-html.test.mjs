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

test("renderiza a landing page da VIA", async () => {
  const response = await fetch(pageUrl);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>VIA — Sistema de crescimento<\/title>/i);
  assert.match(html, /Mais movimento não resolve\./);
  assert.match(html, /Direção resolve\./);
  assert.match(html, /O SISTEMA VIA/);
  assert.match(html, /Moikato/);
  assert.match(html, /Agendar diagnóstico/);
});

test("publica metadados sociais e navegação essenciais", async () => {
  const response = await fetch(pageUrl);
  const html = await response.text();

  assert.match(html, /property="og:image" content="[^"]*\/og-via\.jpg"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /aria-label="Navegação principal"/);
  assert.match(html, /href="#sistema"/);
  assert.match(html, /href="#cases"/);
  assert.match(html, /href="#produtos"/);
  assert.match(html, /wa\.me\/5541991014546/);
});

test("abre o primeiro case e mantém os outros dois recolhidos", async () => {
  const response = await fetch(pageUrl);
  const html = await response.text();

  assert.match(html, /aria-expanded="true" aria-controls="case-corpo-moikato"/);

  // Recolhido, o conteúdo continua no HTML — inert é o que o tira do foco e
  // da árvore de acessibilidade sem impedir a transição de abertura.
  assert.match(html, /id="case-corpo-tardinha"[^>]*inert/);
  assert.match(html, /id="case-corpo-camila"[^>]*inert/);

  // Os três precisam ter conceito próprio, senão o painel aberto fica vazio.
  assert.match(html, /A natureza feita joia\./);
  assert.match(html, /Do interesse ao ingresso\./);
  assert.match(html, /O crescimento não espera\./);
});

test("declara as fontes no mesmo escopo dos tokens", async () => {
  const response = await fetch(pageUrl);
  const html = await response.text();

  // --font-sans é montada em :root, que é o <html>. Se as classes do
  // next/font descerem para o <body>, o token fica inválido em tempo de
  // computação e a página inteira cai na serifada padrão do navegador.
  const tagHtml = html.match(/<html[^>]*>/)?.[0] ?? "";
  assert.match(tagHtml, /inter[^"]*variable/);
  assert.match(tagHtml, /space_grotesk[^"]*variable/);
  assert.match(tagHtml, /libre_bodoni[^"]*variable/);
});

test("entrega a navegação compacta já no HTML", async () => {
  const response = await fetch(pageUrl);
  const html = await response.text();

  // Em telas estreitas o nav é substituído pelo painel; sem o botão, a
  // navegação simplesmente desaparece.
  assert.match(html, /aria-controls="menu-mobile"/);
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /id="menu-mobile"[^>]*hidden/);

  // No topo o header não tem superfície: a classe só entra depois do scroll.
  assert.match(html, /class="site-header"/);
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
