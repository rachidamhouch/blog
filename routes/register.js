import { Router } from "express"

const router = Router()

router.get("/register", (req, res) => {
    res.render("register.ejs")
})

router.post("/register", (req, res) => {
    res.render("register.ejs")
})

export default router