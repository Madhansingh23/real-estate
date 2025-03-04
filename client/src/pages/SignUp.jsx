import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import OAuth from "../components/OAuth";


const SignUp = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        let data;

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            try {
                data = await res.json();
            } catch {
                throw new Error("Invalid response from server in handleSubmit");
            }

            if (!res.ok) {
                throw new Error(data.message || "Signup failed");
            }

            if (data.success === true) {
                navigate("/signin");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 p-6">
            {/* Left Column - Branding & Info */}
            <div className="md:w-1/2 p-10 text-white text-center md:text-left">
                <h1 className="text-5xl font-extrabold leading-tight animate-fade-in">Join Madhan's Estate</h1>
                <p className="mt-4 text-lg font-medium opacity-90 animate-fade-in">
                    Sign up today and unlock exclusive real estate opportunities. The home of your dreams is just a step away.
                </p>
                <p className="mt-2 text-sm opacity-75 animate-fade-in">
                    Experience seamless and secure transactions with our trusted platform.
                </p>
            </div>

            {/* Right Column - Sign Up Form */}
            <div className="md:w-1/3 w-full bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-lg animate-slide-in">
                <h2 className="text-3xl font-semibold text-center text-white mb-6">Sign Up</h2>

                {error && (
                    <p className="text-red-500 text-center bg-red-100 p-2 rounded-lg transition-all animate-fade-in">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input
                        type="text"
                        placeholder="Enter your username"
                        className="p-3 bg-white/80 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all"
                        id="username"
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="p-3 bg-white/80 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all"
                        id="email"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Create a password"
                        className="p-3 bg-white/80 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all"
                        id="password"
                        onChange={handleChange}
                    />

                    <button
                        disabled={loading}
                        className="p-3 bg-blue-700 text-white rounded-lg uppercase font-semibold tracking-wide hover:scale-105 transition-all disabled:opacity-70 flex justify-center items-center"
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
                    </button>
                </form>

                <OAuth />

                <div className="text-center mt-4">
                    <p className="text-white">Already have an account?</p>
                    <Link to="/signin" className="text-blue-200 hover:underline">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;