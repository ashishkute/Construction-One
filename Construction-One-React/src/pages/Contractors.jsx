import { useMemo, useState } from "react";

function Contractors() {
  const [contractors, setContractors] = useState([
    {
      id: 1,
      name: "ABC Civil Contractors",
      category: "Civil",
      contactPerson: "Rajesh Patil",
      mobile: "9876543210",
      email: "abc.civil@example.com",
      gst: "27ABCDE1234F1Z5",
      address: "Mumbai, Maharashtra",
      woReference: "WO-001",
      startDate: "2026-01-10",
      endDate: "2026-12-31",
      status: "Active",
      workOrders: 4,
      contractValue: 8500000,
    },
    {
      id: 2,
      name: "XYZ MEP Services",
      category: "MEP",
      contactPerson: "Sanjay Gupta",
      mobile: "9988776655",
      email: "xyz.mep@example.com",
      gst: "27XYZAB5678G1Z2",
      address: "Bhandup West, Mumbai",
      woReference: "WO-002",
      startDate: "2026-02-01",
      endDate: "2026-11-30",
      status: "Active",
      workOrders: 3,
      contractValue: 5200000,
    },
  ]);

  const emptyForm = {
    name: "",
    category: "",
    contactPerson: "",
    mobile: "",
    email: "",
    gst: "",
    address: "",
    woReference: "",
    startDate: "",
    endDate: "",
    status: "Active",
    workOrders: 0,
    contractValue: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const categories = [
    "Civil",
    "Finishing",
    "MEP",
    "Electrical",
    "Plumbing",
    "Fire Fighting",
    "HVAC",
    "Waterproofing",
    "Painting",
    "Tiles",
    "Carpentry",
    "Aluminium",
    "Glazing",
    "Facade",
    "Other",
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

    if (!form.name.trim()) {
      alert("Please enter contractor name.");
      return;
    }

    if (!form.category) {
      alert("Please select work category.");
      return;
    }

    if (!form.contactPerson.trim()) {
      alert("Please enter contact person.");
      return;
    }

    if (!form.mobile.trim()) {
      alert("Please enter mobile number.");
      return;
    }

    const contractorData = {
      ...form,
      workOrders: Number(form.workOrders) || 0,
      contractValue: Number(form.contractValue) || 0,
    };

    if (editingId) {
      setContractors((prev) =>
        prev.map((contractor) =>
          contractor.id === editingId
            ? { ...contractor, ...contractorData }
            : contractor
        )
      );

      alert("Contractor updated successfully.");
      setEditingId(null);
    } else {
      setContractors((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...contractorData,
        },
      ]);

      alert("Contractor added successfully.");
    }

    setForm(emptyForm);
  };

  const handleEdit = (contractor) => {
    setForm({
      ...contractor,
      contractValue: contractor.contractValue || "",
    });

    setEditingId(contractor.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this contractor?"
    );

    if (!confirmed) return;

    setContractors((prev) =>
      prev.filter((contractor) => contractor.id !== id)
    );
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const filteredContractors = useMemo(() => {
    return contractors.filter((contractor) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        contractor.name.toLowerCase().includes(searchText) ||
        contractor.contactPerson.toLowerCase().includes(searchText) ||
        contractor.mobile.includes(searchText) ||
        contractor.category.toLowerCase().includes(searchText);

      const matchesCategory =
        categoryFilter === "All" ||
        contractor.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" ||
        contractor.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [contractors, search, categoryFilter, statusFilter]);

  const totalContractors = contractors.length;

  const activeContractors = contractors.filter(
    (contractor) => contractor.status === "Active"
  ).length;

  const inactiveContractors = contractors.filter(
    (contractor) => contractor.status === "Inactive"
  ).length;

  const totalContractValue = contractors.reduce(
    (sum, contractor) => sum + Number(contractor.contractValue || 0),
    0
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>👷 Contractor Management</h1>
          <p>
            Manage project contractors, work categories and contract details
          </p>
        </div>

        <div className="project-name">
          Rustomjee Bella
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👷</div>
          <div>
            <div className="stat-label">Total Contractors</div>
            <div className="stat-value">{totalContractors}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div>
            <div className="stat-label">Active Contractors</div>
            <div className="stat-value">{activeContractors}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏸️</div>
          <div>
            <div className="stat-label">Inactive Contractors</div>
            <div className="stat-value">{inactiveContractors}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div>
            <div className="stat-label">Contract Value</div>
            <div className="stat-value">
              {formatCurrency(totalContractValue)}
            </div>
          </div>
        </div>
      </div>

      {/* CREATE / EDIT CONTRACTOR */}
      <section className="content-card">
        <div className="section-heading">
          <h2>
            {editingId ? "✏️ Edit Contractor" : "➕ Create Contractor"}
          </h2>

          <p>
            {editingId
              ? "Update contractor information."
              : "Add contractor or subcontractor information."}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            <div className="form-group">
              <label>Contractor Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter contractor name"
              />
            </div>

            <div className="form-group">
              <label>Work Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Contact Person *</label>
              <input
                type="text"
                name="contactPerson"
                value={form.contactPerson}
                onChange={handleChange}
                placeholder="Enter contact person"
              />
            </div>

            <div className="form-group">
              <label>Mobile Number *</label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="contractor@example.com"
              />
            </div>

            <div className="form-group">
              <label>GST Number</label>
              <input
                type="text"
                name="gst"
                value={form.gst}
                onChange={handleChange}
                placeholder="Enter GST number"
              />
            </div>

            <div className="form-group">
              <label>Work Order Reference</label>
              <input
                type="text"
                name="woReference"
                value={form.woReference}
                onChange={handleChange}
                placeholder="Example: WO-001"
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="form-group">
              <label>Contract Start Date</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Contract End Date</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Total Work Orders</label>
              <input
                type="number"
                min="0"
                name="workOrders"
                value={form.workOrders}
                onChange={handleChange}
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label>Total Contract Value ₹</label>
              <input
                type="number"
                min="0"
                name="contractValue"
                value={form.contractValue}
                onChange={handleChange}
                placeholder="Enter contract value"
              />
            </div>

            <div className="form-group full-width">
              <label>Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter contractor address"
                rows="3"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-btn">
              {editingId ? "💾 Update Contractor" : "➕ Add Contractor"}
            </button>

            {editingId && (
              <button
                type="button"
                className="secondary-btn"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* CONTRACTOR REGISTER */}
      <section className="content-card">
        <div className="section-heading">
          <h2>📋 Contractor Register</h2>
          <p>Track contractors and contract information.</p>
        </div>

        {/* FILTERS */}
        <div className="filter-grid">
          <input
            type="text"
            placeholder="🔎 Search contractor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Contractor</th>
                <th>Category</th>
                <th>Contact Person</th>
                <th>Mobile</th>
                <th>WO Ref.</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Contract Value</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredContractors.length === 0 ? (
                <tr>
                  <td colSpan="10" className="empty-state">
                    No contractors found.
                  </td>
                </tr>
              ) : (
                filteredContractors.map((contractor) => (
                  <tr key={contractor.id}>
                    <td>
                      <strong>{contractor.name}</strong>
                      <br />
                      <small>{contractor.email}</small>
                    </td>

                    <td>{contractor.category}</td>

                    <td>{contractor.contactPerson}</td>

                    <td>{contractor.mobile}</td>

                    <td>{contractor.woReference || "-"}</td>

                    <td>{contractor.startDate || "-"}</td>

                    <td>{contractor.endDate || "-"}</td>

                    <td>
                      <span
                        className={
                          contractor.status === "Active"
                            ? "status-badge active"
                            : "status-badge inactive"
                        }
                      >
                        {contractor.status}
                      </span>
                    </td>

                    <td>
                      {formatCurrency(contractor.contractValue)}
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(contractor)}
                        >
                          ✏️ Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(contractor.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <style>{`
        .page-container {
          padding: 28px;
          max-width: 1600px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .page-header h1 {
          margin: 0 0 6px;
          font-size: 32px;
        }

        .page-header p {
          margin: 0;
          color: #64748b;
        }

        .project-name {
          font-weight: 700;
          font-size: 18px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .stat-card {
          background: white;
          border: 1px solid #dbe3ef;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
        }

        .stat-icon {
          font-size: 30px;
        }

        .stat-label {
          color: #64748b;
          font-size: 14px;
          margin-bottom: 5px;
        }

        .stat-value {
          font-size: 22px;
          font-weight: 700;
        }

        .content-card {
          background: white;
          border: 1px solid #dbe3ef;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
        }

        .section-heading {
          margin-bottom: 22px;
        }

        .section-heading h2 {
          margin: 0 0 6px;
          font-size: 22px;
        }

        .section-heading p {
          margin: 0;
          color: #64748b;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .form-group label {
          font-size: 14px;
          font-weight: 600;
        }

        .form-group input,
        .form-group select,
        .form-group textarea,
        .filter-grid input,
        .filter-grid select {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #cbd5e1;
          border-radius: 7px;
          padding: 11px 12px;
          font-size: 14px;
          background: white;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus,
        .filter-grid input:focus,
        .filter-grid select:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.12);
        }

        .full-width {
          grid-column: 1 / -1;
        }

        .form-actions {
          margin-top: 22px;
          display: flex;
          gap: 10px;
        }

        .primary-btn,
        .secondary-btn,
        .edit-btn,
        .delete-btn {
          border: none;
          border-radius: 6px;
          padding: 10px 16px;
          cursor: pointer;
          font-weight: 600;
        }

        .primary-btn {
          background: #2563eb;
          color: white;
        }

        .secondary-btn {
          background: #e2e8f0;
          color: #0f172a;
        }

        .edit-btn {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .delete-btn {
          background: #fee2e2;
          color: #b91c1c;
        }

        .filter-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }

        .table-container {
          width: 100%;
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1100px;
        }

        .data-table th {
          background: #f1f5f9;
          text-align: left;
          padding: 13px 12px;
          font-size: 13px;
          white-space: nowrap;
        }

        .data-table td {
          padding: 13px 12px;
          border-bottom: 1px solid #e2e8f0;
          font-size: 13px;
          vertical-align: middle;
        }

        .data-table small {
          color: #64748b;
        }

        .status-badge {
          display: inline-block;
          padding: 5px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
        }

        .status-badge.active {
          background: #dcfce7;
          color: #15803d;
        }

        .status-badge.inactive {
          background: #e2e8f0;
          color: #475569;
        }

        .action-buttons {
          display: flex;
          gap: 6px;
        }

        .empty-state {
          text-align: center;
          padding: 40px !important;
          color: #64748b;
        }

        @media (max-width: 1000px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .form-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 650px) {
          .page-container {
            padding: 15px;
          }

          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .stats-grid,
          .form-grid,
          .filter-grid {
            grid-template-columns: 1fr;
          }

          .full-width {
            grid-column: auto;
          }
        }
      `}</style>
    </div>
  );
}

export default Contractors;