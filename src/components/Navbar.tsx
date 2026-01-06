import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import pokeballImg from "../assets/pokeball.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const active = (path: string) =>
    pathname === path ? "text-[#ffcb05]" : "text-white/90";

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0f1f]/90 backdrop-blur-xl border-b border-[#ffcb05]/40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 group hover:-translate-y-px transition"
        >
          <div className="relative h-11 w-11 rounded-2xl shadow-[0_10px_28px_rgba(0,0,0,0.35)]">
            <img src={pokeballImg} alt="Pokeball" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.26em] text-[#ffcb05]">
              Pokédex
            </p>
            <p className="text-lg font-bold text-white">Kanto Deck</p>
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
            to="/pokedex"
            className={`px-3 py-2 text-sm font-semibold ${active("/pokedex")}`}
          >
            Pokédex
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg border border-[#ffcb05]/50 text-white bg-[#0a0f1f]/80"
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#ffcb05]/30 bg-[#0a0f1f]/95">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={`block px-6 py-4 border-b border-white/5 ${active("/")}`}
          >
            Accueil
          </Link>
          <Link
            to="/user"
            onClick={() => setOpen(false)}
            className={`block px-6 py-4 border-b border-white/5 ${active(
              "/user"
            )}`}
          >
            Dresseurs
          </Link>
          <Link
            to="/pokedex"
            onClick={() => setOpen(false)}
            className={`block px-6 py-4 ${active("/pokedex")}`}
          >
            Pokédex
          </Link>
        </div>
      )}
    </nav>
  );
}
