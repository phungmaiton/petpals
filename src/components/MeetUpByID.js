import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import PageTransition from "./PageTransition";
import AttendForm from "./AttendForm";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import LoginPopup from "./LoginPopUp";
import MapComponent from "./MapComponent";
import { NavLink } from "react-router-dom";

const AttendeeList = ({ attendee }) => {
  return (
    <div className="attendees">
      <NavLink to={`/pets/${attendee.id}`}>
        <img className="avatar mt-3 mb-2" src={attendee.profile_pic} />
        <p>
          <strong>{attendee.name}</strong>
        </p>
      </NavLink>
    </div>
  );
};

export default function MeetUpByID({
  user,
  meetupAttendees,
  onAttendeeChange,
  deleteMeetup,
  handleMeetupEdit,
  onLogin,
}) {
  const { id } = useParams();
  const [meetup, setMeetup] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("/pets")
      .then((response) => response.json())
      .then((pets) => {
        setPets(pets);
      });
  }, []);

  const closePopup = () => {
    setShowModal(false);
  };

  const user_pets = user ? user.pets : [];

  const attending_pet_id = meetupAttendees
    .filter((meetupAttendee) => meetupAttendee.meetup_id == id)
    .map((meetupAttendee) => meetupAttendee.attendee_id);

  console.log(attending_pet_id);
  console.log(pets);
  const attending_pets = pets.filter((pet) =>
    attending_pet_id.includes(pet.id)
  );

  useEffect(() => {
    setIsLoading(true);
    fetch(`/meetups/${id}`)
      .then((response) => response.json())
      .then((meetup) => {
        setMeetup(meetup);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <section className="pt-[120px] pb-[80px] lg:pt-[130px] lg:pb-[30px] bg-blue relative overflow-hidden">
        <div className="container mx-auto px-10">
          <BarLoader color="#87AF73" />
        </div>
      </section>
    );
  }

  if (!meetup) {
    return <div>This meetup doesn't exist.</div>;
  }

  const handleDelete = (meetup) => {
    fetch(`/meetups/${meetup.id}`, {
      method: "DELETE",
    }).then(() => {
      deleteMeetup(meetup);
      navigate("/dashboard");
    });
  };

  const address = `${meetup.street_address}, ${meetup.city}, ${meetup.state}, ${meetup.country}`;

  return (
    <PageTransition>
      <section className="pt-[120px] pb-[80px] lg:pt-[130px] lg:pb-[30px] bg-blue relative overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="meetup-heading">
            <h1>{meetup.title}</h1>
            <div className="grid grid-cols-4 gap-1 md:grid-cols-6 lg:grid-cols-12 grid-cols-1 items-center">
              <div className="col-span-1 lg:col-span-1">
                <img
                  className="avatar mt-3 width-full"
                  src={
                    meetup.user.profile_pic
                      ? meetup.user.profile_pic
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                ></img>
              </div>
              <div className="col-span-3 ml-2 lg:col-span-4">
                <ul>
                  <li>Hosted by</li>
                  <li>
                    <strong>{meetup.user.username}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-[40px] pb-[80px] lg:pt-[40px] lg:pb-[30px] relative overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="grid lg:grid-cols-12 grid-cols-1 items-center">
            {/* COVER
            ----------------*/}
            <div className="lg:col-span-8 text-center mb-0 lg:mb-0">
              <div className="meetup-cover">
                <img
                  src={
                    meetup.image
                      ? meetup.image
                      : "/img/large_meeting_placeholder.png"
                  }
                />
              </div>
            </div>
            {/* EVENT INFO 
            ----------------*/}
            <div className="lg:col-span-4 text-left mb-[0px] lg:mb-0 lg:ml-[10%] items-center">
              <div className="min-h-[300px]">
                <div className="meetup-info">
                  <ul>
                    <li>
                      <strong>Date:</strong> {meetup.date}
                    </li>
                    <li>
                      <strong>Time:</strong> {meetup.time}
                    </li>
                    <li>
                      <strong>Venue:</strong> {meetup.venue}
                      <br />
                      {meetup.street_address}
                      <br />
                      {meetup.city}, {meetup.state}
                      <br />
                      {meetup.country}
                    </li>
                  </ul>
                </div>

                {user ? (
                  <div className="button-group">
                    <div className="pt-2 lg:flex pr-[10px]">
                      <button
                        className="px-btn px-btn-theme px_modal"
                        onClick={() => setShowModal(true)}
                      >
                        Attend
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="button-group">
                    <div className="pt-2 lg:flex pr-[10px]">
                      <button
                        className="px-btn px-btn-theme px_modal"
                        onClick={() => setShowLogin(true)}
                      >
                        Login to Attend
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-10">
          <div className="grid lg:grid-cols-12 grid-cols-1 items-center">
            {/* DETAILS 
            ----------------*/}
            <div className="lg:col-span-8 text-left mb-[0px] lg:mb-0 py-10">
              <div className="meetup-details">
                <h3>Details</h3>
                <p>{meetup.details}</p>
              </div>
              {/* ATTENDEE LIST 
            ----------------*/}

              <div className="attendee-list">
                <h3>Attendees</h3>
                <div className="flex text-center">
                  {attending_pets.map((pet) => (
                    <AttendeeList key={pet.id} attendee={pet} />
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 ml-8">
              <MapComponent address={address} />
            </div>
          </div>
        </div>
      </section>
      {showModal ? (
        <>
          <AttendForm
            closePopup={closePopup}
            setShowModal={setShowModal}
            meetup_id={id}
            pets={user_pets}
            onAttendeeChange={onAttendeeChange}
          ></AttendForm>
          <Dashboard handleDelete={handleDelete}></Dashboard>
        </>
      ) : null}
      {showLogin ? (
        <>
          <LoginPopup
            closePopup={closePopup}
            setShowModal={setShowLogin}
            onLogin={onLogin}
          ></LoginPopup>
        </>
      ) : null}
    </PageTransition>
  );
}
