import { SupportSummaryForm } from "@/components/SupportSummaryForm";

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white" aria-hidden="true">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/><path d="M8 9h8M8 13h5"/></svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Resumo de Atendimento</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">Cole a conversa do atendimento abaixo para gerar um resumo objetivo do que foi tratado e realizado.</p>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8"><SupportSummaryForm /></div>
      <footer className="mx-auto max-w-5xl px-5 pb-8 text-center text-xs text-slate-500">As conversas não são armazenadas por esta aplicação.</footer>
    </main>
  );
}
