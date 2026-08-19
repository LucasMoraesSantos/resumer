const test = require("node:test");
const assert = require("node:assert/strict");
const { SYSTEM_PROMPT, buildInput, extractText } = require("../lib.js");

test("prompt omite Clara e mantém todos os atendentes humanos", () => {
  assert.match(SYSTEM_PROMPT, /somente um parágrafo bem curto/);
  assert.match(SYSTEM_PROMPT, /Não use listas/);
  assert.match(SYSTEM_PROMPT, /Clara é a atendente virtual/);
  assert.match(SYSTEM_PROMPT, /não mencione seu nome/);
  assert.match(SYSTEM_PROMPT, /preserve seus nomes no resumo/);
  assert.match(SYSTEM_PROMPT, /de qual atendente humano para qual atendente humano/);
  assert.match(SYSTEM_PROMPT, /departamento em que o atendimento humano começou/);
  assert.match(SYSTEM_PROMPT, /no máximo 80 palavras/);
  assert.match(SYSTEM_PROMPT, /usando somente a transcrição completa/);
});

test("adiciona a transcrição sem espaços externos", () => {
  assert.match(buildInput("  Cliente pediu ajuda.  "), /Transcrição completa do atendimento:\nCliente pediu ajuda\.$/);
});

test("extrai texto dos dois formatos de resposta", () => {
  assert.equal(extractText({ output_text: " Resumo direto. " }), "Resumo direto.");
  assert.equal(extractText({ output: [{ content: [{ type: "output_text", text: "Outro resumo." }] }] }), "Outro resumo.");
});
