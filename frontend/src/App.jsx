// contains the main React component, i.e. landing page.

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './components/RegisterPage.jsx';
import LandingPage from './components/LandingPage.jsx'
import LoginPage from './components/LoginPage.jsx';
import Dashboard from './components/Dashboard';
import PetSitterDashboard from './components/PetSitterDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
                
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/petsitter-dashboard" element={<PetSitterDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
