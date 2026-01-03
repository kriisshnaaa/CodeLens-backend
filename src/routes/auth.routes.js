const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.redirect(
      `${process.env.CLIENT_URL}/auth/success?token=${token}`
    );
  }
);

router.get("/logout", (req, res) => {
  res.redirect(process.env.CLIENT_URL);
});

router.get("/me", auth, async (req, res) => {
  try {
    console.log("JWT decoded user:", req.user);

    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "avatar"]
    });

    res.json(user);
  } catch (err) {
    console.error("Auth /me error:", err);
    res.status(500).json(null);
  }
});

module.exports = router;
