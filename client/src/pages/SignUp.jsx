import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const SignUp=()=> {
  const [formData,setFormData]=useState({});
  const [loading,setloading]=useState(false);
  const [error,setError]=useState(null);
  const navigate=useNavigate();

  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setloading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify(formData),
      });

      const data=await res.json();
      if (!res.ok)
        {
        throw new Error(data.message||"Signup failed");
      }
      console.log(data);
      if(data.success===true)
       { navigate('/signin');
       }
    } 
    catch(err)
    {
      setError(err.message);
    } 
    finally 
    {
      setloading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold text-slate-800 my-7">
        Sign Up
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className="bg-slate-200 text-cyan-700 border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="bg-slate-200 text-cyan-700 border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="bg-slate-200 text-cyan-700 border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 text-cyan-300 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex flex-row mx-auto mt-2 gap-2 justify-center text-red-500 font-semibold">
        <p>Already have an Account ?</p>
        <Link to={"/signin"} className="text-blue-500 font-semibold">
          SignIn
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
