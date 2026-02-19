import { useState } from "react";

export default function CreateUser({
  users,
  setUsers,
}: {
  users: Array<string>;
  setUsers: (users: Array<string>) => void;
}) {
  const [username, setUsername] = useState("");

  const handleAddUser = () => {
    const newUser = username.trim();
    const isDuplicate = users.some(
      (existing) => existing.toLowerCase() === newUser.toLowerCase()
    );
    if (newUser && users.length < 2 && !isDuplicate) {
      setUsers([...users, newUser]);
      setUsername("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddUser();
    }
  };

  const isMaxUsersReached = users.length >= 2;

  return (
    <div className="panel p-8 border border-[#2c4ac7]/50 bg-[#0b1021]/85">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-[#ffde00] drop-shadow-[0_2px_0_#0b1021]">
          Créer un nouveau dresseur
        </h3>
        <span className="text-xs uppercase tracking-[0.2em] text-white/70">
          Max 2 slots
        </span>
      </div>

      {isMaxUsersReached ? (
        <div className="rounded-xl border border-[#ffde00]/60 bg-[#ffde00]/12 p-5 text-center">
          <p className="text-[#ffde00] font-semibold">
            ⚠️ Nombre maximum de dresseurs atteint (2)
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-white/85 text-sm font-semibold mb-2"
            >
              Nom du dresseur
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Entrez le nom du dresseur"
              maxLength={20}
              className="w-full px-4 py-3 rounded-lg border border-[#2c4ac7]/50 bg-[#0f162f] text-white placeholder-white/50 focus:outline-none focus:border-[#ffde00] focus:ring-2 focus:ring-[#ffde00]/35 transition"
            />
          </div>
          <button
            onClick={handleAddUser}
            disabled={!username.trim()}
            className="w-full bg-linear-to-r from-[#e3350d] to-[#c62614] text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 shadow-[0_15px_40px_rgba(227,53,13,0.35)] border border-[#2c4ac7]"
          >
            ✨ Créer le dresseur
          </button>
          {users.length > 0 && (
            <p className="text-sm text-white/75 text-center">
              {users.length}/2 dresseur{users.length > 1 ? "s" : ""} créé
              {users.length > 1 ? "s" : ""}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
