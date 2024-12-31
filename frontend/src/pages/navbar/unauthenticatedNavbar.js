import { SignUp } from '../signUp/signUp';
import { Login } from '../login/login';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export const UnauthenticatedNavbar = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const showSignUp = () => {
    setIsSignUp(true);
  };
  const hideSignUp = () => {
    setIsSignUp(false);
  };
  const showLogin = () => {
    setIsLogin(true);
  };
  const hideLogin = () => {
    setIsLogin(false);
  };

  return (
    <div className="">
      <nav className="navbar navbar-expand-lg bg-body-tertiary container-fluid w-100">
        <div className="container-fluid">
          <a className="navbar-brand" href="">
            <img
              style={{ width: '100px' }}
              className="img-fluid "
              src="chat-app-logo.png"
              alt=""
            />
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
                className="btn btn-success mx-4 fw-bold "
                onClick={() => showSignUp()}
              >
                SignUp
              </button>
              <button
                onClick={() => showLogin()}
                className="btn btn-primary fw-bold"
                href="#"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>
      {isSignUp && <SignUp hideSignUp={hideSignUp} />}
      {isLogin && <Login hideLogin={hideLogin} />}
    </div>
  );
};
