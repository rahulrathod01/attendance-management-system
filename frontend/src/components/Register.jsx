import { useEffect, useState } from 'react';
import { registerClient } from '../services/authService';
import './registration.css'; 

const Register = () => {
  const [companyName, setCompanyName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(companyName,"companyName", 
      ownerName,"ownerName", 
      email, "email");

    const response = await registerClient({ 
      companyName, 
      ownerName, 
      email, 
      registrationNumber, 
      gstNumber
    });

    console.log(response,"response in frontend");
    console.log(response.generatedLink,"response in frontend");

    setGeneratedLink(response.generatedLink);
    alert('Client registered and login link sent');
  };

  useEffect(() => {
    console.log(generatedLink, "Updated gen link");
  }, [generatedLink]);
  


  const handleUpdate = () => {
    alert('Update functionality coming soon!');
  };
  return (
    <div className="registration-container">
      <h1 className="registration-header">Register Client</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <h2 className="registration-input"> 
              Company Name
            </h2>
          </div>
          <div className="form-group">
            <input 
              className="registration-input" 
              type="text" 
              value={companyName} 
              onChange={e => setCompanyName(e.target.value)} 
              placeholder="Enter Name" 
              required 
            />
          </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <h2 className="registration-input">
                  Owner Name
                </h2>
            </div>
            <div className="form-group">
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
            <h2 className="registration-input">
              Email Address
            </h2>
          </div>
          <div className="form-group">
            <input 
              className="registration-input" 
              type="text" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="Enter email" 
              required 
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <h2 className="registration-input">
              Company Registration Number
            </h2>
          </div>
          <div className="form-group">
            <input 
              className="registration-input" 
              type="text" 
              value={registrationNumber} 
              onChange={e => setRegistrationNumber(e.target.value)} 
              placeholder="Enter registration number" 
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <h2 className="registration-input">
              GST Number
            </h2>
          </div>
          <div className="form-group">
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
            <input 
              className="registration-input" 
              type="text" 
              value={field1} 
              onChange={e => setField1(e.target.value)} 
              placeholder="Enter Field 1" 
            />
          </div>
          <div className="form-group">
            <input 
              className="registration-input" 
              type="text" 
              value={''} 
              onChange={e => setField2(e.target.value)} 
              placeholder="Enter Field " 
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input 
              className="registration-input" 
              type="text" 
              value={field2} 
              onChange={e => setField3(e.target.value)} 
              placeholder="Enter Field 2" 
            />
          </div>
          <div className="form-group">
            <input 
              className="registration-input" 
              type="text" 
              value={''} 
              onChange={e => setField3(e.target.value)} 
              placeholder="Enter Field " 
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input 
              className="registration-input" 
              type="text" 
              value={field3} 
              onChange={e => setField3(e.target.value)} 
              placeholder="Enter Field 3" 
            />
          </div>
          <div className="form-group">
            <input 
              className="registration-input" 
              type="text" 
              value={''} 
              onChange={e => setField3(e.target.value)} 
              placeholder="Enter Field " 
            />
          </div>
        </div>



      </form>

      <div className="button-group">

        <button className="registration-button">Back</button>
        <button className="registration-button" onClick={handleUpdate}>Update</button>
        <button className="registration-button">Save</button>
      </div>

      {generatedLink && (
        <div className="generated-link-container">
          <p>Your Company Portal Link: <a href={generatedLink}>{generatedLink}</a></p>
        </div>
      )}
    </div>
  );
};

export default Register;
