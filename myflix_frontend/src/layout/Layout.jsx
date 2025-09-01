import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Layout is the app shell providing top app bar, sidebar navigation, and a content area.
 * Props:
 * - theme: 'light' | 'dark'
 * - setTheme: (t) => void
 * - user: current user object or null
 * - onLogout: () => void
 */
function Layout({ children, theme, setTheme, user, onLogout }) {
  const navigate = useNavigate();
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <div className="app-shell">
      <header className="appbar topbar">
        <div className="appbar-title">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            MyFlix
          </Link>
        </div>
        <div className="appbar-actions">
          <button className="icon-btn" title="Search" onClick={() => navigate('/search')} aria-label="Search">🔍</button>
          <button className="icon-btn" title="Theme" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {user ? (
            <>
              <div className="avatar" title={user.name} aria-label="Profile" />
              <button className="icon-btn" onClick={onLogout} aria-label="Logout">⎋</button>
            </>
          ) : (
            <>
              <Link className="icon-btn" to="/login" aria-label="Login" title="Login" style={{ display: 'grid', placeItems: 'center', textDecoration: 'none' }}>↪</Link>
              <Link className="icon-btn" to="/register" aria-label="Register" title="Register" style={{ display: 'grid', placeItems: 'center', textDecoration: 'none' }}>＋</Link>
            </>
          )}
        </div>
      </header>

      <aside className="sidebar">
        <nav className="nav-section">
          <NavLink to="/" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>🏠 Home</NavLink>
          <NavLink to="/browse" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>🎬 Browse</NavLink>
          <NavLink to="/watchlist" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>⭐ Watchlist</NavLink>
          <NavLink to="/search" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}>🔎 Search</NavLink>
        </nav>
      </aside>

      <main className="content">
        {children}
      </main>
    </div>
  );
}

export default Layout;
