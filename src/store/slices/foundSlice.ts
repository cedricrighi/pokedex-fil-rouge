import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PokemonFoundState {
  foundPokemonIds: number[];
}

const initialState: PokemonFoundState = {
  foundPokemonIds: [483, 484],
};

export const foundSlice = createSlice({
  name: "found",
  initialState,
  reducers: {
    addFoundPokemon: (state, action: PayloadAction<number>) => {
      if (!state.foundPokemonIds.includes(action.payload)) {
        state.foundPokemonIds.push(action.payload);
      }
    },
  },
});

export const { addFoundPokemon } = foundSlice.actions;

export default foundSlice.reducer;
