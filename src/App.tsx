import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import User from "./pages/User";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import Navbar from "./components/Navbar";

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
        <Route path="/pokedex" element={<Pokedex />} />
      </Routes>
    </>
  );
}

export default App;
