import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CompanyLogin from './components/CompanyLogin';
import ClientRegister from './components/ClientRegister';
import ClientLogin from './components/ClientLogin';


function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<CompanyLogin />} />
      <Route path='/register' element={<ClientRegister/>}/>
      <Route path='/client-login' element={<ClientLogin/>}/>
    </Routes>
  </Router>
  );
}

export default App;
