import { useEffect, useState } from "react";
import type { Pokemon } from "../types/types";
import Loader from "./Loader";

export default function PokemonCard({ pokemonUrl }: { pokemonUrl: string }) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);

  const formatName = (value: string | null | undefined) => {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        setPokemon(null);
        setDisplayName(null);
        const response = await fetch(pokemonUrl, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data: Pokemon = await response.json();
        data.types.map((t) => console.log(t.type.name));

        let frenchName = data.name;
        const speciesUrl =
          data.species?.url ??
          pokemonUrl.replace(/\/pokemon\/(\d+)\/?$/, "/pokemon-species/$1/");

        if (speciesUrl) {
          try {
            const speciesResponse = await fetch(speciesUrl, {
              signal: controller.signal,
            });
            if (speciesResponse.ok) {
              const speciesData = await speciesResponse.json();
              const frEntry = Array.isArray(speciesData?.names)
                ? speciesData.names.find(
                    (n: { language?: { name?: string }; name?: string }) =>
                      n.language?.name === "fr"
                  )
                : null;
              frenchName = frEntry?.name ?? data.name;
            }
          } catch (speciesError) {
            console.error(
              "Erreur lors du chargement du nom français",
              speciesError
            );
          }
        }

        if (!controller.signal.aborted) {
          setPokemon(data);
          setDisplayName(formatName(frenchName));
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Erreur lors du chargement du Pokémon", error);
        setError("Impossible de charger le Pokémon.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPokemon();

    return () => controller.abort();
  }, [pokemonUrl]);

  if (loading) {
    return (
      <div className="panel p-4 h-full flex items-center justify-center border border-white/10">
        <Loader label="" size={52} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="panel p-4 h-full flex items-center justify-center border border-red-500/40">
        <p className="text-red-300 text-sm text-center">{error}</p>
      </div>
    );
  }

  const imageSrc =
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon?.sprites?.front_default;
  const nameToShow = formatName(displayName ?? pokemon?.name);

  return (
    <div className="relative panel p-4 h-full flex flex-col items-center justify-center cursor-pointer border border-[#2a2c74]/60 hover:border-[#ffde00]/70 transition-all hover:-translate-y-1 overflow-hidden bg-[#0f122b]/80">
      <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-transparent" />
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#ffde00]/10 blur-2xl" />
      {pokemon && imageSrc ? (
        <>
          <div className="relative mb-3">
            <img
              className="w-24 h-24 object-contain"
              src={imageSrc}
              alt={nameToShow}
            />
          </div>
          <p className="text-center font-semibold text-white text-sm tracking-wide">
            {nameToShow}
          </p>
        </>
      ) : (
        <p className="text-gray-500 text-sm">Erreur</p>
      )}
    </div>
  );
}
