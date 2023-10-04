import { Router } from "express"

const router = Router()

router.get("/",async (req, res) => {
    if (req.isAuthenticated())
        res.redirect("/secrets")
    res.render("home.ejs")
})

export default router