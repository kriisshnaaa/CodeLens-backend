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
  req.logout(err => {
    if (err) {
      console.error("Logout error:", err);
    }
req.user=null;
    // 🔥 destroy session completely
    req.session.destroy(() => {
      // 🔥 clear session cookie
      res.clearCookie("connect.sid");

      // 🔁 redirect back to frontend
      res.redirect("http://localhost:5173");
    });
  });
});


router.get("/me", (req, res) => {
  console.log(req.user);
  res.json(req.user || null);
});

module.exports = router;
