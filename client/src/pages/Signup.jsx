import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [form, setForm] = useState({
    firstName: '', lastName: '', username: '', address: '', gender: '',
    age: '', phone: '', email: '', password: '', confirmPassword: '', role: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        address: form.address,
        gender: form.gender,
        age: form.age,
        phone: form.phone,
        email: form.email,
        password: form.password,
        role: form.role
      });
      setSuccess('Registration successful! You can now log in.');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Sign Up</h2>
        <div className="grid grid-cols-2 gap-4">
          <input name="firstName" placeholder="First Name" className="p-2 border rounded" onChange={handleChange} required />
          <input name="lastName" placeholder="Last Name" className="p-2 border rounded" onChange={handleChange} required />
          <input name="username" placeholder="Username" className="p-2 border rounded col-span-2" onChange={handleChange} required />
          <input name="address" placeholder="Address" className="p-2 border rounded col-span-2" onChange={handleChange} />
          <select name="gender" className="p-2 border rounded" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input name="age" min="1" max="99" placeholder="Age" type="number" className="p-2 border rounded" onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" className="p-2 border rounded col-span-2" onChange={handleChange} />
          <input name="email" placeholder="Gmail" type="email" className="p-2 border rounded col-span-2" onChange={handleChange} required />
          <select name="role" className="p-2 border rounded col-span-2" onChange={handleChange} required>
            <option value="">Role</option>
            <option>Patient</option>
            <option>Doctor</option>
            <option>Staff</option>
          </select>
          <input name="password" placeholder="Set Password" type="password" className="p-2 border rounded col-span-2" onChange={handleChange} required />
          <input name="confirmPassword" placeholder="Confirm Password" type="password" className="p-2 border rounded col-span-2" onChange={handleChange} required />
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {success && <div className="text-green-600 mt-2">{success}</div>}
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded mt-4 hover:bg-green-700 transition">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;