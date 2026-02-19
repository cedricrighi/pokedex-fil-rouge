import { useMemo } from "react";
import { useGetPokemonListQuery } from "../../services/pokemon";
import type { TyradexPokemon } from "../../types/types";

export default function FindPokemonByImage() {
  const { data: allData } = useGetPokemonListQuery();

  const pokemonToGuess: TyradexPokemon | null = useMemo(() => {
    if (!allData?.length) return null;
    // eslint-disable-next-line react-hooks/purity
    return allData[Math.floor(Math.random() * allData.length)];
  }, [allData]);

  const spriteSrc = pokemonToGuess?.sprites?.regular || null;
  const result = {
    status: null,
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(227,53,13,0.14),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(42,117,187,0.16),transparent_30%),radial-gradient(circle_at_78%_80%,rgba(255,203,5,0.14),transparent_28%)]" />

      <div className="relative mx-auto w-full max-w-5xl px-4 pt-14 pb-16 space-y-10">
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.26em] text-[#ffcb05]">
            Jeu
          </p>
          <h1 className="text-4xl font-black text-white drop-shadow-[0_3px_0_#2a2c74]">
            Retrouve les attributs de ce Pokémon
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Observe la silhouette et remplis les attributs.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] items-start">
          <div className="panel relative bg-[#0f122b]/80 border border-[#2c4ac7]/60 rounded-2xl p-6 flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.35)] overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-transparent" />
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#ffde00]/10 blur-3xl" />
            {spriteSrc ? (
              <img
                className={`relative max-h-80 w-full object-contain ${
                  result?.status === "success"
                    ? "brightness-100"
                    : "brightness-0 animate-pulse"
                } drop-shadow-[0_0px_12px_rgba(255,255,255,1)]`}
                src={spriteSrc}
                alt={"Pokémon à deviner"}
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-white/60">
                <div className="h-28 w-28 rounded-full border border-white/10 bg-white/5 animate-pulse" />
                <span>Chargement...</span>
              </div>
            )}
          </div>

          <section className="panel rounded-2xl bg-[#0b1021]/85 border border-[#2c4ac7]/60 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.26em] text-[#ffcb05]">
                  Attributs
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-semibold text-white">
                  Nom du Pokémon
                </span>
                <input
                  type="text"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/50 focus:border-[#ffcb05]/70 focus:outline-none"
                />
              </label>
              {pokemonToGuess?.types.map((_type, index) => (
                <label className="block" key={index}>
                  <span className="text-sm font-semibold text-white">
                    Type {index + 1} du Pokémon
                  </span>
                  <input
                    type="text"
                    className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/50 focus:border-[#ffcb05]/70 focus:outline-none"
                  />
                </label>
              ))}
              {pokemonToGuess?.evolution?.next && (
                <label className="block">
                  <span className="text-sm font-semibold text-white">
                    Son évolution
                  </span>
                  <input
                    type="text"
                    className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/50 focus:border-[#ffcb05]/70 focus:outline-none"
                  />
                </label>
              )}
              <label className="block">
                <span className="text-sm font-semibold text-white">
                  Génération du Pokémon
                </span>
                <input
                  type="text"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/50 focus:border-[#ffcb05]/70 focus:outline-none"
                />
              </label>
              {pokemonToGuess?.talents.map((_talent, index) => (
                <label className="block" key={index}>
                  <span className="text-sm font-semibold text-white">
                    Capacité {index + 1} du Pokémon
                  </span>
                  <input
                    type="text"
                    className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/50 focus:border-[#ffcb05]/70 focus:outline-none"
                  />
                </label>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
