import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  ShieldCheck,
  Circle,
  CheckCircle2,
  Clock3,
  ChevronUp,
  ChevronDown,
  Award,
  Upload,
  Download,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import {
  DEFAULT_DATA,
  loadData,
  saveData,
  clearData,
  parseUploadedFile,
  type ContestData,
  type Phase,
  type Category,
  type Candidate,
} from "@/lib/contestData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Resultado Telebras — Analista de TI (Brasília/DF)" },
      {
        name: "description",
        content:
          "Resultado final homologado do concurso Telebras — Especialista em Gestão de Telecomunicações, Analista de TI (Brasília/DF), Edital nº 12 de 23/06/2026.",
      },
      { property: "og:title", content: "Resultado Telebras — Analista de TI (Brasília/DF)" },
      {
        property: "og:description",
        content:
          "Resultado final homologado do concurso Telebras — Especialista em Gestão de Telecomunicações, Analista de TI (Brasília/DF), Edital nº 12 de 23/06/2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

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
      <p className={["mt-1 text-[11px] max-w-[9rem]", isDone ? "text-[#2F6B4F]" : "text-[#9B968A]"].join(" ")}>
        {phase.note}
      </p>
    </div>
  );
}

function QuotaCard({ category, candidates }: { category: Category; candidates: Candidate[] }) {
  const best = candidates.length ? Math.max(...candidates.map((c) => c.notaFinal)) : 0;
  return (
    <div className="bg-[#FBF9F3] border border-[#E4DFD0] rounded-lg p-4 relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A9822F]" />
      <p className="text-[11px] uppercase tracking-wide text-[#5B6472] pl-2">{category.label}</p>
      <p className="pl-2 mt-1 font-mono text-3xl text-[#14213D]">{category.classificados}</p>
      <p className="pl-2 text-[12px] text-[#5B6472]">homologados</p>
      <div className="pl-2 mt-3 pt-3 border-t border-[#E4DFD0] flex items-baseline justify-between">
        <span className="text-[11px] text-[#5B6472]">1º lugar</span>
        <span className="font-mono text-sm text-[#14213D]">{best.toFixed(2)}</span>
      </div>
    </div>
  );
}

function ClassificationTable({ data }: { data: ContestData }) {
  const [activeTab, setActiveTab] = useState<string>(data.categories[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    if (!data.categories.find((c) => c.id === activeTab)) {
      setActiveTab(data.categories[0]?.id ?? "");
    }
  }, [data.categories, activeTab]);

  const rawList = data.candidates[activeTab] ?? [];
  const sorted = useMemo(
    () => [...rawList].sort((a, b) => (sortDir === "desc" ? b.notaFinal - a.notaFinal : a.notaFinal - b.notaFinal)),
    [rawList, sortDir],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter((c) => c.nome.toLowerCase().includes(q) || c.inscricao.includes(q));
  }, [sorted, query]);

  const categoryLabel = (id: string) => data.categories.find((c) => c.id === id)?.label ?? id;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {data.categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={[
              "px-3 py-1.5 text-[13px] rounded-md border transition-colors",
              activeTab === cat.id
                ? "bg-[#14213D] text-[#F7F4EC] border-[#14213D]"
                : "bg-transparent text-[#5B6472] border-[#E4DFD0] hover:border-[#A9822F]",
            ].join(" ")}
          >
            {cat.label}
          </button>
        ))}
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
          Exibindo {filtered.length} de {rawList.length} candidatos em {categoryLabel(activeTab)}
        </p>
      </div>

      <div className="border border-[#E4DFD0] rounded-lg overflow-hidden">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="bg-[#F1ECDF] text-[#5B6472] text-left">
              <th className="px-3 py-2 font-medium w-14">Pos.</th>
              <th className="px-3 py-2 font-medium">Inscrição</th>
              <th className="px-3 py-2 font-medium">Nome</th>
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
              <tr key={`${c.inscricao}-${i}`} className={i % 2 === 0 ? "bg-white" : "bg-[#FBF9F3]"}>
                <td className="px-3 py-2 font-mono text-[#5B6472]">{c.posicao}º</td>
                <td className="px-3 py-2 font-mono text-[#14213D]">{c.inscricao}</td>
                <td className="px-3 py-2 text-[#14213D]">
                  {c.nome}
                  {c.categorias && c.categorias.length > 0 && (
                    <span className="ml-2 text-[10px] text-[#A9822F]">
                      também em {c.categorias.map(categoryLabel).join(", ")}
                    </span>
                  )}
                </td>
                <td className="px-3 py-2 text-right font-mono text-[#5B6472]">{c.notaTitulos.toFixed(2)}</td>
                <td className="px-3 py-2 text-right font-mono font-medium text-[#14213D]">{c.notaFinal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[11px] text-[#9B968A]">
        Base: {data.contest.edital}. Resultado final homologado — não cabe recurso.
      </p>
    </div>
  );
}

function UploadPanel({
  onLoad,
  onReset,
  data,
}: {
  onLoad: (d: ContestData) => void;
  onReset: () => void;
  data: ContestData;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<{ kind: "idle" | "success" | "error"; msg: string }>({
    kind: "idle",
    msg: "",
  });

  async function handleFile(file: File) {
    try {
      const text = await file.text();
      const parsed = parseUploadedFile(text, file.name);
      onLoad(parsed);
      const total = Object.values(parsed.candidates).reduce((n, arr) => n + arr.length, 0);
      setStatus({
        kind: "success",
        msg: `Carregado: ${parsed.phases.length} fases, ${parsed.categories.length} modalidades, ${total} candidatos.`,
      });
    } catch (err) {
      setStatus({ kind: "error", msg: (err as Error).message });
    }
  }

  function handleDownloadTemplate() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "telebras-dados.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="mb-10 border border-[#E4DFD0] bg-white rounded-lg p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-[13px] uppercase tracking-wide text-[#5B6472] flex items-center gap-2">
            <Upload size={14} className="text-[#A9822F]" /> Atualizar dados do sistema
          </h2>
          <p className="text-[12px] text-[#5B6472] mt-1 max-w-xl">
            Envie um arquivo <code className="font-mono">.json</code>,{" "}
            <code className="font-mono">.js</code>, <code className="font-mono">.ts</code>,{" "}
            <code className="font-mono">.jsx</code> ou <code className="font-mono">.tsx</code> contendo
            as constantes <code className="font-mono">CONTEST</code>, <code className="font-mono">PHASES</code>,{" "}
            <code className="font-mono">CATEGORIES</code> e <code className="font-mono">CANDIDATES</code>. As fases,
            modalidades e a classificação serão atualizadas automaticamente.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <input
            ref={inputRef}
            type="file"
            accept=".json,.js,.ts,.jsx,.tsx,application/json,text/plain"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = "";
            }}
          />
          <button
            onClick={() => inputRef.current?.click()}
            className="px-3 py-1.5 text-[13px] rounded-md bg-[#14213D] text-[#F7F4EC] hover:bg-[#0e1930] flex items-center gap-2"
          >
            <Upload size={14} /> Enviar arquivo
          </button>
          <button
            onClick={handleDownloadTemplate}
            className="px-3 py-1.5 text-[13px] rounded-md border border-[#E4DFD0] text-[#14213D] hover:border-[#A9822F] flex items-center gap-2"
          >
            <Download size={14} /> Baixar template
          </button>
          <button
            onClick={() => {
              onReset();
              setStatus({ kind: "success", msg: "Dados restaurados para o padrão." });
            }}
            className="px-3 py-1.5 text-[13px] rounded-md border border-[#E4DFD0] text-[#5B6472] hover:border-[#A9822F] flex items-center gap-2"
          >
            <RotateCcw size={14} /> Restaurar padrão
          </button>
        </div>
      </div>
      {status.kind !== "idle" && (
        <div
          className={[
            "mt-4 text-[12px] rounded-md px-3 py-2 flex items-start gap-2",
            status.kind === "success"
              ? "bg-[#EAF2ED] text-[#2F6B4F] border border-[#A9C7B6]"
              : "bg-[#FBEAEA] text-[#8A2F2F] border border-[#E0B4B4]",
          ].join(" ")}
        >
          {status.kind === "success" ? (
            <CheckCircle2 size={14} className="shrink-0 mt-0.5" />
          ) : (
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
          )}
          <span>{status.msg}</span>
        </div>
      )}
    </section>
  );
}

function Index() {
  const [data, setData] = useState<ContestData>(DEFAULT_DATA);

  useEffect(() => {
    setData(loadData());
  }, []);

  const handleLoad = (d: ContestData) => {
    setData(d);
    saveData(d);
  };
  const handleReset = () => {
    clearData();
    setData(DEFAULT_DATA);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EC]" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <header className="border-b-2 border-[#14213D] pb-6 mb-8">
          <div className="flex items-center gap-2 text-[#A9822F] mb-2">
            <ShieldCheck size={18} />
            <span className="text-[11px] uppercase tracking-[0.15em] font-medium">{data.contest.org}</span>
          </div>
          <h1
            className="text-[32px] leading-tight text-[#14213D]"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            Resultado — {data.contest.role}
          </h1>
          <p className="text-[13px] text-[#5B6472] mt-1">{data.contest.edital}</p>

          <div className="grid grid-cols-3 gap-4 mt-6">
            {data.contest.stats.map((s) => (
              <div key={s.label} className="border-l-2 border-[#E4DFD0] pl-3">
                <p className="text-[11px] uppercase tracking-wide text-[#5B6472]">{s.label}</p>
                <p className="font-mono text-2xl text-[#14213D] mt-0.5">{s.value}</p>
              </div>
            ))}
          </div>
        </header>

        <UploadPanel onLoad={handleLoad} onReset={handleReset} data={data} />

        <section className="mb-10">
          <h2 className="text-[13px] uppercase tracking-wide text-[#5B6472] mb-5 flex items-center gap-2">
            <Award size={14} className="text-[#A9822F]" /> Andamento das fases
          </h2>
          <div className="relative">
            <div className="absolute top-7 left-7 right-7 h-px bg-[repeating-linear-gradient(90deg,#C7C2B4_0,#C7C2B4_6px,transparent_6px,transparent_12px)]" />
            <div
              className="grid gap-2 relative"
              style={{ gridTemplateColumns: `repeat(${data.phases.length}, minmax(0, 1fr))` }}
            >
              {data.phases.map((phase) => (
                <PhaseStamp key={phase.id} phase={phase} />
              ))}
            </div>
          </div>
        </section>

        <div className="bg-[#EAF2ED] border border-[#A9C7B6] text-[#2F6B4F] text-[13px] rounded-lg px-4 py-3 mb-10 flex items-center gap-2">
          <CheckCircle2 size={16} className="shrink-0" />
          {data.alertText}
        </div>

        <section className="mb-10">
          <h2 className="text-[13px] uppercase tracking-wide text-[#5B6472] mb-4">Homologados por modalidade</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {data.categories.map((cat) => (
              <QuotaCard key={cat.id} category={cat} candidates={data.candidates[cat.id] ?? []} />
            ))}
          </div>
          <p className="mt-3 text-[11px] text-[#9B968A] max-w-2xl">{data.quotaBaseNote}</p>
        </section>

        <section>
          <h2 className="text-[13px] uppercase tracking-wide text-[#5B6472] mb-4">Classificação</h2>
          <ClassificationTable data={data} />
        </section>

        <footer className="mt-12 pt-6 border-t border-[#E4DFD0] text-center">
          <p className="text-[11px] text-[#5B6472]">{data.contest.homologadoPor}</p>
          <p className="text-[11px] text-[#9B968A] mt-1">{data.contest.devBy}</p>
        </footer>
      </div>
    </div>
  );
}
