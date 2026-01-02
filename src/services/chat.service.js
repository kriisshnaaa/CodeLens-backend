const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY
});

exports.chatAboutCode = async ({ code, explanation, question }) => {
  const response = await cohere.chat({
    message: `
You are a friendly senior software engineer helping a developer.

Context:
Code:
${code.slice(0, 3000)}

Existing explanation:
${explanation.slice(0, 1500)}

User question:
"${question}"

Answer in a friendly, clear, human tone.
Use examples when helpful.
Avoid repeating the full explanation.
`,
    temperature: 0.5
  });

  return response.text;
};
