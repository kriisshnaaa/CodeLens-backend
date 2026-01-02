export async function explainCode(code) {
  const res = await fetch("http://localhost:5000/api/explain", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code })
  });

  if (!res.ok) {
    throw new Error("Failed to get explanation");
  }

  return res.json();
}
