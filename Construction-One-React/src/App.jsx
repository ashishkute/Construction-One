import { BrowserRouter, Routes, Route, Navigate, NavLink, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectSetup from "./pages/ProjectSetup";
import FlatTracker from "./pages/FlatTracker";
import DPRPage from "./pages/DPRPage";
import Targets from "./pages/Targets";
import PurchaseOrders from "./pages/PurchaseOrders";
import WorkOrders from "./pages/WorkOrders";
import Vendors from "./pages/Vendors";
import Contractors from "./pages/Contractors";
import Snags from "./pages/Snags";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import "./App.css";

const menu = [
  ["Dashboard", "▥", "/dashboard"],
  ["Projects", "▦", "/projects"],
  ["Project Setup", "⚙", "/project-setup"],
  ["Flat Tracker", "⌂", "/flat-tracker"],
  ["DPR", "▤", "/dpr"],
  ["Targets", "◉", "/targets"],
  ["Purchase Orders", "🛒", "/purchase-orders"],
  ["Work Orders", "▧", "/work-orders"],
  ["Vendors", "♙", "/vendors"],
  ["Contractors", "⚒", "/contractors"],
  ["Snag / Desnag", "⚠", "/snags"],
  ["Payments", "₹", "/payments"],
  ["Reports", "▨", "/reports"],
];

function Shell({ children }) {
  const location = useLocation();
  const current = menu.find(([, , path]) => location.pathname === path)?.[0] || "Dashboard";

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="brand-block">
          <div className="brand-mark">CO</div>
          <div>
            <div className="brand-name">Construction One</div>
            <div className="brand-subtitle">Project Management System</div>
          </div>
        </div>

        <div className="sidebar-section-title">MAIN MENU</div>
        <nav className="sidebar-nav">
          {menu.map(([label, icon, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}
            >
              <span className="sidebar-icon">{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-project-label">CURRENT PROJECT</div>
          <strong>Rustomjee Bella</strong>
          <span>Bhandup West, Mumbai</span>
        </div>
      </aside>

      <div className="app-main">
        <header className="app-topbar">
          <div>
            <div className="breadcrumb">Construction One / {current}</div>
            <div className="topbar-page-title">{current}</div>
          </div>
          <div className="topbar-right">
            <div className="project-pill">
              <span className="online-dot" />
              <span>Rustomjee Bella</span>
            </div>
            <div className="user-pill">
              <span className="avatar">A</span>
              <span>Admin</span>
            </div>
          </div>
        </header>

        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project-setup" element={<ProjectSetup />} />
          <Route path="/flat-tracker" element={<FlatTracker />} />
          <Route path="/dpr" element={<DPRPage />} />
          <Route path="/targets" element={<Targets />} />
          <Route path="/purchase-orders" element={<PurchaseOrders />} />
          <Route path="/work-orders" element={<WorkOrders />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/contractors" element={<Contractors />} />
          <Route path="/snags" element={<Snags />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
}

export default App;
