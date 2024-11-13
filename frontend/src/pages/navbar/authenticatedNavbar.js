import { SignUp } from '../signUp/signUp';
import { Login } from '../login/login';
import { useState } from 'react';
import { LogoutUser } from '../../services/userApi';
export const AuthenticatedNavbar = () => {
  //function to logout user
  const Logout = async () => {
    const response = await LogoutUser();
  };
  return (
    <div className="">
      <nav className="navbar navbar-expand-lg bg-body-tertiary container-fluid w-100">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Chat-App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Message
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  School
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle active"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Help
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="nav-item offset-6  ">
              <button
                onClick={Logout}
                className="btn btn-danger fw-bold"
                href="#"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
