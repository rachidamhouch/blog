import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import session from "express-session"
import passport from "passport"
import passportLocalMongoose from "passport-local-mongoose"
import homeRouter from "./routes/home.js"
import errorRouter from "./routes/404.js"
import loginRouter from "./routes/login.js"
import registerRouter from "./routes/register.js"
import secretsRouter from "./routes/secrets.js"
import {config} from "dotenv"

config()

const app = express()
const port = 3000

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
await mongoose.connect("mongodb://localhost/blog")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.use("/", homeRouter)
app.use("/", loginRouter)
app.use("/", registerRouter)
app.use("/", secretsRouter)


app.use("/", errorRouter)
app.listen(port, () => {
    console.log(`Server runing in ${port}`)
})