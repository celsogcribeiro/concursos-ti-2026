export type PhaseStatus = "done" | "current" | "pending";
export type Phase = { id: number; title: string; desc: string; status: PhaseStatus; note: string };
export type CategoryId = string;
export type Category = { id: CategoryId; label: string; classificados: number };
export type Candidate = {
  posicao: number;
  inscricao: string;
  nome: string;
  notaTitulos: number;
  notaFinal: number;
  categorias: string[];
};
export type ContestMeta = {
  title: string;
  org: string;
  role: string;
  edital: string;
  devBy: string;
  homologadoPor: string;
  stats: { label: string; value: string }[];
};
export type ContestData = {
  contest: ContestMeta;
  phases: Phase[];
  alertText: string;
  quotaBaseNote: string;
  categories: Category[];
  candidates: Record<string, Candidate[]>;
};

export const DEFAULT_DATA: ContestData = {
  contest: {
    title: "Telecomunicações Brasileiras S.A. (Telebras)",
    org: "Telebras",
    role: "Especialista em Gestão de Telecomunicações — Analista de Tecnologia da Informação (Brasília/DF)",
    edital: "Edital nº 12 – Telebras, de 23 de junho de 2026",
    devBy: "Desenvolvido com Claude + Lovable",
    homologadoPor: "Hermano Studart Lins de Albuquerque — Presidente da Telebras",
    stats: [
      { label: "Média (AC)", value: "102.85" },
      { label: "Maior nota", value: "122.70" },
      { label: "Homologados", value: "32" },
    ],
  },
  phases: [
    { id: 1, title: "Fase 1", desc: "Provas objetiva e discursiva", status: "done", note: "Concluída em edital anterior" },
    { id: 2, title: "Fase 2", desc: "Avaliação de títulos", status: "done", note: "Edital nº 12 – Telebras, de 23 de junho de 2026" },
    { id: 3, title: "Fase 3", desc: "Resultado final e homologação", status: "done", note: "Homologado em 23/06/2026" },
  ],
  alertText:
    "Resultado final homologado. Hermano Studart Lins de Albuquerque — Presidente da Telebras.",
  quotaBaseNote:
    "Contagem de candidatos homologados por modalidade de concorrência, conforme edital nº 12 – Telebras, de 23/06/2026. Candidatos de cota também classificados na Ampla Concorrência aparecem marcados como 'também em'.",
  categories: [
    { id: "ac", label: "Ampla Concorrência", classificados: 32 },
    { id: "pp", label: "Pretos e Pardos", classificados: 24 },
    { id: "pcd", label: "PcD", classificados: 4 },
  ],
  candidates: {
    ac: [
      { posicao: 1, inscricao: "10010587", nome: "Mauricio de Alexandrino", notaTitulos: 7.5, notaFinal: 122.7, categorias: [] },
      { posicao: 2, inscricao: "10000796", nome: "Aneliza da Silva Barros", notaTitulos: 11.25, notaFinal: 117.45, categorias: [] },
      { posicao: 3, inscricao: "10001325", nome: "Murilo Gomes de Souza", notaTitulos: 10.0, notaFinal: 115.19, categorias: ["pp"] },
      { posicao: 4, inscricao: "10002554", nome: "Rodrigo Rianelly de Macedo Evangelista", notaTitulos: 0.0, notaFinal: 113.34, categorias: [] },
      { posicao: 5, inscricao: "10005721", nome: "Flavia Cristina de Castro Soares", notaTitulos: 0.0, notaFinal: 111.96, categorias: [] },
      { posicao: 6, inscricao: "10001993", nome: "Sabrina Soares Campos Silva Coelho", notaTitulos: 11.25, notaFinal: 111.48, categorias: [] },
      { posicao: 7, inscricao: "10003681", nome: "Ruan Donato Reis Costa", notaTitulos: 0.0, notaFinal: 111.01, categorias: [] },
      { posicao: 8, inscricao: "10001605", nome: "Jardson de Oliveira da Rocha", notaTitulos: 11.25, notaFinal: 110.9, categorias: [] },
      { posicao: 9, inscricao: "10006151", nome: "Bruna Roberta Oliveira Nascimento", notaTitulos: 12.5, notaFinal: 107.75, categorias: [] },
      { posicao: 10, inscricao: "10000899", nome: "Caio Gomes Flausino", notaTitulos: 2.5, notaFinal: 105.35, categorias: [] },
      { posicao: 11, inscricao: "10006825", nome: "Ricardo Saad Vieira", notaTitulos: 0.0, notaFinal: 104.2, categorias: [] },
      { posicao: 12, inscricao: "10004639", nome: "Victor Gueresi de Mello Braga", notaTitulos: 0.0, notaFinal: 103.62, categorias: [] },
      { posicao: 13, inscricao: "10008430", nome: "Luis Eduardo Alkmin La Torre", notaTitulos: 2.5, notaFinal: 101.78, categorias: ["pp"] },
      { posicao: 14, inscricao: "10005215", nome: "Aecio Fernandes Galiza Magalhaes", notaTitulos: 0.0, notaFinal: 101.2, categorias: ["pp"] },
      { posicao: 15, inscricao: "10010964", nome: "Caio Ribeiro Galvao", notaTitulos: 0.0, notaFinal: 99.65, categorias: [] },
      { posicao: 16, inscricao: "10007299", nome: "Arley Pinheiro Mendes", notaTitulos: 0.0, notaFinal: 99.48, categorias: [] },
      { posicao: 17, inscricao: "10004271", nome: "Cosme Diego da Silva Augusto", notaTitulos: 1.25, notaFinal: 99.32, categorias: ["pcd"] },
      { posicao: 18, inscricao: "10005850", nome: "Jonas Prado Soares", notaTitulos: 0.0, notaFinal: 99.25, categorias: [] },
      { posicao: 19, inscricao: "10003548", nome: "Pedro Teixeira Jacobina Aires", notaTitulos: 2.5, notaFinal: 98.78, categorias: [] },
      { posicao: 20, inscricao: "10007140", nome: "Daniel Feitosa Ferreira Silva", notaTitulos: 0.0, notaFinal: 98.6, categorias: ["pp"] },
      { posicao: 21, inscricao: "10003034", nome: "Rafael Valentim Fonseca", notaTitulos: 2.5, notaFinal: 98.51, categorias: [] },
      { posicao: 22, inscricao: "10002970", nome: "Matheus Ribeiro Gomes Herculano", notaTitulos: 2.5, notaFinal: 98.28, categorias: ["pp"] },
      { posicao: 23, inscricao: "10010881", nome: "Otavio Gomes Lumba de Oliveira", notaTitulos: 0.0, notaFinal: 98.01, categorias: [] },
      { posicao: 24, inscricao: "10002320", nome: "Victor Hugo Nascimento Silva", notaTitulos: 0.0, notaFinal: 97.6, categorias: ["pp"] },
      { posicao: 25, inscricao: "10006276", nome: "Matheus de Souza Watanabe", notaTitulos: 0.0, notaFinal: 97.49, categorias: [] },
      { posicao: 26, inscricao: "10006298", nome: "Eduardo Santos Diniz", notaTitulos: 0.0, notaFinal: 97.3, categorias: ["pp"] },
      { posicao: 27, inscricao: "10003734", nome: "Mateus de Souza Pequeno Furtado de Mendonca", notaTitulos: 0.0, notaFinal: 96.83, categorias: [] },
      { posicao: 28, inscricao: "10008498", nome: "Vitor Rodrigues de Albuquerque", notaTitulos: 1.25, notaFinal: 95.45, categorias: [] },
      { posicao: 29, inscricao: "10007914", nome: "Angela de Oliveira Mito", notaTitulos: 0.0, notaFinal: 95.23, categorias: [] },
      { posicao: 30, inscricao: "10009232", nome: "Carlos Eduardo Horita", notaTitulos: 0.0, notaFinal: 94.54, categorias: [] },
      { posicao: 31, inscricao: "10009274", nome: "Victor Koschel de Andrade", notaTitulos: 0.0, notaFinal: 94.49, categorias: [] },
      { posicao: 32, inscricao: "10007642", nome: "Andrea Pinheiro Brasil de Carvalho", notaTitulos: 0.0, notaFinal: 94.43, categorias: [] },
    ],
    pp: [
      { posicao: 1, inscricao: "10001325", nome: "Murilo Gomes de Souza", notaTitulos: 10.0, notaFinal: 115.19, categorias: ["ac"] },
      { posicao: 2, inscricao: "10003450", nome: "Marcileide Cardoso de Souza", notaTitulos: 12.5, notaFinal: 102.93, categorias: [] },
      { posicao: 3, inscricao: "10008430", nome: "Luis Eduardo Alkmin La Torre", notaTitulos: 2.5, notaFinal: 101.78, categorias: ["ac"] },
      { posicao: 4, inscricao: "10006373", nome: "Wilfredo Enrique Pacheco Hernandez", notaTitulos: 10.0, notaFinal: 101.2, categorias: [] },
      { posicao: 5, inscricao: "10005215", nome: "Aecio Fernandes Galiza Magalhaes", notaTitulos: 0.0, notaFinal: 101.2, categorias: ["ac"] },
      { posicao: 6, inscricao: "10004287", nome: "Bruno Aires de Sousa", notaTitulos: 12.5, notaFinal: 100.13, categorias: [] },
      { posicao: 7, inscricao: "10007140", nome: "Daniel Feitosa Ferreira Silva", notaTitulos: 0.0, notaFinal: 98.6, categorias: ["ac"] },
      { posicao: 8, inscricao: "10002970", nome: "Matheus Ribeiro Gomes Herculano", notaTitulos: 2.5, notaFinal: 98.28, categorias: ["ac"] },
      { posicao: 9, inscricao: "10002346", nome: "William Silva Dias", notaTitulos: 7.5, notaFinal: 97.76, categorias: [] },
      { posicao: 10, inscricao: "10002320", nome: "Victor Hugo Nascimento Silva", notaTitulos: 0.0, notaFinal: 97.6, categorias: ["ac"] },
      { posicao: 11, inscricao: "10006298", nome: "Eduardo Santos Diniz", notaTitulos: 0.0, notaFinal: 97.3, categorias: ["ac"] },
      { posicao: 12, inscricao: "10003236", nome: "Hercules Fortes de Andrade", notaTitulos: 11.25, notaFinal: 93.52, categorias: [] },
      { posicao: 13, inscricao: "10005627", nome: "Caio Vinicius Rodrigues Moreira", notaTitulos: 0.0, notaFinal: 91.52, categorias: [] },
      { posicao: 14, inscricao: "10004593", nome: "Leandro dos Santos Matos", notaTitulos: 1.25, notaFinal: 91.48, categorias: [] },
      { posicao: 15, inscricao: "10005427", nome: "Isac Mamede Pereira Santos", notaTitulos: 1.25, notaFinal: 87.06, categorias: [] },
      { posicao: 16, inscricao: "10006371", nome: "Isaque Augusto da Silva Santos", notaTitulos: 0.0, notaFinal: 84.95, categorias: [] },
      { posicao: 17, inscricao: "10007794", nome: "Victor de Sousa Alencar", notaTitulos: 0.0, notaFinal: 84.89, categorias: [] },
      { posicao: 18, inscricao: "10003463", nome: "Raoni Costa Oliveira", notaTitulos: 2.5, notaFinal: 84.73, categorias: [] },
      { posicao: 19, inscricao: "10000152", nome: "Denis Adonis de Novaes Rego", notaTitulos: 2.5, notaFinal: 84.71, categorias: [] },
      { posicao: 20, inscricao: "10003362", nome: "Francisco Henrique Moreira Firmino", notaTitulos: 0.0, notaFinal: 83.87, categorias: [] },
      { posicao: 21, inscricao: "10001675", nome: "Laiane Ricardo de Araujo", notaTitulos: 1.25, notaFinal: 82.08, categorias: [] },
      { posicao: 22, inscricao: "10005491", nome: "Mateus de Oliveira Rodrigues", notaTitulos: 0.0, notaFinal: 81.78, categorias: [] },
      { posicao: 23, inscricao: "10006284", nome: "Filipe Guimaraes de Oliveira", notaTitulos: 0.0, notaFinal: 80.73, categorias: [] },
      { posicao: 24, inscricao: "10004020", nome: "Karen Gabrielle Fernandes Rodrigues", notaTitulos: 0.0, notaFinal: 78.84, categorias: [] },
    ],
    pcd: [
      { posicao: 1, inscricao: "10004271", nome: "Cosme Diego da Silva Augusto", notaTitulos: 1.25, notaFinal: 99.32, categorias: ["ac"] },
      { posicao: 2, inscricao: "10007463", nome: "Joao Gabriel de Sousa Barbosa", notaTitulos: 11.25, notaFinal: 97.06, categorias: [] },
      { posicao: 3, inscricao: "10002195", nome: "Julio Breves dos Santos Neto", notaTitulos: 0.0, notaFinal: 93.13, categorias: [] },
      { posicao: 4, inscricao: "10008814", nome: "Celso Gustavo Cavalcante Ribeiro", notaTitulos: 2.5, notaFinal: 90.13, categorias: [] },
    ],
  },
};

const STORAGE_KEY = "telebras.contestData.v1";

export function loadData(): ContestData {
  if (typeof window === "undefined") return DEFAULT_DATA;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DATA;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_DATA, ...parsed } as ContestData;
  } catch {
    return DEFAULT_DATA;
  }
}

export function saveData(data: ContestData) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearData() {
  window.localStorage.removeItem(STORAGE_KEY);
}

/**
 * Parse an uploaded file's text (JSON, JS, TS, JSX or TSX) and extract
 * the contest data. For JS/TS/JSX/TSX we look for exported constants named
 * CONTEST, PHASES, CATEGORIES, CANDIDATES, ALERT_TEXT, QUOTA_BASE_NOTE and
 * evaluate the literal that follows the `=` sign in a sandboxed Function.
 */
export function parseUploadedFile(text: string, filename: string): ContestData {
  const ext = filename.toLowerCase().split(".").pop() ?? "";
  if (ext === "json") {
    const obj = JSON.parse(text);
    return normalize(obj);
  }
  // JS/TS/JSX/TSX — extract named literals
  const stripped = stripTypes(text);
  const grab = (name: string) => extractLiteral(stripped, name);
  const obj: Record<string, unknown> = {};
  const contest = grab("CONTEST");
  const phases = grab("PHASES");
  const categories = grab("CATEGORIES");
  const candidates = grab("CANDIDATES");
  const alertText = grab("ALERT_TEXT");
  const quotaBaseNote = grab("QUOTA_BASE_NOTE");
  if (contest) obj.contest = contest;
  if (phases) obj.phases = phases;
  if (categories) obj.categories = categories;
  if (candidates) obj.candidates = candidates;
  if (alertText) obj.alertText = alertText;
  if (quotaBaseNote) obj.quotaBaseNote = quotaBaseNote;
  if (Object.keys(obj).length === 0) {
    throw new Error(
      "Nenhum dos identificadores esperados (CONTEST, PHASES, CATEGORIES, CANDIDATES) foi encontrado no arquivo.",
    );
  }
  return normalize(obj);
}

function stripTypes(src: string): string {
  // Remove `as Foo` / `satisfies Foo` and type annotations like `: TypeName` in simple positions.
  // Also drop `Record<..., ...>` type params. Best-effort — safe because we only extract literals afterwards.
  let out = src.replace(/\bas\s+[A-Za-z_$][\w$<>,\s\[\]|&."']*/g, "");
  out = out.replace(/\bsatisfies\s+[A-Za-z_$][\w$<>,\s\[\]|&."']*/g, "");
  // Remove type annotations after identifiers: `foo: Type = ` -> `foo = `
  out = out.replace(/(\bconst\s+[A-Za-z_$][\w$]*)\s*:\s*[^=]+?=/g, "$1 =");
  return out;
}

function extractLiteral(src: string, name: string): unknown | null {
  const re = new RegExp(`(?:export\\s+)?const\\s+${name}\\s*=\\s*`, "m");
  const m = re.exec(src);
  if (!m) return null;
  const start = m.index + m[0].length;
  const literal = readLiteral(src, start);
  if (!literal) return null;
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function(`"use strict"; return (${literal});`);
    return fn();
  } catch (err) {
    throw new Error(`Falha ao interpretar '${name}': ${(err as Error).message}`);
  }
}

function readLiteral(src: string, start: number): string | null {
  // Skip whitespace
  let i = start;
  while (i < src.length && /\s/.test(src[i])) i++;
  const first = src[i];
  if (first === '"' || first === "'" || first === "`") {
    // string literal — read until matching quote
    let j = i + 1;
    while (j < src.length) {
      if (src[j] === "\\") { j += 2; continue; }
      if (src[j] === first) return src.slice(i, j + 1);
      j++;
    }
    return null;
  }
  if (first !== "{" && first !== "[") return null;
  const open = first;
  const close = open === "{" ? "}" : "]";
  let depth = 0;
  let j = i;
  let inStr: string | null = null;
  while (j < src.length) {
    const c = src[j];
    if (inStr) {
      if (c === "\\") { j += 2; continue; }
      if (c === inStr) inStr = null;
    } else {
      if (c === '"' || c === "'" || c === "`") inStr = c;
      else if (c === open) depth++;
      else if (c === close) {
        depth--;
        if (depth === 0) return src.slice(i, j + 1);
      }
    }
    j++;
  }
  return null;
}

function normalize(partial: Partial<ContestData> & Record<string, unknown>): ContestData {
  const merged: ContestData = {
    contest: (partial.contest as ContestMeta) ?? DEFAULT_DATA.contest,
    phases: (partial.phases as Phase[]) ?? DEFAULT_DATA.phases,
    alertText: (partial.alertText as string) ?? DEFAULT_DATA.alertText,
    quotaBaseNote: (partial.quotaBaseNote as string) ?? DEFAULT_DATA.quotaBaseNote,
    categories: (partial.categories as Category[]) ?? DEFAULT_DATA.categories,
    candidates: (partial.candidates as Record<string, Candidate[]>) ?? DEFAULT_DATA.candidates,
  };
  // Basic validation
  if (!Array.isArray(merged.phases)) throw new Error("PHASES deve ser um array.");
  if (!Array.isArray(merged.categories)) throw new Error("CATEGORIES deve ser um array.");
  if (typeof merged.candidates !== "object" || Array.isArray(merged.candidates)) {
    throw new Error("CANDIDATES deve ser um objeto mapeando id da modalidade para lista.");
  }
  return merged;
}
