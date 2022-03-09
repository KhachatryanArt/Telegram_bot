require("dotenv").config()
const Koa = require("koa");
const app = new Koa();
const bot = require("./src/routers/botRouter")
const koaBody = require("koa-body");

app.use(koaBody());


app.listen(process.env.PORT, () => {
    console.log("Server start!");
});
