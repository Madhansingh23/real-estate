import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../redux/user/userSlice";
import OAuth from "../components/OAuth";
import { CircularProgress } from "@mui/material";


const SignIn = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { loading = false, error = null } = useSelector((state) => state.user || {});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            dispatch(signInFailure("Email and password are required."));
            return;
        }

        try {
            dispatch(signInStart());
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Sign-in failed");
            }

            dispatch(signInSuccess(data));
            navigate("/");
        } catch (err) {
            dispatch(signInFailure(err.message || "Sign in failed."));
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 p-6">
            {/* Left Column - Branding & Info */}
            <div className="md:w-1/2 p-10 text-white text-center md:text-left">
                <h1 className="text-5xl font-extrabold leading-tight animate-fade-in">Welcome to Madhan's Estate</h1>
                <p className="mt-4 text-lg font-medium opacity-90 animate-fade-in">
                    Elevate your lifestyle with our premium real estate solutions. Find your dream home or next investment with ease.
                </p>
                <p className="mt-2 text-sm opacity-75 animate-fade-in">
                    Secure, seamless, and customer-friendly experience tailored just for you.
                </p>
            </div>

            {/* Right Column - Sign In Form */}
            <div className="md:w-1/3 w-full bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-lg animate-slide-in">
                <h2 className="text-3xl font-semibold text-center text-white mb-6">Sign In</h2>

                {error && (
                    <p className="text-red-500 text-center bg-red-100 p-2 rounded-lg transition-all animate-fade-in">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="p-3 bg-white/80 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all"
                        id="email"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="p-3 bg-white/80 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 transition-all"
                        id="password"
                        onChange={handleChange}
                    />

                    <button
                        disabled={loading}
                        className="p-3 bg-blue-700 text-white rounded-lg uppercase font-semibold tracking-wide hover:scale-105 transition-all disabled:opacity-70 flex justify-center items-center"
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                    </button>
                </form>

                <OAuth />

                <div className="text-center mt-4">
                    <p className="text-white">Don't have an account?</p>
                    <Link to="/signup" className="text-blue-200 hover:underline">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;