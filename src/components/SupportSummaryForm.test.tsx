import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SupportSummaryForm } from "./SupportSummaryForm";

afterEach(() => vi.restoreAllMocks());

describe("SupportSummaryForm", () => {
  it("does not allow an empty conversation to be sent", () => {
    render(<SupportSummaryForm />);
    expect(screen.getByRole("button", { name: "Gerar resumo" })).toBeDisabled();
  });
  it("displays the API response and copies the editable summary", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ summary: "Cliente confirmou normalização." }) }));
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    render(<SupportSummaryForm />);
    await user.type(screen.getByLabelText("Conversa do atendimento"), "Cliente: internet caiu");
    await user.click(screen.getByRole("button", { name: "Gerar resumo" }));
    expect(await screen.findByDisplayValue("Cliente confirmou normalização.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Copiar resumo" }));
    expect(writeText).toHaveBeenCalledWith("Cliente confirmou normalização.");
    expect(screen.getByRole("button", { name: "Resumo copiado" })).toBeInTheDocument();
  });
  it("shows the API error when the request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, json: async () => ({ error: "Serviço temporariamente indisponível." }) }));
    render(<SupportSummaryForm />);
    fireEvent.change(screen.getByLabelText("Conversa do atendimento"), { target: { value: "Conversa fictícia" } });
    fireEvent.click(screen.getByRole("button", { name: "Gerar resumo" }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Serviço temporariamente indisponível."));
  });
});
