import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import JoinQueue from './pages/JoinQueue';
import QueueStatus from './pages/QueueStatus';
import StaffDashboard from './pages/StaffDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/joinqueue" element={<JoinQueue />} />
        <Route path="/queuestatus" element={<QueueStatus />} />
        <Route path="/staffdashboard" element={<StaffDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
