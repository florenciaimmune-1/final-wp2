import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function AdminMissions(){
  const { token, user } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title:'', description:'', base_points:10, difficulty:'FACIL' });

  if(!token) return <div>Inicia sesion</div>;
  if(user?.role !== 'MAESTRO') return <div>error</div>;

  async function load(){ setItems(await api('/missions')); }
  useEffect(()=>{ load(); },[]);

  async function create(){
    await api('/missions', { method:'POST', body: form, token });
    setForm({ title:'', description:'', base_points:10, difficulty:'FACIL' });
    await load();
  }
  async function update(id, fields){
    await api(`/missions/${id}`, { method:'PUT', body: fields, token });
    await load();
  }
  async function remove(id){
    await api(`/missions/${id}`, { method:'DELETE', token });
    await load();
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Misiones</h1>

      <div className="grid gap-2 border p-3 rounded">
        <input className="border p-2" placeholder="Título" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))}/>
        <textarea className="border p-2" placeholder="Descripción" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))}/>
        <input className="border p-2" type="number" min="0" placeholder="Puntos base" value={form.base_points} onChange={e=>setForm(f=>({...f,base_points:Number(e.target.value)}))}/>
        <select className="border p-2" value={form.difficulty} onChange={e=>setForm(f=>({...f,difficulty:e.target.value}))}>
          <option>FACIL</option><option>MEDIA</option><option>DIFICIL</option>
        </select>
        <button onClick={create} className="bg-green-600 text-white px-4 py-2 rounded">Crear</button>
      </div>

      <div className="grid gap-3">
        {items.map(m => (
          <div key={m.id} className="border p-3 rounded">
            <div className="font-semibold">{m.title}</div>
            <div className="text-sm text-gray-600">{m.description}</div>
            <div className="text-sm">Base: {m.base_points} · Dificultad: {m.difficulty} · Estado: {m.status}</div>
            <div className="flex gap-2 mt-2">
              <button onClick={()=>update(m.id,{ status: m.status==='ACTIVA'?'INACTIVA':'ACTIVA' })} className="px-3 py-1 border rounded">
                {m.status==='ACTIVA' ? 'Desactivar' : 'Activar'}
              </button>
              <button onClick={()=>remove(m.id)} className="px-3 py-1 bg-red-600 text-white rounded">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
