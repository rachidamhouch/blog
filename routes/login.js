import { Router } from "express"
import userModel from "../models/user.js"

const router = Router()

router.get("/login",async (req, res) => {
    res.render("login.ejs")
})

router.post("/login",async (req, res) => {
    res.render("login.ejs")
})

export default router