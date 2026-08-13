import { NextResponse } from "next/server";
import { summarizeConversation } from "@/lib/summarizer";

export const runtime = "nodejs";
const MAX_INPUT_CHARS = 500_000;

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || !("conversation" in body) || typeof body.conversation !== "string" || !body.conversation.trim()) {
      return NextResponse.json({ error: "A conversa é obrigatória." }, { status: 400 });
    }
    if (body.conversation.length > MAX_INPUT_CHARS) {
      return NextResponse.json({ error: "A conversa excede o limite permitido." }, { status: 413 });
    }
    return NextResponse.json({ summary: await summarizeConversation(body.conversation) });
  } catch (error) {
    const detail = error instanceof Error ? `${error.name}: ${error.message}` : "Unknown error";
    console.error("Failed to summarize conversation", { detail });
    return NextResponse.json({ error: "Não foi possível gerar o resumo. Tente novamente." }, { status: 500 });
  }
}
