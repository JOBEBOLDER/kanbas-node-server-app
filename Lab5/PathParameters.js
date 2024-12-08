export default function PathParameters(app) {
    // 加法路由
    app.get("/lab5/add/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const result = parseInt(a) + parseInt(b);
        // 直接返回结果，不要设置任何头部
        res.send(result.toString());
    });

    // 减法路由
    app.get("/lab5/subtract/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const result = parseInt(a) - parseInt(b);
        res.send(result.toString());
    });

    // 乘法路由
    app.get("/lab5/multiply/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const result = parseInt(a) * parseInt(b);
        res.send(result.toString());
    });

    // 除法路由
    app.get("/lab5/divide/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const result = parseInt(a) / parseInt(b);
        res.send(result.toString());
    });
}