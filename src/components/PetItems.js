import { NavLink } from "react-router-dom";

export default function PetItems({ id, name, profilePic, city, state, country, availability }) {
  return (
    <div className="card" style={{ width: "100%" }}>
      <div>
        <img src={profilePic} alt={name} className="card-img"/>
      </div>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          {`Located in: ${city}, ${state}, ${country}`}
        </p>
        <p className="card-text">
          {`Availability: ${availability}`}
        </p>
        <NavLink to={`/pets/${id}`} className="px-btn px-btn-theme mt-2">
          View Profile
        </NavLink>
      </div>
    </div>
  );
}
