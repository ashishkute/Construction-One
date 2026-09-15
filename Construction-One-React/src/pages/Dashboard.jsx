import "./Dashboard.css";
import React from "react";

function Dashboard() {
  const stats = [
    {
      title: "Total Projects",
      value: "01",
      subtitle: "Active project",
      icon: "🏗️",
      color: "#2563eb",
    },
    {
      title: "Total Flats",
      value: "200",
      subtitle: "Residential units",
      icon: "🏠",
      color: "#7c3aed",
    },
    {
      title: "Completed Flats",
      value: "116",
      subtitle: "58% completed",
      icon: "✅",
      color: "#059669",
    },
    {
      title: "Open Snags",
      value: "12",
      subtitle: "Needs attention",
      icon: "⚠️",
      color: "#dc2626",
    },
  ];

  const modules = [
    {
      title: "Projects",
      description: "Manage construction projects",
      icon: "🏗️",
      path: "/projects",
    },
    {
      title: "Project Setup",
      description: "Configure project details",
      icon: "⚙️",
      path: "/project-setup",
    },
    {
      title: "Flat Tracker",
      description: "Track flat-wise progress",
      icon: "🏠",
      path: "/flat-tracker",
    },
    {
      title: "DPR",
      description: "Daily progress reports",
      icon: "📋",
      path: "/dpr",
    },
    {
      title: "Targets",
      description: "Manage project targets",
      icon: "🎯",
      path: "/targets",
    },
    {
      title: "Purchase Orders",
      description: "Manage purchase orders",
      icon: "🛒",
      path: "/purchase-orders",
    },
    {
      title: "Work Orders",
      description: "Manage work orders",
      icon: "📝",
      path: "/work-orders",
    },
    {
      title: "Vendors",
      description: "Manage contractors & vendors",
      icon: "👷",
      path: "/vendors",
    },
    {
      title: "Snag / Desnag",
      description: "Track defects & rectification",
      icon: "⚠️",
      path: "/snags",
    },
    {
      title: "Payments",
      description: "Track vendor payments",
      icon: "💰",
      path: "/payments",
    },
    {
      title: "Reports",
      description: "Project reports & analytics",
      icon: "📊",
      path: "/reports",
    },
  ];

  const activities = [
    {
      text: "116 flats completed",
      time: "Today",
      icon: "🏠",
    },
    {
      text: "12 open snags require attention",
      time: "Today",
      icon: "⚠️",
    },
    {
      text: "Project progress updated to 58%",
      time: "Yesterday",
      icon: "📈",
    },
    {
      text: "Vendor management data updated",
      time: "Yesterday",
      icon: "👷",
    },
  ];

  return (
    <div className="dashboard-page">

      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <div className="dashboard-eyebrow">
            CONSTRUCTION ONE
          </div>

          <h1>Project Dashboard</h1>

          <p>
            Monitor project performance, progress and site activities
            from one place.
          </p>
        </div>

        <div className="project-selector">
          <span>Current Project</span>
          <strong>Rustomjee Bella</strong>
          <small>Active Project</small>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="stats-grid">

        {stats.map((stat) => (
          <div className="stat-card" key={stat.title}>

            <div
              className="stat-icon"
              style={{
                background: `${stat.color}15`,
                color: stat.color,
              }}
            >
              {stat.icon}
            </div>

            <div className="stat-content">
              <span>{stat.title}</span>
              <strong>{stat.value}</strong>
              <small>{stat.subtitle}</small>
            </div>

          </div>
        ))}

      </div>

      {/* MAIN GRID */}
      <div className="dashboard-main-grid">

        {/* PROJECT PROGRESS */}
        <div className="dashboard-card progress-card">

          <div className="card-header">
            <div>
              <h2>Project Progress</h2>
              <p>Overall construction progress</p>
            </div>

            <div className="progress-percentage">
              58%
            </div>
          </div>

          <div className="progress-large">
            <div
              className="progress-large-fill"
              style={{ width: "58%" }}
            ></div>
          </div>

          <div className="progress-details">

            <div>
              <span>Completed</span>
              <strong>116 Flats</strong>
            </div>

            <div>
              <span>Remaining</span>
              <strong>84 Flats</strong>
            </div>

            <div>
              <span>Project Status</span>
              <strong className="status-active">Active</strong>
            </div>

          </div>

        </div>

        {/* PROJECT INFO */}
        <div className="dashboard-card project-info-card">

          <div className="card-header">
            <div>
              <h2>Project Overview</h2>
              <p>Current project information</p>
            </div>
          </div>

          <div className="project-info-list">

            <div>
              <span>Project</span>
              <strong>Rustomjee Bella</strong>
            </div>

            <div>
              <span>Location</span>
              <strong>Bhandup West, Mumbai</strong>
            </div>

            <div>
              <span>Project Type</span>
              <strong>Residential</strong>
            </div>

            <div>
              <span>Total Wings</span>
              <strong>4</strong>
            </div>

            <div>
              <span>Total Floors</span>
              <strong>20</strong>
            </div>

          </div>

        </div>

      </div>

      {/* SECOND ROW */}
      <div className="dashboard-main-grid">

        {/* HANDOVER */}
        <div className="dashboard-card">

          <div className="card-header">
            <div>
              <h2>Flat Handover</h2>
              <p>Residential handover status</p>
            </div>

            <span className="card-badge">
              58%
            </span>
          </div>

          <div className="handover-chart">

            <div className="handover-circle">
              <div>
                <strong>116</strong>
                <span>Completed</span>
              </div>
            </div>

            <div className="handover-stats">

              <div>
                <span className="dot completed-dot"></span>
                <label>Completed</label>
                <strong>116</strong>
              </div>

              <div>
                <span className="dot remaining-dot"></span>
                <label>Remaining</label>
                <strong>84</strong>
              </div>

            </div>

          </div>

        </div>

        {/* SNAGS */}
        <div className="dashboard-card">

          <div className="card-header">
            <div>
              <h2>Snag Status</h2>
              <p>Current snag position</p>
            </div>

            <span className="warning-badge">
              12 Open
            </span>
          </div>

          <div className="snag-stats">

            <div className="snag-box">
              <strong>12</strong>
              <span>Open</span>
            </div>

            <div className="snag-box">
              <strong>38</strong>
              <span>Resolved</span>
            </div>

            <div className="snag-box">
              <strong>50</strong>
              <span>Total</span>
            </div>

          </div>

          <button
            className="view-button"
            onClick={() => {
              window.location.href = "/snags";
            }}
          >
            View Snag / Desnag →
          </button>

        </div>

      </div>

      {/* MODULES */}
      <div className="dashboard-card modules-card">

        <div className="section-heading">
          <div>
            <h2>Project Modules</h2>
            <p>Access all Construction One modules</p>
          </div>
        </div>

        <div className="modules-grid">

          {modules.map((module) => (
            <button
              key={module.title}
              className="module-card"
              onClick={() => {
                window.location.href = module.path;
              }}
            >

              <div className="module-icon">
                {module.icon}
              </div>

              <div className="module-content">
                <strong>{module.title}</strong>
                <span>{module.description}</span>
              </div>

              <div className="module-arrow">
                →
              </div>

            </button>
          ))}

        </div>

      </div>

      {/* RECENT ACTIVITY */}
      <div className="dashboard-card activity-card">

        <div className="section-heading">
          <div>
            <h2>Recent Activity</h2>
            <p>Latest project updates</p>
          </div>
        </div>

        <div className="activity-list">

          {activities.map((activity, index) => (
            <div className="activity-item" key={index}>

              <div className="activity-icon">
                {activity.icon}
              </div>

              <div className="activity-text">
                <strong>{activity.text}</strong>
                <span>{activity.time}</span>
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;