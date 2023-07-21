import { NavLink } from "react-router-dom";
import calculateDistance from "./Haversine";
import Geocode from "react-geocode";
import { useState, useEffect } from "react";

Geocode.setApiKey("AIzaSyAN_Pb8XbXRMZcpXQXax9GIyIfo0f5odgM");
export default function MeetupItems({
  title,
  details,
  image,
  id,
  street_address,
  city,
  state,
  country,
  userLocation,
  searchTerm,
}) {
  const [meetupLocation, setMeetupLocation] = useState({ lat: 0, lon: 0 });
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const meetupAddress = `${street_address}, ${city}, ${state}, ${country}`;
    Geocode.fromAddress(meetupAddress).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setMeetupLocation({ lat: lat, lon: lng });
      },
      (error) => {
        console.error(error);
      }
    );
  }, [street_address, city, state, country]);

  useEffect(() => {
    if (!searchTerm) {
      return;
    }
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lon,
      meetupLocation.lat,
      meetupLocation.lon
    );
    setDistance(distance);
  }, [userLocation, meetupLocation, searchTerm]);

  return (
    <div className="meetup-card" style={{ width: "100%" }}>
      <div>
        <img
          src={image ? image : "/img/small_meeting_placeholder.png"}
          alt={title}
          className="card-img"
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">
          {title.length > 28 ? title.substring(0, 28) + "..." : title}
        </h5>
        <p className="meetup-card-text">
          {details.length > 150 ? details.substring(0, 150) + "..." : details}
        </p>
        {searchTerm && (
          <p className="meetup-card-text">Distance: {distance.toFixed(2)} km</p>
        )}
        <div className="flex items-center justify-center">
          <NavLink to={`/meetups/${id}`} className="px-btn px-btn-theme">
            View Meetup
          </NavLink>
        </div>
      </div>
    </div>
  );
}
