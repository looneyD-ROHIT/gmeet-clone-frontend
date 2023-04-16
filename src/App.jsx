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
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryFallback from './components/ui/ErrorBoundaryFallback';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavBarFooterSandwichLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'login', element: <LoginPage />, loader: loadExistingLoginStatus },
      { path: 'register', element: <RegisterPage />, loader: loadExistingLoginStatus },
      { path: 'app/', element: <AppPage /> },
      { path: 'app/:meetcode', element: <AppChatPage /> },
      { path: 'about', element: <AboutPage /> },
    ]
  },
  {
    path: '*', element: <Fallback />
  }
])

function App() {

  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
    >
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}

export default App
