import React from 'react';
import SideNavbar from './SideNavbar'; // Import SideNavbar (your new component)
import './ClientDashboard.css';
import Navbar from './NavBar';

const ClientDashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-layout">
        <SideNavbar /> 
        <div className="dashboard-content">
          <header className="dashboard-header">
            <h1>Welcome</h1>
            <p>
              Good Morning, <br />
              "Your time is limited, so don't waste it living someone else's life."
              - Steve Jobs
            </p>
          </header>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
