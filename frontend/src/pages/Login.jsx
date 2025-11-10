import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';

export default function Login(){
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function onSubmit(e){
    e.preventDefault();
    setError('');
    try{
      const { token } = await api('/auth/login', { method: 'POST', body: { email, password } });
      login(token);
      navigate('/missions', { replace: true });
    }catch(e){
      setError(e.message || 'Error al iniciar sesión');
    }
  }

  const demoAccounts = [
    { name: 'Flor (Maestro)', email: 'flor@test.com', pass: '123456' },
    { name: 'Indiana Jones', email: 'indiana@heroes.test', pass: '123456' },
    { name: 'Lara Croft', email: 'lara@heroes.test', pass: '123456' },
    { name: 'Katniss Everdeen', email: 'katniss@heroes.test', pass: '123456' },
    { name: 'Peeta Mellark', email: 'peeta@heroes.test', pass: '123456' },
  ];

  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-3xl font-bold text-center">Ingresar</h1>

      <form onSubmit={onSubmit} className="grid gap-3 rounded-lg border bg-white p-4 shadow-sm">
        {error && <div className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
        <input
          className="w-full rounded border p-2"
          placeholder="Email"
          autoComplete="username"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />
        <input
          className="w-full rounded border p-2"
          type="password"
          placeholder="Contraseña"
          autoComplete="current-password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />
        <button className="rounded-md bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700">
          Entrar
        </button>
      </form>

      <div className="mx-auto max-w-md rounded-lg border bg-white p-4 text-sm shadow-sm">
        <h2 className="mb-2 text-center text-base font-semibold">Cuentas de prueba</h2>
        <ul className="space-y-2">
          {demoAccounts.map((a, i) => (
            <li key={i} className="flex items-center justify-between gap-3 rounded border px-3 py-2">
              <div>
                <div className="font-medium">{a.name}</div>
                <div className="text-neutral-600">
                  Email: <span className="font-mono">{a.email}</span> · Password: <span className="font-mono">{a.pass}</span>
                </div>
              </div>
              <button
                type="button"
                className="rounded border px-2 py-1 text-xs hover:bg-neutral-100"
                onClick={() => { setEmail(a.email); setPassword(a.pass); }}
                title="Completar en el formulario"
              >
                Usar
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-center text-neutral-600">
          ¿No tenés cuenta?{' '}
          <Link to="/register" className="font-medium underline">
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}
