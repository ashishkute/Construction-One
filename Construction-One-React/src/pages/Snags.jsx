import { useState } from "react";

function Snags() {
  const [snags, setSnags] = useState([
    {
      id: "SNAG-001",
      wing: "A",
      floor: "5",
      flat: "A-501",
      area: "Living Room",
      category: "Tile Work",
      priority: "High",
      description: "Floor tile hollow sound observed.",
      contractor: "ABC Interiors",
      targetDate: "2026-09-20",
      status: "Open",
      rectification: "",
      engineerRemark: "",
      pmRemark: "",
      beforePhoto: "",
      afterPhoto: "",
    },
    {
      id: "SNAG-002",
      wing: "B",
      floor: "8",
      flat: "B-802",
      area: "Master Bedroom",
      category: "Painting",
      priority: "Medium",
      description: "Paint touch-up required near window.",
      contractor: "XYZ Painting",
      targetDate: "2026-09-18",
      status: "In Progress",
      rectification: "",
      engineerRemark: "",
      pmRemark: "",
      beforePhoto: "",
      afterPhoto: "",
    },
  ]);

  const [form, setForm] = useState({
    wing: "",
    floor: "",
    flat: "",
    area: "",
    category: "",
    priority: "Medium",
    description: "",
    contractor: "",
    targetDate: "",
    beforePhoto: "",
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setForm({
      ...form,
      beforePhoto: URL.createObjectURL(file),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.wing ||
      !form.floor ||
      !form.flat ||
      !form.category ||
      !form.description
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const newSnag = {
      id: `SNAG-${String(snags.length + 1).padStart(3, "0")}`,
      ...form,
      status: "Open",
      rectification: "",
      engineerRemark: "",
      pmRemark: "",
      afterPhoto: "",
    };

    setSnags([newSnag, ...snags]);

    setForm({
      wing: "",
      floor: "",
      flat: "",
      area: "",
      category: "",
      priority: "Medium",
      description: "",
      contractor: "",
      targetDate: "",
      beforePhoto: "",
    });
  };

  const updateStatus = (id, status) => {
    setSnags(
      snags.map((snag) =>
        snag.id === id
          ? { ...snag, status }
          : snag
      )
    );
  };

  const deleteSnag = (id) => {
    if (!window.confirm("Delete this snag?")) return;

    setSnags(
      snags.filter((snag) => snag.id !== id)
    );
  };

  const updateRemark = (id, field, value) => {
    setSnags(
      snags.map((snag) =>
        snag.id === id
          ? { ...snag, [field]: value }
          : snag
      )
    );
  };

  const openCount = snags.filter(
    (s) => s.status === "Open"
  ).length;

  const assignedCount = snags.filter(
    (s) => s.status === "Assigned"
  ).length;

  const progressCount = snags.filter(
    (s) => s.status === "In Progress"
  ).length;

  const rectifiedCount = snags.filter(
    (s) =>
      s.status === "Rectified" ||
      s.status === "Verified"
  ).length;

  const closedCount = snags.filter(
    (s) => s.status === "Closed"
  ).length;

  const filteredSnags = snags.filter((snag) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      snag.id.toLowerCase().includes(searchText) ||
      snag.flat.toLowerCase().includes(searchText) ||
      snag.contractor.toLowerCase().includes(searchText) ||
      snag.description.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      snag.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      snag.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  return (
    <div>

      {/* HEADER */}

      <div className="page-header">

        <div>
          <h1 className="page-title">
            ⚠️ Snag / Desnag
          </h1>

          <p className="page-subtitle">
            Snag identification, rectification and verification
          </p>
        </div>

        <strong>
          Rustomjee Bella
        </strong>

      </div>


      {/* SUMMARY */}

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            ⚠️
          </div>

          <div>
            <div className="dashboard-card-title">
              Open
            </div>

            <div className="dashboard-card-value">
              {openCount}
            </div>
          </div>
        </div>


        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            👷
          </div>

          <div>
            <div className="dashboard-card-title">
              Assigned
            </div>

            <div className="dashboard-card-value">
              {assignedCount}
            </div>
          </div>
        </div>


        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            🔧
          </div>

          <div>
            <div className="dashboard-card-title">
              In Progress
            </div>

            <div className="dashboard-card-value">
              {progressCount}
            </div>
          </div>
        </div>


        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            ✅
          </div>

          <div>
            <div className="dashboard-card-title">
              Rectified
            </div>

            <div className="dashboard-card-value">
              {rectifiedCount}
            </div>
          </div>
        </div>

      </div>


      {/* CREATE SNAG */}

      <section className="panel">

        <div className="panel-header">

          <div>
            <h2>Create New Snag</h2>

            <p>
              Record a construction defect or pending work item.
            </p>
          </div>

        </div>


        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-group">
              <label>Wing *</label>

              <select
                name="wing"
                value={form.wing}
                onChange={handleChange}
              >
                <option value="">
                  Select Wing
                </option>

                <option value="A">
                  A Wing
                </option>

                <option value="B">
                  B Wing
                </option>

                <option value="C">
                  C Wing
                </option>

                <option value="D">
                  D Wing
                </option>
              </select>
            </div>


            <div className="form-group">
              <label>Floor *</label>

              <input
                type="number"
                name="floor"
                value={form.floor}
                onChange={handleChange}
                placeholder="Enter floor"
              />
            </div>


            <div className="form-group">
              <label>Flat / Unit *</label>

              <input
                type="text"
                name="flat"
                value={form.flat}
                onChange={handleChange}
                placeholder="Example: A-501"
              />
            </div>


            <div className="form-group">
              <label>Area / Location</label>

              <input
                type="text"
                name="area"
                value={form.area}
                onChange={handleChange}
                placeholder="Example: Living Room"
              />
            </div>


            <div className="form-group">
              <label>Category *</label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">
                  Select Category
                </option>

                <option value="Civil Work">
                  Civil Work
                </option>

                <option value="Tile Work">
                  Tile Work
                </option>

                <option value="Painting">
                  Painting
                </option>

                <option value="Waterproofing">
                  Waterproofing
                </option>

                <option value="Plumbing">
                  Plumbing
                </option>

                <option value="Electrical">
                  Electrical
                </option>

                <option value="Fire Fighting">
                  Fire Fighting
                </option>

                <option value="MEP">
                  MEP
                </option>

                <option value="Doors & Windows">
                  Doors & Windows
                </option>

                <option value="Carpentry">
                  Carpentry
                </option>

                <option value="False Ceiling">
                  False Ceiling
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>


            <div className="form-group">
              <label>Priority</label>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option value="Critical">
                  Critical
                </option>

                <option value="High">
                  High
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Low">
                  Low
                </option>
              </select>
            </div>


            <div className="form-group">
              <label>Contractor</label>

              <input
                type="text"
                name="contractor"
                value={form.contractor}
                onChange={handleChange}
                placeholder="Enter contractor"
              />
            </div>


            <div className="form-group">
              <label>Target Date</label>

              <input
                type="date"
                name="targetDate"
                value={form.targetDate}
                onChange={handleChange}
              />
            </div>


            <div className="form-group">
              <label>Before Photo</label>

              <input
                type="file"
                accept="image/*"
                onChange={handlePhoto}
              />
            </div>

          </div>


          <div className="form-group">

            <label>
              Snag Description *
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the defect / pending work..."
              rows="4"
            />

          </div>


          {form.beforePhoto && (
            <div style={{ marginTop: "15px" }}>

              <strong>
                Before Photo Preview
              </strong>

              <br />

              <img
                src={form.beforePhoto}
                alt="Snag"
                style={{
                  width: "180px",
                  marginTop: "10px",
                  borderRadius: "8px",
                }}
              />

            </div>
          )}


          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >

            <button
              type="submit"
              className="primary-button"
            >
              + Create Snag
            </button>

          </div>

        </form>

      </section>


      {/* REGISTER */}

      <section className="panel">

        <div className="panel-header">

          <div>

            <h2>
              Snag Register
            </h2>

            <p>
              Track every snag from creation to closure.
            </p>

          </div>

        </div>


        {/* SEARCH + FILTER */}

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
            placeholder="🔎 Search Snag No., Flat, Contractor..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />


          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >

            <option value="All">
              All Status
            </option>

            <option value="Open">
              Open
            </option>

            <option value="Assigned">
              Assigned
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Rectified">
              Rectified
            </option>

            <option value="Verified">
              Verified
            </option>

            <option value="Closed">
              Closed
            </option>

          </select>


          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
          >

            <option value="All">
              All Priority
            </option>

            <option value="Critical">
              Critical
            </option>

            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>

          </select>

        </div>


        <div style={{ overflowX: "auto" }}>

          <table>

            <thead>

              <tr>

                <th>Snag No.</th>
                <th>Location</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Contractor</th>
                <th>Target Date</th>
                <th>Status</th>
                <th>Rectification</th>
                <th>Action</th>

              </tr>

            </thead>


            <tbody>

              {filteredSnags.map((snag) => (

                <tr key={snag.id}>

                  <td>
                    <strong>
                      {snag.id}
                    </strong>
                  </td>


                  <td>

                    <strong>
                      {snag.flat}
                    </strong>

                    <br />

                    Wing {snag.wing},
                    Floor {snag.floor}

                    <br />

                    <small>
                      {snag.area}
                    </small>

                  </td>


                  <td>
                    {snag.category}
                  </td>


                  <td>
                    {snag.priority}
                  </td>


                  <td>
                    {snag.contractor || "-"}
                  </td>


                  <td>
                    {snag.targetDate || "-"}
                  </td>


                  <td>

                    <select
                      value={snag.status}
                      onChange={(e) =>
                        updateStatus(
                          snag.id,
                          e.target.value
                        )
                      }
                    >

                      <option value="Open">
                        Open
                      </option>

                      <option value="Assigned">
                        Assigned
                      </option>

                      <option value="In Progress">
                        In Progress
                      </option>

                      <option value="Rectified">
                        Rectified
                      </option>

                      <option value="Verified">
                        Verified
                      </option>

                      <option value="Closed">
                        Closed
                      </option>

                    </select>

                  </td>


                  <td>

                    <input
                      type="text"
                      placeholder="Rectification remark"
                      value={snag.rectification}
                      onChange={(e) =>
                        updateRemark(
                          snag.id,
                          "rectification",
                          e.target.value
                        )
                      }
                    />

                  </td>


                  <td>

                    <button
                      type="button"
                      onClick={() =>
                        deleteSnag(snag.id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}


              {filteredSnags.length === 0 && (

                <tr>

                  <td
                    colSpan="9"
                    style={{
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    No snags found.

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </section>


      {/* WORKFLOW */}

      <section className="panel">

        <div className="panel-header">

          <div>

            <h2>
              🔄 Snag Workflow
            </h2>

            <p>
              Standard project snag closure process
            </p>

          </div>

        </div>


        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            flexWrap: "wrap",
            textAlign: "center",
          }}
        >

          <div>
            <strong>1️⃣</strong>
            <br />
            Create Snag
          </div>

          <div>→</div>

          <div>
            <strong>2️⃣</strong>
            <br />
            Assign Contractor
          </div>

          <div>→</div>

          <div>
            <strong>3️⃣</strong>
            <br />
            Rectification
          </div>

          <div>→</div>

          <div>
            <strong>4️⃣</strong>
            <br />
            Desnag
          </div>

          <div>→</div>

          <div>
            <strong>5️⃣</strong>
            <br />
            Engineer Verification
          </div>

          <div>→</div>

          <div>
            <strong>6️⃣</strong>
            <br />
            PM Approval
          </div>

          <div>→</div>

          <div>
            <strong>7️⃣</strong>
            <br />
            Closed
          </div>

        </div>

      </section>

    </div>
  );
}

export default Snags;