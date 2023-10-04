import { Router } from "express"
import User from "../models/user.js"
import passport from 'passport';


const router = Router()

router.get("/login",async (req, res) => {
    if (req.isAuthenticated())
        return res.redirect("/secrets")
    res.render("login.ejs")
})


router.post('/login', (req, res, next) => {
    if (req.isAuthenticated())
        return res.redirect("/secrets")
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.render('login.ejs', { err: 'Invalid username or password' });
      }
      req.login(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr); 
        }
        return res.redirect('/secrets');
      });
    })(req, res, next);
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/secrets');
});

router.get('/logout', (req, res) => {
    if (!req.isAuthenticated())
        return res.redirect("/login")
    req.logout((err)=>{
        res.redirect('/');
    });
});
export default router