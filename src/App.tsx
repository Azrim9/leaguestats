import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Profile from "./views/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile/:puuid" element={<Profile />} />
    </Routes>
  );
}

export default App;
