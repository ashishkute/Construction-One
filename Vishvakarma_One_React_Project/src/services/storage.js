export function readRegister(key) {
  try { return JSON.parse(localStorage.getItem(`v1_react_${key}`) || "[]"); }
  catch { return []; }
}
export function writeRegister(key, rows) {
  localStorage.setItem(`v1_react_${key}`, JSON.stringify(rows));
}
export function downloadCsv(filename, rows) {
  const cols = [...new Set(rows.flatMap(row => Object.keys(row)))];
  const quote = value => `"${String(value ?? "").replaceAll('"','""')}"`;
  const csv = [cols.map(quote).join(","), ...rows.map(row => cols.map(c=>quote(row[c])).join(","))].join("\\n");
  const blob = new Blob([csv], {type:"text/csv;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href=url; a.download=filename; a.click();
  URL.revokeObjectURL(url);
}
export function downloadBackup() {
  const data = Object.fromEntries(Object.keys(localStorage).filter(k=>k.startsWith("v1_react_")).map(k=>[k,localStorage.getItem(k)]));
  const blob = new Blob([JSON.stringify({product:"Vishvakarma One",exportedAt:new Date().toISOString(),data},null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download="vishvakarma-one-backup.json"; a.click(); URL.revokeObjectURL(url);
}