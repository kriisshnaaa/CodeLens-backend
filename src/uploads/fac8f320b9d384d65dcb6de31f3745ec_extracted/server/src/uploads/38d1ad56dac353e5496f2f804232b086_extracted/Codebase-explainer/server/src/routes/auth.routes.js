const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173",
    failureRedirect: "/login"
  })
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    
    res.redirect("http://localhost:5173");
  });
});

router.get("/me", (req, res) => {
  res.json(req.user || null);
});

module.exports = router;
