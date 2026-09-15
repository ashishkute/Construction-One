const defaultProject = {
  id: "RB001",
  name: "Rustomjee Bella",
  code: "RB001",
  developer: "TREC",
  location: "Bhandup",
  projectType: "Residential",

  consultants: {
    architect: "Jayesh Shah Architect",
    structural: "HM Raje",
    mep: "Ambrosia",
  },

  wings: [
    {
      id: "wing-a",
      name: "A",
      totalFloors: 22,
      unitsPerFloor: 5,
      totalUnits: 110,
    },
    {
      id: "wing-b",
      name: "B",
      totalFloors: 22,
      unitsPerFloor: 4,
      totalUnits: 88,
    },
  ],
};

const STORAGE_KEY = "construction-one-project";

export function getProject() {
  const savedProject = localStorage.getItem(STORAGE_KEY);

  if (savedProject) {
    try {
      return JSON.parse(savedProject);
    } catch (error) {
      console.error("Unable to read saved project:", error);
    }
  }

  return defaultProject;
}

export function saveProject(project) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(project)
  );
}

export function clearProject() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getTotalUnits(project = getProject()) {
  return project.wings.reduce(
    (total, wing) => total + Number(wing.totalUnits || 0),
    0
  );
}

export function generateFlats(project = getProject()) {
  const flats = [];

  project.wings.forEach((wing) => {
    for (
      let floor = 1;
      floor <= Number(wing.totalFloors);
      floor++
    ) {
      for (
        let unit = 1;
        unit <= Number(wing.unitsPerFloor);
        unit++
      ) {
        const flatNumber = String(floor * 100 + unit);

        flats.push({
          id: `${wing.name}-${flatNumber}`,
          wing: wing.name,
          floor,
          flat: `${wing.name}-${flatNumber}`,
          status: "Not Started",
        });
      }
    }
  });

  return flats;
}

export default defaultProject;