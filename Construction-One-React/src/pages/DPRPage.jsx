import { useState } from "react";

function DPRPage() {
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    wing: "",
    floor: "",
    flat: "",
    activity: "",
    plannedProgress: "",
    actualProgress: "",
    manpower: "",
    material: "",
    submittedBy: "Admin",
    description: "",
    issues: "",
  });

  const [reports, setReports] = useState([]);

  const activities = [
    "RCC Work",
    "Block Work",
    "Internal Plaster",
    "External Plaster",
    "Waterproofing",
    "Flooring",
    "Tile Work",
    "Painting",
    "False Ceiling",
    "Electrical",
    "Plumbing",
    "Fire Fighting",
    "HVAC",
    "MEP Completion",
    "Final Cleaning",
    "Snag Rectification",
    "Handover",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.wing || !form.activity || !form.actualProgress) {
      alert("Please fill Wing, Activity and Actual Progress.");
      return;
    }

    const newReport = {
      ...form,
      id: Date.now(),
    };

    setReports((prev) => [newReport, ...prev]);

    alert("DPR submitted successfully.");

    setForm((prev) => ({
      ...prev,
      wing: "",
      floor: "",
      flat: "",
      activity: "",
      plannedProgress: "",
      actualProgress: "",
      manpower: "",
      material: "",
      description: "",
      issues: "",
    }));
  };

  const handleDraft = () => {
    alert("DPR saved as draft.");
  };

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            📋 Daily Progress Report
          </h1>

          <p className="page-subtitle">
            Record and monitor daily construction progress
          </p>
        </div>

        <div>
          <strong>Rustomjee Bella</strong>
        </div>
      </div>

      {/* DPR FORM */}
      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Create Daily Progress Report</h2>

            <p>
              Record work progress against the project structure.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="dpr-grid">

            {/* DATE */}
            <div className="form-group">
              <label>DPR Date</label>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>

            {/* PROJECT */}
            <div className="form-group">
              <label>Project</label>

              <input
                type="text"
                value="Rustomjee Bella"
                readOnly
              />
            </div>

            {/* WING */}
            <div className="form-group">
              <label>Wing</label>

              <select
                name="wing"
                value={form.wing}
                onChange={handleChange}
              >
                <option value="">Select Wing</option>
                <option value="A">A Wing</option>
                <option value="B">B Wing</option>
                <option value="C">C Wing</option>
                <option value="D">D Wing</option>
              </select>
            </div>

            {/* FLOOR */}
            <div className="form-group">
              <label>Floor</label>

              <input
                type="number"
                name="floor"
                value={form.floor}
                onChange={handleChange}
                placeholder="Enter floor"
              />
            </div>

            {/* FLAT */}
            <div className="form-group">
              <label>Flat / Unit</label>

              <input
                type="text"
                name="flat"
                value={form.flat}
                onChange={handleChange}
                placeholder="Example: C-1503"
              />
            </div>

            {/* ACTIVITY */}
            <div className="form-group">
              <label>Activity</label>

              <select
                name="activity"
                value={form.activity}
                onChange={handleChange}
              >
                <option value="">Select Activity</option>

                {activities.map((activity) => (
                  <option key={activity} value={activity}>
                    {activity}
                  </option>
                ))}
              </select>
            </div>

            {/* PLANNED */}
            <div className="form-group">
              <label>Planned Progress (%)</label>

              <input
                type="number"
                min="0"
                max="100"
                name="plannedProgress"
                value={form.plannedProgress}
                onChange={handleChange}
                placeholder="Example: 80"
              />
            </div>

            {/* ACTUAL */}
            <div className="form-group">
              <label>Actual Progress (%)</label>

              <input
                type="number"
                min="0"
                max="100"
                name="actualProgress"
                value={form.actualProgress}
                onChange={handleChange}
                placeholder="Example: 75"
              />
            </div>

            {/* MANPOWER */}
            <div className="form-group">
              <label>Manpower</label>

              <input
                type="text"
                name="manpower"
                value={form.manpower}
                onChange={handleChange}
                placeholder="Example: 4 Carpenters + 3 Helpers"
              />
            </div>

            {/* MATERIAL */}
            <div className="form-group">
              <label>Material Used</label>

              <input
                type="text"
                name="material"
                value={form.material}
                onChange={handleChange}
                placeholder="Example: 25 Gypsum Boards"
              />
            </div>

            {/* SUBMITTED BY */}
            <div className="form-group">
              <label>Submitted By</label>

              <input
                type="text"
                name="submittedBy"
                value={form.submittedBy}
                onChange={handleChange}
              />
            </div>

            {/* DESCRIPTION */}
            <div className="form-group full-width">
              <label>Work Description</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe today's work progress..."
                rows="4"
              />
            </div>

            {/* ISSUES */}
            <div className="form-group full-width">
              <label>Issues / Constraints</label>

              <textarea
                name="issues"
                value={form.issues}
                onChange={handleChange}
                placeholder="Mention material shortage, drawing issue, manpower issue, etc."
                rows="4"
              />
            </div>

          </div>

          {/* BUTTONS */}
          <div className="dpr-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={handleDraft}
            >
              Save Draft
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              Submit DPR
            </button>
          </div>
        </form>
      </section>

      {/* REPORT HISTORY */}
      <section className="panel">

        <div className="panel-header">
          <div>
            <h2>DPR History</h2>

            <p>
              Recently submitted daily progress reports
            </p>
          </div>
        </div>

        {reports.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              📋
            </div>

            <h3>No DPR submitted yet</h3>

            <p>
              Submitted DPRs will appear here.
            </p>
          </div>
        ) : (
          <div className="table-container">

            <table className="data-table">

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Wing</th>
                  <th>Floor</th>
                  <th>Flat</th>
                  <th>Activity</th>
                  <th>Planned</th>
                  <th>Actual</th>
                  <th>Manpower</th>
                </tr>
              </thead>

              <tbody>

                {reports.map((report) => (
                  <tr key={report.id}>

                    <td>{report.date}</td>

                    <td>{report.wing}</td>

                    <td>{report.floor || "-"}</td>

                    <td>{report.flat || "-"}</td>

                    <td>{report.activity}</td>

                    <td>
                      {report.plannedProgress || 0}%
                    </td>

                    <td>
                      <strong>
                        {report.actualProgress}%
                      </strong>
                    </td>

                    <td>
                      {report.manpower || "-"}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </section>
    </div>
  );
}

export default DPRPage;