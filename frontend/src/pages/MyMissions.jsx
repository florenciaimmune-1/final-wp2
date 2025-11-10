import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function MyMissions(){
  const { token } = useAuth();
  const [mine, setMine] = useState([]);

  async function load(){ setMine(await api('/missions/mine', { token })); }
  useEffect(() => { if(token) load(); }, [token]);

  async function setState(mission_id, state){
    await api('/missions/state', { method: 'POST', body: { mission_id, state }, token });
    await load();
  }

  async function complete(mission_id, earned_points){
    await api('/users/complete', { method: 'POST', body: { mission_id, earned_points }, token });
    await load();
  }

  if(!token) return <div>Iniciar sesion para ver tus misiones</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl sm:text-3xl font-bold">Mis Misiones</h1>

      <div className="space-y-3">
        {mine.map(m => {
          const isDone = m.state === 'COMPLETADA';
          return (
            <div
              key={m.id}
              className={`rounded-lg border p-4 shadow-sm ${
                isDone ? 'bg-green-50 border-green-300' : 'bg-white'
              }`}>
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="font-semibold">{m.title}</div>
                  <p className="mt-1 text-sm text-neutral-600">{m.description}</p>
                  <div className="mt-2 text-sm">
                    Estado: <b>{m.state}</b> · Puntos base: {m.base_points}
                  </div>
                </div>
                <button
                  onClick={() => complete(m.mission_id, m.base_points)}
                  disabled={isDone}
                  className={`w-full md:w-auto rounded-md px-3 py-2 text-white transition
                    ${isDone
                      ? 'bg-green-600/60 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'}`}
                  title={isDone ? 'Esta misión ya está completada' : 'Marcar como completada'}>
                  COMPLETAR (+{m.base_points})
                </button>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                <button
                  onClick={() => setState(m.mission_id,'SIN_EMPEZAR')}
                  disabled={isDone}
                  className={`rounded-md border px-3 py-2 transition
                    ${isDone ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-100'}`}
                  title={isDone ? 'Esta misión ya está completada' : 'Poner en SIN_EMPEZAR'}>
                  SIN_EMPEZAR
                </button>
                <button
                  onClick={() => setState(m.mission_id,'EN_PROGRESO')}
                  disabled={isDone}
                  className={`rounded-md border px-3 py-2 transition
                    ${isDone ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-100'}`}
                  title={isDone ? 'Esta misión ya está completada' : 'Poner EN_PROGRESO'}>
                  EN_PROGRESO
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
