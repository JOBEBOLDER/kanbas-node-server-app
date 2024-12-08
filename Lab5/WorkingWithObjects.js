const assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create NodeJS server with Express25",
    due: "2021-10-18",
    completed: false,
    score: 0,
};
// 添加module对象
const module = {
    id: "M101",
    name: "Web Development",
    description: "Full Stack Web Development with MERN Stack",
    course: "CS5610"
};

export default function WorkingWithObjects(app) {
    // 获取整个assignment对象
    app.get("/lab5/assignment", (req, res) => {
        res.json(assignment);
    });

    // 获取assignment的title属性
    app.get("/lab5/assignment/title", (req, res) => {
        res.json(assignment.title);
    });
    // 获取完整module对象
    app.get("/lab5/module", (req, res) => {
        res.json(module);
    });

    // 获取module name
    app.get("/lab5/module/name", (req, res) => {
        res.json(module.name);
    });

    // 更新module name
    app.get("/lab5/module/name/:newName", (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
    });

    // 更新module description
    app.get("/lab5/module/description/:newDescription", (req, res) => {
        const { newDescription } = req.params;
        module.description = newDescription;
        res.json(module);
    });

    // 更新assignment score
    app.get("/lab5/assignment/score/:newScore", (req, res) => {
        const { newScore } = req.params;
        assignment.score = parseInt(newScore);
        res.json(assignment);
    });

    // 更新assignment completed状态
    app.get("/lab5/assignment/completed/:completed", (req, res) => {
        const { completed } = req.params;
        assignment.completed = completed === 'true';
        res.json(assignment);
    });
}