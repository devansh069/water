import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <NavLink to="/" className="navbar-logo">
            <img src="/logo.svg" alt="WaterGuard AI" className="logo-icon" />
            <span>WaterGuard AI</span>
          </NavLink>
        </div>
        <div className="navbar-links">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/area-selection" className="nav-link">Areas</NavLink>
                        <NavLink to="/dashboard/Lajpat%20Nagar" className="nav-link">Dashboard</NavLink>
                        <NavLink to="/alerts" className="nav-link">Alerts</NavLink>
                        <NavLink to="/ai-insights" className="nav-link">AI Insights</NavLink>
                        <NavLink to="/about" className="nav-link">About</NavLink>        </div>
        <div className="navbar-cta">
          <NavLink to="/area-selection" className="cta-button">
            Check Water Quality
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;