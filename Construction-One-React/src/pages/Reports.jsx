import React, { useMemo, useState } from "react";

function Reports() {
  const [reportType, setReportType] = useState("Project Summary");
  const [wing, setWing] = useState("All Wings");
  const [status, setStatus] = useState("All Status");

  const flats = useMemo(
    () => [
      { flat: "A-101", wing: "A", floor: 1, status: "In Progress", progress: 50, activity: "Painting" },
      { flat: "A-102", wing: "A", floor: 1, status: "Completed", progress: 100, activity: "Handover" },
      { flat: "A-103", wing: "A", floor: 1, status: "In Progress", progress: 70, activity: "Electrical" },
      { flat: "A-104", wing: "A", floor: 1, status: "Not Started", progress: 0, activity: "Not Started" },
      { flat: "A-201", wing: "A", floor: 2, status: "Completed", progress: 100, activity: "Handover" },
      { flat: "A-202", wing: "A", floor: 2, status: "In Progress", progress: 60, activity: "Tiles" },
      { flat: "B-101", wing: "B", floor: 1, status: "Completed", progress: 100, activity: "Handover" },
      { flat: "B-102", wing: "B", floor: 1, status: "In Progress", progress: 45, activity: "Plumbing" },
      { flat: "B-201", wing: "B", floor: 2, status: "Not Started", progress: 0, activity: "Not Started" },
      { flat: "B-202", wing: "B", floor: 2, status: "In Progress", progress: 80, activity: "Painting" },
      { flat: "C-101", wing: "C", floor: 1, status: "Completed", progress: 100, activity: "Handover" },
      { flat: "C-102", wing: "C", floor: 1, status: "In Progress", progress: 55, activity: "False Ceiling" },
      { flat: "C-201", wing: "C", floor: 2, status: "Not Started", progress: 0, activity: "Not Started" },
      { flat: "C-202", wing: "C", floor: 2, status: "In Progress", progress: 65, activity: "Flooring" },
      { flat: "D-101", wing: "D", floor: 1, status: "Completed", progress: 100, activity: "Handover" },
      { flat: "D-102", wing: "D", floor: 1, status: "In Progress", progress: 75, activity: "Sanitary" },
      { flat: "D-201", wing: "D", floor: 2, status: "In Progress", progress: 40, activity: "Carpentry" },
      { flat: "D-202", wing: "D", floor: 2, status: "Not Started", progress: 0, activity: "Not Started" },
    ],
    []
  );

  const filteredFlats = flats.filter((item) => {
    const wingMatch = wing === "All Wings" || item.wing === wing;
    const statusMatch = status === "All Status" || item.status === status;

    return wingMatch && statusMatch;
  });

  const totalFlats = flats.length;

  const completed = flats.filter(
    (item) => item.status === "Completed"
  ).length;

  const inProgress = flats.filter(
    (item) => item.status === "In Progress"
  ).length;

  const notStarted = flats.filter(
    (item) => item.status === "Not Started"
  ).length;

  const overallProgress =
    totalFlats > 0
      ? Math.round(
          flats.reduce((sum, item) => sum + item.progress, 0) /
            totalFlats
        )
      : 0;

  const exportReport = () => {
    const rows = [
      ["Construction One - Rustomjee Bella"],
      ["Report Type", reportType],
      ["Generated On", new Date().toLocaleDateString()],
      [],
      ["Flat", "Wing", "Floor", "Status", "Progress", "Current Activity"],
      ...filteredFlats.map((item) => [
        item.flat,
        item.wing,
        item.floor,
        item.status,
        `${item.progress}%`,
        item.activity,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "construction-one-report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <h1>📊 Reports</h1>
          <p>
            Generate project progress and construction management reports
          </p>
        </div>

        <div className="project-name">
          Rustomjee Bella
        </div>
      </div>

      <div className="report-toolbar">
        <div className="form-group">
          <label>Report Type</label>

          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option>Project Summary</option>
            <option>Flat Progress Report</option>
            <option>Wing Progress Report</option>
            <option>Pending Work Report</option>
            <option>Completion Report</option>
          </select>
        </div>

        <div className="form-group">
          <label>Wing</label>

          <select
            value={wing}
            onChange={(e) => setWing(e.target.value)}
          >
            <option>All Wings</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All Status</option>
            <option>Completed</option>
            <option>In Progress</option>
            <option>Not Started</option>
          </select>
        </div>

        <div className="report-buttons">
          <button
            className="btn-primary"
            onClick={exportReport}
          >
            📥 Export CSV
          </button>

          <button
            className="btn-secondary"
            onClick={printReport}
          >
            🖨 Print
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏠</div>
          <div>
            <span>Total Flats</span>
            <strong>{totalFlats}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div>
            <span>Completed</span>
            <strong>{completed}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div>
            <span>In Progress</span>
            <strong>{inProgress}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div>
            <span>Not Started</span>
            <strong>{notStarted}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div>
            <span>Overall Progress</span>
            <strong>{overallProgress}%</strong>
          </div>
        </div>
      </div>

      <div className="report-panel">
        <div className="panel-header">
          <div>
            <h2>{reportType}</h2>
            <p>
              Construction progress report for Rustomjee Bella
            </p>
          </div>

          <div className="report-date">
            {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="progress-summary">
          <div className="progress-summary-header">
            <span>Overall Project Progress</span>
            <strong>{overallProgress}%</strong>
          </div>

          <div className="large-progress-bar">
            <div
              className="large-progress-fill"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="report-table">
            <thead>
              <tr>
                <th>Flat</th>
                <th>Wing</th>
                <th>Floor</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Current Activity</th>
              </tr>
            </thead>

            <tbody>
              {filteredFlats.map((item) => (
                <tr key={item.flat}>
                  <td>
                    <strong>{item.flat}</strong>
                  </td>

                  <td>{item.wing}</td>

                  <td>{item.floor}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        item.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="table-progress">
                      <div className="table-progress-bar">
                        <div
                          className="table-progress-fill"
                          style={{
                            width: `${item.progress}%`,
                          }}
                        />
                      </div>

                      <span>{item.progress}%</span>
                    </div>
                  </td>

                  <td>{item.activity}</td>
                </tr>
              ))}

              {filteredFlats.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-state">
                    No records found for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="report-footer">
          Showing {filteredFlats.length} of {totalFlats} flats
        </div>
      </div>
    </div>
  );
}

export default Reports;