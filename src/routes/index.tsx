import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  ShieldCheck,
  Circle,
  CheckCircle2,
  Clock3,
  ChevronUp,
  ChevronDown,
  Award,
  Users,
  BarChart3,
  Trophy,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: App,
});

/* ==========================================================================
   CONFIGURAÇÃO DO CONCURSO
   ========================================================================== */

const CONTEST = {
  title: "Telecomunicações Brasileiras S.A. (Telebras)",
  org: "Telebras",
  role: "Especialista em Gestão de Telecomunicações — Analista de Tecnologia da Informação (Brasília/DF)",
  edital: "Edital nº 12 – Telebras, de 23 de junho de 2026",
  devBy: "Desenvolvido com Claude + Lovable",
  
  stats: [
    { label: "Média (AC)", value: "102.85" },
    { label: "Maior nota", value: "122.70" },
    { label: "Homologados", value: "32" },
  ],
};

type PhaseStatus = "done" | "current" | "pending";
type Phase = { id: number; title: string; desc: string; status: PhaseStatus; note: string };

const PHASES: Phase[] = [
  { id: 1, title: "Fase 1", desc: "Provas objetiva e discursiva", status: "done", note: "Concluída em edital anterior" },
  { id: 2, title: "Fase 2", desc: "Avaliação de títulos", status: "done", note: CONTEST.edital },
  { id: 3, title: "Fase 3", desc: "Resultado final e homologação", status: "done", note: "Homologado em 23/06/2026" },
];

const ALERT_TEXT = "Resultado final homologado.";

type Category = { id: string; label: string; classificados: number; vagas: number; limite: number };

const CATEGORIES: Category[] = [
  // limite = tamanho do cadastro de reserva (não inclui as vagas imediatas)
  { id: "ac", label: "Ampla Concorrência", classificados: 32, vagas: 1, limite: 30 },
  { id: "pp", label: "Pretos e Pardos", classificados: 24, vagas: 1, limite: 12 },
  { id: "pcd", label: "PcD", classificados: 4, vagas: 0, limite: 3 },
];

const CATEGORY_STYLES: Record<string, { accent: string; tint: string; badgeBorder: string; badgeBg: string; badgeText: string }> = {
  ac: { accent: "#2E5C8A", tint: "#EAF2FB", badgeBorder: "#8FB5E0", badgeBg: "#EAF2FB", badgeText: "#1D4E89" },
  pp: { accent: "#7A5AB0", tint: "#F4EEFC", badgeBorder: "#C6AEEA", badgeBg: "#F4EEFC", badgeText: "#5B3E96" },
  pcd: { accent: "#B8860A", tint: "#FDF4DD", badgeBorder: "#EAC468", badgeBg: "#FDF4DD", badgeText: "#8A6A16" },
};

const QUOTA_BASE_NOTE =
  "Contagem de candidatos homologados por modalidade de concorrência, conforme edital nº 12 – Telebras, de 23/06/2026. Candidatos de cota também classificados na Ampla Concorrência aparecem marcados como 'também em'.";

type Candidate = {
  posicao: number;
  inscricao: string;
  nome: string;
  notaObjetiva: number;
  notaDiscursiva: number;
  notaTitulos: number;
  notaFinal: number;
  categorias: string[];
};

const CANDIDATES: Record<string, Candidate[]> = {
  ac: [
    { posicao: 1, inscricao: "10010587", nome: "Mauricio de Alexandrino", notaObjetiva: 86.0, notaDiscursiva: 29.2, notaTitulos: 7.5, notaFinal: 122.7, categorias: [] },
    { posicao: 2, inscricao: "10000796", nome: "Aneliza da Silva Barros", notaObjetiva: 79.0, notaDiscursiva: 27.2, notaTitulos: 11.25, notaFinal: 117.45, categorias: [] },
    { posicao: 3, inscricao: "10001325", nome: "Murilo Gomes de Souza", notaObjetiva: 76.0, notaDiscursiva: 29.19, notaTitulos: 10.0, notaFinal: 115.19, categorias: ["pp"] },
    { posicao: 4, inscricao: "10002554", nome: "Rodrigo Rianelly de Macedo Evangelista", notaObjetiva: 86.0, notaDiscursiva: 27.34, notaTitulos: 0.0, notaFinal: 113.34, categorias: [] },
    { posicao: 5, inscricao: "10005721", nome: "Flavia Cristina de Castro Soares", notaObjetiva: 83.0, notaDiscursiva: 28.96, notaTitulos: 0.0, notaFinal: 111.96, categorias: [] },
    { posicao: 6, inscricao: "10001993", nome: "Sabrina Soares Campos Silva Coelho", notaObjetiva: 74.0, notaDiscursiva: 26.23, notaTitulos: 11.25, notaFinal: 111.48, categorias: [] },
    { posicao: 7, inscricao: "10003681", nome: "Ruan Donato Reis Costa", notaObjetiva: 84.0, notaDiscursiva: 27.01, notaTitulos: 0.0, notaFinal: 111.01, categorias: [] },
    { posicao: 8, inscricao: "10001605", nome: "Jardson de Oliveira da Rocha", notaObjetiva: 71.0, notaDiscursiva: 28.65, notaTitulos: 11.25, notaFinal: 110.9, categorias: [] },
    { posicao: 9, inscricao: "10006151", nome: "Bruna Roberta Oliveira Nascimento", notaObjetiva: 66.0, notaDiscursiva: 29.25, notaTitulos: 12.5, notaFinal: 107.75, categorias: [] },
    { posicao: 10, inscricao: "10000899", nome: "Caio Gomes Flausino", notaObjetiva: 77.0, notaDiscursiva: 25.85, notaTitulos: 2.5, notaFinal: 105.35, categorias: [] },
    { posicao: 11, inscricao: "10006825", nome: "Ricardo Saad Vieira", notaObjetiva: 76.0, notaDiscursiva: 28.2, notaTitulos: 0.0, notaFinal: 104.2, categorias: [] },
    { posicao: 12, inscricao: "10004639", nome: "Victor Gueresi de Mello Braga", notaObjetiva: 76.0, notaDiscursiva: 27.62, notaTitulos: 0.0, notaFinal: 103.62, categorias: [] },
    { posicao: 13, inscricao: "10008430", nome: "Luis Eduardo Alkmin La Torre", notaObjetiva: 76.0, notaDiscursiva: 23.28, notaTitulos: 2.5, notaFinal: 101.78, categorias: ["pp"] },
    { posicao: 14, inscricao: "10005215", nome: "Aecio Fernandes Galiza Magalhaes", notaObjetiva: 74.0, notaDiscursiva: 27.2, notaTitulos: 0.0, notaFinal: 101.2, categorias: ["pp"] },
    { posicao: 15, inscricao: "10010964", nome: "Caio Ribeiro Galvao", notaObjetiva: 71.0, notaDiscursiva: 28.65, notaTitulos: 0.0, notaFinal: 99.65, categorias: [] },
    { posicao: 16, inscricao: "10007299", nome: "Arley Pinheiro Mendes", notaObjetiva: 74.0, notaDiscursiva: 25.48, notaTitulos: 0.0, notaFinal: 99.48, categorias: [] },
    { posicao: 17, inscricao: "10004271", nome: "Cosme Diego da Silva Augusto", notaObjetiva: 74.0, notaDiscursiva: 24.07, notaTitulos: 1.25, notaFinal: 99.32, categorias: ["pcd"] },
    { posicao: 18, inscricao: "10005850", nome: "Jonas Prado Soares", notaObjetiva: 71.0, notaDiscursiva: 28.25, notaTitulos: 0.0, notaFinal: 99.25, categorias: [] },
    { posicao: 19, inscricao: "10003548", nome: "Pedro Teixeira Jacobina Aires", notaObjetiva: 70.0, notaDiscursiva: 26.28, notaTitulos: 2.5, notaFinal: 98.78, categorias: [] },
    { posicao: 20, inscricao: "10007140", nome: "Daniel Feitosa Ferreira Silva", notaObjetiva: 70.0, notaDiscursiva: 28.6, notaTitulos: 0.0, notaFinal: 98.6, categorias: ["pp"] },
    { posicao: 21, inscricao: "10003034", nome: "Rafael Valentim Fonseca", notaObjetiva: 73.0, notaDiscursiva: 23.01, notaTitulos: 2.5, notaFinal: 98.51, categorias: [] },
    { posicao: 22, inscricao: "10002970", nome: "Matheus Ribeiro Gomes Herculano", notaObjetiva: 71.0, notaDiscursiva: 24.78, notaTitulos: 2.5, notaFinal: 98.28, categorias: ["pp"] },
    { posicao: 23, inscricao: "10010881", nome: "Otavio Gomes Lumba de Oliveira", notaObjetiva: 74.0, notaDiscursiva: 24.01, notaTitulos: 0.0, notaFinal: 98.01, categorias: [] },
    { posicao: 24, inscricao: "10002320", nome: "Victor Hugo Nascimento Silva", notaObjetiva: 72.0, notaDiscursiva: 25.6, notaTitulos: 0.0, notaFinal: 97.6, categorias: ["pp"] },
    { posicao: 25, inscricao: "10006276", nome: "Matheus de Souza Watanabe", notaObjetiva: 71.0, notaDiscursiva: 26.49, notaTitulos: 0.0, notaFinal: 97.49, categorias: [] },
    { posicao: 26, inscricao: "10006298", nome: "Eduardo Santos Diniz", notaObjetiva: 73.0, notaDiscursiva: 24.3, notaTitulos: 0.0, notaFinal: 97.3, categorias: ["pp"] },
    { posicao: 27, inscricao: "10003734", nome: "Mateus de Souza Pequeno Furtado de Mendonca", notaObjetiva: 69.0, notaDiscursiva: 27.83, notaTitulos: 0.0, notaFinal: 96.83, categorias: [] },
    { posicao: 28, inscricao: "10008498", nome: "Vitor Rodrigues de Albuquerque", notaObjetiva: 65.0, notaDiscursiva: 29.2, notaTitulos: 1.25, notaFinal: 95.45, categorias: [] },
    { posicao: 29, inscricao: "10007914", nome: "Angela de Oliveira Mito", notaObjetiva: 66.0, notaDiscursiva: 29.23, notaTitulos: 0.0, notaFinal: 95.23, categorias: [] },
    { posicao: 30, inscricao: "10009232", nome: "Carlos Eduardo Horita", notaObjetiva: 67.0, notaDiscursiva: 27.54, notaTitulos: 0.0, notaFinal: 94.54, categorias: [] },
    { posicao: 31, inscricao: "10009274", nome: "Victor Koschel de Andrade", notaObjetiva: 70.0, notaDiscursiva: 24.49, notaTitulos: 0.0, notaFinal: 94.49, categorias: [] },
    { posicao: 32, inscricao: "10007642", nome: "Andrea Pinheiro Brasil de Carvalho", notaObjetiva: 71.0, notaDiscursiva: 23.43, notaTitulos: 0.0, notaFinal: 94.43, categorias: [] },
  ],
  pp: [
    { posicao: 1, inscricao: "10001325", nome: "Murilo Gomes de Souza", notaObjetiva: 76.0, notaDiscursiva: 29.19, notaTitulos: 10.0, notaFinal: 115.19, categorias: ["ac"] },
    { posicao: 2, inscricao: "10003450", nome: "Marcileide Cardoso de Souza", notaObjetiva: 64.0, notaDiscursiva: 26.43, notaTitulos: 12.5, notaFinal: 102.93, categorias: [] },
    { posicao: 3, inscricao: "10008430", nome: "Luis Eduardo Alkmin La Torre", notaObjetiva: 76.0, notaDiscursiva: 23.28, notaTitulos: 2.5, notaFinal: 101.78, categorias: ["ac"] },
    { posicao: 4, inscricao: "10006373", nome: "Wilfredo Enrique Pacheco Hernandez", notaObjetiva: 65.0, notaDiscursiva: 26.2, notaTitulos: 10.0, notaFinal: 101.2, categorias: [] },
    { posicao: 5, inscricao: "10005215", nome: "Aecio Fernandes Galiza Magalhaes", notaObjetiva: 74.0, notaDiscursiva: 27.2, notaTitulos: 0.0, notaFinal: 101.2, categorias: ["ac"] },
    { posicao: 6, inscricao: "10004287", nome: "Bruno Aires de Sousa", notaObjetiva: 67.0, notaDiscursiva: 20.63, notaTitulos: 12.5, notaFinal: 100.13, categorias: [] },
    { posicao: 7, inscricao: "10007140", nome: "Daniel Feitosa Ferreira Silva", notaObjetiva: 70.0, notaDiscursiva: 28.6, notaTitulos: 0.0, notaFinal: 98.6, categorias: ["ac"] },
    { posicao: 8, inscricao: "10002970", nome: "Matheus Ribeiro Gomes Herculano", notaObjetiva: 71.0, notaDiscursiva: 24.78, notaTitulos: 2.5, notaFinal: 98.28, categorias: ["ac"] },
    { posicao: 9, inscricao: "10002346", nome: "William Silva Dias", notaObjetiva: 69.0, notaDiscursiva: 21.26, notaTitulos: 7.5, notaFinal: 97.76, categorias: [] },
    { posicao: 10, inscricao: "10002320", nome: "Victor Hugo Nascimento Silva", notaObjetiva: 72.0, notaDiscursiva: 25.6, notaTitulos: 0.0, notaFinal: 97.6, categorias: ["ac"] },
    { posicao: 11, inscricao: "10006298", nome: "Eduardo Santos Diniz", notaObjetiva: 73.0, notaDiscursiva: 24.3, notaTitulos: 0.0, notaFinal: 97.3, categorias: ["ac"] },
    { posicao: 12, inscricao: "10003236", nome: "Hercules Fortes de Andrade", notaObjetiva: 55.0, notaDiscursiva: 27.27, notaTitulos: 11.25, notaFinal: 93.52, categorias: [] },
    { posicao: 13, inscricao: "10005627", nome: "Caio Vinicius Rodrigues Moreira", notaObjetiva: 63.0, notaDiscursiva: 28.52, notaTitulos: 0.0, notaFinal: 91.52, categorias: [] },
    { posicao: 14, inscricao: "10004593", nome: "Leandro dos Santos Matos", notaObjetiva: 66.0, notaDiscursiva: 24.23, notaTitulos: 1.25, notaFinal: 91.48, categorias: [] },
    { posicao: 15, inscricao: "10005427", nome: "Isac Mamede Pereira Santos", notaObjetiva: 59.0, notaDiscursiva: 26.81, notaTitulos: 1.25, notaFinal: 87.06, categorias: [] },
    { posicao: 16, inscricao: "10006371", nome: "Isaque Augusto da Silva Santos", notaObjetiva: 60.0, notaDiscursiva: 24.95, notaTitulos: 0.0, notaFinal: 84.95, categorias: [] },
    { posicao: 17, inscricao: "10007794", nome: "Victor de Sousa Alencar", notaObjetiva: 65.0, notaDiscursiva: 19.89, notaTitulos: 0.0, notaFinal: 84.89, categorias: [] },
    { posicao: 18, inscricao: "10003463", nome: "Raoni Costa Oliveira", notaObjetiva: 65.0, notaDiscursiva: 17.23, notaTitulos: 2.5, notaFinal: 84.73, categorias: [] },
    { posicao: 19, inscricao: "10000152", nome: "Denis Adonis de Novaes Rego", notaObjetiva: 58.0, notaDiscursiva: 24.21, notaTitulos: 2.5, notaFinal: 84.71, categorias: [] },
    { posicao: 20, inscricao: "10003362", nome: "Francisco Henrique Moreira Firmino", notaObjetiva: 60.0, notaDiscursiva: 23.87, notaTitulos: 0.0, notaFinal: 83.87, categorias: [] },
    { posicao: 21, inscricao: "10001675", nome: "Laiane Ricardo de Araujo", notaObjetiva: 52.0, notaDiscursiva: 28.83, notaTitulos: 1.25, notaFinal: 82.08, categorias: [] },
    { posicao: 22, inscricao: "10005491", nome: "Mateus de Oliveira Rodrigues", notaObjetiva: 58.0, notaDiscursiva: 23.78, notaTitulos: 0.0, notaFinal: 81.78, categorias: [] },
    { posicao: 23, inscricao: "10006284", nome: "Filipe Guimaraes de Oliveira", notaObjetiva: 60.0, notaDiscursiva: 20.73, notaTitulos: 0.0, notaFinal: 80.73, categorias: [] },
    { posicao: 24, inscricao: "10004020", nome: "Karen Gabrielle Fernandes Rodrigues", notaObjetiva: 53.0, notaDiscursiva: 25.84, notaTitulos: 0.0, notaFinal: 78.84, categorias: [] },
  ],
  pcd: [
    { posicao: 1, inscricao: "10004271", nome: "Cosme Diego da Silva Augusto", notaObjetiva: 74.0, notaDiscursiva: 24.07, notaTitulos: 1.25, notaFinal: 99.32, categorias: ["ac"] },
    { posicao: 2, inscricao: "10007463", nome: "Joao Gabriel de Sousa Barbosa", notaObjetiva: 60.0, notaDiscursiva: 25.81, notaTitulos: 11.25, notaFinal: 97.06, categorias: [] },
    { posicao: 3, inscricao: "10002195", nome: "Julio Breves dos Santos Neto", notaObjetiva: 73.0, notaDiscursiva: 20.13, notaTitulos: 0.0, notaFinal: 93.13, categorias: [] },
    { posicao: 4, inscricao: "10008814", nome: "Celso Gustavo Cavalcante Ribeiro", notaObjetiva: 62.0, notaDiscursiva: 25.63, notaTitulos: 2.5, notaFinal: 90.13, categorias: [] },
  ],
};

/* ==========================================================================
   COMPONENTES
   ========================================================================== */

function PhaseStamp({ phase }: { phase: Phase }) {
  const isDone = phase.status === "done";
  const isCurrent = phase.status === "current";
  return (
    <div className="flex flex-col items-center text-center w-full">
      <div
        className={[
          "w-14 h-14 rounded-full flex items-center justify-center border-2 shrink-0",
          isDone
            ? "border-[#A9822F] bg-[#A9822F] text-[#FBF6EA]"
            : isCurrent
              ? "border-[#14213D] border-dashed bg-transparent text-[#14213D]"
              : "border-[#C7C2B4] border-dashed bg-transparent text-[#9B968A]",
        ].join(" ")}
      >
        {isDone ? (
          <CheckCircle2 size={22} strokeWidth={2} />
        ) : isCurrent ? (
          <Clock3 size={20} strokeWidth={2} />
        ) : (
          <Circle size={16} strokeWidth={2} />
        )}
      </div>
      <p className="mt-2 font-mono text-[11px] tracking-widest text-[#5B6472] uppercase">{phase.title}</p>
      <p className="mt-1 text-[13px] leading-snug text-[#14213D] font-medium max-w-[9rem]">{phase.desc}</p>
      <p
        className={[
          "mt-1 text-[11px] max-w-[9rem]",
          isDone ? "text-[#2F6B4F]" : "text-[#9B968A]",
        ].join(" ")}
      >
        {phase.note}
      </p>
    </div>
  );
}

function QuotaCard({
  category,
  selected,
  onSelect,
}: {
  category: Category;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const list = CANDIDATES[category.id] || [];
  const best = list.length ? Math.max(...list.map((c) => c.notaFinal)) : 0;
  const style = CATEGORY_STYLES[category.id];
  return (
    <button
      onClick={() => onSelect(category.id)}
      className="text-left rounded-lg p-4 relative overflow-hidden transition-colors"
      style={{
        background: selected ? style.tint : "#FBF9F3",
        border: selected ? `2px solid ${style.accent}` : "1px solid #E4DFD0",
      }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: style.accent }} />
      <div className="flex items-center justify-between pl-2">
        <p className="text-[11px] uppercase tracking-wide text-[#5B6472]">{category.label}</p>
        {selected && <CheckCircle2 size={15} style={{ color: style.accent }} />}
      </div>
      <p className="pl-2 mt-1 font-mono text-3xl text-[#14213D]">{category.classificados}</p>
      <p className="pl-2 text-[12px] text-[#5B6472]">homologados</p>
      <div className="pl-2 mt-3 pt-3 border-t border-[#E4DFD0] flex items-baseline justify-between">
        <span className="text-[11px] text-[#5B6472]">1º lugar</span>
        <span className="font-mono text-sm text-[#14213D]">{best.toFixed(2)}</span>
      </div>
    </button>
  );
}

function PositionBadge({ pos, vagas, limite }: { pos: number; vagas: number; limite: number }) {
  let bg = "#F1EFE7";
  let border = "#D8D2C1";
  let color = "#7A7566";
  if (vagas > 0 && pos <= vagas) {
    // Vagas imediatas
    bg = "#DCF5E3";
    border = "#7FC79A";
    color = "#1F7A43";
  } else if (limite > 0 && pos > vagas && pos <= vagas + limite) {
    // Cadastro de reserva: começa a contar após as vagas imediatas
    bg = "#FDECD1";
    border = "#F0B562";
    color = "#8A5A16";
  }
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-mono text-[12px] font-medium"
      style={{ width: 30, height: 30, background: bg, border: `1px solid ${border}`, color }}
    >
      {pos}º
    </span>
  );
}

function CategoryBadge({ categoryId }: { categoryId: string }) {
  const style = CATEGORY_STYLES[categoryId];
  const label = CATEGORIES.find((c) => c.id === categoryId)?.label;
  return (
    <span
      className="uppercase text-[10px] font-medium px-2 py-0.5 rounded-full border tracking-wide"
      style={{ borderColor: style.badgeBorder, background: style.badgeBg, color: style.badgeText }}
    >
      também em {label}
    </span>
  );
}

function useSortedCandidates(list: Candidate[], sortDir: "asc" | "desc") {
  return useMemo(() => {
    return [...list].sort((a, b) =>
      sortDir === "desc" ? b.notaFinal - a.notaFinal : a.notaFinal - b.notaFinal,
    );
  }, [list, sortDir]);
}

function ClassificationTable({
  activeCategory,
  onChangeCategory,
}: {
  activeCategory: string;
  onChangeCategory: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const activeCatConfig = CATEGORIES.find((c) => c.id === activeCategory);
  const rawList = CANDIDATES[activeCategory] || [];
  const sorted = useSortedCandidates(rawList, sortDir);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter(
      (c) => c.nome.toLowerCase().includes(q) || c.inscricao.includes(q),
    );
  }, [sorted, query]);

  const categoryLabel = (id: string) => CATEGORIES.find((c) => c.id === id)?.label;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {CATEGORIES.map((cat) => {
          const style = CATEGORY_STYLES[cat.id];
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onChangeCategory(cat.id)}
              className="px-3 py-1.5 text-[13px] rounded-md transition-colors"
              style={{
                background: isActive ? style.accent : "transparent",
                color: isActive ? "#FFFFFF" : "#5B6472",
                border: `1px solid ${isActive ? style.accent : "#E4DFD0"}`,
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9B968A]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nome ou inscrição"
            className="w-full pl-8 pr-3 py-1.5 text-[13px] border border-[#E4DFD0] rounded-md bg-white focus:outline-none focus:border-[#A9822F]"
          />
        </div>
        <p className="text-[12px] text-[#5B6472]">
          Exibindo {filtered.length} de {rawList.length} candidatos em {categoryLabel(activeCategory)}
        </p>
      </div>

      <div className="border border-[#E4DFD0] rounded-lg overflow-hidden">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="bg-[#F1ECDF] text-[#5B6472] text-left">
              <th className="px-3 py-2 font-medium w-14">Pos.</th>
              <th className="px-3 py-2 font-medium">Inscrição</th>
              <th className="px-3 py-2 font-medium">Nome</th>
              <th className="px-3 py-2 font-medium text-right">Objetiva</th>
              <th className="px-3 py-2 font-medium text-right">Discursiva</th>
              <th className="px-3 py-2 font-medium text-right">Títulos</th>
              <th className="px-3 py-2 font-medium text-right">
                <button
                  onClick={() => setSortDir(sortDir === "desc" ? "asc" : "desc")}
                  className="flex items-center gap-1 ml-auto"
                >
                  Nota final
                  {sortDir === "desc" ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={c.inscricao} className={i % 2 === 0 ? "bg-white" : "bg-[#FBF9F3]"}>
                <td className="px-3 py-2">
                  <PositionBadge pos={c.posicao} vagas={activeCatConfig?.vagas ?? 0} limite={activeCatConfig?.limite ?? 0} />
                </td>
                <td className="px-3 py-2 font-mono text-[#14213D]">{c.inscricao}</td>
                <td className="px-3 py-2 text-[#14213D]">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span>{c.nome}</span>
                    {c.categorias.map((catId) => (
                      <CategoryBadge key={catId} categoryId={catId} />
                    ))}
                  </div>
                </td>
                <td className="px-3 py-2 text-right font-mono text-[#5B6472]">{c.notaObjetiva.toFixed(2)}</td>
                <td className="px-3 py-2 text-right font-mono text-[#5B6472]">{c.notaDiscursiva.toFixed(2)}</td>
                <td className="px-3 py-2 text-right font-mono text-[#5B6472]">{c.notaTitulos.toFixed(2)}</td>
                <td className="px-3 py-2 text-right font-mono font-medium text-[#14213D]">{c.notaFinal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[11px] text-[#9B968A]">
        Base: item 2.1.2 do Edital nº 12 – Telebras, de 23/06/2026. Resultado final homologado — não cabe recurso.
      </p>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  const config = useMemo(() => {
    if (label.includes("Média")) {
      return {
        icon: BarChart3,
        accent: "#3B6FA0",
        bg: "#EDF2F7",
        border: "#B8C9DC",
      };
    }
    if (label.includes("Maior")) {
      return {
        icon: Trophy,
        accent: "#A9822F",
        bg: "#FBF6EA",
        border: "#E6D6B5",
      };
    }
    return {
      icon: Users,
      accent: "#2F6B4F",
      bg: "#EAF2ED",
      border: "#A9C7B6",
    };
  }, [label]);

  const { icon: Icon, accent, bg, border } = config;

  return (
    <div
      className="relative overflow-hidden rounded-xl p-4"
      style={{ background: bg, border: `1px solid ${border}` }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: accent }} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-wide" style={{ color: accent }}>{label}</p>
          <p className="font-mono text-3xl text-[#14213D] mt-1.5">{value}</p>
        </div>
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center bg-white"
          style={{ color: accent, border: `1px solid ${border}` }}
        >
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   APP
   ========================================================================== */

function App() {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0].id);

  return (
    <div className="min-h-screen bg-[#F7F4EC]" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Masthead */}
        <header className="border-b-2 border-[#14213D] pb-6 mb-8">
          <div className="flex items-center gap-2 text-[#A9822F] mb-2">
            <ShieldCheck size={18} />
            <span className="text-[11px] uppercase tracking-[0.15em] font-medium">{CONTEST.org}</span>
          </div>
          <h1
            className="text-[32px] leading-tight text-[#14213D]"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            Resultado — {CONTEST.role}
          </h1>
          <p className="text-[13px] text-[#5B6472] mt-1">{CONTEST.edital}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {(() => {
              const list = CANDIDATES[activeCategory] || [];
              const catLabel = CATEGORIES.find((c) => c.id === activeCategory)?.label ?? "";
              const shortLabel =
                activeCategory === "ac" ? "AC" : activeCategory === "pp" ? "PP" : activeCategory === "pcd" ? "PcD" : catLabel;
              const notas = list.map((c) => c.notaFinal);
              const media = notas.length ? notas.reduce((a, b) => a + b, 0) / notas.length : 0;
              const maior = notas.length ? Math.max(...notas) : 0;
              const homologados = list.length;
              return (
                <>
                  <StatCard label={`Média (${shortLabel})`} value={media.toFixed(2)} />
                  <StatCard label="Maior nota" value={maior.toFixed(2)} />
                  <StatCard label="Homologados" value={String(homologados)} />
                </>
              );
            })()}
          </div>
        </header>

        {/* Phase timeline */}
        <section className="mb-10">
          <h2 className="text-[13px] uppercase tracking-wide text-[#5B6472] mb-5 flex items-center gap-2">
            <Award size={14} className="text-[#A9822F]" /> Andamento das fases
          </h2>
          <div className="relative">
            <div className="absolute top-7 left-7 right-7 h-px bg-[repeating-linear-gradient(90deg,#C7C2B4_0,#C7C2B4_6px,transparent_6px,transparent_12px)]" />
            <div
              className="grid gap-2 relative"
              style={{ gridTemplateColumns: `repeat(${PHASES.length}, minmax(0, 1fr))` }}
            >
              {PHASES.map((phase) => (
                <PhaseStamp key={phase.id} phase={phase} />
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-[#5B6472]">
            <span className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#2F9F5E" }} />
              <strong className="text-[#14213D] font-medium">Vagas Imediatas</strong>
              <span className="text-[#7A7566]">— dentro do limite por modalidade</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#E89B2A" }} />
              <strong className="text-[#14213D] font-medium">Cadastro de Reserva</strong>
              <span className="text-[#7A7566]">— posições seguintes, até o dobro das vagas</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#B8B3A3" }} />
              <strong className="text-[#14213D] font-medium">Fora da estimativa</strong>
            </span>
          </div>
        </section>

        {/* Homologation banner */}
        <div className="bg-[#EAF2ED] border border-[#A9C7B6] text-[#2F6B4F] text-[13px] rounded-lg px-4 py-3 mb-10 flex items-center gap-2">
          <CheckCircle2 size={16} className="shrink-0" />
          {ALERT_TEXT}
        </div>

        {/* Modality tiles */}
        <section className="mb-10">
          <h2 className="text-[13px] uppercase tracking-wide text-[#5B6472] mb-4">
            Homologados por modalidade
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CATEGORIES.map((cat) => (
              <QuotaCard
                key={cat.id}
                category={cat}
                selected={activeCategory === cat.id}
                onSelect={setActiveCategory}
              />
            ))}
          </div>
          <p className="mt-3 text-[11px] text-[#9B968A] max-w-2xl">{QUOTA_BASE_NOTE}</p>
        </section>

        {/* Classification table */}
        <section>
          <h2 className="text-[13px] uppercase tracking-wide text-[#5B6472] mb-4">Classificação</h2>
          <ClassificationTable activeCategory={activeCategory} onChangeCategory={setActiveCategory} />
        </section>

        <footer className="mt-12 pt-6 border-t border-[#E4DFD0] text-center">
          <p className="text-[11px] text-[#9B968A]">{CONTEST.devBy}</p>
        </footer>
      </div>
    </div>
  );
}
