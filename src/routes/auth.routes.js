const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // 🔐 create JWT
    const token = jwt.sign(
      {
        id: req.user.id
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔁 redirect to frontend with token
    res.redirect(
      `${process.env.CLIENT_URL}/auth/success?token=${token}`
    );
  }
);

router.get("/logout", (req, res) => {
  // frontend will handle logout (token removal)
  res.redirect(process.env.CLIENT_URL);
});


const auth = require("../middlewares/auth");

router.get("/me", auth, async(req, res) => {
  console.log("JWT decoded user:", req.user);
  const user = await User.findByPk(req.user.id, {
    attributes: ["id", "name", "email", "avatar"]
  });
  res.json(req.user); 
});

module.exports = router;
