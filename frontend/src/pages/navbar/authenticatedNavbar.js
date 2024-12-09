import { SignUp } from '../signUp/signUp';
import { Login } from '../login/login';
import { useContext, useState } from 'react';
import { LogoutUser } from '../../services/userApi';
import { Link } from 'react-router-dom';
import './navbar.css';
import { UserContext } from '../../Contexts/userContext';
export const AuthenticatedNavbar = () => {
  const { setIsRefresh } = useContext(UserContext);
  //function to logout user
  const Logout = async () => {
    try {
      const response = await LogoutUser();
      setIsRefresh((prev) => prev + 'a');
    } catch {}
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
                <Link to={'/'} className="nav-link active" href="#">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/chat'} className="nav-link active" href="#">
                  Chat
                </Link>
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
