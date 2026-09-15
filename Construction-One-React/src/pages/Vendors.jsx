import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "construction_one_vendors";

const DEFAULT_CATEGORIES = [
  "Civil",
  "Finishing",
  "MEP",
  "Electrical",
  "Plumbing",
  "Fire Fighting",
  "HVAC",
  "Lift",
  "Windows & Glazing",
  "Waterproofing",
  "Painting",
  "Tiles & Flooring",
  "False Ceiling",
  "ACP",
  "Hardware",
  "Other",
];

const EMPTY_FORM = {
  name: "",
  category: "",
  contact: "",
  email: "",
  gst: "",
  address: "",
  status: "Active",
  contactPerson: "",
};

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setVendors(JSON.parse(saved));
      } catch {
        setVendors([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vendors));
  }, [vendors]);

  const totalVendors = vendors.length;

  const activeVendors = vendors.filter(
    (vendor) => vendor.status === "Active"
  ).length;

  const inactiveVendors = vendors.filter(
    (vendor) => vendor.status === "Inactive"
  ).length;

  const categoryCount = new Set(
    vendors.map((vendor) => vendor.category).filter(Boolean)
  ).size;

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const text = search.toLowerCase().trim();

      const matchesSearch =
        !text ||
        vendor.name?.toLowerCase().includes(text) ||
        vendor.contactPerson?.toLowerCase().includes(text) ||
        vendor.contact?.toLowerCase().includes(text) ||
        vendor.email?.toLowerCase().includes(text) ||
        vendor.gst?.toLowerCase().includes(text);

      const matchesCategory =
        categoryFilter === "All" ||
        vendor.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" ||
        vendor.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [vendors, search, categoryFilter, statusFilter]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter Vendor Name.");
      return;
    }

    if (!form.category) {
      alert("Please select Vendor Category.");
      return;
    }

    if (!form.contact.trim()) {
      alert("Please enter Contact Number.");
      return;
    }

    if (editingId) {
      setVendors((previous) =>
        previous.map((vendor) =>
          vendor.id === editingId
            ? {
                ...vendor,
                ...form,
                name: form.name.trim(),
              }
            : vendor
        )
      );

      alert("Vendor updated successfully.");
    } else {
      const newVendor = {
        id: Date.now(),
        ...form,
        name: form.name.trim(),
        createdAt: new Date().toISOString(),
      };

      setVendors((previous) => [newVendor, ...previous]);

      alert("Vendor created successfully.");
    }

    resetForm();
  }

  function handleEdit(vendor) {
    setForm({
      name: vendor.name || "",
      category: vendor.category || "",
      contact: vendor.contact || "",
      email: vendor.email || "",
      gst: vendor.gst || "",
      address: vendor.address || "",
      status: vendor.status || "Active",
      contactPerson: vendor.contactPerson || "",
    });

    setEditingId(vendor.id);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleDelete(id) {
    const vendor = vendors.find((item) => item.id === id);

    if (!vendor) return;

    const confirmed = window.confirm(
      `Delete vendor "${vendor.name}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    setVendors((previous) =>
      previous.filter((item) => item.id !== id)
    );

    if (editingId === id) {
      resetForm();
    }
  }

  function toggleStatus(id) {
    setVendors((previous) =>
      previous.map((vendor) =>
        vendor.id === id
          ? {
              ...vendor,
              status:
                vendor.status === "Active" ? "Inactive" : "Active",
            }
          : vendor
      )
    );
  }

  function clearFilters() {
    setSearch("");
    setCategoryFilter("All");
    setStatusFilter("All");
  }

  function loadDemoVendors() {
    const demoVendors = [
      {
        id: Date.now(),
        name: "ABC Civil Contractors",
        category: "Civil",
        contact: "9876543210",
        email: "abc@example.com",
        gst: "27ABCDE1234F1Z5",
        address: "Mumbai, Maharashtra",
        status: "Active",
        contactPerson: "Project Coordinator",
        createdAt: new Date().toISOString(),
      },
      {
        id: Date.now() + 1,
        name: "Vaishnavi Enterprises Window",
        category: "Windows & Glazing",
        contact: "9876501234",
        email: "vendor@example.com",
        gst: "27XYZAB5678C1Z2",
        address: "Mumbai, Maharashtra",
        status: "Active",
        contactPerson: "Site Coordinator",
        createdAt: new Date().toISOString(),
      },
    ];

    const confirmed = window.confirm(
      "Load 2 sample vendors for testing?"
    );

    if (!confirmed) return;

    setVendors((previous) => [...demoVendors, ...previous]);
  }

  return (
    <div className="page vendors-page">
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1>🏢 Vendor Management</h1>
          <p>
            Manage project vendors, suppliers and contractors
          </p>
        </div>

        <div className="project-name">
          Rustomjee Bella
        </div>
      </div>

      {/* STATISTICS */}
      <div className="stats-grid vendors-stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div>
            <div className="stat-label">Total Vendors</div>
            <div className="stat-value">{totalVendors}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div>
            <div className="stat-label">Active Vendors</div>
            <div className="stat-value">{activeVendors}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏸️</div>
          <div>
            <div className="stat-label">Inactive Vendors</div>
            <div className="stat-value">{inactiveVendors}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏷️</div>
          <div>
            <div className="stat-label">Categories</div>
            <div className="stat-value">{categoryCount}</div>
          </div>
        </div>
      </div>

      {/* CREATE / EDIT VENDOR */}
      <div className="panel vendor-form-panel">
        <div className="panel-header">
          <div>
            <h2>
              {editingId ? "✏️ Edit Vendor" : "➕ Create Vendor"}
            </h2>

            <p>
              {editingId
                ? "Update vendor information"
                : "Add supplier or contractor information"}
            </p>
          </div>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => setShowForm((previous) => !previous)}
          >
            {showForm ? "Hide Form" : "Show Form"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Vendor Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter vendor name"
                />
              </div>

              <div className="form-group">
                <label>Category *</label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>

                  {DEFAULT_CATEGORIES.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Contact Number *</label>
                <input
                  type="tel"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                />
              </div>

              <div className="form-group">
                <label>Contact Person</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={form.contactPerson}
                  onChange={handleChange}
                  placeholder="Enter contact person"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="vendor@example.com"
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

              <div className="form-group full-width">
                <label>Address</label>

                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter vendor address"
                  rows="3"
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="primary-btn"
              >
                {editingId
                  ? "💾 Update Vendor"
                  : "➕ Create Vendor"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        )}
      </div>

      {/* FILTERS */}
      <div className="panel">
        <div className="panel-header">
          <div>
            <h2>🔎 Vendor Register</h2>
            <p>
              Search, filter and manage project vendors
            </p>
          </div>

          <button
            type="button"
            className="secondary-btn"
            onClick={loadDemoVendors}
          >
            Load Sample Data
          </button>
        </div>

        <div className="filter-grid">
          <div className="form-group">
            <label>Search</label>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search vendor, contact, email..."
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value)
              }
            >
              <option value="All">All Categories</option>

              {DEFAULT_CATEGORIES.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="filter-button-wrapper">
            <button
              type="button"
              className="secondary-btn"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* VENDOR TABLE */}
      <div className="panel vendor-table-panel">
        <div className="table-summary">
          Showing <strong>{filteredVendors.length}</strong> of{" "}
          <strong>{vendors.length}</strong> vendors
        </div>

        {filteredVendors.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏢</div>

            <h3>No Vendors Found</h3>

            <p>
              Create your first vendor using the form above.
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Vendor Name</th>
                  <th>Category</th>
                  <th>Contact Person</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>GST</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredVendors.map((vendor, index) => (
                  <tr key={vendor.id}>
                    <td>{index + 1}</td>

                    <td>
                      <strong>{vendor.name}</strong>

                      {vendor.address && (
                        <div className="small-text">
                          {vendor.address}
                        </div>
                      )}
                    </td>

                    <td>
                      <span className="category-badge">
                        {vendor.category}
                      </span>
                    </td>

                    <td>
                      {vendor.contactPerson || "-"}
                    </td>

                    <td>
                      {vendor.contact || "-"}
                    </td>

                    <td>
                      {vendor.email || "-"}
                    </td>

                    <td>
                      {vendor.gst || "-"}
                    </td>

                    <td>
                      <button
                        type="button"
                        className={
                          vendor.status === "Active"
                            ? "status-badge status-active"
                            : "status-badge status-inactive"
                        }
                        onClick={() =>
                          toggleStatus(vendor.id)
                        }
                        title="Click to change status"
                      >
                        {vendor.status === "Active"
                          ? "● Active"
                          : "● Inactive"}
                      </button>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          type="button"
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(vendor)
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(vendor.id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Vendors;