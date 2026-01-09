import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  useGetPokemonByIdQuery,
  useGetPokemonListQuery,
} from "../../services/pokemon";
import type { TyradexPokemon } from "../../types/types";

type ResultState =
  | {
      status: "success";
      title: string;
      subtitle: string;
    }
  | {
      status: "error";
      title: string;
      subtitle: string;
    };

export default function GuessPokemon() {
  const { data: allData } = useGetPokemonListQuery();
  const nbMaxPokemon = allData ? allData.length : 0;
  const lastIdRef = useRef<number | null>(null);
  const [_runId, setRunId] = useState(0);
  const [result, setResult] = useState<ResultState | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const randomId = useMemo(() => {
    if (!allData?.length) return skipToken;
    if (allData.length === 1) {
      const soloId = allData[0].pokedex_id;
      lastIdRef.current = soloId;
      return soloId;
    }

    let roll = allData[Math.floor(Math.random() * allData.length)].pokedex_id;

    if (lastIdRef.current !== null && allData.length > 1) {
      let safety = 0;
      while (roll === lastIdRef.current && safety < 15) {
        roll = allData[Math.floor(Math.random() * allData.length)].pokedex_id;
        safety += 1;
      }
    }

    lastIdRef.current = roll;
    return roll;
  }, [allData]);

  const [answersChoices, setAnswersChoices] = useState<TyradexPokemon[]>([]);

  const { data: pokemon } = useGetPokemonByIdQuery(randomId);

  const spriteSrc =
    pokemon?.sprites?.regular ?? pokemon?.sprites?.shiny ?? null;

  useEffect(() => {
    const getFourOptions = () => {
      if (!allData || !pokemon) return;

      const options = new Map<number, TyradexPokemon>();

      options.set(pokemon.pokedex_id, pokemon);

      while (options.size < 4) {
        const randomOptionId = Math.floor(Math.random() * nbMaxPokemon) + 1;
        if (options.has(randomOptionId)) continue;
        const choicePokemon = allData.find(
          (p) => p.pokedex_id === randomOptionId
        );
        if (!choicePokemon) continue;
        options.set(choicePokemon.pokedex_id, choicePokemon);
      }

      const shuffledOptions = Array.from(options.values()).sort(
        () => Math.random() - 0.5
      );

      setAnswersChoices(shuffledOptions);
    };

    getFourOptions();
  }, [allData, nbMaxPokemon, pokemon]);

  useEffect(() => {
    setResult(null);
    setSelectedId(null);
  }, [pokemon?.pokedex_id]);

  const verifyAnswer = (selectedId: number) => {
    if (!pokemon || result) return;

    setSelectedId(selectedId);

    const isCorrect = selectedId === pokemon.pokedex_id;
    if (isCorrect) {
      setResult({
        status: "success",
        title: "Bravo !",
        subtitle: `${pokemon.name.fr} rejoint ton palmarès.`,
      });
      return;
    }

    setResult({
      status: "error",
      title: "Dommage...",
      subtitle: `C'était #${pokemon.pokedex_id.toString().padStart(3, "0")} ${
        pokemon.name.fr
      }.`,
    });
  };

  const nextPokemon = () => {
    if (!allData?.length) return;
    setResult(null);
    setSelectedId(null);
    setAnswersChoices([]);
    setRunId((prev) => prev + 1);
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
            Qui est ce Pokémon ?
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Observe la silhouette et choisis le bon Pokémon parmi les quatre
            propositions.
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
                  4 propositions
                </p>
                <p className="text-lg font-semibold text-white">
                  Choisis le bon Pokémon
                </p>
              </div>
              <button
                type="button"
                onClick={nextPokemon}
                className="text-xs sm:text-sm inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 font-semibold text-white/90 transition hover:-translate-y-px hover:border-[#ffcb05]/60 hover:text-[#ffcb05]"
              >
                ↻ Nouveau Pokémon
              </button>
            </div>

            {result && (
              <div
                className={`mt-4 flex items-start gap-3 rounded-xl border px-4 py-3 ${
                  result.status === "success"
                    ? "border-[#22c55e]/60 bg-[#16a34a]/10"
                    : "border-[#ef4444]/60 bg-[#ef4444]/10"
                }`}
              >
                <span
                  className={`mt-1 inline-block h-2.5 w-2.5 rounded-full ${
                    result.status === "success"
                      ? "bg-[#22c55e] shadow-[0_0_0_6px_rgba(34,197,94,0.12)]"
                      : "bg-[#ef4444] shadow-[0_0_0_6px_rgba(239,68,68,0.12)]"
                  }`}
                />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-white">
                    {result.title}
                  </p>
                  <p className="text-sm text-white/80">{result.subtitle}</p>
                </div>
              </div>
            )}

            <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
              {answersChoices.map((choice) => (
                <button
                  onClick={() => verifyAnswer(choice.pokedex_id)}
                  type="button"
                  key={choice.pokedex_id}
                  disabled={Boolean(result)}
                  className={`group relative overflow-hidden rounded-xl border border-white/10 bg-[#0f122b]/80 px-4 py-3 text-left transition-all duration-200 shadow-[0_10px_26px_rgba(0,0,0,0.25)] ${
                    result
                      ? choice.pokedex_id === pokemon?.pokedex_id
                        ? "border-[#22c55e]/70 bg-[#16a34a]/10"
                        : choice.pokedex_id === selectedId
                        ? "border-[#ef4444]/70 bg-[#ef4444]/5"
                        : "opacity-70"
                      : "hover:-translate-y-0.5 hover:border-[#ffde00]/60"
                  } ${result ? "cursor-default" : ""}`}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[#ffcb05]">
                      #{choice.pokedex_id.toString().padStart(3, "0")}
                    </span>
                    <span className="text-base font-semibold text-white truncate">
                      {choice.name.fr}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
