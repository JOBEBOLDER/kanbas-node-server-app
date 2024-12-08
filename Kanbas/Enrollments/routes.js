import * as dao from "./dao.js";

function EnrollmentRoutes(app) {
  const findAllEnrollments = async (req, res) => {
    const enrollments = await dao.findAllEnrollments();
    res.json(enrollments);
  };

  const createEnrollment = async (req, res) => {
    const enrollment = await dao.createEnrollment(req.body);
    res.json(enrollment);
  };

  const deleteEnrollment = async (req, res) => {
    const status = await dao.deleteEnrollment(req.params.id);
    res.json(status);
  };

  const findEnrollmentById = async (req, res) => {
    const enrollment = await dao.findEnrollmentById(req.params.id);
    res.json(enrollment);
  };

  const findEnrollmentsByCourse = async (req, res) => {
    const { courseId } = req.params;
    const enrollments = await dao.findEnrollmentsByCourse(courseId);
    res.json(enrollments);
  };

  const findEnrollmentsByUser = async (req, res) => {
    const { userId } = req.params;
    const enrollments = await dao.findEnrollmentsByUser(userId);
    res.json(enrollments);
  };

  app.post("/api/enrollments", createEnrollment);
  app.get("/api/enrollments", findAllEnrollments);
  app.get("/api/enrollments/:id", findEnrollmentById);
  app.delete("/api/enrollments/:id", deleteEnrollment);
  app.post("/api/enrollments", createEnrollment);
  app.delete("/api/enrollments/:id", deleteEnrollment);
  app.get("/api/users/:userId/enrollments", findEnrollmentsByUser);
  app.get("/api/courses/:courseId/enrollments", findEnrollmentsByCourse);
  app.get("/api/users/:userId/enrollments", findEnrollmentsByUser);
}

export default EnrollmentRoutes;