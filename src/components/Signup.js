import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [profile_pic, setProfilePic] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
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
        profile_pic: profile_pic,
      }),
    })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => {
            onLogin(user);
            navigate("/"); // Redirect to the homepage
          });
        } else {
          r.json().then((err) => {
            console.log(err);
            setErrors(err.errors);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section className="pt-[120px] pb-[80px] lg:pt-[180px] lg:pb-[100px] relative overflow-hidden">
      <div className="container mx-auto">
        <form onSubmit={handleSubmit} className="form">
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
          {/* <div>
            {errors.map((err) => (
              <span key={err}>{err}</span>
            ))}
          </div> */}
        </form>
      </div>
    </section>
  );
}
