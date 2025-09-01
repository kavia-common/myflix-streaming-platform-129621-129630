import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * RegisterPage renders the registration form and calls onRegister(name, email, password).
 * Props:
 * - onRegister: (name, email, password) => Promise<user>
 */
function RegisterPage({ onRegister }) {
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      await onRegister(name, email, password);
      nav('/');
    } catch (e) {
      alert(e.message || 'Registration failed');
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <h2>Create Account</h2>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" type="email" required />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input id="password" className="input" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" type="password" required />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Create</button>
        <Link className="btn btn-outline" to="/login">Sign in</Link>
      </div>
    </form>
  );
}

export default RegisterPage;
