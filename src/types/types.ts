export type TyradexType = {
  name: string;
  image: string;
};

export type TyradexSprites = {
  regular: string;
  shiny: string;
  gmax?: {
    regular: string;
    shiny: string;
  } | null;
};

export type TyradexStatKey =
  | "hp"
  | "atk"
  | "def"
  | "spe_atk"
  | "spe_def"
  | "vit";

export type TyradexStats = Record<TyradexStatKey, number>;

export type TyradexPokemon = {
  pokedex_id: number;
  generation: number;
  category?: string;
  name: {
    fr: string;
    en?: string;
    jp?: string;
  };
  sprites: TyradexSprites;
  types: TyradexType[];
  talents: Array<{ name: string; tc: boolean }>;
  stats: TyradexStats;
  resistances?: Array<{ name: string; multiplier: number }>;
  height?: string;
  weight?: string;
};

export type GameCard = {
  name: string;
  description: string;
  gradient: string;
  path: string;
  status?: "soon";
};
