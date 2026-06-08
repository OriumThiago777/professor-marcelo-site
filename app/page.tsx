"use client";

import { useState } from "react";
import Image from "next/image";

const WHATSAPP_URL =
  "https://wa.me/5531991207009?text=Olá,%20gostaria%20de%20solicitar%20uma%20proposta%20de%20treinamento%20com%20o%20Professor%20Marcelo%20Félix";
const INSTAGRAM_URL = "https://www.instagram.com/prof.marcelofelix";

const navItems = [
  { label: "Cursos", href: "#cursos" },
  { label: "Atuação", href: "#atuacao" },
  { label: "Metodologia", href: "#metodologia" },
  { label: "Reconhecimento", href: "#reconhecimento" },
  { label: "Avisos", href: "#avisos" },
  { label: "Contato", href: "#contato" },
];

const heroBadges = [
  "Mais de 17 anos na prática",
  "SAMU 192 e Cruz Vermelha",
  "Instrutor e professor",
  "Formação prática para situações críticas",
];

const authorityItems = [
  {
    title: "Formação",
    text: "Clareza no que importa.",
  },
  {
    title: "Prática",
    text: "Experiência aplicada.",
  },
  {
    title: "Segurança",
    text: "Confiança em momentos críticos.",
  },
  {
    title: "Resultado",
    text: "Preparo real para ação.",
  },
];

const trainingCards = [
  "Primeiros socorros",
  "Suporte básico e avançado de vida",
  "Capacitações para equipes e empresas",
  "Palestras institucionais",
  "Urgência e emergência",
  "Educação continuada em saúde",
];

const emergencySteps = [
  "Reconhecer a cena.",
  "Avaliar riscos.",
  "Decidir o que fazer primeiro.",
  "Agir com técnica e responsabilidade.",
];

const audienceItems = [
  "Instituições de ensino",
  "Cursos técnicos e superiores",
  "Eventos acadêmicos",
  "Hospitais e clínicas",
  "Empresas e organizações",
  "Equipes da área da saúde",
  "Projetos de formação profissional",
  "Treinamentos in company",
];

const courseCategories = [
  {
    title: "Primeiros Socorros e Suporte à Vida",
    courses: [
      "Primeiros Socorros",
      "Primeiros Socorros — Lei Lucas",
      "Suporte Básico de Vida e Uso do Desfibrilador",
    ],
  },
  {
    title: "Urgência e Emergência",
    courses: [
      "Urgência e Emergência",
      "Emergências Clínicas",
      "Emergências Geriátricas",
      "Emergências Pediátricas",
      "Atendimento Inicial ao Politraumatizado",
    ],
  },
  {
    title: "Procedimentos Técnicos",
    courses: [
      "Acessos Difíceis",
      "Acessos Venosos Guiados por Ultrassom",
      "Manejo de Vias Aéreas e Dispositivos de Oxigenação",
      "Punção Intraóssea",
      "Sutura para Enfermeiros",
      "Punção Intra-Arterial e Instalação de PIA",
      "PICC",
      "Avaliação Básica de ECG",
      "Administração de Injetáveis",
    ],
  },
  {
    title: "Formação Complementar",
    courses: ["Cuidador de Idosos"],
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#1FAF8F]">
      {children}
    </p>
  );
}

function ArrowIcon() {
  return (
    <span
      aria-hidden="true"
      className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1FAF8F] text-[#06131f]"
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
        <path
          d="M5 10h10m0 0-4-4m4 4-4 4"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </span>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <rect
        width="16"
        height="16"
        x="4"
        y="4"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

const inputClasses =
  "h-12 rounded-xl border border-[#1F3A5F] bg-[#101820] px-4 text-base font-medium text-white outline-none transition focus:border-[#1FAF8F] placeholder:text-[#D7DEE8]/35";

function CourseInterestForm({
  initialCourse,
  onClose,
  onSuccess,
}: {
  initialCourse: string;
  onClose: () => void;
  onSuccess: (whatsappUrl: string) => void;
}) {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [cidade, setCidade] = useState("");
  const [curso, setCurso] = useState(initialCourse);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/solicitacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, whatsapp, cidade, curso }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error("request-failed");
      }

      onSuccess(data.whatsappUrl as string);
    } catch {
      setError(
        "Não foi possível enviar sua solicitação agora. Tente novamente em instantes.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/70 px-5 py-10 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mx-4 w-full max-w-lg overflow-hidden rounded-[28px] border border-[#1FAF8F]/30 bg-[#0A2540] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#D7DEE8] transition hover:border-[#1FAF8F]/60 hover:text-[#1FAF8F]"
          >
            ✕
          </button>
        </div>

        <p className="mt-2 text-sm font-bold uppercase tracking-[0.22em] text-[#1FAF8F]">
          Tenho interesse
        </p>
        <h3 className="mt-3 text-2xl font-black leading-tight text-white">
          Solicitar proposta
        </h3>
        <p className="mt-3 text-sm leading-6 text-[#D7DEE8]/80">
          Preencha seus dados e fale direto com Marcelo pelo WhatsApp.
        </p>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-semibold text-[#D7DEE8]">
            Nome
            <input
              type="text"
              required
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              className={inputClasses}
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[#D7DEE8]">
            WhatsApp
            <input
              type="text"
              required
              placeholder="31999998888"
              value={whatsapp}
              onChange={(event) => setWhatsapp(event.target.value)}
              className={inputClasses}
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[#D7DEE8]">
            Cidade
            <input
              type="text"
              required
              value={cidade}
              onChange={(event) => setCidade(event.target.value)}
              className={inputClasses}
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[#D7DEE8]">
            Curso de interesse
            <select
              required
              value={curso}
              onChange={(event) => setCurso(event.target.value)}
              className={inputClasses}
            >
              {courseCategories.map((category) => (
                <optgroup key={category.title} label={category.title}>
                  {category.courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>

          {error && (
            <p className="text-sm font-semibold text-[#FF8C8C]">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 inline-flex h-[52px] items-center justify-center rounded-full bg-[#1FAF8F] px-7 text-sm font-extrabold text-[#06131f] transition hover:bg-[#34d1ad] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Enviando..." : "Solicitar proposta"}
          </button>
        </form>
      </div>
    </div>
  );
}

function NotifyMeForm() {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [curso, setCurso] = useState("Qualquer curso");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/solicitacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, whatsapp, cidade: "", curso }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error("request-failed");
      }

      setSubmitted(true);
    } catch {
      setError(
        "Não foi possível enviar agora. Tente novamente em instantes.",
      );
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <p className="mt-10 max-w-xl rounded-2xl border border-[#1FAF8F]/30 bg-[#0D0D0D]/45 p-6 text-lg font-bold text-white">
        Anotado! Você será avisado quando o curso abrir.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-2"
    >
      <label className="grid gap-2 text-sm font-semibold text-[#D7DEE8]">
        Nome
        <input
          type="text"
          required
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          className={inputClasses}
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-[#D7DEE8]">
        WhatsApp
        <input
          type="text"
          required
          placeholder="31999998888"
          value={whatsapp}
          onChange={(event) => setWhatsapp(event.target.value)}
          className={inputClasses}
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-[#D7DEE8] sm:col-span-2">
        Curso de interesse
        <select
          required
          value={curso}
          onChange={(event) => setCurso(event.target.value)}
          className={inputClasses}
        >
          <option value="Qualquer curso">Qualquer curso</option>
          {courseCategories.map((category) => (
            <optgroup key={category.title} label={category.title}>
              {category.courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>

      {error && (
        <p className="text-sm font-semibold text-[#FF8C8C] sm:col-span-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex h-[52px] w-full items-center justify-center rounded-full bg-[#1FAF8F] px-7 text-sm font-extrabold text-[#06131f] transition hover:bg-[#34d1ad] disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2 sm:w-auto"
      >
        {isSubmitting ? "Enviando..." : "Me avisa"}
      </button>
    </form>
  );
}

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  function handleRequestSuccess(whatsappUrl: string) {
    setSelectedCourse(null);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setConfirmation(
      "Solicitação enviada! Abrimos o WhatsApp para você falar com Marcelo.",
    );
    window.setTimeout(() => setConfirmation(null), 3000);
  }

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0D0D0D]/88 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
          <a href="#" className="text-base font-extrabold tracking-wide">
            Marcelo <span className="text-[#1FAF8F]">Félix</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-[#D7DEE8] md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-[#1FAF8F]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={WHATSAPP_URL}
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#1FAF8F] px-5 text-sm font-extrabold text-[#06131f] transition hover:bg-[#34d1ad]"
          >
            Fale comigo
          </a>
        </div>
      </header>

      <section className="relative isolate overflow-hidden px-5 pb-16 pt-10 sm:px-8 lg:px-12 lg:pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_18%,rgba(31,175,143,0.2),transparent_30%),linear-gradient(135deg,#0D0D0D_0%,#0A2540_58%,#08131f_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#1FAF8F]/70 to-transparent" />

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
          <div className="pt-8 lg:pt-16">
            <SectionLabel>Urgência, emergência e formação em saúde</SectionLabel>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Professor Marcelo Félix
            </h1>
            <p className="mt-6 max-w-2xl text-2xl font-bold leading-tight text-[#D7DEE8] sm:text-3xl">
              Especialista em urgência e emergência.
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#D7DEE8]/85">
              Treinamentos, palestras e formações em saúde para instituições,
              equipes e profissionais que precisam agir com preparo, segurança
              e responsabilidade.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={WHATSAPP_URL}
                className="inline-flex h-[52px] items-center justify-center rounded-full bg-[#1FAF8F] px-7 text-sm font-extrabold text-[#06131f] transition hover:bg-[#34d1ad]"
              >
                Solicitar proposta
              </a>
              <a
                href="#atuacao"
                className="inline-flex h-[52px] items-center justify-center rounded-full border border-[#1FAF8F]/60 px-7 text-sm font-bold text-white transition hover:bg-[#1FAF8F]/10"
              >
                Conhecer treinamentos
              </a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {heroBadges.map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-[#D7DEE8]"
                >
                  <span className="h-2 w-2 rounded-full bg-[#1FAF8F]" />
                  {badge}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-8 hidden h-36 w-36 rounded-full border border-[#1FAF8F]/30 lg:block" />
            <div className="absolute -right-6 bottom-20 hidden h-44 w-44 rounded-full border border-white/10 lg:block" />
            <div className="relative overflow-hidden rounded-[32px] border border-[#1FAF8F]/30 bg-[#071522] shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
              <Image
                src="/marcelo-hero.png"
                alt="Professor Marcelo Félix em registro profissional"
                width={940}
                height={1160}
                priority
                className="h-[560px] w-full object-cover object-top opacity-95 sm:h-[680px] lg:h-[760px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-[#0D0D0D]/70 p-5 backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1FAF8F]">
                  Formação prática
                </p>
                <p className="mt-2 text-lg font-extrabold text-white">
                  Técnica, critério e ação para cenários críticos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#081827] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {authorityItems.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[#1F3A5F] bg-[#0A2540]/55 p-6"
            >
              <h2 className="text-2xl font-black text-white">{item.title}</h2>
              <p className="mt-2 text-sm font-medium text-[#D7DEE8]/80">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="cursos" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <SectionLabel>Cursos</SectionLabel>
            <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Formação especializada para cada etapa do cuidado.
            </h2>
          </div>

          <div className="mt-12 space-y-12">
            {courseCategories.map((category) => (
              <div key={category.title}>
                <h3 className="text-xl font-extrabold text-[#1FAF8F]">
                  {category.title}
                </h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {category.courses.map((course) => (
                    <article
                      key={course}
                      className="flex flex-col justify-between gap-6 rounded-2xl border border-[#1F3A5F] bg-[#101820] p-6 transition hover:border-[#1FAF8F]/70 hover:bg-[#102437]"
                    >
                      <h4 className="text-lg font-extrabold leading-snug text-white">
                        {course}
                      </h4>
                      <button
                        type="button"
                        onClick={() => setSelectedCourse(course)}
                        className="inline-flex h-11 items-center justify-center self-start rounded-full bg-[#1FAF8F] px-5 text-sm font-extrabold text-[#06131f] transition hover:bg-[#34d1ad]"
                      >
                        Tenho interesse
                      </button>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="atuacao" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <SectionLabel>Atuação</SectionLabel>
              <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                Treinamentos e palestras em saúde
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-[#D7DEE8]/85">
              Capacitações para equipes, instituições e profissionais que
              desejam transformar conhecimento em ação segura.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {trainingCards.map((card) => (
                <article
                  key={card}
                  className="group rounded-2xl border border-[#1F3A5F] bg-[#101820] p-6 transition hover:border-[#1FAF8F]/70 hover:bg-[#102437]"
                >
                  <div className="mb-8 h-10 w-10 rounded-xl border border-[#1FAF8F]/40 bg-[#1FAF8F]/10" />
                  <h3 className="text-xl font-extrabold text-white">{card}</h3>
                  <div className="mt-5 h-px w-full bg-gradient-to-r from-[#1FAF8F]/60 to-transparent" />
                </article>
              ))}
            </div>
            <div className="relative min-h-[430px] overflow-hidden rounded-[28px] border border-white/10">
              <Image
                src="/marcelo-treinamento.png"
                alt="Treinamento em saúde conduzido por Marcelo Félix"
                width={920}
                height={1040}
                className="h-full min-h-[430px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/25 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0A2540] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div>
            <SectionLabel>Preparo para agir</SectionLabel>
            <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Rapidez não é pressa.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#D7DEE8]/85">
              Em situações de emergência, agir rápido importa, mas agir certo
              importa mais ainda. O treinamento prepara pessoas para reconhecer
              sinais críticos, tomar decisões e agir com segurança.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {emergencySteps.map((step, index) => (
              <article
                key={step}
                className="rounded-2xl border border-[#1FAF8F]/25 bg-[#0D0D0D]/45 p-6"
              >
                <span className="text-sm font-black text-[#1FAF8F]">
                  0{index + 1}
                </span>
                <h3 className="mt-8 text-2xl font-black leading-tight">
                  {step}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="metodologia"
        className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionLabel>Metodologia prática</SectionLabel>
            <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Ensino claro, prático e conectado à realidade.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#D7DEE8]/85">
              A metodologia de Marcelo valoriza explicação acessível,
              demonstração prática, participação dos alunos e conexão direta
              com situações reais. O objetivo não é apenas transmitir conteúdo,
              mas criar compreensão, segurança e preparo.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <figure className="relative overflow-hidden rounded-[28px] border border-[#1F3A5F] sm:translate-y-10">
              <Image
                src="/marcelo-treinamento.png"
                alt="Demonstração prática em treinamento de emergência"
                width={760}
                height={920}
                className="h-[460px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
              <figcaption className="absolute bottom-5 left-5 text-sm font-bold text-[#D7DEE8]">
                Demonstração técnica
              </figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-[28px] border border-[#1F3A5F]">
              <Image
                src="/marcelo-aula-pratica.jpeg"
                alt="Aula prática na área da saúde"
                width={760}
                height={920}
                className="h-[460px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
              <figcaption className="absolute bottom-5 left-5 text-sm font-bold text-[#D7DEE8]">
                Cenários reais
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-[#081827] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <SectionLabel>Palestras e eventos</SectionLabel>
            <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Leve essa experiência para sua instituição.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#D7DEE8]/85">
              Para instituições, hospitais, empresas, cursos e eventos que
              precisam de equipes preparadas para agir melhor quando cada
              segundo importa.
            </p>
            <a
              href={WHATSAPP_URL}
              className="mt-8 inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#1FAF8F] px-6 text-sm font-extrabold text-[#06131f] transition hover:bg-[#34d1ad]"
            >
              Fale com Marcelo
              <ArrowIcon />
            </a>
          </div>
          <div className="relative overflow-hidden rounded-[28px] border border-white/10">
            <Image
              src="/marcelo-palestra.png"
              alt="Marcelo Félix em palestra para público institucional"
              width={900}
              height={680}
              className="h-[430px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 to-transparent" />
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[28px] border border-[#1FAF8F]/25">
            <Image
              src="/marcelo-sobre.png"
              alt="Marcelo Félix em contexto profissional"
              width={920}
              height={1040}
              className="h-[540px] w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-transparent to-transparent" />
          </div>
          <div>
            <SectionLabel>Sobre Marcelo</SectionLabel>
            <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Experiência real. Ensino que salva vidas.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#D7DEE8]/85">
              Marcelo Félix atua na formação de profissionais e equipes para
              situações de urgência e emergência. Sua atuação é baseada na
              prática real, com foco na tomada de decisão em cenários críticos.
              Como professor e instrutor, une vivência de campo, didática clara
              e compromisso com a formação de pessoas mais preparadas.
            </p>
          </div>
        </div>
      </section>

      <section
        id="reconhecimento"
        className="bg-[#0A2540] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <SectionLabel>Reconhecimento e trajetória</SectionLabel>
              <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                Credibilidade construída na prática.
              </h2>
            </div>
            <p className="text-lg leading-8 text-[#D7DEE8]/85">
              A trajetória de Marcelo é marcada por atuação em espaços de
              formação, eventos técnicos e reconhecimento institucional. Seu
              trabalho reforça o compromisso com a educação em saúde e com a
              formação de profissionais mais preparados.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10">
              <Image
                src="/marcelo-congresso.jpeg"
                alt="Marcelo Félix em congresso profissional"
                width={900}
                height={620}
                className="h-[390px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
            </div>
            <div className="relative overflow-hidden rounded-[28px] border border-white/10">
              <Image
                src="/marcelo-reconhecimento.jpeg"
                alt="Reconhecimento institucional de Marcelo Félix"
                width={900}
                height={620}
                className="h-[390px] w-full object-cover object-[center_18%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <SectionLabel>Para quem é</SectionLabel>
            <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Formação para quem precisa responder melhor na prática.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {audienceItems.map((item) => (
              <div
                key={item}
                className="min-h-28 rounded-2xl border border-[#1F3A5F] bg-[#101820] p-5"
              >
                <div className="mb-5 h-1 w-12 rounded-full bg-[#1FAF8F]" />
                <p className="font-bold leading-6 text-[#D7DEE8]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="avisos"
        className="bg-[#081827] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <SectionLabel>Fique por dentro</SectionLabel>
            <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Quero ser avisado quando o próximo curso abrir.
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#D7DEE8]/85">
              Deixe seu contato e avise quando houver novidades.
            </p>
          </div>

          <NotifyMeForm />
        </div>
      </section>

      <section id="contato" className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="mx-auto overflow-hidden rounded-[32px] border border-[#1FAF8F]/30 bg-[linear-gradient(135deg,#0A2540_0%,#0D0D0D_72%)] p-8 shadow-[0_32px_100px_rgba(0,0,0,0.45)] sm:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <SectionLabel>Contato</SectionLabel>
              <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
                Conhecimento salva vidas.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#D7DEE8]/85">
                Quando é aplicado na hora certa, com segurança e assertividade.
                Solicite uma proposta personalizada para sua instituição.
              </p>
            </div>
            <div className="grid gap-4">
              <a
                href={WHATSAPP_URL}
                className="inline-flex h-[52px] items-center justify-center gap-3 rounded-full bg-[#1FAF8F] px-7 text-sm font-extrabold text-[#06131f] transition hover:bg-[#34d1ad]"
              >
                Fale comigo pelo WhatsApp
                <ArrowIcon />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-[#1FAF8F]/25 bg-white/[0.04] p-5 transition hover:border-[#1FAF8F]/70 hover:bg-white/[0.07]"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#1FAF8F]/35 bg-[#1FAF8F]/10 text-[#1FAF8F]">
                    <InstagramIcon />
                  </span>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1FAF8F]">
                      Instagram
                    </p>
                    <p className="mt-1 text-lg font-black text-white">
                      @prof.marcelofelix
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {selectedCourse && (
        <CourseInterestForm
          initialCourse={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onSuccess={handleRequestSuccess}
        />
      )}

      {confirmation && (
        <div className="fixed inset-x-0 bottom-6 z-[70] flex justify-center px-5">
          <div className="rounded-full border border-[#1FAF8F]/40 bg-[#0A2540]/95 px-6 py-3 text-center text-sm font-bold text-white shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-md">
            {confirmation}
          </div>
        </div>
      )}
    </main>
  );
}
