import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { login } from "../utils/auth/auth";

type AuthLocationState = {
  from?: {
    pathname?: string;
    search?: string;
  };
};

export default function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as AuthLocationState | null;
  const redirectPath = state?.from?.pathname
    ? `${state.from.pathname}${state.from.search ?? ""}`
    : "/";

  const isAuthenticated =
    typeof window !== "undefined" &&
    Boolean(localStorage.getItem("pokedex-auth-user"));

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const success = await login(username, password);

      if (!success) {
        setErrorMessage("Connexion impossible, vérifie tes identifiants.");
        return;
      }

      navigate(redirectPath, { replace: true });
    } catch {
      setErrorMessage("Connexion impossible, serveur indisponible.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(227,53,13,0.24),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(42,117,187,0.24),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(255,203,5,0.2),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_45%,rgba(255,255,255,0.03))]" />

      <div className="relative mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-[#0b1021]/85 p-8 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        <p className="text-xs uppercase tracking-[0.28em] text-[#ffcb05]">
          Pokédex Access
        </p>
        <h1 className="mt-3 text-3xl font-black text-white">Connexion</h1>
        <p className="mt-2 text-sm text-white/70">
          Connecte-toi pour accéder au Pokédex.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-semibold text-white/85"
            >
              Nom d’utilisateur
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ex: Red"
              autoComplete="username"
              className="w-full rounded-lg border border-white/15 bg-[#0f162f] px-4 py-3 text-white placeholder:text-white/45 focus:border-[#ffcb05] focus:outline-none focus:ring-2 focus:ring-[#ffcb05]/30"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-white/85"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full rounded-lg border border-white/15 bg-[#0f162f] px-4 py-3 text-white placeholder:text-white/45 focus:border-[#ffcb05] focus:outline-none focus:ring-2 focus:ring-[#ffcb05]/30"
            />
          </div>

          {errorMessage && (
            <p className="rounded-lg border border-[#ef4444]/40 bg-[#ef4444]/12 px-3 py-2 text-sm text-[#ffb4b4]">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={!username.trim() || !password.trim() || isSubmitting}
            className="w-full rounded-lg border border-[#2a75bb] bg-linear-to-r from-[#e3350d] to-[#c62614] px-6 py-3 font-semibold text-white shadow-[0_15px_40px_rgba(227,53,13,0.35)] transition hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSubmitting ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </section>
  );
}
