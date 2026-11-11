import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Shell from "./components/Shell.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ModuleWorkspace from "./pages/ModuleWorkspace.jsx";

export default function App() {
  const [workspace, setWorkspace] = useState(
    localStorage.getItem("v1_workspace") || "construction"
  );
  const navigate = useNavigate();

  function changeWorkspace(value) {
    setWorkspace(value);
    localStorage.setItem("v1_workspace", value);
    navigate("/");
  }

  return (
    <Routes>
      <Route path="/" element={<Shell workspace={workspace} onWorkspaceChange={changeWorkspace} />}>
        <Route index element={<Dashboard workspace={workspace} />} />
        <Route path="module/:moduleId" element={<ModuleWorkspace workspace={workspace} />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}