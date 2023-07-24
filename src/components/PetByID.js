import React, { useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import PageTransition from "./PageTransition";
import { useParams } from "react-router-dom";
import LoginPopup from "./LoginPopUp";
import RequestMeetup from "./RequestMeetup";

export default function PetByID({ user, onLogin }) {
  const [isLoading, setIsLoading] = useState(false);
  const [pet, setPet] = useState(null);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  console.log(pet);

  const closePopup = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://petpals.onrender.com/pets/${id}`)
      .then((response) => response.json())
      .then((pet) => {
        setPet(pet);
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

  if (!pet) {
    return <div>This pet doesn't exist.</div>;
  }

  if (pet) {
    return (
      <PageTransition>
        <section className="text-[#373737] pt-[120px] pb-[50px] lg:pt-[130px] lg:pb-[30px] bg-blue relative overflow-hidden">
          <div className="container mx-auto px-10">
            <div className="meetup-heading">
              <h1>Say hi to your new pal, {pet.name}! 🐾</h1>
            </div>
          </div>
        </section>
        <section className="pt-[40px] pb-[80px] lg:pt-[40px] lg:pb-[30px] relative overflow-hidden h-screen">
          <div className="container mx-auto px-10">
            <div className="grid lg:grid-cols-12 grid-cols-1 items-center">
              {/* PET PIC
                  ----------------*/}
              <div className="lg:col-span-8 text-center mb-[50px] lg:mb-0 lg:pb-[10px]">
                <div>
                  <img
                    className="pet-cover"
                    src={pet.profile_pic}
                    alt={pet.name}
                  />
                </div>
              </div>
              {/* PET INFO 
                  ----------------*/}
              <div className="lg:col-span-4 text-left mb-[50px] lg:mb-0 lg:ml-[10%] items-center">
                <div className="min-h-[300px]">
                  <div className="meetup-info">
                    <div className="flex items-center justify-center pb-1">
                      {pet.species == "dog ? "}
                      <h3>
                        About {pet.name} {pet.species == "dog" ? "🐶" : "🐱"}
                      </h3>
                    </div>
                    <ul>
                      <li>
                        <strong>Breed:</strong> {pet.breed}
                      </li>
                      <li>
                        <strong>Born:</strong> {pet.birth_year}
                      </li>
                      <li>
                        <strong>Located in:</strong> {pet.city}, {pet.state},{" "}
                        {pet.country}
                      </li>
                      <li>
                        <strong>Availability:</strong> {pet.availability}
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
                          Request Meetup with {pet.name}
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
                          Login to Send Meetup Request
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        {showModal ? (
          <>
            <RequestMeetup
              closePopup={closePopup}
              setShowModal={setShowModal}
              user={user}
              owner={pet.user}
            ></RequestMeetup>
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
}
