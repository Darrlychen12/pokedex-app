import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import PokemonGrid from "./components/PokemonGrid/PokemonGrid";
import Details from "./components/Detaills/Details";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const MenuItems = [
  {
    title: "My Pokemon",
    url: "/mypokemon",
    cName: "nav-links",
  },
  {
    title: "Trainer Profile",
    url: "/trainerprofile",
    cName: "nav-links",
  },
  {
    title: "Mobile View",
    url: "#",
    cName: "nav-links-mobile",
  },
];

function App() {
  return (
    <div className="App">
      <Navbar MenuItems={MenuItems} />
      <Router>
        <Routes>
          <Route path="/" element={<PokemonGrid />} />
          <Route path="/details/:pokemonName" element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
