import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'mentor',
  });

  const { name, email, password, role } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', formData);
      console.log('Registration successful', res.data);
      // Save token to localStorage or perform other actions
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-6">Register</h2>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-muted">Name</label>
        <input type="text" name="name" value={name} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Name" required />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-muted">Email</label>
        <input type="email" name="email" value={email} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Email" required />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-muted">Password</label>
        <input type="password" name="password" value={password} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Password" required />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-muted">Role</label>
        <select name="role" value={role} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary">
          <option value="mentor">Mentor</option>
          <option value="mentee">Mentee</option>
        </select>
      </div>
      <button type="submit" className="w-full bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring">Register</button>
    </form>
  );
};

export default Register;
