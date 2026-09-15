import { useState } from "react";

function ProjectSetup() {
  const [project, setProject] = useState({
    projectName: "",
    projectCode: "",
    developer: "",
    location: "",
    projectType: "Residential",
    architect: "",
    structuralConsultant: "",
    mepConsultant: "",
    liaisonArchitect: "",
    totalWings: 1,
  });

  const [wings, setWings] = useState([
    {
      name: "A",
      floors: 1,
      unitsPerFloor: 1,
    },
  ]);

  const handleProjectChange = (e) => {
    const { name, value } = e.target;

    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWingChange = (index, field, value) => {
    const updatedWings = [...wings];

    updatedWings[index] = {
      ...updatedWings[index],
      [field]: value,
    };

    setWings(updatedWings);
  };

  const addWing = () => {
    const nextLetter = String.fromCharCode(65 + wings.length);

    setWings([
      ...wings,
      {
        name: nextLetter,
        floors: 1,
        unitsPerFloor: 1,
      },
    ]);
  };

  const removeWing = (index) => {
    if (wings.length === 1) return;

    setWings(wings.filter((_, i) => i !== index));
  };

  const calculateUnits = () => {
    return wings.reduce(
      (total, wing) =>
        total +
        Number(wing.floors || 0) *
        Number(wing.unitsPerFloor || 0),
      0
    );
  };

  const saveProject = () => {
    const projectData = {
      ...project,
      wings,
      totalUnits: calculateUnits(),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "constructionOneProject",
      JSON.stringify(projectData)
    );

    alert("Project saved successfully!");
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">
            ⚙️ Project Setup
          </h1>

          <p className="page-subtitle">
            Create and configure your construction project
          </p>
        </div>
      </div>

      {/* PROJECT INFORMATION */}

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Project Information</h2>
            <p>
              Enter the basic project and consultant details.
            </p>
          </div>
        </div>

        <div className="form-grid">
          <div>
            <label>Project Name</label>
            <input
              name="projectName"
              value={project.projectName}
              onChange={handleProjectChange}
              placeholder="Example: Rustomjee Bella"
            />
          </div>

          <div>
            <label>Project Code</label>
            <input
              name="projectCode"
              value={project.projectCode}
              onChange={handleProjectChange}
              placeholder="Example: RB-001"
            />
          </div>

          <div>
            <label>Developer</label>
            <input
              name="developer"
              value={project.developer}
              onChange={handleProjectChange}
              placeholder="Developer name"
            />
          </div>

          <div>
            <label>Location</label>
            <input
              name="location"
              value={project.location}
              onChange={handleProjectChange}
              placeholder="Project location"
            />
          </div>

          <div>
            <label>Project Type</label>
            <select
              name="projectType"
              value={project.projectType}
              onChange={handleProjectChange}
            >
              <option>Residential</option>
              <option>Commercial</option>
              <option>Residential + Commercial</option>
              <option>Mixed Development</option>
            </select>
          </div>
        </div>
      </section>

      {/* CONSULTANTS */}

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Consultant Details</h2>
            <p>
              Add the project consultants and professionals.
            </p>
          </div>
        </div>

        <div className="form-grid">
          <div>
            <label>Architect</label>
            <input
              name="architect"
              value={project.architect}
              onChange={handleProjectChange}
              placeholder="Architect name"
            />
          </div>

          <div>
            <label>Structural Consultant</label>
            <input
              name="structuralConsultant"
              value={project.structuralConsultant}
              onChange={handleProjectChange}
              placeholder="Structural consultant"
            />
          </div>

          <div>
            <label>MEP Consultant</label>
            <input
              name="mepConsultant"
              value={project.mepConsultant}
              onChange={handleProjectChange}
              placeholder="MEP consultant"
            />
          </div>

          <div>
            <label>Liaison Architect</label>
            <input
              name="liaisonArchitect"
              value={project.liaisonArchitect}
              onChange={handleProjectChange}
              placeholder="Liaison architect"
            />
          </div>
        </div>
      </section>

      {/* BUILDING STRUCTURE */}

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>🏢 Building Structure</h2>
            <p>
              Configure wings, floors and units.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={addWing}
          >
            + Add Wing
          </button>
        </div>

        {wings.map((wing, index) => (
          <div className="wing-card" key={index}>
            <div className="wing-header">
              <h3>
                Wing {wing.name}
              </h3>

              {wings.length > 1 && (
                <button
                  className="danger-button"
                  onClick={() => removeWing(index)}
                >
                  Remove
                </button>
              )}
            </div>

            <div className="form-grid">
              <div>
                <label>Wing Name</label>

                <input
                  value={wing.name}
                  onChange={(e) =>
                    handleWingChange(
                      index,
                      "name",
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <label>Total Floors</label>

                <input
                  type="number"
                  min="1"
                  value={wing.floors}
                  onChange={(e) =>
                    handleWingChange(
                      index,
                      "floors",
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <label>Units / Flats Per Floor</label>

                <input
                  type="number"
                  min="1"
                  value={wing.unitsPerFloor}
                  onChange={(e) =>
                    handleWingChange(
                      index,
                      "unitsPerFloor",
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <label>Total Units</label>

                <input
                  value={
                    Number(wing.floors || 0) *
                    Number(wing.unitsPerFloor || 0)
                  }
                  readOnly
                />
              </div>
            </div>
          </div>
        ))}

        <div className="structure-summary">
          <strong>
            Total Project Units:
          </strong>

          <span>
            {calculateUnits()}
          </span>
        </div>
      </section>

      {/* SAVE */}

      <div className="save-area">
        <button
          className="primary-button save-button"
          onClick={saveProject}
        >
          💾 Save Project
        </button>
      </div>
    </div>
  );
}

export default ProjectSetup;