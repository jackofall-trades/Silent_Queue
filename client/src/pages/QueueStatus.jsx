import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QueueStatus = () => {
  const [queue, setQueue] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/queue/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setQueue(data);
      } catch (err) {
        setError('Could not fetch queue status');
      }
    };
    fetchQueue();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Your Queue Status</h2>
        {error && <div className="text-red-500">{error}</div>}
        {queue ? (
          <div>
            <p><strong>Status:</strong> {queue.status}</p>
            <p><strong>Assigned Staff:</strong> {queue.assignedStaff ? `${queue.assignedStaff.firstName} ${queue.assignedStaff.lastName}` : 'Not assigned yet'}</p>
            <p><strong>Joined At:</strong> {new Date(queue.createdAt).toLocaleString()}</p>
          </div>
        ) : (
          <p>You are not in the queue.</p>
        )}
      </div>
    </div>
  );
};

export default QueueStatus;