import React from "react";
import { FaBullhorn , FaCog, FaUser } from "react-icons/fa";
import "./SideNavbar.css";

const SideNavbar = () => {
  // Define click handlers for each feature
  const handleNotificationsClick = () => {
    alert("Navigating to Notifications feature!");
    // Add navigation or functionality here
  };

  const handleSettingsClick = () => {
    alert("Navigating to Settings feature!");
    // Add navigation or functionality here
  };

  const handleProfileClick = () => {
    alert("Navigating to Profile feature!");
    // Add navigation or functionality here
  };

  return (
    <div className="side-navbar">
      <ul className="side-navbar-menu">
        <li className="menu-item" onClick={handleNotificationsClick}>
          <span className="icon1">
            <FaBullhorn   />
          </span>
          <span className="menu-label">Notifications</span>
        </li>
        <li className="menu-item" onClick={handleSettingsClick}>
          <span className="icon1">
            <FaCog />
          </span>
          <span className="menu-label">Settings</span>
        </li>
        <li className="menu-item" onClick={handleProfileClick}>
          <span className="icon3">
            <FaUser />
          </span>
          <span className="menu-label">Profile</span>
        </li>
      </ul>
    </div>
  );
};

export default SideNavbar;
