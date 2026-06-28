import { Navigate } from 'react-router-dom';    
import { useAuth } from '../context/AuthContext';    
     
const ProtectedRoute = ({ children }) => {    
  const { user } = useAuth();    
     
  if (!user) {    
    // gotta redirect them to login if they aren't authenticated
    return <Navigate to="/login" replace />;    
  }    
     
  return children;  // they are logged in, so show them the protected content
};    
     
export default ProtectedRoute;
