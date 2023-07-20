import { NavLink } from "react-router-dom";

export default function PetItems({ key, name, profilePic, city, state, country, availability }) {
  return (
    <div className="card" style={{ width: "100%" }}>
      <div>
        <img src={profilePic} alt={name} className="card-img"/>
      </div>
      <div className="card-body">
        <h1 className="pet-card-name">{name}</h1>
        <p className="card-text">
          {`Located in: ${city}, ${state}, ${country}`}
        </p>
        <p className="card-text">
          {`Availability: ${availability}`}
        </p>
        <NavLink to={`/pets/${key}`} className="px-btn px-btn-theme mt-2">
          Request Meetup
        </NavLink>
      </div>
    </div>
  );
}
