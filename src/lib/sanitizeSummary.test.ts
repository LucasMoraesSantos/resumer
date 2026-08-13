import { describe, expect, it } from "vitest";
import { sanitizeSummary } from "./sanitizeSummary";

describe("sanitizeSummary", () => {
  it("remove markdown, bullets and unnecessary line breaks", () => {
    expect(sanitizeSummary("# **Resumo**\n- Cliente relatou falha.\n2. Foi orientado a testar."))
      .toBe("Resumo Cliente relatou falha. Foi orientado a testar.");
  });
});
