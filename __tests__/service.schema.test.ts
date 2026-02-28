import { describe, it, expect } from "vitest";
import { publicServiceSchema } from "../src/schemas/service.schema.js";

const validPayload = {
  slug: "renovacao-cnh",
  name: "Renovação de CNH",
  agency: "DETRAN",
  level: "estadual" as const,
  state: "SC",
  municipality: "Florianópolis",
  url: "https://www.detran.sc.gov.br/renovacao",
  type: "online" as const,
  steps: [{ text: "Acesse o site" }, { text: "Preencha o formulário", links: [{ anchor: "clique aqui", url: "https://example.com/form" }] }],
  links: [{ url: "https://example.com", label: "Portal" }],
  documents: [{ standard_code: "CPF", name: "CPF", category: "identificacao", required: true, condition: null }],
  costs: [{ description: "Taxa", type: "fixo" as const, value: 50, valueMin: null, valueMax: null, required: true, note: null, link: null }],
  keywords: ["cnh", "renovação"],
};

describe("publicServiceSchema", () => {
  it("accepts valid payload", () => {
    const result = publicServiceSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.slug).toBe("renovacao-cnh");
      expect(result.data.steps).toHaveLength(2);
    }
  });

  it("rejects missing required fields", () => {
    const result = publicServiceSchema.safeParse({ ...validPayload, slug: "" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid level", () => {
    const result = publicServiceSchema.safeParse({ ...validPayload, level: "invalid" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid url", () => {
    const result = publicServiceSchema.safeParse({ ...validPayload, url: "not-a-url" });
    expect(result.success).toBe(false);
  });

  it("coerces legacy string steps to StepItem[]", () => {
    const result = publicServiceSchema.safeParse({
      ...validPayload,
      steps: ["Step one", "Step two"],
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.steps).toEqual([{ text: "Step one" }, { text: "Step two" }]);
    }
  });
});
