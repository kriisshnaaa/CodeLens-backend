const express = require("express");
const auth = require("../middlewares/auth");
const saveController = require("../controllers/save.controller");

const router = express.Router();

router.post("/save", auth, saveController.saveLearning);
router.get("/my", auth, saveController.getMyLearnings);

module.exports = router;
