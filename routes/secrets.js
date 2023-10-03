import { Router } from "express"

const router = Router()

router.get("/secrets",async (req, res) => {
    res.render("secrets.ejs")
})

export default router