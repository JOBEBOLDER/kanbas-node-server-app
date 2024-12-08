import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";



const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(express.json());


const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
// 添加环境变量支持
const PORT = process.env.PORT || 4000;

// 添加一个测试路由
app.get("/", (req, res) => {
  res.send("Welcome to Full Stack Development!");
});


app.use(session(sessionOptions));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

Lab5(app);
Hello(app);
UserRoutes(app);
CourseRoutes(app);
//ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});