import { useMemo, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import Loader from "../components/Loader";
import { TYPES, TYPES_FRENCH, TYPE_NAME_TO_KEY } from "../assets/constants";
import { useGetPokemonListQuery } from "../services/pokemon";

export default function Pokedex() {
  const generationOptions = [
    { id: "all", label: "Toutes les générations" },
    { id: "1", label: "Gen 1" },
    { id: "2", label: "Gen 2" },
    { id: "3", label: "Gen 3" },
    { id: "4", label: "Gen 4" },
    { id: "5", label: "Gen 5" },
    { id: "6", label: "Gen 6" },
    { id: "7", label: "Gen 7" },
    { id: "8", label: "Gen 8" },
    { id: "9", label: "Gen 9" },
  ];

  const typeOptions = [
    "all",
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ];

  const [selectedGeneration, setSelectedGeneration] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  const { data, isLoading, isError } = useGetPokemonListQuery();
  //log data, mais pas en object Object
  console.log(
    "Fetched Pokémon data:",
    JSON.stringify(data?.slice(0, 5), null, 2)
  );

  const normalizeType = (name: string) => {
    const key = TYPE_NAME_TO_KEY[name.toLowerCase()];
    return key ?? "unknown";
  };

  const cleanedList = useMemo(() => {
    const list = data ?? [];
    return list
      .filter(
        (p) =>
          p.pokedex_id &&
          p.pokedex_id > 0 &&
          Boolean(p.sprites?.regular || p.sprites?.shiny)
      )
      .sort((a, b) => a.pokedex_id - b.pokedex_id);
  }, [data]);

  const filteredPokemon = useMemo(() => {
    let result = cleanedList;

    if (selectedGeneration !== "all") {
      const genNumber = Number(selectedGeneration);
      result = result.filter((p) => p.generation === genNumber);
    }

    if (selectedType !== "all") {
      result = result.filter((p) =>
        p.types.some(
          (t) => normalizeType(t.name) === (selectedType as keyof typeof TYPES)
        )
      );
    }

    return result;
  }, [cleanedList, selectedGeneration, selectedType]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPokemon.length / itemsPerPage)
  );
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visiblePokemon = filteredPokemon.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const hasData = !isLoading && !isError && filteredPokemon.length > 0;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(227,53,13,0.14),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(42,117,187,0.16),transparent_30%),radial-gradient(circle_at_78%_80%,rgba(255,203,5,0.14),transparent_28%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-16 pb-16">
        <div className="flex flex-col items-start gap-4 mb-10">
          <p className="text-xs uppercase tracking-[0.26em] text-[#ffde00] drop-shadow-[0_2px_0_#2a2c74]">
            Pokédex FR
          </p>
          <h1 className="text-5xl font-black text-white drop-shadow-[0_3px_0_#2a2c74]">
            Explorer les espèces
          </h1>
          <span className="text-lg text-white/80">
            {filteredPokemon.length} référence
            {filteredPokemon.length > 1 ? "s" : ""} filtrée
          </span>
        </div>

        <div className="panel p-5 border border-[#2c4ac7]/50 mb-10 bg-[#0f122b]/70">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/80">Génération</label>
              <select
                value={selectedGeneration}
                onChange={(e) => {
                  setSelectedGeneration(e.target.value);
                  setPage(1);
                }}
                className="bg-[#0a0f1f] border border-white/10 rounded-lg px-3 py-2 text-white"
              >
                {generationOptions.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/80">Type</label>
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setPage(1);
                }}
                className="bg-[#0a0f1f] border border-white/10 rounded-lg px-3 py-2 text-white"
              >
                {typeOptions.map((t) => (
                  <option key={t} value={t}>
                    {t === "all" ? "Tous les types" : TYPES_FRENCH[t]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader label="Chargement des Pokémons..." size={82} />
          </div>
        )}

        {!isLoading && isError && (
          <div className="flex justify-center py-10">
            <p className="text-white/70">
              Impossible de charger les Pokémons. Réessaie plus tard.
            </p>
          </div>
        )}

        {!isLoading && !isError && filteredPokemon.length === 0 && (
          <div className="flex justify-center py-10">
            <p className="text-white/70">
              Aucun Pokémon trouvé avec ces filtres.
            </p>
          </div>
        )}

        {hasData && (
          <>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {visiblePokemon.map((pokemon) => (
                <li key={pokemon.pokedex_id}>
                  <PokemonCard pokemon={pokemon} />
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-center mt-10 gap-3">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#2c4ac7]/50 text-white rounded-lg disabled:opacity-50"
              >
                Précédent
              </button>
              <span className="text-white/80">
                Page {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="px-4 py-2 bg-[#2c4ac7]/50 text-white rounded-lg disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
