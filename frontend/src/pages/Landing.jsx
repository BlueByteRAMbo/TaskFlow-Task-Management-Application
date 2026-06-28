import { Link } from 'react-router-dom';    
     
const Landing = () => {    
  return (    
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center px-4 relative overflow-hidden">    
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-900/20 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="z-10 flex flex-col items-center text-center max-w-2xl">
        <div className="mb-6 inline-flex items-center justify-center p-3 bg-zinc-900/50 border border-zinc-800 rounded-2xl shadow-sm">
          <span className="text-3xl">⚡</span>
        </div>
        <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 tracking-tight text-zinc-100">
          TaskFlow
        </h1>    
        <p className="text-zinc-400 text-lg sm:text-xl mb-10 leading-relaxed max-w-lg">    
          A secure, full-stack task manager built on the MERN stack.    
          Prioritise your work. Never miss a deadline.    
        </p>    
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">    
          <Link    
            to="/register"    
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(5,150,105,0.2)] hover:shadow-[0_0_30px_rgba(5,150,105,0.4)] active:scale-[0.98] flex items-center justify-center"    
          >    
            Get Started    
          </Link>    
          <Link    
            to="/login"    
            className="w-full sm:w-auto border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800/80 text-zinc-300 px-8 py-3.5 rounded-xl font-medium transition-all active:scale-[0.98] flex items-center justify-center"    
          >    
            Sign In    
          </Link>    
        </div>    
      </div>
    </div>    
  );    
};    
     
export default Landing;
