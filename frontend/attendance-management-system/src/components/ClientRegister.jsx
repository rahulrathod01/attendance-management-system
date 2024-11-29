import React, { useState } from "react";
import "./ClientRegister.css";
import { useNavigate } from "react-router-dom";

const ClientRegister = () => {
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [field1, setField1] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register-client",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyName,
            ownerName,
            email,
            registrationNumber,
            gstNumber,
            field1,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setGeneratedLink(data.generatedLink);
        alert("Client registered successfully!");
      } else {
        alert("Registration failed. Please check your inputs.");
      }
    } catch (error) {
      console.error("Error registering client:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleLinkClick = () => {
    navigate("/client-login"); // Redirect to client-login page
  };

  return (
    <div className="registration-container">
            <h1 className="registration-header">Register Client</h1>
            <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label className="registration-input">Company Name</label>
                        <input 
                            className="registration-input" 
                            type="text" 
                            value={companyName} 
                            onChange={e => setCompanyName(e.target.value)} 
                            placeholder="Enter Company Name" 
                            required 
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="registration-input">Owner Name</label>
                        <input 
                            className="registration-input" 
                            type="text" 
                            value={ownerName} 
                            onChange={e => setOwnerName(e.target.value)} 
                            placeholder="Enter Owner Name" 
                            required 
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="registration-input">Email Address</label>
                        <input 
                            className="registration-input" 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            placeholder="Enter Email" 
                            required 
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="registration-input">Company Registration Number</label>
                        <input 
                            className="registration-input" 
                            type="text" 
                            value={registrationNumber} 
                            onChange={e => setRegistrationNumber(e.target.value)} 
                            placeholder="Enter Registration Number" 
                            required 
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="registration-input">GST Number</label>
                        <input 
                            className="registration-input" 
                            type="text" 
                            value={gstNumber} 
                            onChange={e => setGstNumber(e.target.value)} 
                            placeholder="Enter GST Number" 
                            required 
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="registration-input">Enter Field 1</label>
                        <input 
                            className="registration-input" 
                            type="text" 
                            value={field1} 
                            onChange={e => setField1(e.target.value)} 
                            placeholder="Enter Field 1" 
                        />
                    </div>
                </div>
                
                <div className="button-group">
                    <button className="registration-button" type='button' onClick={() => navigate('/')} >Back</button>
                    <button className="registration-button" type='submit'>Save</button>
                </div>
            </form>

            {generatedLink && (
                <div className="generated-link-container">
                    <p>Your Company Portal Link: 
                    <button 
                        className="link-button" 
                        onClick={handleLinkClick}
                        style={ { background: 'none', color: '#007bff', textDecoration: 'underline', border: 'none', padding: 0, cursor: 'pointer' } }
                    >
                        Go to Client Login
                    </button>
                    </p>
                </div>
            )}
        </div>
  );
};

export default ClientRegister;
