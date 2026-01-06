import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import Loader from "../components/Loader";

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

  const [allPokemon, setAllPokemon] = useState<
    Array<{ name: string; url: string }>
  >([]);
  const [pokemonList, setPokemonList] = useState<
    Array<{ name: string; url: string }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [selectedGeneration, setSelectedGeneration] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [generationMap, setGenerationMap] = useState<
    Record<string, Set<string>>
  >({});
  const [typeMap, setTypeMap] = useState<Record<string, Set<string>>>({});
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const firstLoad = async () => {
      try {
        setLoading(true);
        const rawData = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1300&offset=0"
        );
        const jsonData = await rawData.json();
        setAllPokemon(jsonData.results);
        setPokemonList(jsonData.results);
      } catch (error) {
        console.error("Erreur lors du chargement des Pokémons", error);
      } finally {
        setLoading(false);
      }
    };

    firstLoad();
  }, []);

  const fetchGenerationSet = async (id: string) => {
    try {
      setFilterLoading(true);
      const res = await fetch(`https://pokeapi.co/api/v2/generation/${id}`);
      const data = await res.json();
      const names: Set<string> = new Set(
        (data.pokemon_species || []).map((p: { name: string }) => p.name)
      );
      setGenerationMap((prev) => ({ ...prev, [id]: names }));
    } catch (error) {
      console.error("Erreur génération", error);
    } finally {
      setFilterLoading(false);
    }
  };

  const fetchTypeSet = async (type: string) => {
    try {
      setFilterLoading(true);
      const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await res.json();
      const names = new Set<string>(
        (data.pokemon || []).map(
          (p: { pokemon: { name: string } }) => p.pokemon.name
        )
      );
      setTypeMap((prev) => ({ ...prev, [type]: names }));
    } catch (error) {
      console.error("Erreur type", error);
    } finally {
      setFilterLoading(false);
    }
  };

  useEffect(() => {
    const ensureFilters = async () => {
      if (selectedGeneration !== "all" && !generationMap[selectedGeneration]) {
        await fetchGenerationSet(selectedGeneration);
      }
      if (selectedType !== "all" && !typeMap[selectedType]) {
        await fetchTypeSet(selectedType);
      }
    };
    ensureFilters();
  }, [selectedGeneration, selectedType, generationMap, typeMap]);

  useEffect(() => {
    let result = allPokemon;
    if (selectedGeneration !== "all") {
      const genSet = generationMap[selectedGeneration];
      if (genSet) {
        result = result.filter((p) => genSet.has(p.name));
      }
    }
    if (selectedType !== "all") {
      const typeSet = typeMap[selectedType];
      if (typeSet) {
        result = result.filter((p) => typeSet.has(p.name));
      }
    }
    setPokemonList(result);
    setPage(1);
  }, [allPokemon, selectedGeneration, selectedType, generationMap, typeMap]);

  useEffect(() => {
    const totalPages = Math.max(
      1,
      Math.ceil(pokemonList.length / itemsPerPage)
    );
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [pokemonList.length, page, itemsPerPage]);

  const totalPages = Math.max(1, Math.ceil(pokemonList.length / itemsPerPage));
  const startIndex = (page - 1) * itemsPerPage;
  const visiblePokemon = pokemonList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(227,53,13,0.14),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(42,117,187,0.16),transparent_30%),radial-gradient(circle_at_78%_80%,rgba(255,203,5,0.14),transparent_28%)]" />

      <div className="relative container mx-auto px-4 pt-16 pb-16">
        <div className="flex flex-col items-start gap-4 mb-10">
          <p className="text-xs uppercase tracking-[0.26em] text-[#ffde00] drop-shadow-[0_2px_0_#2a2c74]">
            Pokédex FR
          </p>
          <h1 className="text-5xl font-black text-white drop-shadow-[0_3px_0_#2a2c74]">
            Explorer les espèces
          </h1>
          <span className="text-lg text-white/80">
            {pokemonList.length} référence{pokemonList.length > 1 ? "s" : ""}{" "}
            filtrée
          </span>
        </div>

        <div className="panel p-5 border border-[#2c4ac7]/50 mb-10 bg-[#0f122b]/70">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/80">Génération</label>
              <select
                value={selectedGeneration}
                onChange={(e) => setSelectedGeneration(e.target.value)}
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
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-[#0a0f1f] border border-white/10 rounded-lg px-3 py-2 text-white"
              >
                {typeOptions.map((t) => (
                  <option key={t} value={t}>
                    {t === "all" ? "Tous les types" : t}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {filterLoading && (
            <div className="mt-4 flex items-center gap-3 text-white/70 text-sm">
              <Loader label="Chargement des filtres..." size={42} />
            </div>
          )}
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <Loader label="Chargement des Pokémons..." size={82} />
          </div>
        )}

        {!loading && pokemonList.length > 0 && (
          <>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
              {visiblePokemon.map((pokemon) => (
                <li key={pokemon.name}>
                  <PokemonCard pokemonUrl={pokemon.url} />
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-center mt-10 gap-3">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-[#2c4ac7]/50 text-white rounded-lg disabled:opacity-50"
              >
                Précédent
              </button>
              <span className="text-white/80">
                Page {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
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
