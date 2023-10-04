import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import session from "express-session"
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import homeRouter from "./routes/home.js"
import errorRouter from "./routes/404.js"
import loginRouter from "./routes/login.js"
import registerRouter from "./routes/register.js"
import secretsRouter from "./routes/secrets.js"
import submitRouter from "./routes/submit.js"
import User from "./models/user.js"
import {config} from "dotenv"

config()

const app = express()
const port = 3000

await mongoose.connect(process.env.DB)

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.use(new LocalStrategy(User.authenticate()))

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.use("/", homeRouter)
app.use("/", loginRouter)
app.use("/", registerRouter)
app.use("/", secretsRouter)
app.use("/", submitRouter)


app.use("/", errorRouter)
app.listen(port, () => {
    console.log(`Server runing in ${port}`)
})