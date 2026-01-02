export async function readFile(filePath) {
  const res = await fetch("http://localhost:5000/api/read-file", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filePath })
  });

  return res.json();
}
