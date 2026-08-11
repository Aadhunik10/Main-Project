import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          confirm_password: formData.confirmPassword,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        const message = data.confirm_password || data.email || data.username || data.detail || JSON.stringify(data);
        setError(typeof message === "string" ? message : "Signup failed. Please check your input.");
        return;
      }

      setSuccess("Account created successfully. Redirecting to login...");
      setFormData({ fullName: "", email: "", phone: "", password: "", confirmPassword: "" });
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError("Unable to connect to the backend. Please try again.");
    }
  };

  return (
    <div className=" signup bg-white p-10 rounded-lg shadow-lg w-[450px] border border-[#DDEBDC]">
      <h1 className="text-4xl font-bold text-center mb-6 text-[#293325]">Sign Up</h1>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          type="text"
          placeholder="Full Name"
          className="border border-[#39542C] rounded-md px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-[#4CBB17]"
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="border border-[#39542C] rounded-md px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-[#4CBB17]"
        />

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          type="tel"
          placeholder="Phone Number"
          className="border border-[#39542C] rounded-md px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-[#4CBB17]"
        />

        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="border border-[#39542C] rounded-md px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-[#4CBB17]"
        />

        <input
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          type="password"
          placeholder="Confirm Password"
          className="border border-[#39542C] rounded-md px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-[#4CBB17]"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          type="submit"
          className="bg-[#4CBB17] hover:bg-[#48872B] text-white text-xl font-medium py-3 rounded-md transition"
        >
          Sign Up
        </button>
      </form>

      <p className="text-center mt-6 text-lg text-[#293325]">
        Already have an account?{" "}
        <Link to="/login" className="text-[#48872B] cursor-pointer ">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
