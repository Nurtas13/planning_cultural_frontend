import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '../components/auth/layout/loginPage';
import { Welcome } from '../components/auth/layout/Welcome';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/', element: <Welcome /> },
]);
