import { SupportSummaryForm } from "@/components/SupportSummaryForm";

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400 text-slate-950 shadow-[0_0_28px_rgba(45,212,191,0.22)]" aria-hidden="true">
            <span className="text-xl font-black leading-none" aria-hidden="true">R</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">RESUMER</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">Cole a conversa do atendimento abaixo para gerar um resumo objetivo do que foi tratado e realizado.</p>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8"><SupportSummaryForm /></div>
      <footer className="mx-auto max-w-5xl px-5 pb-8 text-center text-xs text-slate-500">As conversas não são armazenadas por esta aplicação.</footer>
    </main>
  );
}
