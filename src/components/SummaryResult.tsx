type Props = { summary: string; copied: boolean; onChange: (value: string) => void; onCopy: () => void };

export function SummaryResult({ summary, copied, onChange, onCopy }: Props) {
  return (
    <section className="mt-7 border-t border-slate-700 pt-7" aria-live="polite">
      <div className="mb-2 flex items-center justify-between"><label htmlFor="summary" className="text-sm font-semibold text-slate-100">Resumo do atendimento</label><span className="text-xs text-slate-500">Você pode editar antes de copiar</span></div>
      <textarea id="summary" value={summary} onChange={(event) => onChange(event.target.value)} className="min-h-52 w-full resize-y rounded-xl border border-slate-700 bg-slate-950/80 p-4 text-sm leading-6 text-slate-100 outline-none transition focus:border-teal-400 focus:ring-3 focus:ring-teal-400/10" />
      <div className="mt-4 flex items-center gap-3"><button type="button" onClick={onCopy} className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-100 shadow-sm transition hover:bg-slate-700 focus:outline-none focus:ring-3 focus:ring-teal-400/20">{copied ? "Resumo copiado" : "Copiar resumo"}</button>{copied && <span className="text-sm font-medium text-teal-300" role="status">Copiado para a área de transferência.</span>}</div>
    </section>
  );
}
