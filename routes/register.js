import { Router } from "express"
import User from "../models/user.js"
import passport from "passport"

const router = Router()
const saltRounds = 10;

router.get("/register",async (req, res) => {
    res.render("register.ejs")
})

router.post("/register",async (req, res) => {
    const {fname, username} = req.body;
    try{
        User.register(new User({fname, username}), req.body.password, (err, user) => {
            if (err) {
                console.error(err);
                res.redirect('/register')
            }
                passport.authenticate('local')(req, res, () => {
                    res.redirect('/secrets');
            });
        });
    }catch(err)
    {
        console.log(err.message)
        res.redirect("/register")
    }
 });

export default router