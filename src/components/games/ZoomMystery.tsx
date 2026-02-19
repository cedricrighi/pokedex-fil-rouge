import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useMemo, useState } from "react";
import {
  useGetPokemonByIdQuery,
  useGetPokemonListQuery,
} from "../../services/pokemon";
import type { ResultState, TyradexPokemon } from "../../types/types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { addFoundPokemon } from "../../store/slices/foundSlice";

const START_SCALE = 7;
const END_SCALE = 1;
const MAX_ATTEMPTS = 5;
const OPTIONS_COUNT = 6;

const getRandomId = (ids: number[], excludeId?: number | null) => {
  if (!ids.length) return null;
  const pool = excludeId == null ? ids : ids.filter((id) => id !== excludeId);
  const availableIds = pool.length ? pool : ids;
  // eslint-disable-next-line react-hooks/purity
  return availableIds[Math.floor(Math.random() * availableIds.length)];
};

export default function ZoomMystery() {
  const { data: allData } = useGetPokemonListQuery();
  const [pokemonId, setPokemonId] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState<ResultState | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [triedIds, setTriedIds] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const foundPokemonIds = useAppSelector(
    (state) => state.found.foundPokemonIds,
  );

  const unfoundIds = useMemo(() => {
    if (!allData?.length) return [];
    const foundIdsSet = new Set(foundPokemonIds);
    return allData
      .map((pokemon) => pokemon.pokedex_id)
      .filter((id) => !foundIdsSet.has(id));
  }, [allData, foundPokemonIds]);

  useEffect(() => {
    if (pokemonId !== null) return;
    const initialId = getRandomId(unfoundIds);
    if (initialId !== null) setPokemonId(initialId);
  }, [pokemonId, unfoundIds]);

  const { data: pokemon } = useGetPokemonByIdQuery(pokemonId ?? skipToken);
  const spriteSrc =
    pokemon?.sprites?.regular ?? pokemon?.sprites?.shiny ?? null;

  const answersChoices = useMemo(() => {
    if (!allData || !pokemon) return [] as TyradexPokemon[];
    const options = new Map<number, TyradexPokemon>();
    options.set(pokemon.pokedex_id, pokemon);

    let safety = 0;
    while (options.size < OPTIONS_COUNT && safety < allData.length * 2) {
      const randomOptionId =
        // eslint-disable-next-line react-hooks/purity
        allData[Math.floor(Math.random() * allData.length)]?.pokedex_id;
      if (!randomOptionId || options.has(randomOptionId)) {
        safety += 1;
        continue;
      }
      const choicePokemon = allData.find(
        (p) => p.pokedex_id === randomOptionId,
      );
      if (!choicePokemon) {
        safety += 1;
        continue;
      }
      options.set(choicePokemon.pokedex_id, choicePokemon);
    }

    // eslint-disable-next-line react-hooks/purity
    return Array.from(options.values()).sort(() => Math.random() - 0.5);
  }, [allData, pokemon]);

  useEffect(() => {
    setAttempts(0);
    setResult(null);
    setSelectedId(null);
    setTriedIds([]);
  }, [pokemon?.pokedex_id]);

  const attemptsLeft = Math.max(0, MAX_ATTEMPTS - attempts);
  const isGameOver = Boolean(result);
  const zoomStep = ((START_SCALE - END_SCALE) / MAX_ATTEMPTS) * 1.5;

  const currentScale = isGameOver
    ? END_SCALE
    : Math.max(END_SCALE, START_SCALE - attempts * zoomStep);

  const verifyAnswer = (choiceId: number) => {
    if (!pokemon || isGameOver || attempts >= MAX_ATTEMPTS) return;

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    setSelectedId(choiceId);
    setTriedIds((prev) =>
      prev.includes(choiceId) ? prev : [...prev, choiceId],
    );

    if (choiceId === pokemon.pokedex_id) {
      dispatch(addFoundPokemon(pokemon.pokedex_id));
      setResult({
        status: "success",
        title: "Bien joué !",
        subtitle: `${pokemon.name.fr} rejoint ton Pokédex.`,
      });
      return;
    }

    if (nextAttempts >= MAX_ATTEMPTS) {
      setResult({
        status: "error",
        title: "Oh... c'était ça, dommage.",
        subtitle: `#${pokemon.pokedex_id
          .toString()
          .padStart(3, "0")} ${pokemon.name.fr}.`,
      });
    }
  };

  const nextPokemon = () => {
    if (!allData?.length) return;
    setResult(null);
    setSelectedId(null);
    setAttempts(0);
    setTriedIds([]);
    setPokemonId((prevId) => getRandomId(unfoundIds, prevId));
  };

  const showWrongAttempt =
    !isGameOver &&
    selectedId != null &&
    pokemon &&
    selectedId !== pokemon.pokedex_id;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(227,53,13,0.14),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(42,117,187,0.16),transparent_30%),radial-gradient(circle_at_78%_80%,rgba(255,203,5,0.14),transparent_28%)]" />

      <div className="relative mx-auto w-full max-w-5xl px-4 pt-14 pb-16 space-y-10">
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.26em] text-[#ffcb05]">
            Jeu
          </p>
          <h1 className="text-4xl font-black text-white drop-shadow-[0_3px_0_#2a2c74]">
            Zoom Mystère
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            L'image démarre hyper zoomée. À chaque tentative, elle se dézoome un
            peu.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] items-start">
          <div className="panel relative bg-[#0f122b]/80 border border-[#2c4ac7]/60 rounded-2xl p-6 flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.35)] overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-transparent" />
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#ffde00]/10 blur-3xl" />
            {spriteSrc ? (
              <div className="relative h-80 w-full max-w-sm overflow-hidden rounded-2xl bg-[#0b1021]/70 border border-white/10">
                <img
                  className="h-full w-full object-contain transition-transform duration-500 ease-out"
                  style={{ transform: `scale(${currentScale})` }}
                  src={spriteSrc}
                  alt="Pokémon à deviner"
                />
              </div>
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
                  Propositions
                </p>
                <p className="text-lg font-semibold text-white">
                  Tentatives restantes : {attemptsLeft}
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

            {showWrongAttempt && (
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#ef4444]/60 bg-[#ef4444]/10 px-4 py-3">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[#ef4444] shadow-[0_0_0_6px_rgba(239,68,68,0.12)]" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-white">Raté...</p>
                  <p className="text-sm text-white/80">
                    Ça dézoome un peu. Essaie encore !
                  </p>
                </div>
              </div>
            )}

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
              {answersChoices.map((choice) => {
                const isCorrect = choice.pokedex_id === pokemon?.pokedex_id;
                const isSelected = choice.pokedex_id === selectedId;
                const isDisabled = isGameOver || attempts >= MAX_ATTEMPTS;

                return (
                  <button
                    onClick={() => verifyAnswer(choice.pokedex_id)}
                    type="button"
                    key={choice.pokedex_id}
                    disabled={isDisabled}
                    className={`group relative overflow-hidden rounded-xl border border-white/10 bg-[#0f122b]/80 px-4 py-3 text-left transition-all duration-200 shadow-[0_10px_26px_rgba(0,0,0,0.25)] ${
                      result
                        ? isCorrect
                          ? "border-[#22c55e]/70 bg-[#16a34a]/10"
                          : isSelected
                            ? "border-[#ef4444]/70 bg-[#ef4444]/5"
                            : "opacity-70"
                        : triedIds.includes(choice.pokedex_id)
                          ? "opacity-70"
                          : "hover:-translate-y-0.5 hover:border-[#ffde00]/60"
                    } ${isDisabled ? "cursor-default" : ""}`}
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
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
