import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const { login } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function onSubmit(e){
    e.preventDefault();
    setError('');
    try{
      const { token } = await api('/auth/register', { method: 'POST', body: { name, email, password } });
      login(token);
      nav('/');
    }catch(e){ setError(e.message); }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto mt-8 space-y-3">
      <h1 className="text-2xl font-bold">Crear cuenta</h1>
      {error && <div className="text-red-600">{error}</div>}
      <input className="border p-2 w-full" placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="border p-2 w-full" type="password" placeholder="Contraseña" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Registrarme</button>
    </form>
  );
}
