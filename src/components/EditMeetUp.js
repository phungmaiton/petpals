import { useState, useMemo, useEffect } from "react";
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
  toast.warning("Failed to edit user.", {
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

export default function EditMeetup({
  user,
  onLogin,
  setShowModal,
  closePopup,
  handleMeetupChange,
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const countries = useMemo(() => countryList().getData(), []);
  const [startDate, setStartDate] = useState(new Date());
  const meetups = user.meetups;
  const [selectedMeetup, setSelectedMeetup] = useState([]);

  const selectMeetup = (id) => {
    const selectedMeetup = meetups.filter((meetup) => meetup.id == id);
    setSelectedMeetup(selectedMeetup);
  };

  const successAlert = () => {
    toast.success("Meetup updated successfully", {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      setShowModal(false);
      window.location.reload();
    }, 3000);
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      title: "",
      venue: "",
      street_address: "",
      city: "",
      state: "",
      country: "",
      date: "",
      time: "",
      image: "",
      details: "",
    },
    onSubmit: (values) => {
      setIsLoading(true);

      fetch(`/meetups/${values.id}`, {
        method: "PATCH",
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((pet) => {
              handleMeetupChange();
            });
          }
        })
        .then((response) => {
          // console.log("Server response:", response);
          // const message = response.message;
          // console.log("Response message:", message);
          // if (message === "successful") {
          successAlert();
          formik.resetForm();

          // else {
          //   console.log("Failed to update user");
          //   failureAlert();
          // }
        })
        .catch((errors) => {
          console.log("Errors", errors);
          failureAlert();
        });
    },
  });

  useEffect(() => {
    if (selectedMeetup.length > 0) {
      formik.setValues({
        ...formik.values,
        title: selectedMeetup[0].title || "",
        details: selectedMeetup[0].details || "",
        venue: selectedMeetup[0].venue || "",
        street_address: selectedMeetup[0].street_address || "",
        city: selectedMeetup[0].city || "",
        state: selectedMeetup[0].state || "",
        country: selectedMeetup[0].country || "",
        date: selectedMeetup[0].date || "",
        time: selectedMeetup[0].time || "",
        image: selectedMeetup[0].image || "",
      });
    }
  }, [selectedMeetup]);
  return (
    <div className="px-modal mfp-hide">
      <div className="popup">
        <div className="grid grid-cols-1 gx-3">
          <form
            onSubmit={formik.handleSubmit}
            id="user-edit-form"
            method="PATCH"
            className="form"
          >
            <h3 className="mb-3">Edit the fields you want to update</h3>
            <div>
              <label className="form-label">
                Which meetup are you editing?
              </label>
              <select
                id="id"
                name="id"
                className="form-control"
                onChange={(event) => {
                  formik.handleChange(event);
                  selectMeetup(event.target.value);
                }}
                value={formik.values.id}
              >
                <option></option>
                {meetups.map((meetup) => (
                  <option key={meetup.id} value={meetup.id.toString()}>
                    {meetup.title}
                  </option>
                ))}
              </select>
              <p className="error"> {formik.errors.id}</p>
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
              <label className="form-label">Cover Image URL</label>
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
              <button type="onClick" className="px-btn px-btn-theme mt-4">
                {isLoading ? "Loading..." : "Update"}
              </button>
            </div>
            {/* <div>{errorMessage && <div className="error">{errorMessage}</div>}</div> */}
          </form>
          <button className="px-close" onClick={closePopup}>
            <i className="fa fa-times"></i>
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
