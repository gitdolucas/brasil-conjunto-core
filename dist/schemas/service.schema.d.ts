import { z } from "zod";
export declare const linkItemSchema: z.ZodObject<{
    url: z.ZodString;
    label: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    label: string;
}, {
    url: string;
    label: string;
}>;
export declare const costItemSchema: z.ZodObject<{
    description: z.ZodString;
    type: z.ZodEnum<["fixo", "faixa", "gratuito", "variavel"]>;
    value: z.ZodNullable<z.ZodNumber>;
    valueMin: z.ZodNullable<z.ZodNumber>;
    valueMax: z.ZodNullable<z.ZodNumber>;
    required: z.ZodBoolean;
    note: z.ZodNullable<z.ZodString>;
    link: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    value: number | null;
    type: "fixo" | "faixa" | "gratuito" | "variavel";
    description: string;
    valueMin: number | null;
    valueMax: number | null;
    required: boolean;
    note: string | null;
    link: string | null;
}, {
    value: number | null;
    type: "fixo" | "faixa" | "gratuito" | "variavel";
    description: string;
    valueMin: number | null;
    valueMax: number | null;
    required: boolean;
    note: string | null;
    link: string | null;
}>;
export declare const stepLinkSchema: z.ZodObject<{
    anchor: z.ZodString;
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    anchor: string;
}, {
    url: string;
    anchor: string;
}>;
export declare const stepItemSchema: z.ZodObject<{
    text: z.ZodString;
    links: z.ZodOptional<z.ZodArray<z.ZodObject<{
        anchor: z.ZodString;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        url: string;
        anchor: string;
    }, {
        url: string;
        anchor: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    text: string;
    links?: {
        url: string;
        anchor: string;
    }[] | undefined;
}, {
    text: string;
    links?: {
        url: string;
        anchor: string;
    }[] | undefined;
}>;
export declare const documentRequiredSchema: z.ZodObject<{
    standard_code: z.ZodString;
    name: z.ZodString;
    category: z.ZodString;
    required: z.ZodBoolean;
    condition: z.ZodNullable<z.ZodString>;
    link: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    required: boolean;
    standard_code: string;
    name: string;
    category: string;
    condition: string | null;
    link?: string | null | undefined;
}, {
    required: boolean;
    standard_code: string;
    name: string;
    category: string;
    condition: string | null;
    link?: string | null | undefined;
}>;
export declare const publicServiceSchema: z.ZodObject<{
    slug: z.ZodString;
    name: z.ZodString;
    agency: z.ZodString;
    level: z.ZodEnum<["federal", "estadual", "municipal"]>;
    state: z.ZodString;
    municipality: z.ZodString;
    url: z.ZodString;
    type: z.ZodEnum<["online", "presencial", "misto"]>;
    steps: z.ZodEffects<z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        links: z.ZodOptional<z.ZodArray<z.ZodObject<{
            anchor: z.ZodString;
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
            anchor: string;
        }, {
            url: string;
            anchor: string;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        links?: {
            url: string;
            anchor: string;
        }[] | undefined;
    }, {
        text: string;
        links?: {
            url: string;
            anchor: string;
        }[] | undefined;
    }>, "many">, {
        text: string;
        links?: {
            url: string;
            anchor: string;
        }[] | undefined;
    }[], unknown>;
    links: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        label: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        url: string;
        label: string;
    }, {
        url: string;
        label: string;
    }>, "many">;
    documents: z.ZodArray<z.ZodObject<{
        standard_code: z.ZodString;
        name: z.ZodString;
        category: z.ZodString;
        required: z.ZodBoolean;
        condition: z.ZodNullable<z.ZodString>;
        link: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        required: boolean;
        standard_code: string;
        name: string;
        category: string;
        condition: string | null;
        link?: string | null | undefined;
    }, {
        required: boolean;
        standard_code: string;
        name: string;
        category: string;
        condition: string | null;
        link?: string | null | undefined;
    }>, "many">;
    costs: z.ZodArray<z.ZodObject<{
        description: z.ZodString;
        type: z.ZodEnum<["fixo", "faixa", "gratuito", "variavel"]>;
        value: z.ZodNullable<z.ZodNumber>;
        valueMin: z.ZodNullable<z.ZodNumber>;
        valueMax: z.ZodNullable<z.ZodNumber>;
        required: z.ZodBoolean;
        note: z.ZodNullable<z.ZodString>;
        link: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        value: number | null;
        type: "fixo" | "faixa" | "gratuito" | "variavel";
        description: string;
        valueMin: number | null;
        valueMax: number | null;
        required: boolean;
        note: string | null;
        link: string | null;
    }, {
        value: number | null;
        type: "fixo" | "faixa" | "gratuito" | "variavel";
        description: string;
        valueMin: number | null;
        valueMax: number | null;
        required: boolean;
        note: string | null;
        link: string | null;
    }>, "many">;
    keywords: z.ZodArray<z.ZodString, "many">;
    finalidade: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    tempoEletronico: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    tempoFisico: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contato: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    url: string;
    type: "online" | "presencial" | "misto";
    links: {
        url: string;
        label: string;
    }[];
    name: string;
    slug: string;
    agency: string;
    level: "federal" | "estadual" | "municipal";
    state: string;
    municipality: string;
    steps: {
        text: string;
        links?: {
            url: string;
            anchor: string;
        }[] | undefined;
    }[];
    documents: {
        required: boolean;
        standard_code: string;
        name: string;
        category: string;
        condition: string | null;
        link?: string | null | undefined;
    }[];
    costs: {
        value: number | null;
        type: "fixo" | "faixa" | "gratuito" | "variavel";
        description: string;
        valueMin: number | null;
        valueMax: number | null;
        required: boolean;
        note: string | null;
        link: string | null;
    }[];
    keywords: string[];
    finalidade?: string | null | undefined;
    tempoEletronico?: string | null | undefined;
    tempoFisico?: string | null | undefined;
    contato?: string[] | undefined;
}, {
    url: string;
    type: "online" | "presencial" | "misto";
    links: {
        url: string;
        label: string;
    }[];
    name: string;
    slug: string;
    agency: string;
    level: "federal" | "estadual" | "municipal";
    state: string;
    municipality: string;
    documents: {
        required: boolean;
        standard_code: string;
        name: string;
        category: string;
        condition: string | null;
        link?: string | null | undefined;
    }[];
    costs: {
        value: number | null;
        type: "fixo" | "faixa" | "gratuito" | "variavel";
        description: string;
        valueMin: number | null;
        valueMax: number | null;
        required: boolean;
        note: string | null;
        link: string | null;
    }[];
    keywords: string[];
    steps?: unknown;
    finalidade?: string | null | undefined;
    tempoEletronico?: string | null | undefined;
    tempoFisico?: string | null | undefined;
    contato?: string[] | undefined;
}>;
export type PublicServiceInput = z.infer<typeof publicServiceSchema>;
