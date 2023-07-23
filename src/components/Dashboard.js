import PageTransition from "./PageTransition";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import EditUser from "./EditUser";
import RemovePet from "./RemovePet";
import RemoveMeetup from "./RemoveMeetup";
import EditPet from "./EditPet";
import EditMeetup from "./EditMeetUp";

const RenderPets = ({ pets }) => {
  return pets.map((pet) => (
    <a className="attendees" key={pet.id} href={`/pets/${pet.id}`}>
      <img className="avatar mt-3 mb-2" src={pet.profile_pic} alt={pet.name} />
      <h3>{pet.name}</h3>
    </a>
  ));
};

const RenderMeetups = ({ meetups }) => {
  return meetups.map((meetup) => (
    <div
      className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center py-10"
      key={meetup.id}
    >
      <div className="col-span-1">
        <img
          src={
            meetup.image ? meetup.image : "/img/large_meeting_placeholder.png"
          }
          className="card-img rounded-lg"
        />
      </div>
      <div className="lg:col-span-3 ml-5">
        <h2>{meetup.title}</h2>
        <h4>Date: {meetup.date}</h4>
        <h4>Time: {meetup.time}</h4>
        <p className="mt-3">
          {meetup.details.length > 220
            ? meetup.details.substring(0, 220) + "..."
            : meetup.details}
        </p>
        <NavLink to={`/meetups/${meetup.id}`}>
          <button className="px-btn px-btn-theme mt-4">View Meetup</button>
        </NavLink>
      </div>
    </div>
  ));
};

export default function Dashboard({
  user,
  meetups,
  pets,
  onLogin,
  handleUserChange,
  handlePetChange,
  onUserChange,
  handleMeetupChange,
}) {
  const user_pets = user ? pets.filter((pet) => pet.user_id === user.id) : [];
  const user_meetups = user
    ? meetups.filter((meetup) => meetup.user_id === user.id)
    : [];

  const [showUserEditModal, setShowUserEditModal] = useState(false);
  const [showPetRemove, setShowPetRemove] = useState(false);
  const [showMeetupRemove, setShowMeetupRemove] = useState(false);
  const [showPetEdit, setShowPetEdit] = useState(false);
  const [showEditMeetup, setShowEditMeetup] = useState(false);
  const closeMeetupRemove = () => {
    setShowMeetupRemove(false);
  };
  const closeUserEditPopup = () => {
    setShowUserEditModal(false);
  };
  const closePetPopup = () => {
    setShowPetRemove(false);
  };
  const closePetEdit = () => {
    setShowPetEdit(false);
  };

  const closeMeetupEdit = () => {
    setShowEditMeetup(false);
  };

  const [errorMessage, setErrorMessage] = useState("");

  return (
    <PageTransition>
      {user && (
        <>
          <section className="pt-[150px] pb-[20px] lg:pt-[150px] lg:pb-[50px] bg-blue relative overflow-hidden">
            <div className="container mx-auto px-10">
              <div>
                <h1 className="text-[#373737] font-[600] text-[30px] lg:text-[35px] xl:text-[40px] leading-[1] mb-[25px] md:mb-[32px] px-3">
                  Hi, {user.username} 👋
                </h1>
              </div>
            </div>
          </section>
          <section className="py-[5%] lg:py-[5%] relative overflow-hidden">
            <div className="container mx-auto px-10">
              <div className="container mx-auto px-10">
                <div className="grid lg:grid-cols-12 grid-cols-1 grid gap-10 items-top">
                  {/* Personal Info
                  ------------------------------*/}
                  <div className="lg:col-span-6 text-left mb-0 lg:mb-0 dashboard-half">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-3">
                        <h2>Personal Information</h2>
                      </div>
                      <div
                        className="lg:col-span-1 text-right mb-0 lg:mb-0 lg:ml-[10%] flex justify-end items-top"
                        onClick={() => setShowUserEditModal(true)}
                      >
                        <div className="flex flex-col items-center spacy-y-1.5 relative text-xs ml-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pencil-square dashboard-icon cursor-pointer"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fillRule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                          <p>Edit</p>
                        </div>
                      </div>
                      <div className="col-span-4">
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Password: ***</p>
                      </div>
                    </div>
                  </div>
                  {/* Pet Info
                  ------------------------------*/}
                  <div className="lg:col-span-6 text-left mb-0 lg:mb-0 dashboard-half">
                    <div class="grid grid-cols-4 gap-4">
                      <div class="col-span-3">
                        <h2>Your Pets</h2>
                      </div>
                      <div className="lg:col-span-1 text-right mb-[50px] lg:mb-0 lg:ml-[10%] flex justify-end items-top">
                        <NavLink to="/add-pet">
                          <div className="flex flex-col items-center spacy-y-1.5 relative text-xs ml-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-plus-square dashboard-icon cursor-pointer"
                              viewBox="0 0 16 16"
                            >
                              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                            <p>Add</p>
                          </div>
                        </NavLink>

                        <div
                          className="flex flex-col items-center spacy-y-1.5 relative text-xs ml-3"
                          onClick={() => setShowPetRemove(true)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-x-square dashboard-icon cursor-pointer"
                            viewBox="0 0 16 16"
                          >
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                          <p>Remove</p>
                        </div>
                        <div
                          className="flex flex-col items-center spacy-y-1.5 relative text-xs ml-3"
                          onClick={() => setShowPetEdit(true)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pencil-square dashboard-icon cursor-pointer"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fillRule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                          <p>Edit</p>
                        </div>
                      </div>
                      <div className="col-span-4">
                        {user && user.pets && user.pets.length === 0 ? (
                          <div>You currently have no pets</div>
                        ) : (
                          <div className="flex text-center">
                            <RenderPets pets={user_pets} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container mx-auto px-10 pt-8">
                <div className="grid lg:grid-cols-12 grid-cols-1 items-top ">
                  {/* Meetup info
                  ------------------------------*/}
                  <div className="lg:col-span-12 text-left mb-[50px] lg:mb-0 dashboard-full">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-3">
                        <h2>Your Meetups</h2>
                      </div>
                      <div className="lg:col-span-1 text-right mb-[50px] lg:mb-0 lg:ml-[10%] flex justify-end items-top">
                        <NavLink to="/add-meetup">
                          <div className="flex flex-col items-center spacy-y-1.5 relative text-xs ml-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-plus-square dashboard-icon cursor-pointer"
                              viewBox="0 0 16 16"
                            >
                              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                            <p>Add</p>
                          </div>
                        </NavLink>

                        <div
                          className="flex flex-col items-center spacy-y-1.5 relative text-xs ml-3"
                          onClick={() => setShowMeetupRemove(true)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-x-square dashboard-icon cursor-pointer"
                            viewBox="0 0 16 16"
                          >
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                          <p>Remove</p>
                        </div>
                        <div
                          className="flex flex-col items-center spacy-y-1.5 relative text-xs ml-3"
                          onClick={() => setShowEditMeetup(true)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pencil-square dashboard-icon cursor-pointer"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fillRule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                          <p>Edit</p>
                        </div>
                      </div>
                    </div>
                    {user && user.meetups && user.meetups.length === 0 ? (
                      <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-3">
                          <div>You currently have no meetups</div>
                        </div>
                      </div>
                    ) : (
                      <RenderMeetups meetups={user_meetups} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      {showUserEditModal ? (
        <>
          <EditUser
            closePopup={closeUserEditPopup}
            setShowModal={setShowUserEditModal}
            onLogin={onLogin}
            user={user}
            handleUserChange={handleUserChange}
          />
        </>
      ) : null}
      {showPetRemove ? (
        <>
          <RemovePet
            closePopup={closePetPopup}
            setShowModal={setShowPetRemove}
            onLogin={onLogin}
            user={user}
            handlePetChange={handlePetChange}
          />
        </>
      ) : null}
      {showMeetupRemove ? (
        <>
          <RemoveMeetup
            closePopup={closeMeetupRemove}
            setShowModal={setShowMeetupRemove}
            onLogin={onLogin}
            user={user}
            handlePetChange={handlePetChange}
            handleMeetupChange={handleMeetupChange}
          />
        </>
      ) : null}

      {showPetEdit ? (
        <>
          <EditPet
            closePopup={closePetEdit}
            setShowModal={setShowPetEdit}
            onLogin={onLogin}
            user={user}
            handlePetChange={handlePetChange}
          />
        </>
      ) : null}
      {showEditMeetup ? (
        <>
          <EditMeetup
            closePopup={closeMeetupEdit}
            setShowModal={setShowEditMeetup}
            onLogin={onLogin}
            user={user}
            handleMeetupChange={handleMeetupChange}
          />
        </>
      ) : null}
    </PageTransition>
  );
}
