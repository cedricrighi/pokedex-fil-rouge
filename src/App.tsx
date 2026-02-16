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
import ZoomMystery from "./components/games/ZoomMystery";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

function ProtectedLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  const [users, setUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<ProtectedLayout />}>
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
            <Route path="zoom-mystery" element={<ZoomMystery />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
