import { Router } from "express"
import Secret from "../models/secret.js"


const router = Router()

router.get("/secrets",async (req, res) => {
    if (req.isAuthenticated())
        res.render("secrets.ejs", {fname: req.user.fname, secrets: await Secret.find()})
    else
        res.redirect("/login")
})

export default router