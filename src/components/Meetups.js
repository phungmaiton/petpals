import PageTransition from "./PageTransition";
import Pagination from "./Pagination";
import MeetupItems from "./MeetupItems";
import BarLoader from "react-spinners/BarLoader";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Search from "./Search";
import calculateDistance from "./Haversine";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAN_Pb8XbXRMZcpXQXax9GIyIfo0f5odgM");
export default function Meetups({
  meetups,
  isLoading,
  user,
  pets,
  onLogin,
  searchTerm,
  setSearchTerm,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [userLocation, setUserLocation] = useState({ lat: 0, lon: 0 });
  const [distanceRadius, setDistanceRadius] = useState(10);
  const [filteredMeetups, setFilteredMeetups] = useState([]);

  console.log(meetups);
  useEffect(() => {
    if (!searchTerm) {
      setFilteredMeetups(meetups);
      return;
    }
    Geocode.fromAddress(searchTerm).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setUserLocation({ lat: lat, lon: lng });

        const updatedMeetups = meetups.map((meetup) => ({
          ...meetup,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lon,
            meetup.latitude,
            meetup.longitude
          ),
        }));

        const filteredMeetups = updatedMeetups
          .filter((meetup) => meetup.distance <= distanceRadius)
          .sort((a, b) => a.date - b.date);
        setFilteredMeetups(filteredMeetups);
      },
      (error) => {
        console.error(error);
      }
    );
  }, [searchTerm, meetups, distanceRadius]);
  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const currentPosts = () => {
    if (searchTerm == "") {
      return meetups.slice(indexOfFirstPost, indexOfLastPost);
    } else {
      return filteredMeetups.slice(indexOfFirstPost, indexOfLastPost);
    }
  };
  return (
    <PageTransition>
      <section className="pt-[150px] pb-[20px] lg:pt-[150px] lg:pb-[50px] bg-blue relative overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="grid gril-cols-2 md:grid-cols-3 items-center">
            <div className="col-span-1 md:col-span-2">
              <h1 className="text-[#373737] font-[600] text-[30px] lg:text-[35px] xl:text-[40px] leading-[1] mb-[25px] md:mb-[32px] px-3">
                Explore Meetups
              </h1>
            </div>
            <div className="col-span-1 flex justify-end">
              {user && (
                <NavLink to={"/add-meetup"} className="px-btn px-btn-theme">
                  Add Meetup
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="py-[5%] lg:py-[3%] relative overflow-hidden">
        <div className="container mx-auto px-10">
          <Search
            setSearchTerm={setSearchTerm}
            setDistanceRadius={setDistanceRadius}
          />
          <div className="column-div">
            {isLoading ? (
              <BarLoader color="#87AF73" />
            ) : (
              currentPosts().map((meetup) => (
                <MeetupItems
                  key={meetup.id}
                  title={meetup.title}
                  details={meetup.details}
                  image={meetup.image}
                  id={meetup.id}
                  street_address={meetup.street_address}
                  city={meetup.city}
                  state={meetup.state}
                  country={meetup.country}
                />
              ))
            )}
          </div>
          <Pagination
            paginate={paginate}
            array={filteredMeetups}
            postsPerPage={postsPerPage}
          />
        </div>
      </section>
    </PageTransition>
  );
}
