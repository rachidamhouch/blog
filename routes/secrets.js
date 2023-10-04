import { Router } from "express"
import User from "../models/user.js"


const router = Router()

router.get("/secrets",async (req, res) => {
    const user = await User.find()
    if (req.isAuthenticated())
        res.render("secrets.ejs")
    else
        res.redirect("/login")
})

export default router