import normal from "./types/normal.png";
import fighting from "./types/fighting.png";
import flying from "./types/flying.png";
import poison from "./types/poison.png";
import ground from "./types/ground.png";
import rock from "./types/rock.png";
import bug from "./types/bug.png";
import ghost from "./types/ghost.png";
import steel from "./types/steel.png";
import fire from "./types/fire.png";
import water from "./types/water.png";
import grass from "./types/grass.png";

import electric from "./types/electric.png";
import psychic from "./types/psychic.png";
import ice from "./types/ice.png";
import dragon from "./types/dragon.png";
import dark from "./types/dark.png";
import fairy from "./types/fairy.png";
import stellar from "./types/stellar.png";
import unknown from "./types/unknown.png";

const TYPES: Record<string, string> = Object.freeze({
  normal: normal,
  fighting: fighting,
  flying: flying,
  poison: poison,
  ground: ground,
  rock: rock,
  bug: bug,
  ghost: ghost,
  steel: steel,
  fire: fire,
  water: water,
  grass: grass,
  electric: electric,
  psychic: psychic,
  ice: ice,
  dragon: dragon,
  dark: dark,
  fairy: fairy,
  stellar: stellar,
  unknown: unknown,
});

const STAT_LABELS: Record<string, string> = Object.freeze({
  hp: "PV",
  attack: "Attaque",
  defense: "Défense",
  "special-attack": "Attaque Spéciale",
  "special-defense": "Défense Spéciale",
  speed: "Vitesse",
});

const TYPES_GRADIENTS: Record<string, string> = Object.freeze({
  normal: "from-[#bfbbae] to-[#f5f5f5]",
  fighting: "from-[#ffd6fc] to-[#ff6ef5]",
  flying: "from-[#d6eeff] to-[#4db5ff]",
  poison: "from-[#c183c1] to-[#a33ea1]",
  ground: "from-[#ffeed6] to-[#f7ac43]",
  rock: "from-[#fff8e0] to-[#cfc299]",
  bug: "from-[#daffd9] to-[#7fcc7c]",
  ghost: "from-[#deebff] to-[#819dc7]",
  steel: "from-[#deebff] to-[#7f92b0]",
  fire: "from-[#ffeedb] to-[#ffa845]",
  water: "from-[#ccebff] to-[#54bbff]",
  grass: "from-[#d5f7d7] to-[#61ff69]",
  electric: "from-[#fffccc] to-[#fff345]",
  psychic: "from-[#ffdbee] to-[#f05d89]",
  ice: "from-[#d6f8ff] to-[#79fcf2]",
  dragon: "from-[#d1eaff] to-[#1e8feb]",
  dark: "from-[#e0e0e0] to-[#424242]",
  fairy: "from-[#ffebfe] to-[#fc7ef6]",
  stellar: "from-[#E0C068] to-[#F0E1A5]",
  unknown: "from-[#6C6C6C] to-[#A8A8A8]",
});

const TYPES_FRENCH: Record<string, string> = Object.freeze({
  normal: "Normal",
  fighting: "Combat",
  flying: "Vol",
  poison: "Poison",
  ground: "Sol",
  rock: "Roche",
  bug: "Insecte",
  ghost: "Spectre",
  steel: "Acier",
  fire: "Feu",
  water: "Eau",
  grass: "Plante",
  electric: "Électrik",
  psychic: "Psy",
  ice: "Glace",
  dragon: "Dragon",
  dark: "Ténèbres",
  fairy: "Fée",
  stellar: "Stellaire",
  unknown: "Inconnu",
});

const TYPE_NAME_TO_KEY: Record<string, keyof typeof TYPES> = Object.freeze({
  normal: "normal",
  combat: "fighting",
  vol: "flying",
  poison: "poison",
  sol: "ground",
  roche: "rock",
  insecte: "bug",
  spectre: "ghost",
  acier: "steel",
  feu: "fire",
  eau: "water",
  plante: "grass",
  électrik: "electric",
  electrik: "electric",
  psy: "psychic",
  glace: "ice",
  dragon: "dragon",
  ténèbres: "dark",
  tenebres: "dark",
  fée: "fairy",
  fee: "fairy",
  stellaire: "stellar",
  inconnu: "unknown",
});

export {
  TYPES,
  STAT_LABELS,
  TYPES_GRADIENTS,
  TYPES_FRENCH,
  TYPE_NAME_TO_KEY,
};
