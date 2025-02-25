import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../redux/user/userSlice";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Prevent sending empty fields
    if (!formData.email || !formData.password) {
      dispatch(signInFailure("Email and password are required."));
      return;
    }

    dispatch(signInStart());

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid response from server");
      }

      if (!res.ok) {
        if (res.status === 400) {
          throw new Error("Invalid input. Please check your details.");
        } else if (res.status === 401) {
          throw new Error("Wrong credentials. Please check your email and password.");
        } else if (res.status === 404) {
          throw new Error("User does not exist. Please sign up.");
        } else if (res.status === 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(data.message || "Sign-in failed");
        }
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold text-slate-800 my-7">
        Sign In
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="bg-slate-200 text-cyan-700 border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-slate-200 text-cyan-700 border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 text-cyan-300 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex flex-row mx-auto mt-2 gap-2 justify-center text-red-500 font-semibold">
        <p>Don't have an account?</p>
        <Link to={"/signup"} className="text-blue-500 font-semibold">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
