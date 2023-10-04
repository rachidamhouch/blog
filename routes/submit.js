import { Router } from "express"
import Secret from "../models/secret.js"


const router = Router()

router.get("/submit",async (req, res) => {
    res.render("submit.ejs")
})

router.post("/submit",async (req, res) => {
    if (req.isAuthenticated())
    {
        const secret = new Secret({
        msg: req.body.secret,
        uid: req.user.username
        })
        try{
            await secret.save()
            res.redirect("/secrets")
        }catch(err){
            console.log(err.message)
            res.redirect("/submit")
        }
    }
    else
        res.redirect("/login")
    
})
export default router