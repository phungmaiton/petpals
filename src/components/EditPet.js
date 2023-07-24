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

export default function EditPet({
  user,
  onLogin,
  setShowModal,
  closePopup,
  handlePetChange,
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const countries = useMemo(() => countryList().getData(), []);
  const pets = user.pets;
  const [selectedPet, setSelectedPet] = useState([]);

  const selectPet = (id) => {
    const selectedPet = pets.filter((pet) => pet.id == id);
    setSelectedPet(selectedPet);
  };

  const successAlert = () => {
    toast.success("Pet updated successfully", {
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
      pet_id: "",
      profile_pic: "",
      city: "",
      state: "",
      country: "",
      availability: "",
    },
    onSubmit: (values) => {
      setIsLoading(true);

      fetch(`https://petpals.onrender.com/pets/${values.pet_id}`, {
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

  useEffect(() => {
    if (selectedPet.length > 0) {
      formik.setValues({
        ...formik.values,
        profile_pic: selectedPet[0].profile_pic || "",
        city: selectedPet[0].city || "",
        state: selectedPet[0].state || "",
        country: selectedPet[0].country || "",
        availability: selectedPet[0].availability || "",
      });
    }
  }, [selectedPet]);
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
              <label className="form-label">Which pet are you editing?</label>
              <select
                id="pet_id"
                name="pet_id"
                className="form-control"
                onChange={(event) => {
                  formik.handleChange(event);
                  selectPet(event.target.value);
                }}
                value={formik.values.pet_id}
              >
                <option></option>
                {pets.map((pet) => (
                  <option key={pet.id} value={pet.id.toString()}>
                    {pet.name}
                  </option>
                ))}
              </select>
              <p className="error"> {formik.errors.pet_id}</p>
            </div>
            <div>
              <label className="form-label">Profile Picture</label>
              <input
                name="profile_pic"
                id="profile_pic"
                placeholder="Profile pic URL"
                className="form-control"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.profile_pic}
              />
              <p className="error"> {formik.errors.profile_pic}</p>
            </div>
            <div>
              <label className="form-label">City</label>
              <input
                name="city"
                id="city"
                placeholder=""
                className="form-control"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.city}
              />
              <p className="error"> {formik.errors.city}</p>
            </div>
            <div>
              <label className="form-label">State</label>
              <input
                name="state"
                id="state"
                placeholder=""
                className="form-control"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.state}
              />
              <p className="error"> {formik.errors.state}</p>
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
            <div>
              <label className="form-label">Availability</label>
              <textarea
                name="availability"
                id="availability"
                placeholder="Tell your potential pals what your schedule looks like"
                className="form-control"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.availability}
              />
              <p className="error"> {formik.errors.availability}</p>
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
