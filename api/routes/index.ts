import Router from "express";
import dogRouter from "./dogs";
import temperamentRouter from "./temperament";
// const app : Application = express();
const cors = require('cors');
const app = Router()

app.use(cors())
app.use(Router.json())

app.use("/dog", dogRouter)
app.use("/temperament", temperamentRouter)


export default app