import { Router } from "express"
import User from "../models/user.js"
import bcrypt from "bcrypt"

const router = Router()
const saltRounds = 10;

router.get("/register",async (req, res) => {
    res.render("register.ejs")
})

router.post("/register",async (req, res) => {
    let pass
    bcrypt.hash(req.body.password, saltRounds, async(err, hash) => {
        const user = new User({
            fname: req.body.fname,
            username: req.body.username,
            password: hash
        })
        try{
            await user.save()
            res.redirect("/secrets")
        }catch(err)
        {
            console.log(err.message)
            res.redirect("/register")
        }
    });
})

export default router