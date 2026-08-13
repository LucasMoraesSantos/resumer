"use client";

import { useState } from "react";
import { ConversationInput } from "./ConversationInput";
import { SummaryResult } from "./SummaryResult";

const ERROR_MESSAGE = "Não foi possível gerar o resumo. Verifique sua conexão e tente novamente.";

async function responseError(response: Response): Promise<string> {
  const data: unknown = await response.json().catch(() => null);
  return data && typeof data === "object" && "error" in data && typeof data.error === "string"
    ? data.error
    : ERROR_MESSAGE;
}

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
      if (!response.ok) throw new Error(await responseError(response));
      const data: unknown = await response.json();
      if (!data || typeof data !== "object" || !("summary" in data) || typeof data.summary !== "string") throw new Error("Invalid response");
      setSummary(data.summary);
    } catch (cause) { setError(cause instanceof Error ? cause.message : ERROR_MESSAGE); }
    finally { setLoading(false); }
  }

  function clear() { setConversation(""); setSummary(""); setError(""); setCopied(false); }
  async function copy() { await navigator.clipboard.writeText(summary); setCopied(true); window.setTimeout(() => setCopied(false), 2000); }

  return (
    <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur sm:p-7">
      <ConversationInput value={conversation} disabled={loading} onChange={setConversation} onShortcut={generate} />
      {error && <p role="alert" className="mt-3 rounded-lg border border-red-500/40 bg-red-950/60 px-3 py-2 text-sm text-red-200">{error}</p>}
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={generate} disabled={!conversation.trim() || loading} className="min-w-40 rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-teal-400 focus:outline-none focus:ring-3 focus:ring-teal-400/25 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400">{loading ? "Analisando atendimento..." : "Gerar resumo"}</button>
        <button type="button" onClick={clear} disabled={loading} className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 focus:outline-none focus:ring-3 focus:ring-slate-600 disabled:opacity-50">Limpar</button>
      </div>
      {summary && <SummaryResult summary={summary} copied={copied} onChange={setSummary} onCopy={copy} />}
    </div>
  );
}
