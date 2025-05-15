import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup'; // Updated import
import JoinQueue from './pages/JoinQueue'; // New import
import QueueStatus from './pages/QueueStatus';
import StaffDashboard from './pages/StaffDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> {/* Signup route */}
        <Route path="/joinqueue" element={<JoinQueue />} /> {/* JoinQueue route */}
        <Route path="/queuestatus" element={<QueueStatus />} />
        <Route path="/staffdashboard" element={<StaffDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;