const fileScanner=require("../services/fileScanner.service");

exports.uploadZip=(req,res)=>{
  const tree=fileScanner.scanZip(req.file.path);
  res.json(tree);
};
const path = require("path");
const fileReader = require("../services/fileReader.service");

exports.readFile = (req, res) => {
  const { filePath } = req.body;

  try {
    const content = fileReader.readFileContent(filePath);
    res.json({ content });
  } catch (err) {
    res.status(500).json({ message: "Cannot read file" });
  }
};
const aiService = require("../services/ai.service");

exports.explainFileAI = async (req, res) => {
  const { code } = req.body;

  try {
    const explanation = await aiService.explainCode(code);
    res.json({ explanation });
  } catch (err) {
  console.error("AI ERROR:", err);
  res.status(500).json({
    message: "AI explanation failed",
    error: err.message || err
  });
}

};
