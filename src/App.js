import "./App.css";
import Header from "./components/Header";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Pets from "./components/Pets";
import Meetups from "./components/Meetups";

function App() {
  const location = useLocation();

  return (
    <div>
      <Header />
      <Routes locations={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/meetups" element={<Meetups />} />
      </Routes>
    </div>
  );
}

export default App;
