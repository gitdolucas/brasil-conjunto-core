/**
 * Service types — shared contract for public services across workspaces.
 */

export interface LinkItem {
  url: string;
  label: string;
}

export interface CostItem {
  description: string;
  type: "fixo" | "faixa" | "gratuito" | "variavel";
  value: number | null;
  valueMin: number | null;
  valueMax: number | null;
  required: boolean;
  note: string | null;
  link: string | null;
}

/** Anchor is the substring in the step text to turn into a link (e.g. "clique aqui"); url is the redirect. */
export interface StepLink {
  anchor: string;
  url: string;
}

export interface StepItem {
  text: string;
  links?: StepLink[];
}

export interface DocumentRequired {
  standard_code: string;
  name: string;
  category: string;
  required: boolean;
  condition: string | null;
  link?: string | null;
}

export interface PublicService {
  slug: string;
  name: string;
  agency: string;
  level: "federal" | "estadual" | "municipal";
  state: string;
  municipality: string;
  url: string;
  type: "online" | "presencial" | "misto";
  steps: StepItem[];
  links: LinkItem[];
  documents: DocumentRequired[];
  costs: CostItem[];
  keywords: string[];
  finalidade?: string | null;
  tempoEletronico?: string | null;
  tempoFisico?: string | null;
  contato?: string[];
}
