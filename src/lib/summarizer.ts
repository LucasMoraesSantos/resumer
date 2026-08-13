import { getOpenAIClient, getOpenAIModel } from "./openai";
import { sanitizeSummary } from "./sanitizeSummary";
import { asConversationData, asIntermediateData, CHUNK_ANALYSIS_PROMPT, SUPPORT_SUMMARY_PROMPT } from "@/prompts/supportSummary";

export const MAX_CONVERSATION_CHARS = 60_000;
const CHUNK_CHARS = 45_000;

export function splitConversation(conversation: string, limit = CHUNK_CHARS): string[] {
  if (conversation.length <= limit) return [conversation];
  const blocks: string[] = [];
  let remainder = conversation;
  while (remainder.length > limit) {
    const window = remainder.slice(0, limit);
    const candidates = [window.lastIndexOf("\n\n"), window.lastIndexOf("\n")];
    const safeBreak = Math.max(...candidates);
    const index = safeBreak > limit * 0.6 ? safeBreak : limit;
    blocks.push(remainder.slice(0, index).trim());
    remainder = remainder.slice(index).trimStart();
  }
  if (remainder.trim()) blocks.push(remainder.trim());
  return blocks;
}

async function requestSummary(system: string, input: string): Promise<string> {
  const response = await getOpenAIClient().responses.create({
    model: getOpenAIModel(),
    instructions: system,
    input,
    temperature: 0.2,
  });
  if (!response.output_text.trim()) throw new Error("OpenAI returned empty output");
  return response.output_text;
}

export async function summarizeConversation(conversation: string): Promise<string> {
  const chunks = splitConversation(conversation);
  let raw: string;
  if (conversation.length <= MAX_CONVERSATION_CHARS && chunks.length === 1) {
    raw = await requestSummary(SUPPORT_SUMMARY_PROMPT, asConversationData(conversation));
  } else {
    const analyses: string[] = [];
    // Sequential calls retain chronological ordering and avoid request bursts.
    for (const [index, chunk] of chunks.entries()) {
      const analysis = await requestSummary(CHUNK_ANALYSIS_PROMPT, `BLOCO ${index + 1} DE ${chunks.length}\n${asConversationData(chunk)}`);
      analyses.push(`Bloco ${index + 1}: ${analysis}`);
    }
    raw = await requestSummary(SUPPORT_SUMMARY_PROMPT, asIntermediateData(analyses.join("\n")));
  }
  const summary = sanitizeSummary(raw);
  if (!summary) throw new Error("Sanitization produced empty output");
  return summary;
}
