import CreateUser from "../components/CreateUser";

export default function User({
  users,
  setUsers,
  selectedUser,
  setSelectedUser,
}: {
  users: Array<string>;
  setUsers: (users: Array<string>) => void;
  selectedUser: string | null;
  setSelectedUser: (user: string | null) => void;
}) {
  const changeUser = (userIndex: number) => {
    setSelectedUser(users[userIndex]);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(227,53,13,0.14),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(42,117,187,0.16),transparent_30%),radial-gradient(circle_at_78%_80%,rgba(255,203,5,0.14),transparent_28%)]" />
      <div className="relative container mx-auto px-4 pt-16 pb-16 max-w-4xl">
        <div className="flex items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-5xl font-black text-white drop-shadow-[0_3px_0_#2a2c74]">
              Entraîneurs Pokémon
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full border border-[#ffde00]/40 bg-[#0f122b]/80 text-xs text-[#ffde00]">
            <span className="h-2 w-2 rounded-full bg-[#ff3d3d] animate-pulse" />
            Slots restants : {Math.max(0, 2 - users.length)}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="panel p-8 border border-[#2c4ac7]/50 space-y-6 bg-[#0b1021]/80">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/70">
                  Entraîneur actif
                </p>
                <h2 className="text-3xl font-bold text-[#ffde00] drop-shadow-[0_2px_0_#2a2c74]">
                  {selectedUser ?? "Non sélectionné"}
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#ffde00] text-[#0f122b] border border-[#2a2c74]">
                Link
              </span>
            </div>
            <p className="text-white/75 text-sm leading-relaxed">
              Choisis ton profil principal pour synchroniser.
            </p>
            <div className="grid grid-cols-3 gap-3 text-sm">
              {[{ label: "Max slots", value: "2" }].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-[#2c4ac7]/50 bg-[#0f122b]/80 px-4 py-3"
                >
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">
                    {item.label}
                  </p>
                  <p className="text-lg font-semibold text-white mt-1">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <CreateUser users={users} setUsers={setUsers} />
        </div>

        {users.length > 0 && (
          <div className="panel p-8 border border-[#2c4ac7]/50 mt-8 bg-[#0b1021]/80">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#ffde00] drop-shadow-[0_2px_0_#2a2c74]">
                Tes entraîneurs
              </h3>
              <span className="text-xs uppercase tracking-[0.22em] text-white/70">
                Sélection rapide
              </span>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {users.map((user, index) => (
                <button
                  key={index}
                  onClick={() => changeUser(index)}
                  className={`group relative overflow-hidden rounded-xl border px-5 py-4 text-left transition-all ${
                    selectedUser === user
                      ? "border-[#ffde00]/70 bg-linear-to-r from-[#ff3d3d]/30 to-[#2c4ac7]/30"
                      : "border-[#2c4ac7]/50 bg-[#0f122b]/70 hover:border-[#ffde00]/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-white">{user}</p>
                    <span
                      className={`h-2 w-2 rounded-full opacity-70 group-hover:opacity-100 ${
                        selectedUser === user ? "bg-[#52ff42]" : "bg-[#ffde00]"
                      }`}
                    />
                  </div>
                  <p className="text-xs text-white/60 mt-1">
                    Choisir comme entraîneur actif
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
