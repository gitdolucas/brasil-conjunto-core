import { z } from "zod";
export declare const linkItemSchema: any;
export declare const costItemSchema: any;
export declare const stepLinkSchema: any;
export declare const stepItemSchema: any;
export declare const documentRequiredSchema: any;
export declare const publicServiceSchema: any;
export type PublicServiceInput = z.infer<typeof publicServiceSchema>;
