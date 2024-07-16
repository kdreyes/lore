import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // Initialize useNavigate hook

  const { email, password } = formData;

  const onChange = e => {
    console.log('onChange triggered'); // Add log
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    console.log('onSubmit triggered');
    try {
      const res = await axios.post('/api/auth/login', formData);
      console.log('Login successful', res.data);
      // Save token to localStorage or perform other actions
      localStorage.setItem('token', res.data.token);
      // Redirect to profile setup page
      navigate('/profile-setup');
    } catch (err) {
      console.error('Login error', err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-6">Login</h2>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-muted">Email</label>
        <input type="email" name="email" value={email} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Email" required />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-muted">Password</label>
        <input type="password" name="password" value={password} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Password" required />
      </div>
      <button type="submit" className="w-full bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring">Login</button>
    </form>
  );
};

export default Login;
