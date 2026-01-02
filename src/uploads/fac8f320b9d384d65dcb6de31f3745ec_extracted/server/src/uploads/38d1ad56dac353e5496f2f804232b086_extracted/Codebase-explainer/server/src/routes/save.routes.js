const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const saveController = require("../controllers/save.controller");

const router = express.Router();

router.post("/save", isAuthenticated, saveController.saveLearning);
router.get("/my", isAuthenticated, saveController.getMyLearnings);

module.exports = router;
