import { useState } from "react";

function FlatTracker() {

  const [flats, setFlats] = useState([
    {
      id: 1,
      wing: "A",
      floor: "01",
      flat: "101",
      stage: "Finishing",
      progress: 80,
      status: "In Progress",
      engineer: "Site Engineer",
      remarks: "Painting work ongoing"
    },
    {
      id: 2,
      wing: "A",
      floor: "01",
      flat: "102",
      stage: "Completed",
      progress: 100,
      status: "Completed",
      engineer: "Site Engineer",
      remarks: "Ready for handover"
    },
    {
      id: 3,
      wing: "B",
      floor: "02",
      flat: "201",
      stage: "MEP",
      progress: 55,
      status: "In Progress",
      engineer: "Site Engineer",
      remarks: "Electrical work ongoing"
    }
  ]);

  const [search, setSearch] = useState("");
  const [wingFilter, setWingFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const updateProgress = (id, value) => {

    setFlats(
      flats.map((flat) =>
        flat.id === id
          ? {
              ...flat,
              progress: Number(value),
              status: Number(value) === 100
                ? "Completed"
                : "In Progress"
            }
          : flat
      )
    );
  };

  const filteredFlats = flats.filter((flat) => {

    const searchMatch =
      flat.flat.toLowerCase().includes(search.toLowerCase()) ||
      flat.wing.toLowerCase().includes(search.toLowerCase()) ||
      flat.floor.toLowerCase().includes(search.toLowerCase());

    const wingMatch =
      wingFilter === "All" || flat.wing === wingFilter;

    const statusMatch =
      statusFilter === "All" || flat.status === statusFilter;

    return searchMatch && wingMatch && statusMatch;
  });

  const totalFlats = flats.length;

  const completedFlats =
    flats.filter((flat) => flat.progress === 100).length;

  const averageProgress =
    totalFlats === 0
      ? 0
      : Math.round(
          flats.reduce((sum, flat) => sum + flat.progress, 0) /
          totalFlats
        );

  return (
    <div>

      {/* PAGE HEADER */}

      <div className="page-header">

        <div>
          <h1 className="page-title">
            🏠 Flat Tracker
          </h1>

          <p className="page-subtitle">
            Track flat-wise construction progress
          </p>
        </div>

      </div>


      {/* SUMMARY CARDS */}

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
              {completedFlats}
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
              {averageProgress}%
            </div>
          </div>

        </div>


        <div className="dashboard-card">

          <div className="dashboard-card-icon">
            ⏳
          </div>

          <div>
            <div className="dashboard-card-title">
              Pending
            </div>

            <div className="dashboard-card-value">
              {totalFlats - completedFlats}
            </div>
          </div>

        </div>

      </div>


      {/* FILTER PANEL */}

      <section className="panel">

        <div className="panel-header">

          <div>
            <h2>
              🔎 Flat Search & Filters
            </h2>

            <p>
              Find and track individual flats
            </p>
          </div>

        </div>


        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "15px",
            padding: "20px"
          }}
        >

          <input
            type="text"
            placeholder="Search Flat / Wing / Floor"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "6px"
            }}
          />


          <select
            value={wingFilter}
            onChange={(e) => setWingFilter(e.target.value)}
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "6px"
            }}
          >
            <option value="All">All Wings</option>
            <option value="A">Wing A</option>
            <option value="B">Wing B</option>
            <option value="C">Wing C</option>
            <option value="D">Wing D</option>
          </select>


          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "6px"
            }}
          >
            <option value="All">All Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

        </div>

      </section>


      {/* FLAT LIST */}

      <section className="panel">

        <div className="panel-header">

          <div>
            <h2>
              🏢 Flat Progress
            </h2>

            <p>
              Showing {filteredFlats.length} flat(s)
            </p>
          </div>

        </div>


        <div style={{ overflowX: "auto", padding: "20px" }}>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse"
            }}
          >

            <thead>

              <tr style={{ background: "#f5f7fa" }}>

                <th style={thStyle}>Wing</th>
                <th style={thStyle}>Floor</th>
                <th style={thStyle}>Flat</th>
                <th style={thStyle}>Stage</th>
                <th style={thStyle}>Progress</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Engineer</th>
                <th style={thStyle}>Remarks</th>

              </tr>

            </thead>


            <tbody>

              {filteredFlats.map((flat) => (

                <tr key={flat.id}>

                  <td style={tdStyle}>
                    {flat.wing}
                  </td>

                  <td style={tdStyle}>
                    {flat.floor}
                  </td>

                  <td style={tdStyle}>
                    <strong>{flat.flat}</strong>
                  </td>

                  <td style={tdStyle}>
                    {flat.stage}
                  </td>

                  <td style={tdStyle}>

                    <div
                      style={{
                        width: "120px",
                        height: "8px",
                        background: "#e5e7eb",
                        borderRadius: "10px",
                        overflow: "hidden"
                      }}
                    >

                      <div
                        style={{
                          width: `${flat.progress}%`,
                          height: "100%",
                          background: "#16a34a"
                        }}
                      />

                    </div>

                    <div style={{ marginTop: "5px" }}>

                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={flat.progress}
                        onChange={(e) =>
                          updateProgress(flat.id, e.target.value)
                        }
                        style={{
                          width: "60px",
                          padding: "4px"
                        }}
                      />

                      %

                    </div>

                  </td>


                  <td style={tdStyle}>

                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "15px",
                        background:
                          flat.status === "Completed"
                            ? "#dcfce7"
                            : "#fef3c7",
                        color:
                          flat.status === "Completed"
                            ? "#166534"
                            : "#92400e"
                      }}
                    >
                      {flat.status}
                    </span>

                  </td>


                  <td style={tdStyle}>
                    {flat.engineer}
                  </td>


                  <td style={tdStyle}>
                    {flat.remarks}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}


const thStyle = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #ddd"
};


const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee"
};


export default FlatTracker;