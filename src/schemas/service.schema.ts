import { z } from "zod";

export const linkItemSchema = z.object({
  url: z.string().url(),
  label: z.string(),
});

export const costItemSchema = z.object({
  description: z.string(),
  type: z.enum(["fixo", "faixa", "gratuito", "variavel"]),
  value: z.number().nullable(),
  valueMin: z.number().nullable(),
  valueMax: z.number().nullable(),
  required: z.boolean(),
  note: z.string().nullable(),
  link: z.string().nullable(),
});

export const stepLinkSchema = z.object({
  anchor: z.string(),
  url: z.string().url(),
});

export const stepItemSchema = z.object({
  text: z.string(),
  links: z.array(stepLinkSchema).optional(),
});

export const documentRequiredSchema = z.object({
  standard_code: z.string(),
  name: z.string(),
  category: z.string(),
  required: z.boolean(),
  condition: z.string().nullable(),
  link: z.string().url().nullable().optional(),
});

/** Coerce legacy steps (string[] or old { text, link? }[]) to StepItem[] for backward compatibility. */
const stepsSchema = z.preprocess(
  (val: unknown) => {
    if (!Array.isArray(val) || val.length === 0) return val;
    const first = val[0];
    if (typeof first === "string") {
      return (val as string[]).map((s) => ({ text: s }));
    }
    if (first && typeof first === "object" && "link" in first && "text" in first) {
      return (val as { text: string; link?: string | null }[]).map((s) =>
        s.link ? { text: s.text, links: [{ anchor: "clique aqui", url: s.link }] } : { text: s.text }
      );
    }
    return val;
  },
  z.array(stepItemSchema)
);

export const publicServiceSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  agency: z.string().min(1),
  level: z.enum(["federal", "estadual", "municipal"]),
  state: z.string().min(1),
  municipality: z.string().min(1),
  url: z.string().url(),
  type: z.enum(["online", "presencial", "misto"]),
  steps: stepsSchema,
  links: z.array(linkItemSchema),
  documents: z.array(documentRequiredSchema),
  costs: z.array(costItemSchema),
  keywords: z.array(z.string()),
  finalidade: z.string().nullable().optional(),
  tempoEletronico: z.string().nullable().optional(),
  tempoFisico: z.string().nullable().optional(),
  contato: z.array(z.string()).optional(),
});

export type PublicServiceInput = z.infer<typeof publicServiceSchema>;
