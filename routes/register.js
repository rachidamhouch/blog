import { Router } from "express"
import User from "../models/user.js"
import passport from "passport"

const router = Router()
const saltRounds = 10;

router.get("/register",async (req, res) => {
    if (req.isAuthenticated())
        return res.redirect("/secrets")
    res.render("register.ejs")
})

router.post("/register",async (req, res) => {
    if (req.isAuthenticated())
        return res.redirect("/secrets")
    try{
        const {fname, username} = req.body;
        User.register(new User({fname, username}), req.body.password, (err, user) => {
            if (err) {
                res.render('register.ejs', {err: err.message})
            }
                passport.authenticate('local')(req, res, () => {
                    res.redirect('/secrets');
            });
        });
    }catch(err)
    {
        res.render("register.ejs", {err: err.message})
    }
 });

export default router