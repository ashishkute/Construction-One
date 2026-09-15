import { useState } from "react";

function WorkOrders() {
  const [workOrders, setWorkOrders] = useState([
    {
      id: "WO-001",
      contractor: "ABC Civil Contractor",
      category: "Civil Work",
      description: "Internal Plaster Work",
      location: "A Wing - Floor 5",
      amount: 125000,
      startDate: "2026-09-10",
      targetDate: "2026-09-25",
      status: "Approved",
    },
    {
      id: "WO-002",
      contractor: "XYZ Finishing",
      category: "Finishing",
      description: "Painting Work",
      location: "B Wing - Floor 3",
      amount: 85000,
      startDate: "2026-09-12",
      targetDate: "2026-09-30",
      status: "In Progress",
    },
  ]);

  const [form, setForm] = useState({
    contractor: "",
    category: "",
    description: "",
    wing: "",
    floor: "",
    flat: "",
    quantity: "",
    unit: "",
    rate: "",
    amount: "",
    startDate: "",
    targetDate: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createWorkOrder = () => {
    if (
      !form.contractor ||
      !form.category ||
      !form.description ||
      !form.amount ||
      !form.startDate ||
      !form.targetDate
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const newWO = {
      id: `WO-${String(workOrders.length + 1).padStart(3, "0")}`,
      contractor: form.contractor,
      category: form.category,
      description: form.description,
      location:
        `${form.wing ? form.wing + " Wing" : ""}` +
        `${form.floor ? " - Floor " + form.floor : ""}` +
        `${form.flat ? " - Flat " + form.flat : ""}`,
      amount: Number(form.amount),
      startDate: form.startDate,
      targetDate: form.targetDate,
      status: "Pending Approval",
    };

    setWorkOrders((prev) => [...prev, newWO]);

    setForm({
      contractor: "",
      category: "",
      description: "",
      wing: "",
      floor: "",
      flat: "",
      quantity: "",
      unit: "",
      rate: "",
      amount: "",
      startDate: "",
      targetDate: "",
      remarks: "",
    });
  };

  const deleteWorkOrder = (id) => {
    setWorkOrders((prev) =>
      prev.filter((wo) => wo.id !== id)
    );
  };

  const totalValue = workOrders.reduce(
    (sum, wo) => sum + Number(wo.amount || 0),
    0
  );

  const pending = workOrders.filter(
    (wo) => wo.status === "Pending Approval"
  ).length;

  const approved = workOrders.filter(
    (wo) => wo.status === "Approved"
  ).length;

  const completed = workOrders.filter(
    (wo) => wo.status === "Completed"
  ).length;

  return (
    <div className="page-container">

      {/* PAGE HEADER */}

      <div className="page-header">

        <div>
          <h1 className="page-title">
            📄 Work Orders
          </h1>

          <p className="page-subtitle">
            Create and manage project work orders
          </p>
        </div>

        <strong>
          Rustomjee Bella
        </strong>

      </div>


      {/* SUMMARY CARDS */}

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            📄
          </div>

          <div>
            <div className="dashboard-card-title">
              Total WOs
            </div>

            <div className="dashboard-card-value">
              {workOrders.length}
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
              {pending}
            </div>
          </div>
        </div>


        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            ✅
          </div>

          <div>
            <div className="dashboard-card-title">
              Approved
            </div>

            <div className="dashboard-card-value">
              {approved}
            </div>
          </div>
        </div>


        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            💰
          </div>

          <div>
            <div className="dashboard-card-title">
              Total WO Value
            </div>

            <div className="dashboard-card-value">
              ₹{totalValue.toLocaleString("en-IN")}
            </div>
          </div>
        </div>

      </div>


      {/* CREATE WORK ORDER */}

      <section className="panel">

        <div className="panel-header">

          <div>
            <h2>
              Create Work Order
            </h2>

            <p>
              Record contractor and work order information.
            </p>
          </div>

        </div>


        <div className="form-grid">

          <div className="form-group">
            <label>
              Contractor *
            </label>

            <input
              name="contractor"
              value={form.contractor}
              onChange={handleChange}
              placeholder="Enter contractor name"
            />
          </div>


          <div className="form-group">
            <label>
              Work Category *
            </label>

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

              <option value="Finishing">
                Finishing
              </option>

              <option value="Waterproofing">
                Waterproofing
              </option>

              <option value="Electrical">
                Electrical
              </option>

              <option value="Plumbing">
                Plumbing
              </option>

              <option value="MEP">
                MEP
              </option>

              <option value="Painting">
                Painting
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>


          <div className="form-group">
            <label>
              Work Description *
            </label>

            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Example: Tile Work"
            />
          </div>


          <div className="form-group">
            <label>
              Wing
            </label>

            <select
              name="wing"
              value={form.wing}
              onChange={handleChange}
            >
              <option value="">
                Select Wing
              </option>

              <option value="A">
                A
              </option>

              <option value="B">
                B
              </option>

              <option value="C">
                C
              </option>

              <option value="D">
                D
              </option>
            </select>
          </div>


          <div className="form-group">
            <label>
              Floor
            </label>

            <input
              name="floor"
              value={form.floor}
              onChange={handleChange}
              placeholder="Enter floor"
            />
          </div>


          <div className="form-group">
            <label>
              Flat / Unit
            </label>

            <input
              name="flat"
              value={form.flat}
              onChange={handleChange}
              placeholder="Example: A-501"
            />
          </div>


          <div className="form-group">
            <label>
              Quantity
            </label>

            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
            />
          </div>


          <div className="form-group">
            <label>
              Unit
            </label>

            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
            >
              <option value="">
                Select Unit
              </option>

              <option value="Sq.ft">
                Sq.ft
              </option>

              <option value="Sq.m">
                Sq.m
              </option>

              <option value="Rmt">
                Rmt
              </option>

              <option value="Nos">
                Nos
              </option>

              <option value="Kg">
                Kg
              </option>

              <option value="Lumpsum">
                Lumpsum
              </option>
            </select>
          </div>


          <div className="form-group">
            <label>
              Rate
            </label>

            <input
              type="number"
              name="rate"
              value={form.rate}
              onChange={handleChange}
              placeholder="Enter rate"
            />
          </div>


          <div className="form-group">
            <label>
              WO Amount *
            </label>

            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Enter amount"
            />
          </div>


          <div className="form-group">
            <label>
              Start Date *
            </label>

            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
            />
          </div>


          <div className="form-group">
            <label>
              Target Completion Date *
            </label>

            <input
              type="date"
              name="targetDate"
              value={form.targetDate}
              onChange={handleChange}
            />
          </div>

        </div>


        <div className="form-group full-width">

          <label>
            Remarks
          </label>

          <textarea
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            placeholder="Enter work order remarks, specifications, conditions..."
          />

        </div>


        <div className="form-actions">

          <button
            className="primary-button"
            onClick={createWorkOrder}
          >
            + Create Work Order
          </button>

        </div>

      </section>


      {/* WORK ORDER REGISTER */}

      <section className="panel">

        <div className="panel-header">

          <div>
            <h2>
              Work Order Register
            </h2>

            <p>
              Track all work orders for the project.
            </p>
          </div>

        </div>


        <div className="table-container">

          <table>

            <thead>

              <tr>
                <th>WO No.</th>
                <th>Contractor</th>
                <th>Category</th>
                <th>Work Description</th>
                <th>Location</th>
                <th>Amount</th>
                <th>Start Date</th>
                <th>Target Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>


            <tbody>

              {workOrders.map((wo) => (

                <tr key={wo.id}>

                  <td>
                    <strong>
                      {wo.id}
                    </strong>
                  </td>

                  <td>
                    {wo.contractor}
                  </td>

                  <td>
                    {wo.category}
                  </td>

                  <td>
                    {wo.description}
                  </td>

                  <td>
                    {wo.location || "-"}
                  </td>

                  <td>
                    ₹{Number(wo.amount).toLocaleString("en-IN")}
                  </td>

                  <td>
                    {wo.startDate}
                  </td>

                  <td>
                    {wo.targetDate}
                  </td>

                  <td>
                    <span className="status-badge">
                      {wo.status}
                    </span>
                  </td>

                  <td>

                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteWorkOrder(wo.id)
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

      </section>

    </div>
  );
}

export default WorkOrders;