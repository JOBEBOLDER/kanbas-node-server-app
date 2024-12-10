import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  // 定义所有处理函数

  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  app.post("/api/users", createUser);
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  app.delete("/api/users/:userId", deleteUser);
  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    try {
      let users;
      if (role) {
        users = await dao.findUsersByRole(role);
      } else if (name) {
        users = await dao.findUsersByPartialName(name);
      } else {
        users = await dao.findAllUsers();
      }
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  };

  const findUserById = async (req, res) => {
    try {
      const user = await dao.findUserById(req.params.userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user by ID" });
    }
  };

  const signup = async (req, res) => {
    try {
      const user = await dao.findUserByUsername(req.body.username);
      if (user) {
        res.status(400).json({ message: "Username already taken" });
        return;
      }
      const currentUser = await dao.createUser(req.body);
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } catch (error) {
      res.status(500).json({ message: "Error signing up" });
    }
  };

  const signin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const currentUser = await dao.findUserByCredentials(username, password);
      if (currentUser) {
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
      } else {
        res.status(401).json({ message: "Unable to login. Try again later." });
      }
    } catch (error) {
      res.status(500).json({ message: "Error signing in" });
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const userUpdates = req.body;
    const status = await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...userUpdates };
    }
    res.json(status);
  };

  app.put("/api/users/:userId", updateUser);
  

  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    try {
      const courses = await courseDao.findCoursesForEnrolledUser(userId);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Error fetching enrolled courses" });
    }
  };

  const createCourse = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      const newCourse = await courseDao.createCourse(req.body);
      await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
      res.json(newCourse);
    } catch (error) {
      res.status(500).json({ message: "Error creating course" });
    }
  };

  // 路由定义 - 按照具体到通用的顺序排列
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.post("/api/users/current/courses", createCourse);
  app.post("/api/users", createUser); // 通用路由在具体路由之后
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
}