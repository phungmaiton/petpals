import { NavLink } from "react-router-dom";

export default function MeetupItemsHome({
  title,
  details,
  image,
  id,
  street_address,
  city,
  state,
  country,
}) {
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
        <div className="flex items-center justify-center">
          <NavLink to={`/meetups/${id}`} className="px-btn px-btn-theme">
            View Meetup
          </NavLink>
        </div>
      </div>
    </div>
  );
}
