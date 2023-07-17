import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

/*--------------------
* Header
----------------------*/

export default function Header({ user, setUser }) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const navigate = useNavigate();
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" })
      .then((r) => {
        if (r.ok) {
          setUser(null);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <header className="main-header fixed left-0 right-0 z-[111]">
        <div className="container mx-auto px-10 flex items-center justify-between relative py-5 lg:py-3 ">
          <div className="logo">
            <NavLink to="/">
              <img src="/img/logo.png" title="Logo" alt="Logo" width="177px" />
            </NavLink>
          </div>
          <button
            className="lg:hidden mobile_toggle w-[40px] flex flex-col"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          >
            <span className="w-[25px] h-[2px] bg-slate-900 inline-block"></span>
            <span className="w-[25px] h-[2px] bg-slate-900 inline-block my-[5px]"></span>
            <span className="w-[25px] h-[2px] bg-slate-900 inline-block"></span>
          </button>
          <div
            className={`navbar-collapse flex ${isOpenMenu ? "menu-open" : ""}`}
          >
            <ul className="navbar lg:mx-auto flex flex-col lg:flex-row p-4 lg:p-0">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/pets">Pets</NavLink>
              </li>
              <li>
                <NavLink to="/meetups">Meetups</NavLink>
              </li>
            </ul>
          </div>
          <>
            {user && (
              <>
                <div className="ms-auto hidden lg:flex pr-[10px]">
                  <NavLink className="px-btn px-btn-theme" to="/dashboard">
                    Dashboard
                  </NavLink>
                </div>
                <div className="ms-auto hidden lg:flex">
                  <NavLink
                    className="px-btn px-btn-dark"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </NavLink>
                </div>
              </>
            )}
          </>
          {!user && (
            <>
              <div className="ms-auto hidden lg:flex pr-[10px]">
                <NavLink className="px-btn px-btn-dark" to="/login">
                  Login
                </NavLink>
              </div>
              <div className="ms-auto hidden lg:flex">
                <NavLink className="px-btn px-btn-theme" to="/signup">
                  Signup
                </NavLink>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}