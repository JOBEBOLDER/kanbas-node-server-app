import * as dao from "./dao.js";

function AssignmentRoutes(app) {
  // 获取所有作业
  const findAllAssignments = async (req, res) => {
    const assignments = await dao.findAllAssignments();
    res.json(assignments);
  };

  // 创建作业
  const createAssignment = async (req, res) => {
    const assignment = await dao.createAssignment(req.body);
    res.json(assignment);
  };

  // 通过ID获取作业
  const findAssignmentById = async (req, res) => {
    const assignment = await dao.findAssignmentById(req.params.id);
    res.json(assignment);
  };

  // 更新作业
  const updateAssignment = async (req, res) => {
    const { id } = req.params;
    const status = await dao.updateAssignment(id, req.body);
    res.json(status);
  };

  // 删除作业
  const deleteAssignment = async (req, res) => {
    const { id } = req.params;
    const status = await dao.deleteAssignment(id);
    res.json(status);
  };

  // 路由定义
  app.get("/api/assignments", findAllAssignments);
  app.post("/api/assignments", createAssignment);
  app.get("/api/assignments/:id", findAssignmentById);
  app.put("/api/assignments/:id", updateAssignment);
  app.delete("/api/assignments/:id", deleteAssignment);
}

export default AssignmentRoutes;