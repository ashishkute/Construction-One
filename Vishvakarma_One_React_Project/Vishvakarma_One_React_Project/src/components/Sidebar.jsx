import { NavLink } from "react-router-dom";
import { LayoutDashboard, ChevronDown, HardHat } from "lucide-react";
import { workspaces } from "../data/navigation.js";

export default function Sidebar({ workspace }) {
  const groups = workspaces[workspace].groups;
  return (
    <aside className="sidebar">
      <NavLink to="/" end className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>
        <LayoutDashboard size={17}/> Dashboard
      </NavLink>
      {groups.map(group => (
        <section className="nav-group" key={group.title}>
          <div className="nav-group-title">{group.title}<ChevronDown size={13}/></div>
          {group.items.map(item => (
            <NavLink key={item} to={`/module/${encodeURIComponent(item)}`} className={({isActive}) => `nav-link sub-link ${isActive ? "active" : ""}`}>
              <span className="nav-dot"/>{item}
            </NavLink>
          ))}
        </section>
      ))}
      <div className="sidebar-bottom"><HardHat size={16}/> Built for construction teams</div>
    </aside>
  );
}