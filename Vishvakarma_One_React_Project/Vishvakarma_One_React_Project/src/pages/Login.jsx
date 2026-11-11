import { useState } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';
import { isSupabaseConfigured } from '../lib/supabase.js';

export default function Login() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  async function submit(e) {
    e.preventDefault(); setBusy(true); setError(''); setMessage('');
    try {
      if (mode === 'signin') await signIn(email.trim(), password);
      else {
        const result = await signUp(email.trim(), password);
        setMessage(result?.session ? 'Account created and signed in.' : 'Account created. Check your email to confirm the address, then sign in.');
        if (!result?.session) setMode('signin');
      }
    } catch (err) { setError(err.message || 'Unable to complete authentication.'); }
    finally { setBusy(false); }
  }
  return <main className="auth-page"><section className="auth-card">
    <div className="auth-brand"><div className="brand-mark">V</div><div><strong>VISHVAKARMA ONE</strong><small>Construction Management Platform</small></div></div>
    <div className="auth-title"><span className="eyebrow">SECURE WORKSPACE ACCESS</span><h1>{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h1><p>Sign in to access your authorised Vishvakarma One workspace.</p></div>
    {!isSupabaseConfigured && <div className="auth-alert">Supabase connection details are not configured in the deployment environment yet.</div>}
    {error && <div className="auth-alert error">{error}</div>}{message && <div className="auth-alert success">{message}</div>}
    <form onSubmit={submit} className="auth-form"><label>Email address<input type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@company.com" /></label><label>Password<input type="password" autoComplete={mode==='signin'?'current-password':'new-password'} minLength={6} required value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 6 characters" /></label><button className="primary auth-submit" disabled={busy || !isSupabaseConfigured}>{busy ? 'Please wait…' : mode==='signin' ? 'Sign in' : 'Create account'}</button></form>
    <button className="auth-switch" onClick={()=>{setMode(mode==='signin'?'signup':'signin');setError('');setMessage('');}}>{mode==='signin' ? 'New to Vishvakarma One? Create account' : 'Already registered? Sign in'}</button>
    <p className="auth-foot">Access is controlled by your organisation membership and database permissions.</p>
  </section></main>;
}
