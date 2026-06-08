"use client";

import { useState, useEffect } from "react";

const STATUS_OPTIONS = [
  "Novo",
  "Contatado",
  "Fechado",
  "Perdido",
  "Aguardando aviso",
];
const FILTER_OPTIONS = ["Todos", ...STATUS_OPTIONS];

type Solicitacao = {
  id: string;
  nome: string;
  whatsapp: string;
  cidade: string;
  curso: string;
  status: string;
  data: string;
};

const inputClasses =
  "h-12 w-full rounded-xl border border-[#1F3A5F] bg-[#101820] px-4 text-base font-medium text-white outline-none transition focus:border-[#1FAF8F] placeholder:text-[#D7DEE8]/35";

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const expected = process.env.NEXT_PUBLIC_SOLICITACOES_PASSWORD;
    if (senha === expected) {
      localStorage.setItem("solicitacoes_auth", "1");
      onLogin();
    } else {
      setError(true);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0D0D0D] px-5">
      <div className="w-full max-w-sm rounded-[28px] border border-[#1FAF8F]/30 bg-[#0A2540] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#1FAF8F]">
          Acesso restrito
        </p>
        <h1 className="mt-3 text-2xl font-black text-white">Solicitações</h1>
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <input
            type="password"
            required
            placeholder="Senha"
            value={senha}
            onChange={(e) => {
              setSenha(e.target.value);
              setError(false);
            }}
            className={inputClasses}
          />
          {error && (
            <p className="text-sm font-semibold text-[#FF8C8C]">
              Senha incorreta.
            </p>
          )}
          <button
            type="submit"
            className="inline-flex h-[52px] items-center justify-center rounded-full bg-[#1FAF8F] px-7 text-sm font-extrabold text-[#06131f] transition hover:bg-[#34d1ad]"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}

export default function SolicitacoesPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Solicitacao[]>([]);
  const [filter, setFilter] = useState("Todos");

  useEffect(() => {
    function checkAuth() {
      setIsAuth(localStorage.getItem("solicitacoes_auth") === "1");
      setAuthChecked(true);
    }
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuth) return;

    async function loadData() {
      setLoading(true);
      try {
        const r = await fetch("/api/solicitacoes/list");
        const d = await r.json();
        setData(Array.isArray(d) ? d : []);
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    void loadData();
  }, [isAuth]);

  function handleLogout() {
    localStorage.removeItem("solicitacoes_auth");
    setIsAuth(false);
    setData([]);
  }

  async function handleStatusChange(id: string, status: string) {
    setData((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s)),
    );
    await fetch("/api/solicitacoes/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  }

  if (!authChecked) return null;
  if (!isAuth) return <LoginForm onLogin={() => setIsAuth(true)} />;

  const filtered =
    filter === "Todos" ? data : data.filter((s) => s.status === filter);

  const total = data.length;
  const novos = data.filter((s) => s.status === "Novo").length;
  const contatados = data.filter((s) => s.status === "Contatado").length;
  const fechados = data.filter((s) => s.status === "Fechado").length;

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0D0D0D]/88 px-5 py-4 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-5">
          <div className="flex items-baseline gap-3">
            <span className="text-base font-extrabold tracking-wide">
              Marcelo <span className="text-[#1FAF8F]">Félix</span>
            </span>
            <span className="text-sm font-semibold text-[#D7DEE8]/50">
              / Solicitações
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-[#D7DEE8]/50 transition hover:text-[#1FAF8F]"
          >
            Sair
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total", value: total },
            { label: "Novos", value: novos },
            { label: "Contatados", value: contatados },
            { label: "Fechados", value: fechados },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-[#1F3A5F] bg-[#0A2540]/55 p-6"
            >
              <p className="text-sm font-semibold text-[#D7DEE8]/70">
                {m.label}
              </p>
              <p className="mt-2 text-4xl font-black text-white">{m.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                filter === option
                  ? "bg-[#1FAF8F] text-[#06131f]"
                  : "border border-[#1F3A5F] text-[#D7DEE8] hover:border-[#1FAF8F]/60"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {loading ? (
            <p className="py-20 text-center text-[#D7DEE8]/60">
              Carregando...
            </p>
          ) : filtered.length === 0 ? (
            <p className="py-20 text-center text-[#D7DEE8]/60">
              Nenhuma solicitação ainda.
            </p>
          ) : (
            <div className="grid gap-3">
              {filtered.map((s) => (
                <div
                  key={s.id}
                  className="rounded-2xl border border-[#1F3A5F] bg-[#101820] p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="grid flex-1 gap-1">
                      <p className="text-lg font-extrabold text-white">
                        {s.nome}
                      </p>
                      <p className="text-sm font-semibold text-[#1FAF8F]">
                        {s.curso}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#D7DEE8]/80">
                        {s.cidade && <span>{s.cidade}</span>}
                        <a
                          href={`https://wa.me/55${s.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#34d1ad] underline-offset-2 hover:underline"
                        >
                          {s.whatsapp}
                        </a>
                        <span className="text-[#D7DEE8]/45">{s.data}</span>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <select
                        value={s.status}
                        onChange={(e) =>
                          handleStatusChange(s.id, e.target.value)
                        }
                        className="h-10 cursor-pointer rounded-xl border border-[#1F3A5F] bg-[#0A2540] px-3 text-sm font-bold text-white outline-none transition focus:border-[#1FAF8F]"
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
