import { useState } from "react";

function Targets() {
  const [targets, setTargets] = useState([
    {
      id: 1,
      wing: "A",
      floor: "1",
      activity: "Painting",
      targetDate: "2026-09-20",
      planned: 100,
      actual: 75,
      status: "In Progress",
    },
    {
      id: 2,
      wing: "B",
      floor: "2",
      activity: "Tile Work",
      targetDate: "2026-10-05",
      planned: 100,
      actual: 30,
      status: "Pending",
    },
    {
      id: 3,
      wing: "C",
      floor: "3",
      activity: "MEP Completion",
      targetDate: "2026-09-28",
      planned: 100,
      actual: 70,
      status: "In Progress",
    },
  ]);

  const [form, setForm] = useState({
    wing: "",
    floor: "",
    activity: "",
    targetDate: "",
    planned: "",
    actual: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addTarget = (e) => {
    e.preventDefault();

    if (
      !form.wing ||
      !form.floor ||
      !form.activity ||
      !form.targetDate
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const actual = Number(form.actual || 0);
    const planned = Number(form.planned || 100);

    let status = "Pending";

    if (actual >= planned) {
      status = "Completed";
    } else if (actual > 0) {
      status = "In Progress";
    }

    const newTarget = {
      id: Date.now(),
      wing: form.wing,
      floor: form.floor,
      activity: form.activity,
      targetDate: form.targetDate,
      planned,
      actual,
      status,
    };

    setTargets([...targets, newTarget]);

    setForm({
      wing: "",
      floor: "",
      activity: "",
      targetDate: "",
      planned: "",
      actual: "",
    });
  };

  const deleteTarget = (id) => {
    setTargets(targets.filter((target) => target.id !== id));
  };

  return (
    <div>
      {/* PAGE HEADER */}

      <div className="page-header">
        <div>
          <h1 className="page-title">
            🎯 Targets
          </h1>

          <p className="page-subtitle">
            Plan and monitor construction activity targets
          </p>
        </div>
      </div>

      {/* CREATE TARGET */}

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Create Target</h2>

            <p>
              Set planned targets for construction activities.
            </p>
          </div>
        </div>

        <form onSubmit={addTarget}>
          <div className="form-grid">

            <div className="form-group">
              <label>Wing *</label>

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

            <div className="form-group">
              <label>Floor *</label>

              <input
                type="number"
                name="floor"
                placeholder="Enter floor"
                value={form.floor}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Activity *</label>

              <input
                type="text"
                name="activity"
                placeholder="Example: Painting"
                value={form.activity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Target Date *</label>

              <input
                type="date"
                name="targetDate"
                value={form.targetDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Planned Progress (%)</label>

              <input
                type="number"
                min="0"
                max="100"
                name="planned"
                placeholder="100"
                value={form.planned}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Actual Progress (%)</label>

              <input
                type="number"
                min="0"
                max="100"
                name="actual"
                placeholder="0"
                value={form.actual}
                onChange={handleChange}
              />
            </div>

          </div>

          <div style={{ marginTop: "20px" }}>
            <button
              type="submit"
              className="primary-button"
            >
              + Add Target
            </button>
          </div>
        </form>
      </section>

      {/* TARGET LIST */}

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Target Register</h2>

            <p>
              Track planned versus actual progress.
            </p>
          </div>
        </div>

        {targets.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              🎯
            </div>

            <h3>No Targets Found</h3>

            <p>
              Create your first construction target above.
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">

              <thead>
                <tr>
                  <th>Wing</th>
                  <th>Floor</th>
                  <th>Activity</th>
                  <th>Target Date</th>
                  <th>Planned</th>
                  <th>Actual</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {targets.map((target) => (
                  <tr key={target.id}>

                    <td>{target.wing}</td>

                    <td>{target.floor}</td>

                    <td>
                      <strong>
                        {target.activity}
                      </strong>
                    </td>

                    <td>
                      {target.targetDate}
                    </td>

                    <td>
                      {target.planned}%
                    </td>

                    <td>
                      <div className="progress-cell">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${target.actual}%`,
                            }}
                          ></div>
                        </div>

                        <span>
                          {target.actual}%
                        </span>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${target.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {target.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="delete-button"
                        onClick={() =>
                          deleteTarget(target.id)
                        }
                      >
                        Delete
                      </button>
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

export default Targets;