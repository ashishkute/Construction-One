import React, { useMemo, useState } from "react";

const initialPayments = [
  {
    id: "PAY-001",
    vendor: "ABC Civil Works",
    poNo: "PO-001",
    billNo: "BILL-001",
    billDate: "2026-09-01",
    dueDate: "2026-09-15",
    billAmount: 250000,
    gst: 45000,
    deduction: 5000,
    netPayable: 290000,
    paidAmount: 290000,
    paymentDate: "2026-09-10",
    reference: "NEFT-1001",
    status: "Paid",
    remarks: "September running bill",
  },
  {
    id: "PAY-002",
    vendor: "Vaishnavi Enterprises",
    poNo: "PO-002",
    billNo: "BILL-002",
    billDate: "2026-09-05",
    dueDate: "2026-09-20",
    billAmount: 180000,
    gst: 32400,
    deduction: 3000,
    netPayable: 209400,
    paidAmount: 100000,
    paymentDate: "",
    reference: "",
    status: "Partially Paid",
    remarks: "Window work bill",
  },
  {
    id: "PAY-003",
    vendor: "TKE",
    poNo: "PO-003",
    billNo: "BILL-003",
    billDate: "2026-09-08",
    dueDate: "2026-09-18",
    billAmount: 125000,
    gst: 22500,
    deduction: 2500,
    netPayable: 145000,
    paidAmount: 0,
    paymentDate: "",
    reference: "",
    status: "Approved",
    remarks: "Lift related work",
  },
  {
    id: "PAY-004",
    vendor: "MGL",
    poNo: "PO-004",
    billNo: "BILL-004",
    billDate: "2026-08-20",
    dueDate: "2026-09-05",
    billAmount: 95000,
    gst: 17100,
    deduction: 1500,
    netPayable: 110600,
    paidAmount: 0,
    paymentDate: "",
    reference: "",
    status: "Overdue",
    remarks: "Gas line work",
  },
];

const emptyForm = {
  vendor: "",
  poNo: "",
  billNo: "",
  billDate: "",
  dueDate: "",
  billAmount: "",
  gst: "",
  deduction: "",
  paymentDate: "",
  reference: "",
  status: "Pending",
  remarks: "",
};

function Payments() {
  const [payments, setPayments] = useState(initialPayments);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [vendorFilter, setVendorFilter] = useState("All");
  const [form, setForm] = useState(emptyForm);

  const vendors = useMemo(() => {
    return [...new Set(payments.map((payment) => payment.vendor))];
  }, [payments]);

  const totals = useMemo(() => {
    const total = payments.reduce(
      (sum, payment) => sum + Number(payment.netPayable || 0),
      0
    );

    const paid = payments.reduce(
      (sum, payment) => sum + Number(payment.paidAmount || 0),
      0
    );

    const pending = payments.reduce(
      (sum, payment) =>
        sum +
        Math.max(
          Number(payment.netPayable || 0) -
            Number(payment.paidAmount || 0),
          0
        ),
      0
    );

    const overdue = payments
      .filter((payment) => payment.status === "Overdue")
      .reduce(
        (sum, payment) =>
          sum +
          Math.max(
            Number(payment.netPayable || 0) -
              Number(payment.paidAmount || 0),
            0
          ),
        0
      );

    return {
      total,
      paid,
      pending,
      overdue,
    };
  }, [payments]);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        payment.id.toLowerCase().includes(searchText) ||
        payment.vendor.toLowerCase().includes(searchText) ||
        payment.billNo.toLowerCase().includes(searchText) ||
        payment.poNo.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || payment.status === statusFilter;

      const matchesVendor =
        vendorFilter === "All" || payment.vendor === vendorFilter;

      return matchesSearch && matchesStatus && matchesVendor;
    });
  }, [payments, search, statusFilter, vendorFilter]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(amount || 0));
  };

  const calculateNetPayable = () => {
    const bill = Number(form.billAmount || 0);
    const gst = Number(form.gst || 0);
    const deduction = Number(form.deduction || 0);

    return Math.max(bill + gst - deduction, 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.vendor || !form.billNo || !form.billAmount) {
      alert("Please fill Vendor, Bill No. and Bill Amount.");
      return;
    }

    const netPayable = calculateNetPayable();

    if (editingId) {
      setPayments((previous) =>
        previous.map((payment) => {
          if (payment.id !== editingId) return payment;

          return {
            ...payment,
            ...form,
            billAmount: Number(form.billAmount || 0),
            gst: Number(form.gst || 0),
            deduction: Number(form.deduction || 0),
            netPayable,
            paidAmount: Number(payment.paidAmount || 0),
          };
        })
      );
    } else {
      const newPayment = {
        id: `PAY-${String(payments.length + 1).padStart(3, "0")}`,
        ...form,
        billAmount: Number(form.billAmount || 0),
        gst: Number(form.gst || 0),
        deduction: Number(form.deduction || 0),
        netPayable,
        paidAmount: 0,
      };

      setPayments((previous) => [newPayment, ...previous]);
    }

    resetForm();
  };

  const handleEdit = (payment) => {
    setEditingId(payment.id);

    setForm({
      vendor: payment.vendor || "",
      poNo: payment.poNo || "",
      billNo: payment.billNo || "",
      billDate: payment.billDate || "",
      dueDate: payment.dueDate || "",
      billAmount: payment.billAmount || "",
      gst: payment.gst || "",
      deduction: payment.deduction || "",
      paymentDate: payment.paymentDate || "",
      reference: payment.reference || "",
      status: payment.status || "Pending",
      remarks: payment.remarks || "",
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this payment?"
    );

    if (!confirmed) return;

    setPayments((previous) =>
      previous.filter((payment) => payment.id !== id)
    );
  };

  const markAsPaid = (payment) => {
    setPayments((previous) =>
      previous.map((item) =>
        item.id === payment.id
          ? {
              ...item,
              paidAmount: item.netPayable,
              paymentDate:
                item.paymentDate ||
                new Date().toISOString().split("T")[0],
              status: "Paid",
            }
          : item
      )
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Paid":
        return "payment-status paid";

      case "Approved":
        return "payment-status approved";

      case "Partially Paid":
        return "payment-status partial";

      case "Overdue":
        return "payment-status overdue";

      default:
        return "payment-status pending";
    }
  };

  return (
    <div className="payments-page">
      <div className="page-header">
        <div>
          <h1>💰 Payments</h1>
          <p>
            Manage vendor bills, approvals and project payments
          </p>
        </div>

        <div className="project-name">
          Rustomjee Bella
        </div>
      </div>

      {/* SUMMARY CARDS */}

      <div className="payment-stats-grid">
        <div className="payment-stat-card">
          <div className="payment-stat-icon">₹</div>
          <div>
            <span>Total Payable</span>
            <strong>{formatCurrency(totals.total)}</strong>
          </div>
        </div>

        <div className="payment-stat-card">
          <div className="payment-stat-icon success">✓</div>
          <div>
            <span>Total Paid</span>
            <strong>{formatCurrency(totals.paid)}</strong>
          </div>
        </div>

        <div className="payment-stat-card">
          <div className="payment-stat-icon warning">⏳</div>
          <div>
            <span>Pending Amount</span>
            <strong>{formatCurrency(totals.pending)}</strong>
          </div>
        </div>

        <div className="payment-stat-card">
          <div className="payment-stat-icon danger">!</div>
          <div>
            <span>Overdue Amount</span>
            <strong>{formatCurrency(totals.overdue)}</strong>
          </div>
        </div>
      </div>

      {/* CREATE BUTTON */}

      <div className="payment-toolbar">
        <div>
          <h2>Payment Register</h2>
          <p>
            Track vendor bills and payment status
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => {
            setEditingId(null);
            setForm(emptyForm);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "✕ Close" : "+ Create Payment"}
        </button>
      </div>

      {/* FORM */}

      {showForm && (
        <div className="payment-form-panel">
          <div className="form-panel-header">
            <div>
              <h2>
                {editingId
                  ? "Update Payment"
                  : "Create New Payment"}
              </h2>

              <p>
                Enter vendor bill and payment information
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="payment-form-grid">
              <div className="form-field">
                <label>Vendor *</label>

                <input
                  name="vendor"
                  value={form.vendor}
                  onChange={handleChange}
                  placeholder="Enter vendor name"
                />
              </div>

              <div className="form-field">
                <label>PO / Work Order No.</label>

                <input
                  name="poNo"
                  value={form.poNo}
                  onChange={handleChange}
                  placeholder="PO-001"
                />
              </div>

              <div className="form-field">
                <label>Bill No. *</label>

                <input
                  name="billNo"
                  value={form.billNo}
                  onChange={handleChange}
                  placeholder="Enter bill number"
                />
              </div>

              <div className="form-field">
                <label>Bill Date</label>

                <input
                  type="date"
                  name="billDate"
                  value={form.billDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label>Due Date</label>

                <input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label>Bill Amount *</label>

                <input
                  type="number"
                  min="0"
                  name="billAmount"
                  value={form.billAmount}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>

              <div className="form-field">
                <label>GST Amount</label>

                <input
                  type="number"
                  min="0"
                  name="gst"
                  value={form.gst}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>

              <div className="form-field">
                <label>Deduction</label>

                <input
                  type="number"
                  min="0"
                  name="deduction"
                  value={form.deduction}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>

              <div className="form-field calculated-field">
                <label>Net Payable</label>

                <input
                  type="number"
                  value={calculateNetPayable()}
                  readOnly
                />
              </div>

              <div className="form-field">
                <label>Status</label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Partially Paid</option>
                  <option>Paid</option>
                  <option>Overdue</option>
                </select>
              </div>

              <div className="form-field">
                <label>Payment Date</label>

                <input
                  type="date"
                  name="paymentDate"
                  value={form.paymentDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label>Payment Reference</label>

                <input
                  name="reference"
                  value={form.reference}
                  onChange={handleChange}
                  placeholder="NEFT / UTR / Cheque No."
                />
              </div>

              <div className="form-field full-width">
                <label>Remarks</label>

                <textarea
                  name="remarks"
                  value={form.remarks}
                  onChange={handleChange}
                  placeholder="Enter remarks"
                  rows="3"
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={resetForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-btn"
              >
                {editingId
                  ? "Update Payment"
                  : "Save Payment"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FILTERS */}

      <div className="payment-filters">
        <input
          type="text"
          placeholder="🔎 Search payment, vendor, bill or PO..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={vendorFilter}
          onChange={(e) => setVendorFilter(e.target.value)}
        >
          <option value="All">All Vendors</option>

          {vendors.map((vendor) => (
            <option key={vendor} value={vendor}>
              {vendor}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Partially Paid">
            Partially Paid
          </option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      {/* TABLE */}

      <div className="payment-table-card">
        <div className="table-responsive">
          <table className="payment-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Vendor</th>
                <th>PO / WO</th>
                <th>Bill No.</th>
                <th>Bill Date</th>
                <th>Due Date</th>
                <th>Net Payable</th>
                <th>Paid</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td
                    colSpan="11"
                    className="empty-payment"
                  >
                    No payments found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => {
                  const balance = Math.max(
                    Number(payment.netPayable || 0) -
                      Number(payment.paidAmount || 0),
                    0
                  );

                  return (
                    <tr key={payment.id}>
                      <td>
                        <strong>{payment.id}</strong>
                      </td>

                      <td>{payment.vendor}</td>

                      <td>{payment.poNo || "-"}</td>

                      <td>{payment.billNo}</td>

                      <td>
                        {payment.billDate || "-"}
                      </td>

                      <td>
                        {payment.dueDate || "-"}
                      </td>

                      <td>
                        <strong>
                          {formatCurrency(
                            payment.netPayable
                          )}
                        </strong>
                      </td>

                      <td className="paid-amount">
                        {formatCurrency(
                          payment.paidAmount
                        )}
                      </td>

                      <td className="balance-amount">
                        {formatCurrency(balance)}
                      </td>

                      <td>
                        <span
                          className={getStatusClass(
                            payment.status
                          )}
                        >
                          {payment.status}
                        </span>
                      </td>

                      <td>
                        <div className="payment-actions">
                          <button
                            className="action-btn edit"
                            onClick={() =>
                              handleEdit(payment)
                            }
                            title="Edit"
                          >
                            ✏️
                          </button>

                          {payment.status !== "Paid" && (
                            <button
                              className="action-btn paid"
                              onClick={() =>
                                markAsPaid(payment)
                              }
                              title="Mark as Paid"
                            >
                              ✓
                            </button>
                          )}

                          <button
                            className="action-btn delete"
                            onClick={() =>
                              handleDelete(payment.id)
                            }
                            title="Delete"
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="payment-table-footer">
          Showing{" "}
          <strong>{filteredPayments.length}</strong>{" "}
          of <strong>{payments.length}</strong> payments
        </div>
      </div>
    </div>
  );
}

export default Payments;