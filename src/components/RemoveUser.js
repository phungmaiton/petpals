import { useState, useMemo } from "react";
import { useFormik } from "formik";
import countryList from "react-select-country-list";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const failureAlert = () => {
  toast.warning("Failed to remove meetup.", {
    position: "bottom-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
};

const successAlert = () => {
  toast.success("Meetup removed successfully", {
    position: "bottom-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
};

export default function RemoveUser({
  user,
  onMeetupAdded,
  onAttendeeChange,
  meetups,
}) {
  const navigate = useNavigate();
  const countries = useMemo(() => countryList().getData(), []);
  const [isLoading, setIsLoading] = useState(false);
  const [pets, setPets] = useState(user && user.pets ? user.pets : []);
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState("10:00");

  //   const formSchema = yup.object().shape({
  //     pet_id: yup.number().required("Please select a pet"),
  //     venue: yup.string().required("Please enter a venue name"),
  //     street_address: yup
  //       .string()
  //       .required("Please enter a valid street address"),
  //     city: yup.string().required("Please enter a valid city"),
  //     state: yup.string().required("Please enter a valid state"),
  //     date: yup.string().required("Please select a date"),
  //     time: yup.string().required("Please select a time"),
  //   });

  console.log(meetups);
  const last_meetup_id = meetups.slice(-1)[0].id;
  const newMeetupId = last_meetup_id + 1;
  console.log(last_meetup_id);
  const formik = useFormik({
    initialValues: {
      user_id: user.id,
      pet_id: pets.length > 0 ? pets[0].id.toString() : "",
      title: "",
      venue: "",
      street_address: "",
      city: "",
      state: "",
      country: "",
      date: new Date(),
      time: "10:00",
      image: "",
      details: "",
    },
    onSubmit: (values) => {
      setIsLoading(true);
      const data = {
        user_id: values.user_id,
        pet_id: parseInt(values.pet_id),
        venue: values.venue,
        street_address: values.street_address,
        city: values.city,
        state: values.state,
        country: values.country,
        date: values.date.toISOString().slice(0, 10),
        time: values.time,
        image: values.image,
        title: values.title,
        details: values.details,
      };

      const attendData = {
        meetup_id: parseInt(newMeetupId),
        attendee_id: parseInt(values.pet_id),
      };
      console.log(data);
      fetch("/meetups", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("Server response:", response);
          const message = response.message; // Extract the message value for success/failure indication
          console.log("Response message:", message);
          if (message === "Meetup created successfully.") {
            setIsLoading(false);
            successAlert();
            formik.resetForm();
            onMeetupAdded();
          } else {
            console.log("Failed to create meetup");
            failureAlert();
          }
        })
        .catch((errors) => {
          console.log("Errors", errors);
          failureAlert();
        });

      fetch("/meetup-attendees", {
        method: "POST",
        body: JSON.stringify(attendData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.message === "successful") {
            onAttendeeChange();
          } else {
            failureAlert();
          }
        })
        .catch((errors) => {
          console.log("Errors", errors);
        });
    },
  });
  return (
    <div className="container mx-auto form-container">
      <form
        onSubmit={formik.handleSubmit}
        id="meetup-add-form"
        method="POST"
        className="form"
      >
        <div>
          <label className="form-label">Select Pet</label>
          <select
            id="pet_id"
            name="pet_id"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.pet_id}
          >
            {pets.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.name}
              </option>
            ))}
          </select>
          <p className="error"> {formik.errors.pet_id}</p>
        </div>
        <div>
          <label className="form-label">Title</label>
          <input
            name="title"
            id="title"
            placeholder="Give your meetup a cool name"
            className="form-control"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <p className="error"> {formik.errors.venue}</p>
        </div>
        <div>
          <label className="form-label">Details</label>
          <textarea
            name="details"
            id="details"
            placeholder=""
            className="form-control"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.details}
          />
          <p className="error"> {formik.errors.venue}</p>
        </div>
        <div>
          <label className="form-label">Venue Name</label>
          <input
            name="venue"
            id="venue"
            placeholder="Enter Your Venue Name. E.g: Dog Park"
            className="form-control"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.venue}
          />
          <p className="error"> {formik.errors.venue}</p>
        </div>
        <div>
          <label className="form-label">Street Address</label>
          <input
            name="street_address"
            id="street_address"
            className="form-control"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.street_address}
          />
          <p className="error"> {formik.errors.street_address}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-1">
            <label className="form-label">City</label>
            <input
              name="city"
              id="city"
              className="form-control"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.city}
            />
            <p className="error"> {formik.errors.city}</p>
          </div>
          <div className="col-span-1">
            <label className="form-label">State</label>
            <input
              name="state"
              id="state"
              className="form-control"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.state}
            />
            <p className="error"> {formik.errors.state}</p>
          </div>
        </div>
        <div>
          <label className="form-label">Country</label>
          <select
            id="country"
            name="country"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.country}
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.label}
              </option>
            ))}
          </select>
          <p className="error"> {formik.errors.country}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-1">
            <label className="form-label">Date</label>
            <div>
              <DatePicker
                className="form-control"
                name="date"
                selected={startDate}
                onChange={(date) => formik.setFieldValue("date", date)}
                minDate={new Date()}
              />
            </div>
            <p className="error"> {formik.errors.date}</p>
          </div>
          <div className="col-span-1">
            <label className="form-label">Time</label>
            <div>
              <TimePicker
                name="time"
                onChange={(time) => formik.setFieldValue("time", time)}
                value={formik.values.time}
                className="form-time"
                clearIcon={null}
              />
            </div>
            <p className="error"> {formik.errors.time}</p>
          </div>
        </div>
        <div>
          <label className="form-label">Image</label>
          <input
            name="image"
            id="image"
            className="form-control"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.image}
          />
          <p className="error"> {formik.errors.image}</p>
        </div>

        <div>
          <button type="submit" className="px-btn px-btn-theme mt-4">
            {isLoading ? "Loading..." : "Create Meetup"}
          </button>
        </div>
        {/* <div>{errorMessage && <div className="error">{errorMessage}</div>}</div> */}
      </form>
      <ToastContainer />
    </div>
  );
}
