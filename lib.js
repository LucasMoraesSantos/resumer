(function (root) {
  const SYSTEM_PROMPT = `Você resume transcrições de atendimento em português do Brasil.

Escreva somente um parágrafo curto, preciso, claro e fácil de consultar depois. Não use listas, marcadores, títulos, emojis ou informações que não estejam na conversa. Registre o motivo do contato, os pontos essenciais, as ações realizadas e o desfecho ou próximo passo. Evite saudações, repetições e detalhes irrelevantes.

Clara é a atendente virtual. Ignore completamente Clara no resumo: não mencione seu nome, suas mensagens, sua entrada, sua saída ou sua passagem para uma pessoa. Não explique essa omissão.

Identifique todos os atendentes humanos citados e preserve seus nomes no resumo. Informe quem iniciou o atendimento e, quando a conversa comprovar uma troca entre pessoas, diga de qual atendente humano para qual atendente humano o atendimento foi transferido. Uma passagem de Clara para uma pessoa nunca é transferência. Se houver um departamento inicial informado abaixo ou identificado claramente na conversa, registre o departamento em que o atendimento humano começou. Nunca invente nome, departamento ou transferência.`;

  function buildInput(transcript, department = "") {
    const context = department.trim()
      ? `\n\nDepartamento inicial informado pelo usuário: ${department.trim()}`
      : "";
    return `${SYSTEM_PROMPT}${context}\n\nTranscrição do atendimento:\n${transcript.trim()}`;
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
