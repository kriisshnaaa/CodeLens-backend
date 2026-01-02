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
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login"
  })
);

router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) {
      console.error("Logout error:", err);
    }

    // destroy session completely
    req.session.destroy(() => {
      // clear session cookie
      res.clearCookie("connect.sid");

      // redirect back to frontend
      res.redirect(process.env.CLIENT_URL);
    });
  });
});

router.get("/me", (req, res) => {
  res.json(req.user || null);
});

module.exports = router;
