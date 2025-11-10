import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function Missions(){
  const [items, setItems] = useState([]);
  const { token } = useAuth();

  useEffect(() => { api('/missions').then(setItems); }, []);

  async function accept(id){
    if(!token){ alert('Iniciá sesión para aceptar'); return; }
    await api('/missions/accept', { method: 'POST', body: { mission_id: id }, token });
    alert('Misión aceptada');
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl sm:text-3xl font-bold">Misiones</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(m => (
          <div key={m.id} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="font-semibold">{m.title}</div>
            <p className="mt-1 text-sm text-neutral-600">{m.description}</p>
            <div className="mt-2 text-sm">
              Puntos base: <b>{m.base_points}</b> · Dificultad: {m.difficulty}
            </div>
            <button
              onClick={() => accept(m.id)}
              className="mt-3 w-full sm:w-auto sm:self-start rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
            >
              Aceptar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
