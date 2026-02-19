import { useParams } from "react-router-dom";
import { useGetPokemonByIdQuery } from "../services/pokemon";
import "@google/model-viewer";

export default function PokemonAr() {
  const { id } = useParams<{ id: string }>();
  const pokemonId = Number(id);
  const hasValidId = Number.isInteger(pokemonId) && pokemonId > 0;
  const { data: pokemonInfo } = useGetPokemonByIdQuery(pokemonId, {
    skip: !hasValidId,
  });
  const displayName = pokemonInfo?.name?.fr ?? "Inconnu";
  const modelUrl = hasValidId
    ? `https://raw.githubusercontent.com/Sudhanshu-Ambastha/Pokemon-3D/main/models/glb/regular/${pokemonId}.glb`
    : null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080d1d]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(227,53,13,0.20),transparent_34%),radial-gradient(circle_at_82%_10%,rgba(42,117,187,0.22),transparent_32%),radial-gradient(circle_at_55%_86%,rgba(255,203,5,0.15),transparent_30%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full border border-[#ffcb05]/40 bg-[#ffcb05]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffcb05]">
            AR MODE
          </span>
        </div>

        {!hasValidId ? (
          <div className="rounded-3xl border border-red-400/40 bg-[#140f19]/85 p-6 text-center text-red-200">
            Identifiant Pokémon invalide.
          </div>
        ) : null}

        {hasValidId ? (
          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <section className="relative rounded-3xl border border-[#2a75bb]/40 bg-[#0d142a]/90 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
              <div className="rounded-2xl border border-white/10 bg-[#050812]/55 p-3">
                {modelUrl ? (
                  <model-viewer
                    className="h-[58vh] min-h-105 w-full rounded-xl bg-[linear-gradient(180deg,#121b39_0%,#090e1d_100%)]"
                    src={modelUrl}
                    alt={`Modèle 3D de ${displayName}`}
                    camera-controls
                    auto-rotate
                    ar
                    ar-modes="scene-viewer quick-look webxr"
                    shadow-intensity="1"
                  ></model-viewer>
                ) : null}
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </div>
  );
}
