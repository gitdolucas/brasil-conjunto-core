import { describe, it, expect } from "vitest";
import { slugify } from "../src/utils/slugify.js";

describe("slugify", () => {
  it("lowercases and replaces spaces with dashes", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("strips diacritics", () => {
    expect(slugify("Renovação de CNH")).toBe("renovacao-de-cnh");
  });

  it("removes non-alphanumeric except spaces and hyphens", () => {
    expect(slugify("Serviço #1 — Atendimento")).toBe("servico-1-atendimento");
  });

  it("collapses multiple dashes and trims leading/trailing", () => {
    expect(slugify("  múltiplos   espaços  ")).toBe("multiplos-espacos");
  });

  it("returns empty string for empty input", () => {
    expect(slugify("")).toBe("");
  });
});
