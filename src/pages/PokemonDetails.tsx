import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  STAT_LABELS,
  TYPES,
  TYPES_FRENCH,
  TYPES_GRADIENTS,
  TYPE_NAME_TO_KEY,
} from "../assets/constants";
import Loader from "../components/Loader";
import type { TyradexStatKey } from "../types/types";
import { useGetPokemonByIdQuery } from "../services/pokemon";

type PokemonTypeKey = keyof typeof TYPES;
const MIN_POKEMON_ID = 1;
const MAX_POKEMON_ID = 1025;

const formatName = (value: string | null | undefined) => {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const spriteFromId = (id: number) =>
  `https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${id}/regular.png`;

type Neighbor = {
  id: number;
  sprite: string;
};

export default function PokemonDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: pokemon,
    isLoading,
    isError,
  } = useGetPokemonByIdQuery(id ?? "", { skip: !id });

  const types =
    pokemon?.types
      .map((t) => TYPE_NAME_TO_KEY[t.name.toLowerCase()])
      .map((name) => (name && name in TYPES ? name : "unknown")) ?? [];

  const imageSrc =
    pokemon?.sprites?.regular || pokemon?.sprites?.shiny || undefined;
  const nameToShow = formatName(pokemon?.name?.fr ?? `#${pokemon?.pokedex_id}`);
  const heightMeters = pokemon?.height ?? "?";
  const weightKg = pokemon?.weight ?? "?";
  const previous: Neighbor | null =
    pokemon && pokemon.pokedex_id > MIN_POKEMON_ID
      ? {
          id: pokemon.pokedex_id - 1,
          sprite: spriteFromId(pokemon.pokedex_id - 1),
        }
      : null;
  const next: Neighbor | null =
    pokemon && pokemon.pokedex_id < MAX_POKEMON_ID
      ? {
          id: pokemon.pokedex_id + 1,
          sprite: spriteFromId(pokemon.pokedex_id + 1),
        }
      : null;

  const statsEntries = useMemo(() => {
    if (!pokemon?.stats) return [];
    const mapping: Array<{ key: TyradexStatKey; labelKey: keyof typeof STAT_LABELS }> = [
      { key: "hp", labelKey: "hp" },
      { key: "atk", labelKey: "attack" },
      { key: "def", labelKey: "defense" },
      { key: "spe_atk", labelKey: "special-attack" },
      { key: "spe_def", labelKey: "special-defense" },
      { key: "vit", labelKey: "speed" },
    ];

    return mapping.map(({ key, labelKey }) => ({
      key,
      label: STAT_LABELS[labelKey],
      value: pokemon.stats[key],
    }));
  }, [pokemon?.stats]);

  const mainType = types[0] ?? "unknown";
  const gradient = TYPES_GRADIENTS[mainType] ?? TYPES_GRADIENTS.unknown;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(227,53,13,0.14),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(42,117,187,0.16),transparent_30%),radial-gradient(circle_at_78%_80%,rgba(255,203,5,0.14),transparent_28%)]" />

      <div className="relative mx-auto w-full max-w-5xl px-4 pt-14 pb-16">
        <Link
          to="/pokedex"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-[#ffde00] transition-colors"
        >
          <span aria-hidden="true">←</span> Retour au Pokédex
        </Link>

        {isLoading && (
          <div className="flex justify-center py-16">
            <Loader label="Chargement du Pokémon..." size={88} />
          </div>
        )}

        {!isLoading && (isError || !pokemon) && (
          <div className="panel p-6 mt-8 border border-red-500/60 bg-[#0b1021]/85">
            <p className="text-red-300 text-center">
              Impossible de charger ce Pokémon.
            </p>
            <div className="mt-4 flex justify-center">
              <Link
                to="/pokedex"
                className="px-4 py-2 rounded-lg bg-[#2c4ac7]/60 text-white font-semibold border border-white/10"
              >
                Revenir au Pokédex
              </Link>
            </div>
          </div>
        )}

        {!isLoading && !isError && pokemon && (
          <div className="relative mt-8">
            {previous ? (
              <Link
                to={`/pokedex/pokemon/${previous.id}`}
                aria-label={`Pokémon précédent (#${previous.id})`}
                className="absolute -left-2.5 sm:-left-5.5 top-1/2 -translate-y-1/2 group bg-[#0f122b]/90 border border-white/10 rounded-full px-3 py-2 flex items-center gap-2 shadow-[0_12px_30px_rgba(0,0,0,0.35)] hover:border-[#ffde00]/70 transition-colors z-10"
              >
                <span className="text-xl text-white/80 group-hover:text-[#ffde00]">
                  ←
                </span>
                <img
                  src={previous.sprite}
                  alt={`Pokémon ${previous.id}`}
                  className="h-10 w-10 object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.4)]"
                />
              </Link>
            ) : null}

            {next ? (
              <Link
                to={`/pokedex/pokemon/${next.id}`}
                aria-label={`Pokémon suivant (#${next.id})`}
                className="absolute -right-2.5 sm:-right-5.5 top-1/2 -translate-y-1/2 group bg-[#0f122b]/90 border border-white/10 rounded-full px-3 py-2 flex items-center gap-2 shadow-[0_12px_30px_rgba(0,0,0,0.35)] hover:border-[#ffde00]/70 transition-colors z-10"
              >
                <img
                  src={next.sprite}
                  alt={`Pokémon ${next.id}`}
                  className="h-10 w-10 object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.4)]"
                />
                <span className="text-xl text-white/80 group-hover:text-[#ffde00]">
                  →
                </span>
              </Link>
            ) : null}

            <div className="panel p-6 md:p-8 border border-[#2c4ac7]/60 bg-[#0b1021]/85 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
              <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] items-center">
                <div className="relative bg-[#0f122b]/80 border border-white/10 rounded-2xl p-6 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-transparent" />
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#ffde00]/10 blur-3xl" />
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={nameToShow}
                      className="relative w-full max-h-72 object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.35)]"
                    />
                  ) : (
                    <p className="text-white/60">Image indisponible</p>
                  )}
                </div>

                <div className="space-y-5">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs uppercase tracking-[0.26em] text-[#ffde00] drop-shadow-[0_2px_0_#2a2c74]">
                      #{String(pokemon.pokedex_id).padStart(4, "0")}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black text-white drop-shadow-[0_3px_0_#2a2c74]">
                      {nameToShow}
                    </h1>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {types.map((type) => (
                      <span
                        key={type}
                        className="inline-flex items-center gap-2 bg-[#0f122b] border border-[#2c4ac7]/50 rounded-full px-3 py-1.5"
                      >
                        <img src={TYPES[type]} alt={type} className="h-7 w-7" />
                        <span className="capitalize text-white/90 font-semibold">
                          {TYPES_FRENCH[type] ?? type}
                        </span>
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-white">
                    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.12em] text-white/60">
                        Taille
                      </p>
                      <p className="text-lg font-semibold text-white">
                        {heightMeters}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.12em] text-white/60">
                        Poids
                      </p>
                      <p className="text-lg font-semibold text-white">
                        {weightKg}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-white/70">Capacités</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(pokemon.talents ?? []).map((talent) => (
                        <span
                          key={talent.name}
                          className="px-3 py-1.5 rounded-lg bg-[#2c4ac7]/40 border border-white/10 text-white capitalize"
                        >
                          {formatName(talent.name)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm text-white/70 mb-3">Statistiques</p>
                <div className="space-y-3">
                  {statsEntries.map((stat) => {
                    const normalized = Math.min(stat.value, 160);
                    const width = `${(normalized / 160) * 100}%`;

                    return (
                      <div
                        key={stat.key}
                        className="flex items-center gap-3 text-white"
                      >
                        <span className="w-28 capitalize">{stat.label}</span>
                        <div className="flex-1 h-2.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className={`h-full bg-linear-to-r ${gradient} rounded-full transition-all`}
                            style={{ width }}
                          />
                        </div>
                        <span className="w-10 text-right font-semibold text-sm">
                          {stat.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
