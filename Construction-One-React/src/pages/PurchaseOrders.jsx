import { useState } from "react";

function PurchaseOrders() {
  const [orders, setOrders] = useState([
    {
      id: "PO-001",
      vendor: "ABC Building Materials",
      material: "Cement",
      quantity: 500,
      unit: "Bags",
      amount: 210000,
      date: "2026-09-10",
      status: "Approved",
    },
    {
      id: "PO-002",
      vendor: "XYZ Tiles",
      material: "Floor Tiles",
      quantity: 1200,
      unit: "Sq.ft",
      amount: 156000,
      date: "2026-09-12",
      status: "Pending",
    },
  ]);

  const [form, setForm] = useState({
    vendor: "",
    material: "",
    quantity: "",
    unit: "",
    amount: "",
    date: "",
    remarks: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addPurchaseOrder = (e) => {
    e.preventDefault();

    if (
      !form.vendor ||
      !form.material ||
      !form.quantity ||
      !form.amount ||
      !form.date
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const newOrder = {
      id: `PO-${String(orders.length + 1).padStart(3, "0")}`,
      vendor: form.vendor,
      material: form.material,
      quantity: form.quantity,
      unit: form.unit,
      amount: Number(form.amount),
      date: form.date,
      status: "Pending",
    };

    setOrders([...orders, newOrder]);

    setForm({
      vendor: "",
      material: "",
      quantity: "",
      unit: "",
      amount: "",
      date: "",
      remarks: "",
    });
  };

  const deleteOrder = (id) => {
    if (window.confirm("Delete this Purchase Order?")) {
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

  const totalValue = orders.reduce(
    (total, order) => total + Number(order.amount),
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const approvedOrders = orders.filter(
    (order) => order.status === "Approved"
  ).length;

  return (
    <div>
      {/* PAGE HEADER */}

      <div className="page-header">
        <div>
          <h1 className="page-title">🛒 Purchase Orders</h1>

          <p className="page-subtitle">
            Create and manage project purchase orders
          </p>
        </div>

        <strong>Rustomjee Bella</strong>
      </div>

      {/* SUMMARY CARDS */}

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <div className="dashboard-card-icon">🧾</div>

          <div>
            <div className="dashboard-card-title">
              Total POs
            </div>

            <div className="dashboard-card-value">
              {orders.length}
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon">⏳</div>

          <div>
            <div className="dashboard-card-title">
              Pending
            </div>

            <div className="dashboard-card-value">
              {pendingOrders}
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon">✅</div>

          <div>
            <div className="dashboard-card-title">
              Approved
            </div>

            <div className="dashboard-card-value">
              {approvedOrders}
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon">💰</div>

          <div>
            <div className="dashboard-card-title">
              Total PO Value
            </div>

            <div className="dashboard-card-value">
              ₹{totalValue.toLocaleString("en-IN")}
            </div>
          </div>
        </div>

      </div>

      {/* CREATE PO */}

      <section className="panel">

        <div className="panel-header">
          <div>
            <h2>Create Purchase Order</h2>

            <p>
              Record material and vendor purchase information.
            </p>
          </div>
        </div>

        <form onSubmit={addPurchaseOrder}>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, minmax(0, 1fr))",
              gap: "18px",
            }}
          >

            <div>
              <label>Vendor *</label>

              <input
                type="text"
                name="vendor"
                value={form.vendor}
                onChange={handleChange}
                placeholder="Enter vendor name"
                style={inputStyle}
              />
            </div>

            <div>
              <label>Material *</label>

              <input
                type="text"
                name="material"
                value={form.material}
                onChange={handleChange}
                placeholder="Example: Cement"
                style={inputStyle}
              />
            </div>

            <div>
              <label>Quantity *</label>

              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                style={inputStyle}
              />
            </div>

            <div>
              <label>Unit</label>

              <select
                name="unit"
                value={form.unit}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Select Unit</option>
                <option value="Nos">Nos</option>
                <option value="Bags">Bags</option>
                <option value="Kg">Kg</option>
                <option value="MT">MT</option>
                <option value="Sq.ft">Sq.ft</option>
                <option value="Sq.m">Sq.m</option>
                <option value="Rmt">Rmt</option>
                <option value="Ltr">Ltr</option>
              </select>
            </div>

            <div>
              <label>PO Amount *</label>

              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                style={inputStyle}
              />
            </div>

            <div>
              <label>PO Date *</label>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label>Remarks</label>

              <textarea
                name="remarks"
                value={form.remarks}
                onChange={handleChange}
                placeholder="Enter remarks, delivery requirements, specifications..."
                rows="3"
                style={inputStyle}
              />
            </div>

          </div>

          <div style={{ marginTop: "20px" }}>
            <button
              type="submit"
              className="primary-button"
            >
              + Create Purchase Order
            </button>
          </div>

        </form>

      </section>

      {/* PO REGISTER */}

      <section className="panel">

        <div className="panel-header">
          <div>
            <h2>Purchase Order Register</h2>

            <p>
              Track all purchase orders for the project.
            </p>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >

            <thead>

              <tr
                style={{
                  background: "#f3f4f6",
                  textAlign: "left",
                }}
              >

                <th style={thStyle}>PO No.</th>
                <th style={thStyle}>Vendor</th>
                <th style={thStyle}>Material</th>
                <th style={thStyle}>Quantity</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>PO Date</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Action</th>

              </tr>

            </thead>

            <tbody>

              {orders.map((order) => (

                <tr key={order.id}>

                  <td style={tdStyle}>
                    <strong>{order.id}</strong>
                  </td>

                  <td style={tdStyle}>
                    {order.vendor}
                  </td>

                  <td style={tdStyle}>
                    {order.material}
                  </td>

                  <td style={tdStyle}>
                    {order.quantity} {order.unit}
                  </td>

                  <td style={tdStyle}>
                    ₹{Number(order.amount).toLocaleString("en-IN")}
                  </td>

                  <td style={tdStyle}>
                    {order.date}
                  </td>

                  <td style={tdStyle}>

                    <span
                      style={{
                        background:
                          order.status === "Approved"
                            ? "#dcfce7"
                            : "#fef3c7",
                        color:
                          order.status === "Approved"
                            ? "#166534"
                            : "#92400e",
                        padding: "6px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {order.status}
                    </span>

                  </td>

                  <td style={tdStyle}>

                    <button
                      onClick={() => deleteOrder(order.id)}
                      style={{
                        background: "#fee2e2",
                        color: "#b91c1c",
                        border: "1px solid #fecaca",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>

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

const inputStyle = {
  width: "100%",
  padding: "11px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "7px",
  marginTop: "7px",
  fontFamily: "inherit",
  fontSize: "14px",
  boxSizing: "border-box",
};

const thStyle = {
  padding: "13px 10px",
  borderBottom: "1px solid #e5e7eb",
};

const tdStyle = {
  padding: "14px 10px",
  borderBottom: "1px solid #e5e7eb",
};

export default PurchaseOrders;