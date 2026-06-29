import { useAuth } from '../context/AuthContext';    
import { useNavigate } from 'react-router-dom';    
     
const Navbar = () => {    
  const { user, logout } = useAuth();    
  const navigate = useNavigate();    
     
  const handleLogout = () => {    
    logout();    
    navigate('/login');    
  };    
     
  return (    
    <nav className="bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-40">    
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">    
        <div className="flex items-center gap-3">
          <img src="/TaskFlow_Logo.png" alt="TaskFlow Logo" className="h-8 w-8 object-contain" />
          <span className="text-zinc-100 font-bold text-xl tracking-tight">TaskFlow</span>    
        </div>
        <div className="flex items-center gap-5">    
          <span className="text-zinc-400 text-sm font-medium">    
            Welcome, <span className="text-zinc-200">{user?.name?.split(' ')[0]}</span>    
          </span>    
          <button    
            onClick={handleLogout}    
            className="text-zinc-400 hover:text-zinc-100 text-sm font-medium transition-colors bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 px-4 py-1.5 rounded-lg active:scale-[0.98]"    
          >    
            Logout    
          </button>    
        </div>    
      </div>    
    </nav>    
  );    
};    
     
export default Navbar;
