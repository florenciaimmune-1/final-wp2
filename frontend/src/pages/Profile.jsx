import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';

export default function Profile(){
  const { token, user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [avatar_url, setAvatar] = useState(user?.avatar_url || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [msg, setMsg] = useState('');

  useEffect(()=>{ if(user){ setName(user.name); setAvatar(user.avatar_url||''); setBio(user.bio||''); } },[user]);

  async function onSave(){
    await api('/users/me', { method:'PUT', body: { name, avatar_url, bio }, token });
    const me = await api('/users/me', { token });
    setUser(me); setMsg('Guardado');
    setTimeout(()=>setMsg(''), 1200);
  }

  if(!token) return <div>Inicia sesión.</div>;

  return (
    <div className="max-w-lg space-y-3">
      <h1 className="text-2xl font-bold">Perfil</h1>
      {msg && <div className="text-green-700">{msg}</div>}
      <input className="border p-2 w-full" placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Avatar URL" value={avatar_url} onChange={e=>setAvatar(e.target.value)} />
      <textarea className="border p-2 w-full" placeholder="Bio" value={bio} onChange={e=>setBio(e.target.value)} />
      <button onClick={onSave} className="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
    </div>
  );
}
