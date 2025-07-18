import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { fetchMe } from './api';

type AuthContextType = {
  user: any;
  token: string | null;
  login: (userData: any, newToken: any) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState<boolean>(!!token);

  useEffect(() => {
    if (!token) return;
    (async () => {
      setLoading(true);
      const data = await fetchMe(token);
      if (data && !data.error) {
        setUser(data);
      } else {
        setUser(null);
        localStorage.removeItem('token');
      }
      setLoading(false);
    })();
  }, [token]);

  const login = (userData, newToken) => {
    setUser(userData);
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}