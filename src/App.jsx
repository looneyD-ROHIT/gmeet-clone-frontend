import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavBarFooterSandwichLayout from './components/layouts/NavBarFooterSandwichLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AppPage from './pages/AppPage';
import AppChatPage from './pages/AppChatPage';
import AboutPage from './pages/AboutPage';
import Fallback from './pages/Fallback';
import ErrorPage from './pages/ErrorPage';
import loadExistingLoginStatus from './Utils/loadExistingLoginStatus';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavBarFooterSandwichLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'login', element: <LoginPage />, loader: loadExistingLoginStatus },
      { path: 'register', element: <RegisterPage />, loader: loadExistingLoginStatus },
      { path: 'app/:id?', element: <AppPage /> },
      { path: 'app/:id/:meetid', element: <AppChatPage /> },
      { path: 'about', element: <AboutPage /> },
    ]
  },
  {
    path: '*', element: <Fallback />
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
