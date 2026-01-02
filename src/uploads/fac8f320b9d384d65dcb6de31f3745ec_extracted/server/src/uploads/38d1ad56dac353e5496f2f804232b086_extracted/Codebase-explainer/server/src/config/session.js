const session = require("express-session");

module.exports = session({
  secret: "codebase-explainer-secret",
  resave: false,
  saveUninitialized: false
});
