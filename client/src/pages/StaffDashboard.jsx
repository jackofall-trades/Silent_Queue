import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StaffDashboard = () => {
  const [queues, setQueues] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQueues = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/queue/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setQueues(data);
      } catch (err) {
        setError('Could not fetch queue data');
      }
    };
    fetchQueues();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Staff Dashboard</h2>
        {error && <div className="text-red-500">{error}</div>}
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-2 py-1">Patient</th>
              <th className="px-2 py-1">Status</th>
              <th className="px-2 py-1">Assigned Staff</th>
              <th className="px-2 py-1">Joined At</th>
            </tr>
          </thead>
          <tbody>
            {queues.map(q => (
              <tr key={q._id}>
                <td className="border px-2 py-1">{q.patient?.firstName} {q.patient?.lastName}</td>
                <td className="border px-2 py-1">{q.status}</td>
                <td className="border px-2 py-1">{q.assignedStaff ? `${q.assignedStaff.firstName} ${q.assignedStaff.lastName}` : 'Unassigned'}</td>
                <td className="border px-2 py-1">{new Date(q.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffDashboard;