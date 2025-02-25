import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // Added state for success message
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null); // Reset success message on new submit

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        let errorMessage = "Login Failed"; // Default error message
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (err) {
          console.error("Error parsing JSON:", err);
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();
      console.log("Login Success:", data);
      setSuccess("Login Successful"); // Set success message

      if (data.success) {
        setTimeout(() => {
          navigate("/"); // Ensure navigation happens after success message
        }, 1000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold text-slate-800 my-7">
        Sign In
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="bg-slate-200 text-cyan-700 border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
          value={formData.email}
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-slate-200 text-cyan-700 border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
          value={formData.password}
          autoComplete="current-password"
        />
        <button
          className="bg-slate-700 text-cyan-300 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex flex-row mx-auto mt-2 gap-2 justify-center text-red-500 font-semibold">
        <p>Wanna Create an Account?</p>
        <Link to={"/signup"} className="text-blue-500 font-semibold">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
