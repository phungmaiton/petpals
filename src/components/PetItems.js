export default function PetItems({ name, profilePic, city, state, country, availability }) {
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
        <a href="#" className="px-btn px-btn-theme mt-2">
          View Pet
        </a>
      </div>
    </div>
  );
}
