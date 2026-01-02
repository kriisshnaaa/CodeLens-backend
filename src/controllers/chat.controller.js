const chatService = require("../services/chat.service");

exports.chat = async (req, res) => {
  const { code, explanation, question } = req.body;

  if (!question) {
    return res.status(400).json({ message: "Question required" });
  }

  try {
    const answer = await chatService.chatAboutCode({
      code,
      explanation,
      question
    });

    res.json({ answer });
  } catch (err) {
    console.error("CHAT ERROR:", err);
    res.status(500).json({ message: "Chat failed" });
  }
};
