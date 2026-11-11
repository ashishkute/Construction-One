import { ClipboardList, Boxes, ReceiptText, Users, TrendingUp, CircleAlert } from "lucide-react";
import { workspaces } from "../data/navigation.js";

export default function Dashboard({ workspace }) {
  const groups = workspaces[workspace].groups;
  const count = groups.reduce((n,g) => n + g.items.length, 0);
  const cards = [
    ["Active Modules", count, ClipboardList],
    ["Pending Approvals", "—", CircleAlert],
    ["Material Transactions", "—", Boxes],
    ["Commercial Transactions", "—", ReceiptText]
  ];
  return (
    <div className="page">
      <div className="page-heading"><div><span className="eyebrow">OVERVIEW</span><h1>Project Dashboard</h1><p>Central workspace for project, commercial, material and execution control.</p></div><span className="tag">React foundation</span></div>
      <div className="stat-grid">
        {cards.map(([label,value,Icon]) => <div className="stat-card" key={label}><div className="stat-icon"><Icon size={19}/></div><div><span>{label}</span><strong>{value}</strong></div></div>)}
      </div>
      <div className="content-grid">
        <section className="panel"><div className="panel-head"><h3>Workspace modules</h3><span>{count} modules</span></div>
          {groups.map(g => <div className="module-group" key={g.title}><h4>{g.title}</h4><div className="module-chips">{g.items.map(x=><span key={x}>{x}</span>)}</div></div>)}
        </section>
        <section className="panel"><div className="panel-head"><h3>Development notes</h3><TrendingUp size={18}/></div>
          <div className="notice"><strong>React project foundation</strong><p>This folder provides the application structure, workspace navigation and module routing. The detailed v86 HTML prototype is retained separately as a migration reference.</p></div>
          <div className="notice warning"><strong>Not production-ready yet</strong><p>Backend APIs, database, authentication, role permissions and full module-by-module migration still need implementation.</p></div>
          <div className="notice"><strong>Data handling</strong><p>Do not enter live company or customer data in this starter project. It currently has no secure central database.</p></div>
        </section>
      </div>
    </div>
  );
}