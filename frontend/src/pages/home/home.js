import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import { Link } from 'react-router-dom';
import { Login } from '../login/login';

export const Home = () => {
  const [isLogin, setIsLogin] = useState(false);

  const hideLogin = () => {
    setIsLogin(false);
  };
  return (
    <div className="home-page">
      <header className="header-section text-center text-white">
        <div className="container">
          <h1 className="display-4">Welcome to Chatter</h1>
          <p className="lead">Log in and chat with your friends instantly</p>
          <Link
            onClick={() => setIsLogin(true)}
            className="btn btn-primary btn-lg mt-3"
          >
            Get Started
          </Link>
        </div>
      </header>

      <section id="about" className="py-5 bg-light text-center">
        <div className="container">
          <h2>About Chatter</h2>
          <p className="mt-3">
            Chatter is a simple and fast platform to chat with your friends and
            colleagues in real-time.
          </p>
        </div>
      </section>

      <section id="features" className="py-5 text-center">
        <div className="container">
          <h2>Features</h2>
          <div className="row mt-4">
            <div className="col-md-4">
              <h5>Instant Messaging</h5>
              <p>Send and receive messages quickly.</p>
            </div>
            <div className="col-md-4">
              <h5>Group Chats</h5>
              <p>Create and join groups to chat as a team.</p>
            </div>
            <div className="col-md-4">
              <h5>Secure</h5>
              <p>Your data is protected with advanced security.</p>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="py-4 bg-dark text-white text-center">
        <p>© 2024 Chatter. All rights reserved.</p>
      </footer>
      {isLogin && <Login hideLogin={hideLogin} />}
    </div>
  );
};
