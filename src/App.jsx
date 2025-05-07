import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import JoinQueue from "./pages/JoinQueue";
import QueueStatus from "./pages/QueueStatus";  // Ensure this import is present
import StaffDashboard from "./pages/StaffDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/join" element={<JoinQueue />} />
      <Route path="/status" element={<QueueStatus />} />  {/* This route is now active */}
      <Route path="/staff" element={<StaffDashboard />} />
    </Routes>
  );
}

export default App;
