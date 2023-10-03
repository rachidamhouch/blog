import { Router } from "express"

const router = Router()

router.get("/secrets", (req, res) => {
    res.render("secrets.ejs")
})

export default router