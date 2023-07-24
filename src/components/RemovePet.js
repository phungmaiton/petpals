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

export default function RemovePet({
  user,
  onLogin,
  setShowModal,
  closePopup,
  handlePetChange,
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const pets = user.pets;

  console.log(pets);
  const successAlert = () => {
    toast.success("Pet deleted successfully", {
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
      pet_id: pets.length > 0 ? pets[0].id.toString() : "",
    },
    onSubmit: (values) => {
      setIsLoading(true);

      fetch(`https://petpals.onrender.com/pets/${values.pet_id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((user) => {
              handlePetChange();
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
            <div>
              <label className="form-label">
                Which pet would you like to remove?
              </label>
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
              <button type="onClick" className="px-btn px-btn-theme mt-4">
                {isLoading ? "Loading..." : "Remove"}
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
