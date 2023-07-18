import Header from "./components/Header";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Pets from "./components/Pets";
import Meetups from "./components/Meetups";
import MeetUpByID from "./components/MeetUpByID";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import { useState, useEffect } from "react";

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user session.");
        }
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // if (!user) return <Login onLogin={setUser} />;

  return (
    <div>
      <Header user={user} setUser={setUser} />
      <Routes locations={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/meetups" element={<Meetups />} />
        <Route path="/meetups/:id" element={<MeetUpByID />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/signup" element={<Signup onLogin={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
