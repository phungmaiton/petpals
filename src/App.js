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
import AddMeetUp from "./components/AddMeetUp";
import AddPet from "./components/AddPet";

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [meetups, setMeetups] = useState([]);
  const [pets, setPets] = useState([]);

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

  useEffect(() => {
    fetch("/meetups")
      .then((response) => response.json())
      .then((meetups) => setMeetups(meetups));
  }, []);

  useEffect(() => {
    fetch("/pets")
      .then((response) => response.json())
      .then((pets) => setPets(pets));
  }, []);

  return (
    <div>
      <Header user={user} setUser={setUser} />
      <Routes locations={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<Pets pets={pets} />} />
        <Route path="/meetups" element={<Meetups meetups={meetups} />} />
        <Route path="/meetups/:id" element={<MeetUpByID />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/signup" element={<Signup onLogin={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route
          path="/add-meetup"
          element={
            <AddMeetUp user={user} meetups={meetups} setMeetups={setMeetups} />
          }
        />
        <Route
          path="/add-pet"
          element={
            <AddPet user={user} pets={pets} setPets={setPets} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
