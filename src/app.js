const express = require("express");
const cors = require("cors");
const passport = require("./config/passport");
const session = require("./config/session");
const saveRoutes = require("./routes/save.routes");
require("dotenv").config();
const uploadRoutes = require("./routes/upload.routes");
const authRoutes = require("./routes/auth.routes");
const chatRoutes=require("./routes/chat.routes");
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.set("trust proxy", 1);

app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use("/save", saveRoutes);

app.use("/api", uploadRoutes);
app.use("/auth", authRoutes);
app.use("/api", chatRoutes);

module.exports = app;
