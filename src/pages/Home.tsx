import Loader from "../components/Loader";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(227,53,13,0.16),transparent_32%),radial-gradient(circle_at_80%_15%,rgba(42,117,187,0.16),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(255,203,5,0.14),transparent_28%)]" />
      <div className="panel max-w-3xl w-full text-center p-12 border border-white/10 bg-[#0b1021]/85">
        <p className="text-sm uppercase tracking-[0.26em] text-[#ffcb05]">
          Pokédex Kanto
        </p>
        <h1 className="text-5xl font-bold text-white mt-4 mb-6">
          Bienvenue, dresseur.
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto">
          Choisis une action ci-dessous : créer jusqu&apos;à deux dresseurs ou
          ouvrir le Pokédex.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/pokedex"
            className="px-6 py-3 rounded-lg bg-linear-to-r from-[#e3350d] to-[#c62614] text-white font-semibold border border-[#2a75bb]"
          >
            Accéder au Pokédex
          </Link>
          <Link
            to="/user"
            className="px-6 py-3 rounded-lg bg-[#ffcb05] text-[#0b1021] font-semibold border border-[#c62614]"
          >
            Gérer mes dresseurs
          </Link>
        </div>
        <div className="mt-10 flex justify-center">
          <Loader label="En attente d'action" size={72} />
        </div>
      </div>
    </div>
  );
}
