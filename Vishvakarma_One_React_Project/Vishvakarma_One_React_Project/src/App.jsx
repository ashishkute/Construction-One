import { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Shell from './components/Shell.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ModuleWorkspace from './pages/ModuleWorkspace.jsx';
import Login from './pages/Login.jsx';
import { AuthProvider, useAuth } from './auth/AuthContext.jsx';

function AppRoutes() {
  const { user, loading, signOut, configured } = useAuth();
  const [workspace, setWorkspace] = useState(localStorage.getItem('v1_workspace') || 'construction');
  const navigate = useNavigate();
  function changeWorkspace(value) { setWorkspace(value); localStorage.setItem('v1_workspace', value); navigate('/'); }
  if (loading) return <div className="auth-loading">Loading secure session…</div>;
  if (!configured || !user) return <Login />;
  return <Routes><Route path="/" element={<Shell workspace={workspace} user={user} onSignOut={signOut} onWorkspaceChange={changeWorkspace} />}><Route index element={<Dashboard workspace={workspace} />} /><Route path="module/:moduleId" element={<ModuleWorkspace workspace={workspace} />} /></Route><Route path="*" element={<Navigate to="/" replace />} /></Routes>;
}
export default function App() { return <AuthProvider><AppRoutes /></AuthProvider>; }
