import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import PageTransition from "./PageTransition";
import AttendForm from "./AttendForm";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import LoginPopup from "./LoginPopUp";
import MapComponent from "./MapComponent";


const AttendeeList = ({ attendee }) => {
  return (
    <div className="attendees">
      <img className="avatar mt-3 mb-2" src={attendee.profile_pic} />
      <p>
        <strong>{attendee.name}</strong>
      </p>
    </div>
  );
};

export default function MeetUpByID({
  user,
  meetupAttendees,
  onAttendeeChange,

  deleteMeetup,
  handleMeetupEdit

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
      method: 'DELETE'
    })
    .then(() => {
      deleteMeetup(meetup)
      navigate('/dashboard')
    })
  }


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
                      : "data:image/jpeg;base64,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"
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
          <Dashboard
          handleDelete = {handleDelete}
          ></Dashboard>
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
