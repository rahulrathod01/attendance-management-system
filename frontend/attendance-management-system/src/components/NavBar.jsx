import React from "react";
import { Link } from "react-router-dom"; 
import { FaBell, FaUserCircle, FaPowerOff } from 'react-icons/fa'; 
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="/image.png"
          alt="Company Logo"
          className="navbar-logo"
        />
      </div>
      <div className="navbar-center">
        <ul className="navbar-links">
          <li><Link to="#home">Home</Link></li>
          <li><Link to="#engage">Engage</Link></li>
          <li><Link to="#tasks">Tasks</Link></li>
          <li><Link to="#performance">Performance Management</Link></li>
          <li><Link to="#employee">Employee</Link></li>
          <li><Link to="#payroll">Payroll</Link></li>
          <li><Link to="#leave">Leave</Link></li>
          <li><Link to="#workflow">Workflow</Link></li>
          <li><Link to="#reports">Reports</Link></li>
          <li><Link to="#expense">Expense Claims</Link></li>
          <li><Link to="#assets">Asset Management</Link></li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="navbar-notification">
          <FaBell className="navbar-icon" /> 
        </div>
        <div className="navbar-user">
          <FaUserCircle className="user-icon" /> 
          <span>Hello Jennifer</span>
        </div>
        <button className="logout-button">
          <FaPowerOff /> 
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
