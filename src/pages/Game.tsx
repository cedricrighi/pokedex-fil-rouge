import { Link } from "react-router-dom";
import type { GameCard } from "../types/types";

const GAMES: GameCard[] = [
  {
    name: "Devine le Pokémon",
    description:
      "Trouve le bon Pokémon à partir de sa silhouette parmi quatre propositions.",
    gradient: "from-[#ffcb05] via-[#ff8a42] to-[#f64f59]",
    path: "guess-pokemon",
  },
  {
    name: "Trouve le Pokémon par image",
    description:
      "Identifie le Pokémon affiché sur une image parmi plusieurs options.",
    gradient: "from-[#42a5f5] via-[#478ed1] to-[#5c6bc0]",
    path: "find-pokemon-by-image",
  },
];

export default function Game() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(227,53,13,0.14),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(42,117,187,0.16),transparent_30%),radial-gradient(circle_at_78%_80%,rgba(255,203,5,0.14),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 py-14 space-y-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.26em] text-[#ffcb05]">
              Arcade Pokémon
            </p>
            <h1 className="text-4xl font-black text-white drop-shadow-[0_3px_0_#2a2c74]">
              Choisis ton défi
            </h1>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((game) => {
            const baseClasses =
              "group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f122b]/90 p-5 sm:p-6 shadow-[0_14px_34px_rgba(0,0,0,0.35)] transition-transform duration-200";
            const stateClasses = game.path
              ? "hover:-translate-y-1 hover:border-[#ffcb05]/70 hover:shadow-[0_16px_36px_rgba(0,0,0,0.4)]"
              : "opacity-80 cursor-not-allowed";

            const content = (
              <>
                <div
                  className={`pointer-events-none absolute inset-0 opacity-30 bg-linear-to-br ${game.gradient}`}
                />
                <div className="pointer-events-none absolute inset-0 bg-[#0a0f1f]/70" />
                <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-white/10 blur-3xl" />

                <div className="relative space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white drop-shadow-[0_2px_0_#0a0f1f]">
                      {game.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/70">
                      {game.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 text-sm">
                    <span className="flex items-center gap-2 font-semibold text-[#ffcb05] transition-transform duration-200 group-hover:translate-x-1">
                      Jouer
                      <span aria-hidden="true" className="text-white">
                        {">"}
                      </span>
                    </span>
                  </div>
                </div>
              </>
            );

            if (game.path) {
              return (
                <Link
                  key={game.name}
                  to={`/games/${game.path}`}
                  className={`${baseClasses} ${stateClasses}`}
                >
                  {content}
                </Link>
              );
            }

            return (
              <div
                key={game.name}
                role="article"
                className={`${baseClasses} ${stateClasses}`}
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
