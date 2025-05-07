import { useState, useEffect } from "react";
import { database } from "../lib/firebase"; // Assuming Firebase is set up
import { ref, onValue } from "firebase/database"; // Firebase Realtime Database

function StaffDashboard() {
  const [patients, setPatients] = useState([]);
  const [staff, setStaff] = useState([]);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    // Fetch data from Firebase
    const patientsRef = ref(database, "patients");
    onValue(patientsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPatients(Object.values(data));
      }
    });

    const staffRef = ref(database, "staff");
    onValue(staffRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setStaff(Object.values(data));
      }
    });
  }, []);

  // Calculate total patients, patients by department, etc.
  const totalPatients = patients.length;
  const departments = [...new Set(patients.map(p => p.department))];
  const patientsByDepartment = departments.reduce((acc, department) => {
    acc[department] = patients.filter(p => p.department === department).length;
    return acc;
  }, {});

  const nextPatient = patients[0]; // Assuming the first patient is the next one

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Queue Overview */}
      <div className="bg-white p-6 rounded-lg shadow-xl mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Queue Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-500">Total Patients in Queue</p>
            <p className="text-lg font-semibold">{totalPatients}</p>
          </div>
          {departments.map(department => (
            <div key={department}>
              <p className="text-sm text-gray-500">{`Patients in ${department}`}</p>
              <p className="text-lg font-semibold">{patientsByDepartment[department]}</p>
            </div>
          ))}
          <div>
            <p className="text-sm text-gray-500">Next Patient</p>
            <p className="text-lg font-semibold">{nextPatient ? nextPatient.name : "N/A"}</p>
            <p className="text-sm text-gray-400">{nextPatient ? nextPatient.department : ""}</p>
          </div>
        </div>
      </div>

      {/* Patient Information */}
      <div className="bg-white p-6 rounded-lg shadow-xl mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Patient Information</h2>
        <div className="space-y-4">
          {patients.map(patient => (
            <div key={patient.id} className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Patient ID: {patient.id}</p>
                  <p className="text-lg font-semibold text-gray-800">{patient.name}</p>
                  <p className="text-sm text-gray-400">{patient.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status: {patient.status}</p>
                  <p className="text-sm text-gray-500">Urgency: {patient.urgency}</p>
                  <p className="text-sm text-gray-500">Arrival Time: {patient.arrivalTime}</p>
                  <p className="text-sm text-gray-500">Expected Consultation: {patient.consultationTime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Updates */}
      <div className="bg-white p-6 rounded-lg shadow-xl mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Real-time Updates</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-500">New Arrival: {alert ? alert : "None"}</p>
            <button
              onClick={() => setAlert("New critical patient arrived.")}
              className="bg-[#48ec63] text-white py-2 px-4 rounded-full hover:bg-[#32ae30]"
            >
              Test Alert
            </button>
          </div>
        </div>
      </div>

      {/* Actionable Features */}
      <div className="bg-white p-6 rounded-lg shadow-xl mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Actionable Features</h2>
        <div className="space-y-4">
          <button
            className="bg-[#48ec63] text-black py-2 px-4 rounded-full hover:bg-[#32ae30] w-full"
            onClick={() => alert("Assign patient to staff functionality goes here")}
          >
            Assign Patient to Doctor
          </button>
          <button
            className="bg-[#48ec63] text-black py-2 px-4 rounded-full hover:bg-[#32ae30] w-full"
            onClick={() => alert("Move patient up/down queue functionality goes here")}
          >
            Move Patient Up/Down Queue
          </button>
          <button
            className="bg-[#48ec63] text-black py-2 px-4 rounded-full hover:bg-[#32ae30] w-full"
            onClick={() => alert("End Consultation functionality goes here")}
          >
            End Consultation
          </button>
        </div>
      </div>
    </div>
  );
}

export default StaffDashboard;
