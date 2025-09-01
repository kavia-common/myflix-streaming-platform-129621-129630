import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * LoginPage renders the login form and calls onLogin(email, password).
 * Props:
 * - onLogin: (email, password) => Promise<user>
 */
function LoginPage({ onLogin }) {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      await onLogin(email, password);
      nav('/');
    } catch (e) {
      alert(e.message || 'Login failed');
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <h2>Sign In</h2>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" type="email" required />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input id="password" className="input" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" type="password" required />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Sign In</button>
        <Link className="btn btn-outline" to="/register">Create account</Link>
      </div>
    </form>
  );
}

export default LoginPage;
