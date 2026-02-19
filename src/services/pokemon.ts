import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TyradexPokemon } from "../types/types";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tyradex.app/api/v1/",
  }),
  tagTypes: ["Pokemon"],
  endpoints: (builder) => ({
    getPokemonList: builder.query<TyradexPokemon[], void>({
      query: () => "pokemon",
      providesTags: (result) =>
        result
          ? [
              ...result.map((p) => ({
                type: "Pokemon" as const,
                id: p.pokedex_id,
              })),
              { type: "Pokemon", id: "LIST" },
            ]
          : [{ type: "Pokemon", id: "LIST" }],
    }),
    getPokemonById: builder.query<TyradexPokemon, string | number>({
      query: (id) => `pokemon/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Pokemon", id }],
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonByIdQuery } = pokemonApi;
