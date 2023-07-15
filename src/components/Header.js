import { useState } from "react";
import { NavLink } from "react-router-dom";

/*--------------------
* Header
----------------------*/
export default function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <>
      <header className="main-header fixed left-0 right-0 z-[111] container mx-auto px-4">
        <div className="container flex items-center justify-between relative py-5 lg:py-3">
          <div className="logo">
            <NavLink to="/">
              <img src="img/logo.png" title="Logo" alt="Logo" width="177px" />
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
              {isOpenMenu && (
                <div className="lg:flex pr-[10px]">
                  <NavLink className="px-btn px-btn-dark" to="login">
                    Login
                  </NavLink>
                </div>
              )}
              {isOpenMenu && (
                <div className="pt-2 lg:flex pr-[10px]">
                  <NavLink className="px-btn px-btn-theme" to="signup">
                    Signup
                  </NavLink>
                </div>
              )}
            </ul>
          </div>
          <div className="ms-auto hidden lg:flex pr-[10px]">
            <NavLink className="px-btn px-btn-dark" to="login">
              Login
            </NavLink>
          </div>
          <div className="ms-auto hidden lg:flex">
            <NavLink className="px-btn px-btn-theme" to="signup">
              Signup
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
}
