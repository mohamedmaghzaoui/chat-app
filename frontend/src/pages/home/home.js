import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="home-page">
      <header className="header-section text-center text-white">
        <div className="container">
          <h1 className="display-4">Welcome to ChatApp</h1>
          <p className="lead">Log in and chat with your friends instantly</p>
          <Link to={'/chat'} className="btn btn-primary btn-lg mt-3">
            Get Started
          </Link>
        </div>
      </header>

      <section id="about" className="py-5 bg-light text-center">
        <div className="container">
          <h2>About ChatApp</h2>
          <p className="mt-3">
            ChatApp is a simple and fast platform to chat with your friends and
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
        <p>© 2024 ChatApp. All rights reserved.</p>
      </footer>
    </div>
  );
};
