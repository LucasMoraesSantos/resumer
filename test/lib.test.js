const test = require("node:test");
const assert = require("node:assert/strict");
const { SYSTEM_PROMPT, buildInput, extractText } = require("../lib.js");

test("prompt exige parágrafo sem listas e trata Clara como virtual", () => {
  assert.match(SYSTEM_PROMPT, /somente um parágrafo curto/);
  assert.match(SYSTEM_PROMPT, /Não use listas/);
  assert.match(SYSTEM_PROMPT, /Clara é a atendente virtual/);
  assert.match(SYSTEM_PROMPT, /humano por outro atendente humano/);
});

test("adiciona a transcrição sem espaços externos", () => {
  assert.match(buildInput("  Cliente pediu ajuda.  "), /Transcrição do atendimento:\nCliente pediu ajuda\.$/);
});

test("extrai texto dos dois formatos de resposta", () => {
  assert.equal(extractText({ output_text: " Resumo direto. " }), "Resumo direto.");
  assert.equal(extractText({ output: [{ content: [{ type: "output_text", text: "Outro resumo." }] }] }), "Outro resumo.");
});
