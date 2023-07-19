import { NavLink, useNavigate } from "react-router-dom";

export default function MeetupItems({ title, details, image, id }) {
  return (
    <div className="card" style={{ width: "100%" }}>
      <div>
        <img
          src={image ? image : "/img/small_meeting_placeholder.png"}
          alt={title}
          className="card-img"
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          {details.length > 150 ? details.substring(0, 150) + "..." : details}
        </p>
        <NavLink to={`/meetups/${id}`} className="px-btn px-btn-theme">
          View Meetup
        </NavLink>
      </div>
    </div>
  );
}
