import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const itemCls = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? 'bg-neutral-200' : 'hover:bg-neutral-100'
  }`;

export default function Navbar(){
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  if (pathname === '/login') {
    return (
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4">
          <nav className="flex items-center justify-end gap-2 py-3">
            <NavLink to="/register" className={itemCls}>Crear cuenta</NavLink>
          </nav>
        </div>
      </header>
    );
  }
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-4xl px-4">
        <nav className="flex flex-wrap items-center justify-between gap-2 py-3">
          <NavLink to="/" className="text-lg font-extrabold tracking-tight">Heroes</NavLink>

          <div className="flex-1 min-w-0">
            <div className="flex gap-1 overflow-x-auto no-scrollbar py-1">
              <NavLink to="/missions" className={itemCls}>Misiones</NavLink>
              <NavLink to="/ranking" className={itemCls}>Ranking</NavLink>
              {user && <NavLink to="/my-missions" className={itemCls}>Mis Misiones</NavLink>}
              {user?.role === 'MAESTRO' && (
                <NavLink to="/admin/missions" className={itemCls}>Admin</NavLink>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium border hover:bg-neutral-100"
              >
                Salir
              </button>
            ) : (
              <>
                <NavLink to="/login" className={itemCls}>Iniciar Sesion</NavLink>
                <NavLink to="/register" className={itemCls}>Crear cuenta</NavLink>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
