export const workspaces = {
  construction: {
    label: "Construction ERP",
    subtitle: "Developer / Builder",
    groups: [
      { title: "Project Control", items: ["Projects", "Project Setup", "Flat Tracker", "DPR", "Targets", "Drawings", "Execution"] },
      { title: "Procurement & Contracts", items: ["Purchase Requisitions", "Purchase Orders", "Work Orders", "Vendor Listing", "Consultant Listing", "Contractor Listing"] },
      { title: "Store Management", items: ["GRN", "Stock / Issue / Reconciliation", "Developer Store", "Contractor Store", "Material Tracking"] },
      { title: "Sales Management", items: ["Unit Inventory", "Customer / Lead Management", "Booking & Allotment", "Agreement & Documentation", "Demand & Invoice Generation", "Receipts & Collections", "Cancellation & Refunds", "Channel Partner Management", "Sales Targets & Commission", "Customer Handover"] },
      { title: "Finance & Administration", items: ["Accounts", "Payments", "HR & Workforce", "Reports", "Masters", "Settings"] }
    ]
  },
  contractor: {
    label: "Contractor ERP",
    subtitle: "Independent Contractor",
    groups: [
      { title: "Projects & Work Orders", items: ["My Projects", "Client Work Orders", "BOQ Management", "Project Targets", "Daily Progress Report"] },
      { title: "Procurement & Store", items: ["Suppliers", "Purchase Requisitions", "Supplier Quotations", "Contractor Purchase Orders", "Supplier Invoices", "Contractor Store", "Builder Material Requests", "Builder Material Receipts", "Material Consumption & Returns"] },
      { title: "Billing & Commercials", items: ["Measurement Book", "RA Bills", "Variations", "Deductions & Retention", "Advances", "Receivables", "Payments"] },
      { title: "Workforce & Reports", items: ["Workforce", "Attendance", "Wages & Payroll", "Expenses", "Reports", "Settings"] }
    ]
  }
};

export const moduleDescription = {
  "Purchase Orders": "Create, revise, approve and track purchase orders. Link approved orders to supplier invoices and GRNs.",
  "GRN": "Record received quantities against purchase orders, inspect materials and post approved receipts to the relevant store.",
  "Measurement Book": "Record item-wise measurements with location, dimensions, supporting documents and certification status.",
  "RA Bills": "Prepare running account bills from certified measurements, including advances, retention, deductions and taxes.",
  "Builder Material Receipts": "Record builder-issued material challans, contractor acknowledgement, actual receipt, consumption, return and balance.",
  "Contractor Store": "Track contractor-owned stock separately from developer-owned stock."
};