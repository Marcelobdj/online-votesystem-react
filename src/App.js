import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';
import LandingPage from './pages/LandingPage';
import MasterPage from './pages/MasterPage';
import VotePage from './pages/VotePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/master" element={<MasterPage />} />
            <Route path="/vote" element={<VotePage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;