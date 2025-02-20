import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

const SignUp=()=>{
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <>
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold text-slate-800 my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" action="" onSubmit={handleSubmit}>
        <input type="text" placeholder='username' className='bg-slate-200 text-cyan-700  border p-3 rounded-lg' id='username' onChange={handleChange}>
        </input>
        <input type="email" placeholder='email' className='bg-slate-200 text-cyan-700 border p-3 rounded-lg' id='email' onChange={handleChange}>
        </input>
        <input type="password" placeholder='password' className='bg-slate-200 text-cyan-700  border p-3 rounded-lg' id='password' onChange={handleChange}>
        </input>
        <button className="bg-slate-700 text-cyan-300 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Submit</button>
      </form>
      <div className="flex flex-row mx-auto mt-2 gap-2 justify-center text-red-500 font-semibold">
        <p>Already have an Account ?</p>
        <Link to={"/signin"} className="text-blue-500 font-semibold">SignIn</Link>
      </div>
    </div>
    </>
  )
}

export default SignUp
