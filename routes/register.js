import { Router } from "express"
import userModel from "../models/user.js"


const router = Router()

router.get("/register",async (req, res) => {
    res.render("register.ejs")
})

router.post("/register",async (req, res) => {
    const User = new userModel({
        fname: req.body.fname,
        username: req.body.username,
        password: req.body.password
    })
    await User.save()
    res.redirect("/secrets")
})

export default router