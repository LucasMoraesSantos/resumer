(function (root) {
  const SYSTEM_PROMPT = `Você resume transcrições de atendimento em português do Brasil.

Escreva somente um parágrafo curto, preciso, claro e fácil de consultar depois. Não use listas, marcadores, títulos, emojis ou informações que não estejam na conversa. Registre o motivo do contato, os pontos essenciais, as ações realizadas e o desfecho ou próximo passo. Evite saudações, repetições e detalhes irrelevantes.

Identifique se houve transferência entre atendentes humanos. Clara é a atendente virtual e qualquer passagem de Clara para uma pessoa não é transferência de atendimento. Só mencione transferência quando a conversa mostrar claramente a troca de um atendente humano por outro atendente humano. Se não houver evidência, não fale sobre transferência.`;

  function buildInput(transcript) {
    return `${SYSTEM_PROMPT}\n\nTranscrição do atendimento:\n${transcript.trim()}`;
  }

  function extractText(payload) {
    if (typeof payload.output_text === "string" && payload.output_text.trim()) {
      return payload.output_text.trim();
    }
    const parts = (payload.output || []).flatMap((item) => item.content || []);
    const text = parts.find((part) => part.type === "output_text" && part.text);
    return text ? text.text.trim() : "";
  }

  const api = { SYSTEM_PROMPT, buildInput, extractText };
  root.Resumer = api;
  if (typeof module !== "undefined") module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
