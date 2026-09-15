import { useMemo, useState } from "react";
import {
  getProject,
  generateFlats,
} from "../data/projectStore";

function FlatTracker() {
  const project = getProject();

  // Load saved flat data from LocalStorage.
  // If no saved data exists, generate flats from Project Setup.
  const [flats, setFlats] = useState(() => {
    const savedFlats = localStorage.getItem(
      "constructionOneFlats"
    );

    if (savedFlats) {
      try {
        return JSON.parse(savedFlats);
      } catch (error) {
        console.error(
          "Error loading saved flats:",
          error
        );
      }
    }

    return generateFlats(project);
  });

  const [search, setSearch] = useState("");
  const [wingFilter, setWingFilter] =
    useState("All Wings");
  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [selectedFlat, setSelectedFlat] =
    useState(null);

  const [updateData, setUpdateData] = useState({
    status: "Not Started",
    progress: 0,
    currentActivity: "",
    targetDate: "",
  });

  const wings = project.wings || [];

  const statuses = [
    "Not Started",
    "Pending",
    "In Progress",
    "Completed",
  ];

  /* =========================
     FILTER FLATS
  ========================= */

  const filteredFlats = useMemo(() => {
    return flats.filter((flat) => {
      const matchesSearch =
        flat.flat
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesWing =
        wingFilter === "All Wings" ||
        flat.wing === wingFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        flat.status === statusFilter;

      return (
        matchesSearch &&
        matchesWing &&
        matchesStatus
      );
    });
  }, [
    flats,
    search,
    wingFilter,
    statusFilter,
  ]);

  /* =========================
     SUMMARY
  ========================= */

  const totalFlats = flats.length;

  const completed = flats.filter(
    (flat) => flat.status === "Completed"
  ).length;

  const inProgress = flats.filter(
    (flat) => flat.status === "In Progress"
  ).length;

  const overallProgress =
    totalFlats > 0
      ? Math.round(
          flats.reduce(
            (sum, flat) =>
              sum + Number(flat.progress || 0),
            0
          ) / totalFlats
        )
      : 0;

  /* =========================
     OPEN UPDATE
  ========================= */

  function openUpdate(flat) {
    setSelectedFlat(flat);

    setUpdateData({
      status: flat.status || "Not Started",
      progress: flat.progress || 0,
      currentActivity:
        flat.currentActivity || "",
      targetDate:
        flat.targetDate || "",
    });
  }

  /* =========================
     SAVE UPDATE
  ========================= */

  function saveUpdate() {
    if (!selectedFlat) return;

    const updatedFlats = flats.map((flat) => {
      if (flat.id !== selectedFlat.id) {
        return flat;
      }

      return {
        ...flat,
        status: updateData.status,
        progress: Number(updateData.progress),
        currentActivity:
          updateData.currentActivity,
        targetDate:
          updateData.targetDate,
      };
    });

    // Update screen immediately
    setFlats(updatedFlats);

    // Save permanently in browser
    localStorage.setItem(
      "constructionOneFlats",
      JSON.stringify(updatedFlats)
    );

    // Close modal
    setSelectedFlat(null);
  }

  return (
    <div>

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="page-header">

        <div>
          <h1 className="page-title">
            🏠 Flat Tracker
          </h1>

          <p className="page-subtitle">
            Track flat-wise construction progress in real time
          </p>
        </div>

        <div>
          <strong>
            {project.name}
          </strong>
        </div>

      </div>


      {/* =========================
          SUMMARY CARDS
      ========================= */}

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <div className="dashboard-card-icon">
            🏠
          </div>

          <div>
            <div className="dashboard-card-title">
              Total Flats
            </div>

            <div className="dashboard-card-value">
              {totalFlats}
            </div>
          </div>

        </div>


        <div className="dashboard-card">

          <div className="dashboard-card-icon">
            ✅
          </div>

          <div>
            <div className="dashboard-card-title">
              Completed
            </div>

            <div className="dashboard-card-value">
              {completed}
            </div>
          </div>

        </div>


        <div className="dashboard-card">

          <div className="dashboard-card-icon">
            🔄
          </div>

          <div>
            <div className="dashboard-card-title">
              In Progress
            </div>

            <div className="dashboard-card-value">
              {inProgress}
            </div>
          </div>

        </div>


        <div className="dashboard-card">

          <div className="dashboard-card-icon">
            📊
          </div>

          <div>
            <div className="dashboard-card-title">
              Overall Progress
            </div>

            <div className="dashboard-card-value">
              {overallProgress}%
            </div>
          </div>

        </div>

      </div>


      {/* =========================
          FLAT-WISE PROGRESS
      ========================= */}

      <section className="panel">

        <div className="panel-header">

          <div>
            <h2>
              Flat-wise Progress
            </h2>

            <p>
              Search and filter flats by wing and status
            </p>
          </div>

        </div>


        {/* FILTERS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "2fr 1fr 1fr",
            gap: "12px",
            marginBottom: "20px",
          }}
        >

          <input
            type="text"
            placeholder="🔍 Search flat number..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />


          <select
            value={wingFilter}
            onChange={(e) =>
              setWingFilter(e.target.value)
            }
          >

            <option>
              All Wings
            </option>

            {wings.map((wing) => (
              <option
                key={wing.id}
                value={wing.name}
              >
                Wing {wing.name}
              </option>
            ))}

          </select>


          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >

            <option>
              All Status
            </option>

            {statuses.map((status) => (
              <option
                key={status}
                value={status}
              >
                {status}
              </option>
            ))}

          </select>

        </div>


        {/* TABLE */}

        <div
          style={{
            overflowX: "auto",
          }}
        >

          <table>

            <thead>

              <tr>
                <th>Flat</th>
                <th>Wing</th>
                <th>Floor</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Current Activity</th>
                <th>Target Date</th>
                <th>Action</th>
              </tr>

            </thead>


            <tbody>

              {filteredFlats.map((flat) => (

                <tr key={flat.id}>

                  <td>
                    <strong>
                      {flat.flat}
                    </strong>
                  </td>

                  <td>
                    {flat.wing}
                  </td>

                  <td>
                    {flat.floor}
                  </td>

                  <td>

                    <span
                      className={
                        flat.status ===
                        "Completed"
                          ? "status-badge status-completed"
                          : flat.status ===
                            "In Progress"
                          ? "status-badge status-progress"
                          : "status-badge"
                      }
                    >
                      {flat.status}
                    </span>

                  </td>


                  <td>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >

                      <div
                        style={{
                          width: "80px",
                          height: "8px",
                          background:
                            "#e5e7eb",
                          borderRadius: "10px",
                          overflow: "hidden",
                        }}
                      >

                        <div
                          style={{
                            width: `${flat.progress || 0}%`,
                            height: "100%",
                            background:
                              "#2563eb",
                          }}
                        />

                      </div>

                      <span>
                        {flat.progress || 0}%
                      </span>

                    </div>

                  </td>


                  <td>
                    {flat.currentActivity ||
                      "Not Started"}
                  </td>


                  <td>
                    {flat.targetDate ||
                      "-"}
                  </td>


                  <td>

                    <button
                      onClick={() =>
                        openUpdate(flat)
                      }
                    >
                      Update
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {filteredFlats.length === 0 && (

          <div className="empty-state">

            <div className="empty-state-icon">
              🏠
            </div>

            <h3>
              No flats found
            </h3>

            <p>
              Try changing your search or filters.
            </p>

          </div>

        )}

      </section>


      {/* =========================
          UPDATE MODAL
      ========================= */}

      {selectedFlat && (

        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >

          <div
            style={{
              background: "#fff",
              width: "500px",
              maxWidth: "90%",
              padding: "25px",
              borderRadius: "12px",
              boxShadow:
                "0 10px 40px rgba(0,0,0,0.25)",
            }}
          >

            <h2>
              Update {selectedFlat.flat}
            </h2>

            <p>
              Wing {selectedFlat.wing} • Floor{" "}
              {selectedFlat.floor}
            </p>


            <label>
              Status
            </label>

            <select
              value={updateData.status}
              onChange={(e) =>
                setUpdateData({
                  ...updateData,
                  status: e.target.value,
                })
              }
            >

              {statuses.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}

            </select>


            <label>
              Progress %
            </label>

            <input
              type="number"
              min="0"
              max="100"
              value={updateData.progress}
              onChange={(e) =>
                setUpdateData({
                  ...updateData,
                  progress: Math.min(
                    100,
                    Math.max(
                      0,
                      Number(e.target.value)
                    )
                  ),
                })
              }
            />


            <label>
              Current Activity
            </label>

            <input
              type="text"
              placeholder="Example: Painting"
              value={
                updateData.currentActivity
              }
              onChange={(e) =>
                setUpdateData({
                  ...updateData,
                  currentActivity:
                    e.target.value,
                })
              }
            />


            <label>
              Target Date
            </label>

            <input
              type="date"
              value={
                updateData.targetDate
              }
              onChange={(e) =>
                setUpdateData({
                  ...updateData,
                  targetDate:
                    e.target.value,
                })
              }
            />


            <div
              style={{
                display: "flex",
                justifyContent:
                  "flex-end",
                gap: "10px",
                marginTop: "20px",
              }}
            >

              <button
                onClick={() =>
                  setSelectedFlat(null)
                }
              >
                Cancel
              </button>

              <button
                onClick={saveUpdate}
              >
                Save Update
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default FlatTracker;