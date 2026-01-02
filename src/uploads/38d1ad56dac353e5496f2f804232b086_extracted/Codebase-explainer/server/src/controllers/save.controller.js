const SavedLearning = require("../models/SavedLearning");

exports.saveLearning = async (req, res) => {
  console.log("SAVE API HIT");
  console.log("req.user =", req.user);

  const { projectName, filePath, explanation } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const saved = await SavedLearning.create({
      userId: req.user.id,
      projectName,
      filePath,
      explanation
    });

    res.json(saved);
  } catch (err) {
    console.error("SAVE ERROR:", err);
    res.status(500).json({ message: "Failed to save learning" });
  }
};

exports.getMyLearnings = async (req, res) => {
  console.log("GET MY LEARNINGS HIT");
  console.log("req.user =", req.user);

  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const learnings = await SavedLearning.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]]
    });

    res.json(learnings);
  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({ message: "Failed to fetch learnings" });
  }
};
