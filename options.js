const apiKey = document.querySelector("#apiKey");
const model = document.querySelector("#model");
const status = document.querySelector("#status");

chrome.storage.local.get(["apiKey", "model"]).then((saved) => {
  apiKey.value = saved.apiKey || "";
  model.value = saved.model || "gpt-4.1-mini";
});

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();
  await chrome.storage.local.set({ apiKey: apiKey.value.trim(), model: model.value.trim() });
  status.textContent = "Configurações salvas.";
});
