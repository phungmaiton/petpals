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
import EditMeetUp from './components/EditMeetUp'
import { useNavigate } from "react-router-dom";

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [meetups, setMeetups] = useState([]);
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [meetupAttendees, setMeetupAttendees] = useState([]);
  const [meetupToEdit, setMeetupToEdit] = useState(false)
  const navigate = useNavigate();

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
        setIsLoading(false);
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
  }, []);

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

  const updateMeetup = (meetupToUpdate) => {
    setMeetups(meetups => meetups.map(meetup => {
      if (meetup.id === meetupToUpdate.id) {
        return meetupToUpdate
      } else {
        return meetup
      }
    }))
  }

  const handleEdit = (meetup) => {
    setMeetupToEdit(meetup)
    navigate(`/meetups/${meetup.id}/edit-meetup`)
  }

  const deleteMeetup = (deletedMeetup) => {
    setMeetups(meetups => 
      meetups.filter(meetup => meetup.id !== deletedMeetup.id))
  }

  return (
    <div>
      <Header user={user} setUser={setUser} />
      <Routes locations={location} key={location.pathname}>
        <Route
          path="/"
          element={<Home isLoading={isLoading} meetups={meetups} />}
        />
        <Route path="/pets" element={<Pets isLoading={isLoading} />} />
        <Route
          path="/meetups"
          element={
            <Meetups
              meetups={meetups}
              isLoading={isLoading}
              user={user}
              pets={pets}
              meetupAttendees={meetupAttendees}
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
              handleEdit = {handleEdit}
              deleteMeetup = {deleteMeetup}
            />
          }
        />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/signup" element={<Signup onLogin={setUser} />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard 
              user={user} 
              meetups={meetups} 
              pets={pets} 
              
            />
          }
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
          path="/meetups/id/edit-meetup"
          element={
            <EditMeetUp
              user={user}
              pet={pets}
              onMeetupAdded={handleRefreshMeetups}
              meetups={meetups}
              updateMeetup = {updateMeetup}
              meetupToEdit ={meetupToEdit}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
