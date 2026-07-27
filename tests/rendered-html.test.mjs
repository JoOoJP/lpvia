import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renderiza a landing page da VIA", async () => {
  const response = await render();
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
  const response = await render();
  const html = await response.text();

  assert.match(html, /property="og:image" content="[^"]*\/og-via\.png"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /aria-label="Navegação principal"/);
  assert.match(html, /href="#sistema"/);
  assert.match(html, /href="#cases"/);
  assert.match(html, /href="#produtos"/);
  assert.match(html, /wa\.me\/5541991014546/);
});
