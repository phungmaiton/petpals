import { useState, useMemo } from "react";
import { useFormik } from "formik";
import countryList from "react-select-country-list";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const failureAlert = () => {
  toast.warning("Failed to create pet.", {
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
  toast.success("Pet created successfully", {
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

export default function AddPetForm({ user, pets, setPets, onPetChange }) {
  const countries = useMemo(() => countryList().getData(), []);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      user_id: user.id,
      name: "",
      birth_year: "",
      species: "",
      breed: "",
      profile_pic: "",
      city: "",
      state: "",
      country: "",
      availability: "",
    },
    onSubmit: (values) => {
      const data = {
        user_id: values.user_id,
        name: values.name,
        birth_year: values.birth_year,
        species: values.species,
        breed: values.breed,
        profile_pic: values.profile_pic,
        city: values.city,
        state: values.state,
        country: values.country,
        availability: values.availability,
      };

      console.log(data);
      fetch("/pets", {
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
          //   const message = response.message;
          //   console.log("Response message:", message);
          if (response.name) {
            successAlert();
            formik.resetForm();
            onPetChange();
          } else {
            console.log("Failed to create pet.");
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
    <div className="container mx-auto form-container">
      <form
        onSubmit={formik.handleSubmit}
        id="pet-add-form"
        method="POST"
        className="form"
      >
        <div>
          <label className="form-label">Name</label>
          <input
            name="name"
            id="name"
            className="form-control"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          ></input>
          <p className="error"> {formik.errors.name}</p>
        </div>
        <div>
          <label className="form-label">Year of Birth</label>
          <input
            name="birth_year"
            id="birth_year"
            className="form-control"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.birth_year}
          />
          <p className="error"> {formik.errors.birth_year}</p>
        </div>
        <div>
          <label className="form-label">Species</label>
          <select
            name="species"
            id="species"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.species}
          >
            <option value="default" disabled selected>
              Dog or Cat?
            </option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
          <p className="error"> {formik.errors.species}</p>
        </div>
        <div>
          <label className="form-label">Breed</label>
          <input
            name="breed"
            id="breed"
            className="form-control"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.breed}
          />
          <p className="error"> {formik.errors.breed}</p>
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
          <label className="form-label">Pet Profile Picture</label>
          <input
            name="profile_pic"
            id="profile_pic"
            className="form-control"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.profile_pic}
          />
          <p className="error"> {formik.errors.profile_pic}</p>
        </div>

        <div>
          <button type="submit" className="px-btn px-btn-theme mt-4">
            {isLoading ? "Loading..." : "Create Pet"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
