let assignments = [];

export const findAllAssignments = () => assignments;

export const createAssignment = (assignment) => {
  assignment._id = new Date().getTime().toString();
  assignments.push(assignment);
  return assignment;
};

export const findAssignmentById = (id) => {
  return assignments.find((assignment) => assignment._id === id);
};

export const updateAssignment = (id, assignment) => {
  const index = assignments.findIndex((a) => a._id === id);
  assignments[index] = { ...assignments[index], ...assignment };
  return assignments[index];
};

export const deleteAssignment = (id) => {
  assignments = assignments.filter((assignment) => assignment._id !== id);
  return { status: "OK" };
};