import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousValue) => ({
      ...previousValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password.');
      return;
    }

    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || data.error || 'Login failed. Please check your credentials.');
        return;
      }

      localStorage.setItem('campusBazaarToken', data.token);
      localStorage.setItem('campusBazaarLoggedIn', 'true');
      localStorage.setItem('campusBazaarName', data.fullName || '');
      localStorage.setItem('campusBazaarPhone', data.phone || '');
      localStorage.setItem('campusBazaarEmail', data.email || '');
      onLogin();
      navigate('/');
    } catch (err) {
      setError('Unable to connect to the backend. Please try again.');
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-md w-[450px] border border-[#DDEBDC]">
      <h1 className="text-4xl font-bold text-center mb-6 text-[#293325]">Login</h1>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border border-[#39542C] rounded-md px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-[#4CBB17]"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border border-[#39542C] rounded-md px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-[#4CBB17]"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-[#4CBB17] hover:bg-[#48872B] text-white text-xl font-medium py-3 rounded-md transition"
        >
          Login
        </button>
      </form>

      <p className=" para text-center mt-6 text-lg text-[#293325]">
        Don't have an account?
      </p>
      <Link to="/signup" className="text-[#48872B] p-2 rounded hover: cursor-pointer">
        Sign Up
      </Link>
    </div>
  )
}

export default Login
