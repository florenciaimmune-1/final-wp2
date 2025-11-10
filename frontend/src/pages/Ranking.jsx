import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Ranking(){
  const [rows, setRows] = useState([]);
  useEffect(()=>{ api('/ranking/top').then(setRows); },[]);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Ranking</h1>
      <div className="grid gap-2">
        {rows.map(u => (
          <div key={u.id} className="border p-3 rounded flex justify-between">
            <div className="font-medium">{u.name}</div>
            <div>Puntos: {u.points} · Nivel: {u.level}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
