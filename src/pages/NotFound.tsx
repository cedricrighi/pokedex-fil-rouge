import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(227,53,13,0.22),transparent_32%),radial-gradient(circle_at_86%_10%,rgba(42,117,187,0.22),transparent_30%),radial-gradient(circle_at_70%_78%,rgba(255,203,5,0.18),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.05),transparent_40%,rgba(255,255,255,0.03))]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:140px_140px] opacity-40" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
        <div className="relative space-y-8">
          <div className="pointer-events-none absolute -top-10 left-0 text-[110px] sm:text-[140px] font-black text-white/5 tracking-[0.12em]">
            404
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[#ffcb05]">
              Erreur 404
            </p>
            <h1 className="text-4xl sm:text-6xl font-black text-white drop-shadow-[0_3px_0_#2a2c74]">
              Zone hors Pokédex
            </h1>
            <p className="text-white/70 max-w-xl">
              Le radar ne capte rien ici. Le chemin demandé est introuvable et
              la balise s’est éteinte.
            </p>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#0b1021]/80 px-4 py-2 text-xs text-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
              <span className="h-2 w-2 rounded-full bg-[#ef4444] shadow-[0_0_0_6px_rgba(239,68,68,0.12)] animate-pulse" />
              <span className="uppercase tracking-[0.2em]">Signal perdu</span>
              <span className="text-white/90 font-semibold">{pathname}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-[#ffcb05] px-5 py-2 text-sm font-semibold text-[#0a0f1f] transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(255,203,5,0.25)]"
            >
              Retour au centre
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/pokedex"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-[#ffcb05]/60 hover:text-[#ffcb05]"
            >
              Pokédex
            </Link>
            <Link
              to="/games"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-[#ffcb05]/60 hover:text-[#ffcb05]"
            >
              Arcade
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Coordonnée", value: "??? - ???" },
              { label: "Trace", value: "Inconnue" },
              { label: "Niveau", value: "Hors carte" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-[#0f122b]/85 px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
              >
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/50">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-16 right-8 h-36 w-36 rounded-full bg-[#2a75bb]/25 blur-3xl" />
          <div className="absolute -bottom-12 left-8 h-32 w-32 rounded-full bg-[#ffcb05]/25 blur-3xl" />

          <div className="rounded-3xl border border-white/10 bg-[#0b1021]/80 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-[0.25em] text-white/60">
                Scanner Pokéball
              </div>
              <div className="text-xs font-semibold text-[#ffcb05]">
                Aucun signal
              </div>
            </div>

            <div className="relative mt-6 aspect-square w-full">
              <div className="absolute inset-0 rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_60%)]" />
              <div className="absolute inset-3 rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_60%)]" />
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,rgba(255,203,5,0.28),transparent_55%)] mix-blend-screen animate-spin" />
              <div className="absolute inset-8 rounded-full border border-white/10 bg-[#0f122b]/90 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)]" />

              <div className="pokeball-float absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#0a0f1f] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                <div className="absolute inset-x-0 top-0 h-1/2 bg-[#e3350d]" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#f2f6ff]" />
                <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 bg-[#0a0f1f]" />
                <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#0a0f1f] bg-white" />
                <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#0a0f1f]" />
              </div>

              <div className="absolute left-1/2 top-1/2 h-1 w-20 -translate-x-1/2 -translate-y-1/2 rotate-12 bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
              <div className="absolute right-10 top-10 h-12 w-1 rotate-12 rounded-full bg-[#ffcb05] shadow-[0_0_16px_rgba(255,203,5,0.8)]" />
              <div className="absolute left-10 bottom-10 h-10 w-1 -rotate-12 rounded-full bg-[#60a5fa] shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
              <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0a0f1f] shadow-[0_0_24px_rgba(239,68,68,0.6)] animate-pulse" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
