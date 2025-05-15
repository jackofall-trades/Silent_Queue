import React, { useState } from 'react';
import axios from 'axios';

const JoinQueue = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleJoinQueue = async () => {
    setMessage('');
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to join the queue.');
        return;
      }
      await axios.post('http://localhost:5000/api/queue', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('You have successfully joined the queue!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to join the queue.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-green-700">Join the Queue</h2>
        <button
          onClick={handleJoinQueue}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Join Queue
        </button>
        {message && <div className="text-green-600 mt-4">{message}</div>}
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default JoinQueue;