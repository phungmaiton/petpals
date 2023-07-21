import { NavLink } from "react-router-dom";

export default function PetItems({ id, name, profilePic, city, state, country, availability }) {
  return (
    <div className="card" style={{ width: "100%" }}>
      <div>
        <img src={profilePic} alt={name} className="card-img"/>
      </div>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text pb-[1rem]">
          <strong>Located in:</strong> {city}, {state}, {country}
          <br />
          <strong>Availability:</strong> {availability}
        </p>
        <div className="flex items-center justify-center">
          <NavLink to={`/pets/${id}`} className="px-btn px-btn-theme mt-2">
            View Profile
          </NavLink>
        </div>
      </div>
    </div>
  );
}
