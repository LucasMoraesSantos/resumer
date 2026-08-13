import { NextResponse } from "next/server";
import { summarizeConversation } from "@/lib/summarizer";

export const runtime = "nodejs";
const MAX_INPUT_CHARS = 500_000;

export function publicError(error: unknown): { message: string; status: number } {
  if (error instanceof Error && error.message.endsWith("is not configured")) {
    return { message: "O serviço de resumo não está configurado neste ambiente de deploy.", status: 503 };
  }
  if (error instanceof Error && error.name === "AbortError") {
    return { message: "A geração demorou mais que o esperado. Tente novamente.", status: 504 };
  }
  return { message: "Não foi possível gerar o resumo agora. Tente novamente em instantes.", status: 500 };
}

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
    const response = publicError(error);
    return NextResponse.json({ error: response.message }, { status: response.status });
  }
}
