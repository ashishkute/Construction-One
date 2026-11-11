import { Outlet } from "react-router-dom";
import { Building2, ChevronDown, CircleHelp, Bell, Search, UserCircle } from "lucide-react";
import Sidebar from "./Sidebar.jsx";
import { workspaces } from "../data/navigation.js";

export default function Shell({ workspace, user, onSignOut, onWorkspaceChange }) {
  const current = workspaces[workspace];
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">V</div>
          <div><strong>VISHVAKARMA ONE</strong><small>Construction Management Platform</small></div>
        </div>
        <div className="topbar-right">
          <label className="workspace-select">
            <Building2 size={16} />
            <select value={workspace} onChange={e => onWorkspaceChange(e.target.value)}>
              <option value="construction">Construction ERP</option>
              <option value="contractor">Contractor ERP</option>
            </select>
            <ChevronDown size={14} />
          </label>
          <button className="icon-button" title="Search"><Search size={18}/></button>
          <button className="icon-button" title="Notifications"><Bell size={18}/></button>
          <button className="profile" onClick={onSignOut} title="Sign out"><UserCircle size={19}/> {user?.email || "Account"} · Sign out</button>
        </div>
      </header>
      <div className="body-shell">
        <Sidebar workspace={workspace} />
        <main className="main-content">
          <div className="workspace-banner">
            <div><span className="eyebrow">ACTIVE WORKSPACE</span><h2>{current.label}</h2><p>{current.subtitle}</p></div>
            <div className="live-status"><span/> Signed in</div>
          </div>
          <Outlet />
          <footer>Vishvakarma One · React migration workspace · Prototype build</footer>
        </main>
      </div>
    </div>
  );
}