import React, { useEffect, useMemo, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import SearchPage from './pages/SearchPage';
import WatchlistPage from './pages/WatchlistPage';
import DetailsPage from './pages/DetailsPage';
import PlayerPage from './pages/PlayerPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

/**
 * PUBLIC_INTERFACE
 * App is the main entry point for the MyFlix frontend. It provides:
 * - App-wide theme handling (light/dark)
 * - Router configuration for primary pages
 * - Simple in-memory auth guard for demo purposes
 */
function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const authApi = useMemo(() => ({
    // PUBLIC_INTERFACE
    login: async (email, password) => {
      /** Naive demo auth. Replace with backend API. */
      if (email && password) {
        const demoUser = { id: 'u1', name: email.split('@')[0], email };
        localStorage.setItem('myflix_user', JSON.stringify(demoUser));
        setUser(demoUser);
        return demoUser;
      }
      throw new Error('Invalid credentials');
    },
    // PUBLIC_INTERFACE
    register: async (name, email, password) => {
      /** Naive demo registration. Replace with backend API. */
      if (name && email && password) {
        const demoUser = { id: 'u1', name, email };
        localStorage.setItem('myflix_user', JSON.stringify(demoUser));
        setUser(demoUser);
        return demoUser;
      }
      throw new Error('Invalid registration data');
    },
    // PUBLIC_INTERFACE
    logout: () => {
      localStorage.removeItem('myflix_user');
      setUser(null);
    },
    currentUser: () => user
  }), [user]);

  useEffect(() => {
    const raw = localStorage.getItem('myflix_user');
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const protectedRoute = (element) => {
    return user ? element : <Navigate to="/login" replace />;
  };

  return (
    <Layout
      theme={theme}
      setTheme={setTheme}
      user={user}
      onLogout={authApi.logout}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse" element={protectedRoute(<BrowsePage />)} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/watchlist" element={protectedRoute(<WatchlistPage />)} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/player/:id" element={<PlayerPage />} />
        <Route path="/login" element={<LoginPage onLogin={authApi.login} />} />
        <Route path="/register" element={<RegisterPage onRegister={authApi.register} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
