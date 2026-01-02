const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY
});

exports.explainCode = async (code) => {
  // Prevent payload / token limit issues
  const safeCode = code.slice(0, 3500);

  const response = await cohere.chat({
    // DO NOT hardcode deprecated models
    message: `
You are a senior software engineer and mentor.

Explain the following source code in a clear, beginner-friendly way.

Explain:
1. What this file does
2. How the main logic works
3. Important functions or components
4. How it fits into a larger project

Code:
${safeCode}
`,
    temperature: 0.3
  });

  // Post-Sept-15 response format
  return response.text;
};
