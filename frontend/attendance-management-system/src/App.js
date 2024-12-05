import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CompanyLogin from './components/CompanyLogin';
import ClientRegister from './components/ClientRegister';
import ClientLogin from './components/ClientLogin';
import ClientDashboard from './components/ClientDashboard';
import Navbar from './components/NavBar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CompanyLogin />} />
        <Route path="/register" element={<ClientRegister />} />
        <Route path="/client-login" element={<ClientLogin />} />
        <Route path="/dashboard" element={<ClientDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
