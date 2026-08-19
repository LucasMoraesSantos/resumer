const transcript = document.querySelector("#transcript");
const summarizeButton = document.querySelector("#summarize");
const status = document.querySelector("#status");
const resultArea = document.querySelector("#resultArea");
const result = document.querySelector("#result");
const counter = document.querySelector("#counter");

transcript.addEventListener("input", () => { counter.textContent = `${transcript.value.length} caracteres`; });
document.querySelector("#settings").addEventListener("click", () => chrome.runtime.openOptionsPage());

document.querySelector("#capture").addEventListener("click", async () => {
  status.textContent = "";
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const [{ result: selected }] = await chrome.scripting.executeScript({ target: { tabId: tab.id }, func: () => window.getSelection().toString() });
    if (!selected.trim()) throw new Error("Selecione a conversa na página antes de usar esta opção.");
    transcript.value = selected.trim();
    transcript.dispatchEvent(new Event("input"));
  } catch (error) { status.textContent = error.message; }
});

summarizeButton.addEventListener("click", async () => {
  status.textContent = "";
  resultArea.classList.add("hidden");
  if (!transcript.value.trim()) { status.textContent = "Cole ou selecione uma conversa para continuar."; return; }

  const { apiKey, model = "gpt-4.1-mini" } = await chrome.storage.local.get(["apiKey", "model"]);
  if (!apiKey) { status.textContent = "Configure sua chave da OpenAI antes de gerar o resumo."; return; }

  summarizeButton.disabled = true;
  summarizeButton.textContent = "Gerando resumo...";
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model, input: Resumer.buildInput(transcript.value), max_output_tokens: 220 })
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error?.message || "Não foi possível gerar o resumo.");
    const summary = Resumer.extractText(payload);
    if (!summary) throw new Error("A OpenAI não retornou um resumo. Tente novamente.");
    result.value = summary;
    resultArea.classList.remove("hidden");
  } catch (error) { status.textContent = error.message; }
  finally { summarizeButton.disabled = false; summarizeButton.textContent = "Gerar resumo"; }
});

document.querySelector("#copy").addEventListener("click", async (event) => {
  await navigator.clipboard.writeText(result.value);
  event.currentTarget.textContent = "Copiado";
  setTimeout(() => { event.currentTarget.textContent = "Copiar"; }, 1400);
});
