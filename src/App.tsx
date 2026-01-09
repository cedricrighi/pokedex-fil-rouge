import { useState } from "react";
import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import User from "./pages/User";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import Navbar from "./components/Navbar";
import PokemonDetails from "./pages/PokemonDetails";
import Game from "./pages/Game";
import GuessPokemon from "./components/games/GuessPokemon";
import FindPokemonByImage from "./components/games/FindPokemonByImage";

function App() {
  const [users, setUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/user"
          element={
            <User
              users={users}
              setUsers={setUsers}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          }
        />
        <Route path="/pokedex" element={<Outlet />}>
          <Route index element={<Pokedex />} />
          <Route path="pokemon/:id" element={<PokemonDetails />} />
        </Route>
        <Route path="/games" element={<Outlet />}>
          <Route index element={<Game />} />
          <Route path="guess-pokemon" element={<GuessPokemon />} />
          <Route
            path="find-pokemon-by-image"
            element={<FindPokemonByImage />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
