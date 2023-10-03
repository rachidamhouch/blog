import { Router } from "express"
import User from "../models/user.js"

const router = Router()

router.get("/secrets",async (req, res) => {
    const user = await User.find()
    res.render("secrets.ejs")
})

export default router