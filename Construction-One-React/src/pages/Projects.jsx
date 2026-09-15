import { useState } from 'react'

function Projects() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Construction One Demo Project',
      location: 'Mumbai',
      type: 'Residential',
      manager: 'Project Manager',
      wings: 4,
      floors: 20,
      flats: 200,
      completed: 116,
      start: '2025-01-15',
      target: '2027-12-31',
      status: 'Active'
    }
  ])

  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    name: '',
    location: '',
    type: 'Residential',
    manager: '',
    wings: '',
    floors: '',
    flats: '',
    start: '',
    target: ''
  })

  const totalProjects = projects.length

  const totalFlats = projects.reduce(
    (sum, project) => sum + Number(project.flats || 0),
    0
  )

  const completedFlats = projects.reduce(
    (sum, project) => sum + Number(project.completed || 0),
    0
  )

  const progress =
    totalFlats > 0
      ? Math.round((completedFlats / totalFlats) * 100)
      : 0

  const activeProjects = projects.filter(
    project => project.status === 'Active'
  ).length

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  function addProject(e) {
    e.preventDefault()

    if (!form.name || !form.location || !form.flats) {
      alert('Please enter Project Name, Location and Total Flats.')
      return
    }

    const newProject = {
      id: Date.now(),
      ...form,
      wings: Number(form.wings || 0),
      floors: Number(form.floors || 0),
      flats: Number(form.flats),
      completed: 0,
      status: 'Active'
    }

    setProjects([...projects, newProject])

    setForm({
      name: '',
      location: '',
      type: 'Residential',
      manager: '',
      wings: '',
      floors: '',
      flats: '',
      start: '',
      target: ''
    })

    setShowForm(false)
  }

  function deleteProject(id) {
    if (window.confirm('Delete this project?')) {
      setProjects(projects.filter(project => project.id !== id))
    }
  }

  function viewProject(project) {
    alert(
      `Project: ${project.name}\n` +
      `Location: ${project.location}\n` +
      `Total Flats: ${project.flats}\n` +
      `Completed: ${project.completed}\n` +
      `Progress: ${Math.round(
        (project.completed / project.flats) * 100
      )}%`
    )
  }

  return (
    <div>

      {/* PAGE HEADER */}
      <div className="page-header">

        <div>
          <h1 className="page-title">
            🏢 Projects
          </h1>

          <p className="page-subtitle">
            Manage all construction projects
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(true)}
        >
          + Add Project
        </button>

      </div>


      {/* SUMMARY CARDS */}
      <div className="dashboard-grid">

        <div className="dashboard-card">
          <div className="dashboard-card-icon">🏢</div>

          <div>
            <div className="dashboard-card-title">
              Total Projects
            </div>

            <div className="dashboard-card-value">
              {totalProjects}
            </div>
          </div>
        </div>


        <div className="dashboard-card">
          <div className="dashboard-card-icon">🏠</div>

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
          <div className="dashboard-card-icon">✅</div>

          <div>
            <div className="dashboard-card-title">
              Completed Flats
            </div>

            <div className="dashboard-card-value">
              {completedFlats}
            </div>
          </div>
        </div>


        <div className="dashboard-card">
          <div className="dashboard-card-icon">📈</div>

          <div>
            <div className="dashboard-card-title">
              Active Projects
            </div>

            <div className="dashboard-card-value">
              {activeProjects}
            </div>
          </div>
        </div>

      </div>


      {/* ADD PROJECT FORM */}
      {showForm && (
        <section className="panel">

          <div className="panel-header">
            <div>
              <h2>➕ Add New Project</h2>
              <p>Enter project details</p>
            </div>
          </div>


          <form onSubmit={addProject}>

            <div className="form-grid">

              <div className="form-group">
                <label>Project Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter project name"
                />
              </div>


              <div className="form-group">
                <label>Location *</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Mumbai"
                />
              </div>


              <div className="form-group">
                <label>Project Type</label>

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Mixed Use</option>
                </select>
              </div>


              <div className="form-group">
                <label>Project Manager</label>

                <input
                  name="manager"
                  value={form.manager}
                  onChange={handleChange}
                  placeholder="Manager name"
                />
              </div>


              <div className="form-group">
                <label>Wings</label>

                <input
                  type="number"
                  name="wings"
                  value={form.wings}
                  onChange={handleChange}
                />
              </div>


              <div className="form-group">
                <label>Floors</label>

                <input
                  type="number"
                  name="floors"
                  value={form.floors}
                  onChange={handleChange}
                />
              </div>


              <div className="form-group">
                <label>Total Flats *</label>

                <input
                  type="number"
                  name="flats"
                  value={form.flats}
                  onChange={handleChange}
                />
              </div>


              <div className="form-group">
                <label>Start Date</label>

                <input
                  type="date"
                  name="start"
                  value={form.start}
                  onChange={handleChange}
                />
              </div>


              <div className="form-group">
                <label>Target Date</label>

                <input
                  type="date"
                  name="target"
                  value={form.target}
                  onChange={handleChange}
                />
              </div>

            </div>


            <div style={{ marginTop: '20px' }}>

              <button
                type="submit"
                className="primary-button"
              >
                Save Project
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowForm(false)}
                style={{ marginLeft: '10px' }}
              >
                Cancel
              </button>

            </div>

          </form>

        </section>
      )}


      {/* PROJECT LIST */}
      <section className="panel">

        <div className="panel-header">

          <div>
            <h2>📋 Project List</h2>

            <p>
              {projects.length} project(s)
            </p>
          </div>

        </div>


        {projects.length === 0 ? (

          <div className="empty-state">

            <div className="empty-state-icon">
              🏢
            </div>

            <h3>
              No Projects Found
            </h3>

            <p>
              Click "Add Project" to create your first project.
            </p>

          </div>

        ) : (

          <div>

            {projects.map(project => {

              const projectProgress =
                project.flats > 0
                  ? Math.round(
                      (project.completed / project.flats) * 100
                    )
                  : 0

              return (

                <div
                  key={project.id}
                  className="project-card"
                >

                  <div className="project-card-header">

                    <div>
                      <h3>
                        {project.name}
                      </h3>

                      <span className="status-badge">
                        {project.status}
                      </span>
                    </div>

                  </div>


                  <div className="project-details">

                    <span>
                      📍 {project.location}
                    </span>

                    <span>
                      🏠 {project.type}
                    </span>

                    <span>
                      👷 {project.manager || 'Not Assigned'}
                    </span>

                    <span>
                      🏢 Wings: {project.wings}
                    </span>

                    <span>
                      🏬 Floors: {project.floors}
                    </span>

                  </div>


                  <div className="project-stats">

                    <div>
                      <strong>Total Flats</strong>
                      <span>{project.flats}</span>
                    </div>

                    <div>
                      <strong>Completed</strong>
                      <span>{project.completed}</span>
                    </div>

                    <div>
                      <strong>Progress</strong>
                      <span>{projectProgress}%</span>
                    </div>

                  </div>


                  <div className="progress-section">

                    <div className="progress-label">

                      <span>
                        Project Progress
                      </span>

                      <strong>
                        {projectProgress}%
                      </strong>

                    </div>

                    <div className="progress-bar">

                      <div
                        className="progress-fill"
                        style={{
                          width: `${projectProgress}%`
                        }}
                      />

                    </div>

                  </div>


                  <div className="project-dates">

                    📅 Start: {project.start || 'Not set'}

                    &nbsp;&nbsp;

                    🎯 Target: {project.target || 'Not set'}

                  </div>


                  <div className="project-actions">

                    <button
                      className="primary-button"
                      onClick={() => viewProject(project)}
                    >
                      👁 View
                    </button>

                    <button
                      className="secondary-button"
                      onClick={() =>
                        alert('Edit function will be added next.')
                      }
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="danger-button"
                      onClick={() => deleteProject(project.id)}
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

              )
            })}

          </div>

        )}

      </section>


      {/* OVERALL PROGRESS */}
      <section className="panel">

        <div className="panel-header">

          <div>
            <h2>📊 Overall Project Progress</h2>

            <p>
              Based on completed flats
            </p>
          </div>

          <strong>
            {progress}%
          </strong>

        </div>


        <div className="progress-bar large">

          <div
            className="progress-fill"
            style={{
              width: `${progress}%`
            }}
          />

        </div>

      </section>

    </div>
  )
}

export default Projects