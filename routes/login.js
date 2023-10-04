import { Router } from "express"
import User from "../models/user.js"
import passport from 'passport';



const router = Router()

router.get("/login",async (req, res) => {
    res.render("login.ejs")
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/secrets',
    failureRedirect: '/login',
}));

router.get('/logout', (req, res) => {
    req.logout((err)=>{
        res.redirect('/');
    });
});
export default router