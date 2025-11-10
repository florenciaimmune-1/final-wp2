import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Missions from './pages/Missions';
import MyMissions from './pages/MyMissions';
import AdminMissions from './pages/AdminMissions';
import Ranking from './pages/Ranking';
import ProtectedRoute from './components/ProtectedRoute';

export const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <Home /> },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    { path: 'profile', element: <ProtectedRoute><Profile/></ProtectedRoute> },
    { path: 'missions', element: <Missions /> },
    { path: 'my-missions', element: <ProtectedRoute><MyMissions/></ProtectedRoute> },
    { path: 'admin/missions', element: <ProtectedRoute><AdminMissions/></ProtectedRoute> },
    { path: 'ranking', element: <Ranking /> },
  ] }
]);
