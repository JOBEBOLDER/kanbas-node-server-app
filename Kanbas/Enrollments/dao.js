// Kanbas/Enrollments/dao.js
let enrollments = [];

export const findAllEnrollments = () => enrollments;

export const createEnrollment = (enrollment) => {
  enrollment._id = new Date().getTime().toString();
  enrollments.push(enrollment);
  return enrollment;
};

export const deleteEnrollment = (enrollmentId) => {
  enrollments = enrollments.filter((e) => e._id !== enrollmentId);
  return { status: "OK" };
};

export const findEnrollmentById = (enrollmentId) => {
  return enrollments.find((e) => e._id === enrollmentId);
};

export const findEnrollmentsByCourse = (courseId) => {
  return enrollments.filter((e) => e.course === courseId);
};

export const findEnrollmentsByUser = (userId) => {
  return enrollments.filter((e) => e.user === userId);
};