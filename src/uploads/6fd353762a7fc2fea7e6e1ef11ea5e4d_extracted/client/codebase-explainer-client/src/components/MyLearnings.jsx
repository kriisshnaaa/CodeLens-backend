import { useEffect, useState } from "react";

function MyLearning() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/save/my", {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setItems([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading saved learnings...</p>;

  if (items.length === 0) {
    return <p>No saved learnings found.</p>;
  }

  return (
    <div>
      <h3>My Learnings</h3>

      <ul>
        {items.map(item => (
          <li
            key={item.id}
            style={{ cursor: "pointer", marginBottom: 8 }}
            onClick={() => setSelected(item)}
          >
            📄 Saved Explanation
          </li>
        ))}
      </ul>

      {selected && (
        <>
          <h4>Code</h4>
          <pre style={{ background: "#f4f4f4", padding: 10 }}>
            {selected.code}
          </pre>

          <h4>Explanation</h4>
          <p>{selected.explanation}</p>
        </>
      )}
    </div>
  );
}

export default MyLearning;
