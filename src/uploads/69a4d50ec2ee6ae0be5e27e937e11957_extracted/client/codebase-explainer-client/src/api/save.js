export async function saveLearning(data) {
  const res = await fetch("http://localhost:5000/save/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(data)
  });

  return res.json();
}

export async function getMyLearnings() {
  const res = await fetch("http://localhost:5000/save/my", {
    credentials: "include"
  });

  return res.json();
}
