import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { Download, Plus, Search, FileSpreadsheet } from "lucide-react";
import { moduleDescription, workspaces } from "../data/navigation.js";
import { readRegister, writeRegister, downloadCsv } from "../services/storage.js";

export default function ModuleWorkspace({ workspace }) {
  const { moduleId } = useParams();
  const title = decodeURIComponent(moduleId || "Module");
  const key = useMemo(() => `${workspace}_${title.toLowerCase().replace(/[^a-z0-9]+/g,"_")}`, [workspace,title]);
  const [rows,setRows] = useState(() => readRegister(key));
  const [search,setSearch] = useState("");
  const [value,setValue] = useState("");
  const exists = workspaces[workspace].groups.some(g => g.items.includes(title));
  function addRow(e) {
    e.preventDefault();
    if (!value.trim()) return;
    const next = [...rows, { id: crypto.randomUUID(), reference: `V1-${Date.now().toString().slice(-6)}`, description: value.trim(), status: "Draft", createdAt: new Date().toISOString().slice(0,10) }];
    setRows(next); writeRegister(key,next); setValue("");
  }
  function removeRow(id) {
    const next = rows.filter(r=>r.id!==id); setRows(next); writeRegister(key,next);
  }
  const filtered = rows.filter(r => JSON.stringify(r).toLowerCase().includes(search.toLowerCase()));
  return <div className="page">
    <div className="page-heading"><div><span className="eyebrow">{workspace === "contractor" ? "CONTRACTOR ERP" : "CONSTRUCTION ERP"}</span><h1>{title}</h1><p>{moduleDescription[title] || `Workspace for ${title.toLowerCase()} records and transactions.`}</p></div><span className="tag">Local prototype register</span></div>
    {!exists && <div className="notice warning">This route is not listed in the selected workspace navigation.</div>}
    <section className="panel">
      <div className="toolbar"><form className="quick-add" onSubmit={addRow}><input value={value} onChange={e=>setValue(e.target.value)} placeholder={`Enter ${title.toLowerCase()} description`} /><button className="primary" type="submit"><Plus size={16}/> Add record</button></form>
      <div className="toolbar-actions"><label className="searchbox"><Search size={15}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search records"/></label><button className="secondary" onClick={()=>downloadCsv(`${key}.csv`,filtered)}><Download size={15}/> Export CSV</button></div></div>
      <div className="table-wrap"><table><thead><tr><th>Reference</th><th>Description</th><th>Status</th><th>Date</th><th>Action</th></tr></thead><tbody>
        {filtered.length ? filtered.map(row=><tr key={row.id}><td>{row.reference}</td><td>{row.description}</td><td><span className="status">{row.status}</span></td><td>{row.createdAt}</td><td><button className="text-danger" onClick={()=>removeRow(row.id)}>Delete</button></td></tr>) : <tr><td colSpan="5" className="empty"><FileSpreadsheet size={22}/><br/>No records yet. Add a sample record to explore this register.</td></tr>}
      </tbody></table></div>
      <p className="helper">Starter register only. Module-specific fields, approvals, calculations and linked transactions must be migrated and implemented before operational use.</p>
    </section>
  </div>;
}