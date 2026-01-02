const express = require("express");
const cors = require("cors");
const passport = require("./config/passport");
const session = require("./config/session");
const saveRoutes = require("./routes/save.routes");

const uploadRoutes = require("./routes/upload.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use("/save", saveRoutes);

app.use("/api", uploadRoutes);
app.use("/auth", authRoutes);

module.exports = app;
