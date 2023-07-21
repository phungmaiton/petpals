import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";

const failureAlert = () => {
  toast.warning("Message send unsuccessful.", {
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

export default function RequestMeetup({
    closePopup,
    setShowModal,
    user
  }) {
    const [isLoading, setIsLoading] = useState(false);
    const successAlert = () => {
      toast.success("Successfully sent meetup request.", {
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
        username: user.username
      },
      onSubmit: (values) => {
        const data = {
          username: user.username
        };
        fetch("/send", {
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
              id="meetup-request"
              method="POST"
              className="popup-form"
            >
              <div>
                <label className="form-label">Schedule a playdate:</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  placeholder="Include a little bit about your pet and when you would like your furry friends to meet"
                  onChange={formik.handleChange}
                  value={formik.values.message}
                >
                </textarea>
                <p className="error"> {formik.errors.message}</p>
              </div>
              <div>
                <button type="submit" className="px-btn px-btn-theme mt-4">
                  {isLoading ? "Loading..." : "Send Request"}
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