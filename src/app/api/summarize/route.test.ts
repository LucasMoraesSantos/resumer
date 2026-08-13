import { beforeEach, describe, expect, it, vi } from "vitest";

const { summarizeConversation } = vi.hoisted(() => ({ summarizeConversation: vi.fn() }));

vi.mock("@/lib/summarizer", () => ({ summarizeConversation }));

import { POST, publicError } from "./route";

function request(conversation: string) {
  return new Request("http://localhost/api/summarize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ conversation }),
  });
}

describe("POST /api/summarize", () => {
  beforeEach(() => summarizeConversation.mockReset());

  it("returns the generated summary", async () => {
    summarizeConversation.mockResolvedValue("Atendimento finalizado.");
    const response = await POST(request("Cliente: problema resolvido."));
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ summary: "Atendimento finalizado." });
  });

  it("identifies missing configuration in the current deploy context", () => {
    expect(publicError(new Error("OPENAI_API_KEY is not configured"))).toEqual({
      message: "O serviço de resumo não está configurado neste ambiente de deploy.",
      status: 503,
    });
  });
});
