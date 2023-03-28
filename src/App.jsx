import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ToolBar from './components/ToolBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import ErrorPage from './pages/ErrorPage';
import { loadExistingLoginStatus } from './pages/RegisterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ToolBar />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, path: '', element: <HomePage /> },
      { path: 'login', element: <LoginPage />, loader: loadExistingLoginStatus },
      { path: 'register', element: <RegisterPage />, loader: loadExistingLoginStatus },
      { path: 'about', element: <AboutPage /> },
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
