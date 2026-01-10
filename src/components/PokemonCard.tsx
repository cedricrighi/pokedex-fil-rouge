import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { TYPES, TYPE_NAME_TO_KEY } from "../assets/constants";
import { useAppSelector } from "../hooks/useAppSelector";
import type { TyradexPokemon } from "../types/types";

type PokemonTypeKey = keyof typeof TYPES;

export default function PokemonCard({ pokemon }: { pokemon: TyradexPokemon }) {
  const formatName = (value: string | null | undefined) => {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const typesArray: PokemonTypeKey[] = (pokemon?.types ?? [])
    .map((type) => TYPE_NAME_TO_KEY[type.name.toLowerCase()])
    .map((type) =>
      type && type in TYPES ? type : "unknown"
    ) as PokemonTypeKey[];

  const imageSrc = pokemon?.sprites?.regular || undefined;
  const nameToShow = formatName(pokemon?.name?.fr ?? "");
  const detailsLink = pokemon?.pokedex_id
    ? `/pokedex/pokemon/${pokemon.pokedex_id}`
    : "/pokedex";

  const foundPokemonIds = useAppSelector(
    (state) => state.found.foundPokemonIds
  );
  const isFound =
    pokemon?.pokedex_id != null
      ? foundPokemonIds.includes(pokemon.pokedex_id)
      : false;

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isFound) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <Link
      to={detailsLink}
      onClick={handleLinkClick}
      aria-disabled={!isFound}
      tabIndex={isFound ? 0 : -1}
      className={`relative panel p-4 h-full flex flex-col items-center justify-center border border-[#2a2c74]/60 transition-all overflow-hidden bg-[#0f122b]/80 ${
        isFound
          ? "cursor-pointer hover:border-[#ffde00]/70 hover:-translate-y-1"
          : "cursor-not-allowed opacity-70"
      }`}
    >
      <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-transparent" />
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#ffde00]/10 blur-2xl" />
      {pokemon && imageSrc ? (
        <>
          <div className="relative mb-3">
            <img
              className={`w-full object-contain ${
                !isFound ? "brightness-0" : ""
              }`}
              src={imageSrc}
              alt={nameToShow}
            />
          </div>
          <p className="text-center font-semibold text-white text-base tracking-wide">
            {!isFound ? "???" : nameToShow}
          </p>
          <div className="mt-2 flex gap-2 justify-center">
            {typesArray.map((type) => {
              return (
                <img
                  src={TYPES[type]}
                  alt={type}
                  key={type}
                  className="h-8 w-8"
                />
              );
            })}
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-sm">Erreur</p>
      )}
    </Link>
  );
}
