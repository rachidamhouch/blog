import { Router } from "express"

const router = Router()

router.get("*", (req, res) => {
    res.render("404.ejs")
})

router.post("*", (req, res) => {
    res.render("404.ejs")
})

router.put("*", (req, res) => {
    res.render("404.ejs")
})

router.patch("*", (req, res) => {
    res.render("404.ejs")
})

router.delete("*", (req, res) => {
    res.render("404.ejs")
})

export default router