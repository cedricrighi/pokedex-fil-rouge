import { Link, useLocation } from "react-router-dom";
import pokeballImg from "../assets/pokeball.png";
import Pikachu from "../assets/pikachu.webp";

export default function Navbar() {
  const { pathname } = useLocation();
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };
  const active = (path: string) =>
    isActive(path) ? "text-[#ffcb05]" : "text-white/90";

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0a0f1f]/90 backdrop-blur-xl border-b border-[#ffcb05]/40 overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 group hover:-translate-y-px transition"
        >
          <div className="relative h-11 w-11 rounded-2xl shadow-[0_10px_28px_rgba(0,0,0,0.35)]">
            <img src={pokeballImg} alt="Pokeball" className="h-full w-full" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.26em] text-[#ffcb05]">
              Pokédex
            </p>
            <p className="text-lg font-bold text-white">Deck</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/"
            className={`px-3 py-2 text-sm font-semibold ${active("/")}`}
          >
            Accueil
          </Link>
          <Link
            to="/user"
            className={`px-3 py-2 text-sm font-semibold ${active("/user")}`}
          >
            Dresseurs
          </Link>
          <Link
            to="/pokedex?page=1"
            className={`px-3 py-2 text-sm font-semibold ${active("/pokedex")}`}
          >
            Pokédex
          </Link>
          <Link
            to="/games"
            className={`px-3 py-2 text-sm font-semibold ${active("/games")}`}
          >
            Jeux
          </Link>
        </div>
      </div>
      <div className="pikachu-runner" aria-hidden="true">
        <img
          src={Pikachu}
          alt="Pikachu"
          className="h-full w-full object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]"
        />
      </div>
    </nav>
  );
}
