const express = require("express");
const multer = require("multer");
const uploadController = require("../controllers/upload.controller");
const fileFilter = require("../utils/fileFilter");

const router = express.Router();

const upload = multer({
  dest: "src/uploads/",
  fileFilter
});

router.post("/upload", upload.single("codebase"), uploadController.uploadZip);
router.post("/read-file", uploadController.readFile);
router.post("/explain", uploadController.explainFileAI);

module.exports = router;
