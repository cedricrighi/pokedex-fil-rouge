import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { addFoundPokemon } from "../../store/slices/foundSlice";

export default function FindPokemonByImage() {
  const dispatch = useAppDispatch();
  const foundPokemonIds = useAppSelector(
    (state) => state.found.foundPokemonIds
  );

  return (
    <div>
      <p>{foundPokemonIds.join(", ")}</p>
      <button
        onClick={() => {
          dispatch(addFoundPokemon(Math.floor(Math.random() * 151) + 1));
        }}
      >
        Trouver un pokémon
      </button>
    </div>
  );
}
