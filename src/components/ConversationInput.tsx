type Props = { value: string; disabled: boolean; onChange: (value: string) => void; onShortcut: () => void };

export function ConversationInput({ value, disabled, onChange, onShortcut }: Props) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor="conversation" className="text-sm font-semibold text-slate-800">Conversa do atendimento</label>
        <span className="text-xs text-slate-400">Ctrl + Enter para gerar</span>
      </div>
      <textarea id="conversation" value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} onKeyDown={(event) => { if (event.ctrlKey && event.key === "Enter") { event.preventDefault(); onShortcut(); } }} placeholder="Cole aqui toda a conversa entre cliente e atendente..." className="min-h-80 w-full resize-y rounded-xl border border-slate-300 bg-white p-4 text-sm leading-6 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-3 focus:ring-teal-600/10 disabled:bg-slate-50 sm:min-h-96" />
      <p className="mt-1.5 text-right text-xs tabular-nums text-slate-500">{value.length.toLocaleString("pt-BR")} caracteres</p>
    </div>
  );
}
