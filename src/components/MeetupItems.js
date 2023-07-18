export default function MeetupItems({ title, details, image }) {
  return (
    <div className="card" style={{ width: "100%" }}>
      <div>
        <img src={image} alt={title} className="card-img" />
      </div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{details.substring(0, 150) + "..."}</p>
        <a href="#" className="px-btn px-btn-theme">
          View Meetup
        </a>
      </div>
    </div>
  );
}
