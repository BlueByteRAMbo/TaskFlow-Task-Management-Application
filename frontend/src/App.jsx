import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';    
import { ToastContainer } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css';    
import { AuthProvider } from './context/AuthContext';    
import ProtectedRoute from './components/ProtectedRoute';    
     
// bringing in all the page components here
import Landing from './pages/Landing';    
import Login from './pages/Login';    
import Register from './pages/Register';    
import Dashboard from './pages/Dashboard';    
     
function App() {    
  return (    
    <AuthProvider>    
      <BrowserRouter>    
        <Routes>    
          <Route path="/" element={<Landing />} />    
          <Route path="/login" element={<Login />} />    
          <Route path="/register" element={<Register />} />    
          <Route    
            path="/dashboard"    
            element={    
              <ProtectedRoute>    
                <Dashboard />    
              </ProtectedRoute>    
            }    
          />    
          {/* catch-all route, sends them back to the landing page if they type random stuff */}
          <Route path="*" element={<Navigate to="/" replace />} />    
        </Routes>    
      </BrowserRouter>    
      <ToastContainer position="top-right" autoClose={3000} theme="dark" toastClassName="bg-zinc-900 text-zinc-100 border border-zinc-800" />    
    </AuthProvider>    
  );    
}    
     
export default App;
