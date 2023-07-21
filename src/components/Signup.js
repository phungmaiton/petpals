import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "./PageTransition";

export default function Signup({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [profile_pic, setProfilePic] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
        email: email,
        profile_pic: profile_pic,
      }),
    })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => {
            onLogin(user);
            navigate("/dashboard"); // Redirect to the dashboard
          });
        } else {
          r.json().then((err) => setErrorMessage(err.error));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <PageTransition>
      <section className="pt-[120px] pb-[80px] lg:pt-[170px] lg:pb-[100px] bg-blue relative overflow-hidden">
        <div className="container mx-auto">
          <form onSubmit={handleSubmit} className="form">
            <div className="mb-5">
              <label htmlFor="username" className="form-instruction">
                Fill out your information to sign up
              </label>
            </div>
            <div>
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <div>
              <label htmlFor="password" className="form-label">
                Password Confirmation
              </label>
              <input
                type="password"
                id="password_confirmation"
                className="form-control"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <div>
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="profile_pic" className="form-label">
                Profile Image
              </label>
              <input
                type="text"
                id="profile_pic"
                className="form-control"
                value={profile_pic}
                onChange={(e) => setProfilePic(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" className="px-btn px-btn-theme mt-4">
                {isLoading ? "Loading..." : "Sign Up"}
              </button>
            </div>
            <div>
              {errorMessage && <div className="error">{errorMessage}</div>}
            </div>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}