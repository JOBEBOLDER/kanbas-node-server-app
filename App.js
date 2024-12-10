import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import "dotenv/config";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas-cs5610-fall"
mongoose.connect(CONNECTION_STRING);

const app = express();

// CORS配置必须在其他中间件之前
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
  })
);

// Session配置
app.use(
  session({
    secret: "any string",
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false,  // 开发环境设为false
      sameSite: "lax",  
      maxAge: 24 * 60 * 60 * 1000  // 24小时
    }
  })
);

// 解析JSON请求体
app.use(express.json());

// 基础路由
app.get("/", (req, res) => {
  res.send("Welcome to Full Stack Development!");
});

// API路由
Lab5(app);
Hello(app);
UserRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});