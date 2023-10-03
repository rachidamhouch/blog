import { Router } from "express"
import User from "../models/user.js"

const router = Router()

router.get("/register",async (req, res) => {
    res.render("register.ejs")
})

router.post("/register",async (req, res) => {
    const user = new User({
        fname: req.body.fname,
        username: req.body.username,
        password: req.body.password
    })
    try{
        await user.save()
        res.redirect("/secrets")
    }catch(err)
    {
        console.log(err.message)
        res.redirect("/register")
    }
})

export default router