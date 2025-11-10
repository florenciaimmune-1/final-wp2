import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function App(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-neutral-900">
      <Navbar />
      <main className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
