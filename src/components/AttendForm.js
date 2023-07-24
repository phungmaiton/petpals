import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";

const failureAlert = () => {
  toast.warning("This pet is already attending. Please choose another pet.", {
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

export default function AttendForm({
  closePopup,
  meetup_id,
  pets,
  setShowModal,
  onAttendeeChange,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const successAlert = () => {
    toast.success("Successfully attending.", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  const formik = useFormik({
    initialValues: {
      meetup_id: meetup_id,
      pet_id: pets.length > 0 ? pets[0].id.toString() : "",
    },
    onSubmit: (values) => {
      const data = {
        meetup_id: meetup_id,
        attendee_id: parseInt(values.pet_id, 10),
      };
      console.log(data);
      console.log(values);
      fetch("https://petpals.onrender.com/meetup-attendees", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.message === "successful") {
            successAlert();
            formik.resetForm();
            onAttendeeChange();
          } else {
            failureAlert();
          }
        })
        .catch((errors) => {
          console.log("Errors", errors);
          failureAlert();
        });
    },
  });
  return (
    <div className="px-modal mfp-hide">
      <div className="popup">
        <div className="grid grid-cols-1 gx-3">
          <form
            onSubmit={formik.handleSubmit}
            id="attendee-form"
            method="POST"
            className="popup-form"
          >
            <div>
              <label className="form-label">Which pet is attending?</label>
              <select
                id="pet_id"
                name="pet_id"
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.pet_id}
              >
                {pets.map((pet) => (
                  <option key={pet.id} value={pet.id.toString()}>
                    {pet.name}
                  </option>
                ))}
              </select>
              <p className="error"> {formik.errors.pet_id}</p>
            </div>
            <div>
              <button type="submit" className="px-btn px-btn-theme mt-4">
                {isLoading ? "Loading..." : "Attend"}
              </button>
            </div>
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
