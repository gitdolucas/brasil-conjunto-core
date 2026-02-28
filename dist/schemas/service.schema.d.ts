import { z } from "zod";
export declare const linkItemSchema: z.ZodObject<{
    url: z.ZodString;
    label: z.ZodString;
}, z.core.$strip>;
export declare const costItemSchema: z.ZodObject<{
    description: z.ZodString;
    type: z.ZodEnum<{
        fixo: "fixo";
        faixa: "faixa";
        gratuito: "gratuito";
        variavel: "variavel";
    }>;
    value: z.ZodNullable<z.ZodNumber>;
    valueMin: z.ZodNullable<z.ZodNumber>;
    valueMax: z.ZodNullable<z.ZodNumber>;
    required: z.ZodBoolean;
    note: z.ZodNullable<z.ZodString>;
    link: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export declare const stepLinkSchema: z.ZodObject<{
    anchor: z.ZodString;
    url: z.ZodString;
}, z.core.$strip>;
export declare const stepItemSchema: z.ZodObject<{
    text: z.ZodString;
    links: z.ZodOptional<z.ZodArray<z.ZodObject<{
        anchor: z.ZodString;
        url: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const documentRequiredSchema: z.ZodObject<{
    standard_code: z.ZodString;
    name: z.ZodString;
    category: z.ZodString;
    required: z.ZodBoolean;
    condition: z.ZodNullable<z.ZodString>;
    link: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const publicServiceSchema: z.ZodObject<{
    slug: z.ZodString;
    name: z.ZodString;
    agency: z.ZodString;
    level: z.ZodEnum<{
        federal: "federal";
        estadual: "estadual";
        municipal: "municipal";
    }>;
    state: z.ZodString;
    municipality: z.ZodString;
    url: z.ZodString;
    type: z.ZodEnum<{
        online: "online";
        presencial: "presencial";
        misto: "misto";
    }>;
    steps: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        links: z.ZodOptional<z.ZodArray<z.ZodObject<{
            anchor: z.ZodString;
            url: z.ZodString;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>;
    links: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        label: z.ZodString;
    }, z.core.$strip>>;
    documents: z.ZodArray<z.ZodObject<{
        standard_code: z.ZodString;
        name: z.ZodString;
        category: z.ZodString;
        required: z.ZodBoolean;
        condition: z.ZodNullable<z.ZodString>;
        link: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>;
    costs: z.ZodArray<z.ZodObject<{
        description: z.ZodString;
        type: z.ZodEnum<{
            fixo: "fixo";
            faixa: "faixa";
            gratuito: "gratuito";
            variavel: "variavel";
        }>;
        value: z.ZodNullable<z.ZodNumber>;
        valueMin: z.ZodNullable<z.ZodNumber>;
        valueMax: z.ZodNullable<z.ZodNumber>;
        required: z.ZodBoolean;
        note: z.ZodNullable<z.ZodString>;
        link: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>;
    keywords: z.ZodArray<z.ZodString>;
    finalidade: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    tempoEletronico: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    tempoFisico: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contato: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type PublicServiceInput = z.infer<typeof publicServiceSchema>;
