"use client";

import { useState } from "react";
import { ConversationInput } from "./ConversationInput";
import { SummaryResult } from "./SummaryResult";

const ERROR_MESSAGE = "Não foi possível gerar o resumo. Tente novamente.";

export function SupportSummaryForm() {
  const [conversation, setConversation] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generate() {
    if (!conversation.trim() || loading) return;
    setLoading(true); setError(""); setCopied(false);
    try {
      const response = await fetch("/api/summarize", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ conversation }) });
      if (!response.ok) throw new Error("Request failed");
      const data: unknown = await response.json();
      if (!data || typeof data !== "object" || !("summary" in data) || typeof data.summary !== "string") throw new Error("Invalid response");
      setSummary(data.summary);
    } catch { setError(ERROR_MESSAGE); }
    finally { setLoading(false); }
  }

  function clear() { setConversation(""); setSummary(""); setError(""); setCopied(false); }
  async function copy() { await navigator.clipboard.writeText(summary); setCopied(true); window.setTimeout(() => setCopied(false), 2000); }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.05)] sm:p-7">
      <ConversationInput value={conversation} disabled={loading} onChange={setConversation} onShortcut={generate} />
      {error && <p role="alert" className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={generate} disabled={!conversation.trim() || loading} className="min-w-40 rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus:outline-none focus:ring-3 focus:ring-teal-600/25 disabled:cursor-not-allowed disabled:bg-slate-300">{loading ? "Analisando atendimento..." : "Gerar resumo"}</button>
        <button type="button" onClick={clear} disabled={loading} className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-3 focus:ring-slate-300 disabled:opacity-50">Limpar</button>
      </div>
      {summary && <SummaryResult summary={summary} copied={copied} onChange={setSummary} onCopy={copy} />}
    </div>
  );
}
