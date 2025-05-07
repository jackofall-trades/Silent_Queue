import React from 'react';

function QueueStatus() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Queue Status</h2>

        <p className="text-center font-bold">Your current position in the queue: 2</p>
        <p className="text-center mt-4 font-bold">Expected wait time: 5 minutes</p>
      </div>
    </div>
  );
}

export default QueueStatus;
