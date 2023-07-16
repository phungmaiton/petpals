import "./App.css";
import Header from "./components/Header";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Pets from "./components/Pets";
import Meetups from "./components/Meetups";
import MeetUpByID from "./components/MeetUpByID";

function App() {
  const location = useLocation();

  return (
    <div>
      <Header />
      <Routes locations={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/meetups" element={<Meetups />} />
        <Route path="/meetups/:id" element={<MeetUpByID />} />
      </Routes>
    </div>
  );
}

export default App;
