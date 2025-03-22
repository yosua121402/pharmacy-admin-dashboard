
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string, isAdmin?: boolean) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on component mount
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);
  }, []);

  const login = async (email: string, password: string, isAdmin = false): Promise<boolean> => {
    // For demo purposes, hardcode successful logins
    if (isAdmin) {
      if (email === 'admin@example.com' && password === 'password') {
        localStorage.setItem('auth_token', 'admin_token');
        localStorage.setItem('user_role', 'admin');
        setIsAuthenticated(true);
        return true;
      }
    } else {
      // Regular user login
      if ((email === 'user@example.com' || email === 'admin@example.com') && password === 'password') {
        localStorage.setItem('auth_token', 'user_token');
        localStorage.setItem('user_role', 'user');
        setIsAuthenticated(true);
        return true;
      }
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // For demo purposes, simulate a successful registration
    // In a real app, this would make an API call to create the user
    console.log('Registering user:', { name, email, password });
    
    // Simulate success
    return true;
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
