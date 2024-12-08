let todos = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: true }
];

// 确保todos始终是数组
if (!Array.isArray(todos)) {
    todos = [];
}

export default function WorkingWithArrays(app) {
    // GET - 获取所有todos
    app.get("/lab5/todos", (req, res) => {
        res.json(Array.isArray(todos) ? todos : []);
    });
    // 创建新todo - 注意这个路由要放在/:id路由之前
    app.get("/lab5/todos/create", (req, res) => {
        const newTodo = {
            id: new Date().getTime(),
            title: "New Task",
            completed: false,
        };
        todos.push(newTodo);
        res.json(todos);
    });
    

    // 获取所有todos
    app.get("/lab5/todos", (req, res) => {
        res.json(todos);
    });

    // 根据ID获取单个todo
    app.get("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        res.json(todo);
    });

     // 删除todo
     app.get("/lab5/todos/:id/delete", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
        todos.splice(todoIndex, 1);
        res.json(todos);
    });

    // 更新todo标题
    app.get("/lab5/todos/:id/title/:title", (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.title = title;
        res.json(todos);
    });

    // 更新todo的completed状态
    app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
        const { id, completed } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.completed = completed === 'true';
        res.json(todos);
    });

    // 更新todo的description
    app.get("/lab5/todos/:id/description/:description", (req, res) => {
        const { id, description } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.description = description;
        res.json(todos);
    });

    // 添加POST路由处理新增todo
    app.post("/lab5/todos", (req, res) => {
        const newTodo = {
            id: new Date().getTime(),  // 生成唯一ID
            ...req.body,
            title: "New Posted TODO",
            completed: false,                // 从请求体获取title和completed
        };
        todos.push(newTodo);
        res.json(todos);              // 返回更新后的全部todos
    });

    // 添加DELETE请求处理
    app.delete("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        todos = todos.filter(t => t.id !== parseInt(id));
        res.sendStatus(200);  // 只返回成功状态
    });

    app.put("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        todos = todos.map(t => {
            if (t.id === parseInt(id)) {
                return { ...t, ...req.body };
            }
            return t;
        });
        res.sendStatus(200);
    });

    app.delete("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex(t => t.id === parseInt(id));
        if (todoIndex === -1) {
            return res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
        }
        todos.splice(todoIndex, 1);
        res.sendStatus(200);
    });
    
    app.put("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex(t => t.id === parseInt(id));
        if (todoIndex === -1) {
            return res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
        }
        todos = todos.map(t => t.id === parseInt(id) ? { ...t, ...req.body } : t);
        res.sendStatus(200);
    });

    
}