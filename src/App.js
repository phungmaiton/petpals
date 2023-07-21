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
import Footer from "./components/Footer";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAN_Pb8XbXRMZcpXQXax9GIyIfo0f5odgM");
const fetchMeetupLocation = async (meetup) => {
  const { street_address, city, state, country } = meetup;
  const meetupAddress = `${street_address}, ${city}, ${state}, ${country}`;

  try {
    const response = await Geocode.fromAddress(meetupAddress);
    const { lat, lng } = response.results[0].geometry.location;
    return { ...meetup, latitude: lat, longitude: lng };
  } catch (error) {
    console.error(error);
    return null;
  }
};
const calculateLatLongForMeetups = async (meetups) => {
  const updatedMeetups = await Promise.all(meetups.map(fetchMeetupLocation));
  return updatedMeetups.filter((meetup) => meetup !== null);
};

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [meetups, setMeetups] = useState([]);
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [meetupAttendees, setMeetupAttendees] = useState([]);
  const [updatedMeetups, setUpdatedMeetups] = useState([]);
  const [isMeetupsLoading, setIsMeetupsLoading] = useState(true);

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
    setIsLoading(true);
    fetch("/meetups")
      .then((response) => response.json())
      .then((meetups) => {
        setMeetups(meetups);
        setIsMeetupsLoading(false);
      });
  }, []);
  useEffect(() => {
    setIsLoading(true);
    fetch("/pets")
      .then((response) => response.json())
      .then((pets) => {
        setPets(pets);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("/meetup-attendees")
      .then((response) => response.json())
      .then((ma) => {
        setMeetupAttendees(ma);
      });
  }, [meetups]);

  function handleRefreshMeetups() {
    setIsLoading(true);
    fetch("/meetups")
      .then((response) => response.json())
      .then((meetups) => {
        setMeetups(meetups);
        setIsLoading(false);
      });
  }

  function handleAttendeeChange() {
    fetch("/meetup-attendees")
      .then((response) => response.json())
      .then((ma) => {
        setMeetupAttendees(ma);
      });
  }

  function handlePetChange() {
    fetch("/pets")
      .then((response) => response.json())
      .then((pets) => {
        setPets(pets);
      });
  }

  useEffect(() => {
    if (!isMeetupsLoading) {
      calculateLatLongForMeetups(meetups).then((updatedMeetups) => {
        setUpdatedMeetups(updatedMeetups);
      });
    }
  }, [isMeetupsLoading, meetups]);

  return (
    <div>
      <Header user={user} setUser={setUser} />
      <Routes locations={location} key={location.pathname}>
        <Route
          path="/"
          element={<Home isLoading={isLoading} meetups={meetups} />}
        />
        <Route
          path="/pets"
          element={<Pets isLoading={isLoading} pets={pets} />}
        />
        <Route
          path="/meetups"
          element={
            <Meetups
              meetups={updatedMeetups}
              isLoading={isLoading}
              user={user}
              pets={pets}
              meetupAttendees={meetupAttendees}
              onLogin={setUser}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          }
        />
        <Route
          path="/meetups/:id"
          element={
            <MeetUpByID
              user={user}
              pet={pets}
              meetupAttendees={meetupAttendees}
              onAttendeeChange={handleAttendeeChange}
              onLogin={setUser}
            />
          }
        />

        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/signup" element={<Signup onLogin={setUser} />} />
        <Route
          path="/dashboard"
          element={<Dashboard user={user} meetups={meetups} pets={pets} />}
        />
        <Route
          path="/add-meetup"
          element={
            <AddMeetUp
              user={user}
              onMeetupAdded={handleRefreshMeetups}
              onAttendeeChange={handleAttendeeChange}
              meetups={meetups}
            />
          }
        />
        <Route
          path="/add-pet"
          element={
            <AddPet
              user={user}
              pets={pets}
              setPets={setPets}
              onPetChange={handlePetChange}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
