import { useState } from 'react';    
import { Link, useNavigate } from 'react-router-dom';    
import { useAuth } from '../context/AuthContext';    
import api from '../api/api';    
import { toast } from 'react-toastify';    
     
const Login = () => {    
  const [formData, setFormData] = useState({ email: '', password: '' });    
  const [isLoading, setIsLoading] = useState(false);    
  const { login } = useAuth();    
  const navigate = useNavigate();    
     
  const handleChange = (e) => {    
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));    
  };    
     
  const handleSubmit = async (e) => {    
    e.preventDefault();    
    setIsLoading(true);    
    try {    
      const response = await api.post('/api/auth/login', formData);    
      login(response.data.user, response.data.token);    
      toast.success(`Welcome back, ${response.data.user.name.split(' ')[0]}!`);    
      navigate('/dashboard');    
    } catch (error) {    
      toast.error(error.response?.data?.message || 'Login failed');    
    } finally {    
      setIsLoading(false);    
    }    
  };    
     
  return (    
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 relative overflow-hidden">    
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-900/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="bg-zinc-900 border border-zinc-800 p-8 sm:p-10 rounded-2xl w-full max-w-md shadow-2xl z-10 relative backdrop-blur-sm">    
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-zinc-100 tracking-tight">Sign In</h2>    
          <p className="text-zinc-500 mt-2">Welcome back to TaskFlow</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">    
          <div>    
            <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>    
            <input    
              type="email"    
              name="email"    
              value={formData.email}    
              onChange={handleChange}    
              required    
              className="w-full bg-zinc-950/50 border border-zinc-800 text-zinc-100 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-colors placeholder:text-zinc-600"    
              placeholder="alice@email.com"    
            />    
          </div>    
          <div>    
            <label className="block text-sm font-medium text-zinc-400 mb-2">Password</label>    
            <input    
              type="password"    
              name="password"    
              value={formData.password}    
              onChange={handleChange}    
              required    
              className="w-full bg-zinc-950/50 border border-zinc-800 text-zinc-100 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-colors placeholder:text-zinc-600"    
            />    
          </div>    
          <button    
            type="submit"    
            disabled={isLoading}    
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-900/50 disabled:text-zinc-500 text-white py-3.5 rounded-xl font-medium transition-all active:scale-[0.98] shadow-[0_0_15px_rgba(5,150,105,0.15)] hover:shadow-[0_0_25px_rgba(5,150,105,0.3)] mt-2"    
          >    
            {isLoading ? 'Signing in...' : 'Sign In'}    
          </button>    
        </form>    
        <p className="text-zinc-500 text-sm mt-6 text-center">    
          No account?{' '}    
          <Link to="/register" className="text-emerald-500 hover:text-emerald-400 font-medium transition-colors">Register</Link>    
        </p>    
      </div>    
    </div>    
  );    
};    
     
export default Login;
