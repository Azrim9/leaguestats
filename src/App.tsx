import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Matches from "./views/Matches";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile/:puuid" element={<Profile />} />
      <Route path="/matches/:puuid" element={<Matches />} />
    </Routes>
  );
}

export default App;
