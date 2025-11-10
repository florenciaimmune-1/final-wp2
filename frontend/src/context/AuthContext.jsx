import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/api';

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }){
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!token);

  useEffect(() => {
    if (!token) return;
    api('/users/me', { token })
      .then(setUser)
      .catch(() => { setToken(null); localStorage.removeItem('token'); })
      .finally(() => setLoading(false));
  }, [token]);

  function login(tok){
    localStorage.setItem('token', tok);
    setToken(tok);
    setLoading(true);
    api('/users/me', { token: tok }).then(setUser).finally(() => setLoading(false));
  }

  function logout(){
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  const value = { token, user, loading, login, logout, setUser };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}