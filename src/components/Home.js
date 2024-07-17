import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../imgs/logo.png';



function Home() {
  return (
    <div className="home-container container">
    <img src={logo} alt="Toggle Password Visibility" />

      <h1>Welcome to the Online Voting System</h1>
      <div className="button-group">
        <Link to="/register">
          <button className="home-button">Register</button>
        </Link>
        <Link to="/login">
          <button className="home-button">Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
