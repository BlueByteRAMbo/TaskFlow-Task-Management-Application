import { createContext, useContext, useState, useEffect } from 'react';    
     
const AuthContext = createContext(null);    
     
export const AuthProvider = ({ children }) => {    
  const [user, setUser] = useState(null);    
  const [token, setToken] = useState(null);    
  const [isLoading, setIsLoading] = useState(true);    
     
  // checking if the user is already logged in when they open the app
  useEffect(() => {    
    const savedToken = localStorage.getItem('token');    
    const savedUser = localStorage.getItem('user');    
     
    if (savedToken && savedUser) {    
      setToken(savedToken);    
      setUser(JSON.parse(savedUser));    
    }    
    setIsLoading(false);  // finished checking localstorage, safe to show the app now
  }, []);    
     
  const login = (userData, userToken) => {    
    setUser(userData);    
    setToken(userToken);    
    localStorage.setItem('token', userToken);    
    localStorage.setItem('user', JSON.stringify(userData));    
  };    
     
  const logout = () => {    
    setUser(null);    
    setToken(null);    
    localStorage.removeItem('token');    
    localStorage.removeItem('user');    
  };    
     
  // waiting to show children so we don't accidentally show the login page for a split second before the token loads
  return (    
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>    
      {!isLoading && children}    
    </AuthContext.Provider>    
  );    
};    
     
// making a quick custom hook because typing useContext(AuthContext) everywhere is annoying lol
export const useAuth = () => {    
  const context = useContext(AuthContext);    
  if (!context) {    
    throw new Error('useAuth must be used within an AuthProvider');    
  }    
  return context;    
};
