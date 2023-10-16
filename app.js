import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import session from "express-session"
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import findOrCreate from "mongoose-findorcreate"
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

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username, fname: user.fname });
    });
});
  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

passport.use(new LocalStrategy(User.authenticate()))
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_URL
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id, fname: profile.displayName}, function (err, user) {
      return cb(err, user);
    });
  }
));

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