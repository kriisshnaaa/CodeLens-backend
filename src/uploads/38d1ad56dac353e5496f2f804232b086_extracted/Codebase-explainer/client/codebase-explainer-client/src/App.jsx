import { useEffect, useState } from "react";
import UploadBox from "./components/UploadBox";
import FolderTree from "./components/FolderTree";
import CodeViewer from "./components/CodeViewer";
import MyLearnings from "./components/MyLearnings";
import "./styles/theme.css";

export default function App() {
  const [tree, setTree] = useState(null);
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [view, setView] = useState("files");
  const [user, setUser] = useState(null);

  // fetch logged-in user
  useEffect(() => {
    fetch("http://localhost:5000/auth/me", {
      credentials: "include"
    })
      .then(res => (res.ok ? res.json() : null))
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  // 🔹 IMPORTANT: backend returns ARRAY
  const handleUploadSuccess = (uploadedTree) => {
    console.log("TREE RECEIVED:", uploadedTree);
    setTree(uploadedTree);
    setCode("");
    setExplanation("");
    setView("files");
  };

  const handleFileClick = async (filePath) => {
    console.log("READ FILE PATH:", filePath);

    const res = await fetch("http://localhost:5000/api/read-file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filePath })
    });

    const data = await res.json();
    setCode(data.content);
    setExplanation("");
  };

  const handleExplain = async () => {
    const res = await fetch("http://localhost:5000/api/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });

    const data = await res.json();
    setExplanation(data.explanation);
  };

  const handleLogout = async () => {
    await fetch("http://localhost:5000/auth/logout", {
      credentials: "include"
    });
    window.location.reload();
  };

  return (
    <div className="app-root">
      {/* HEADER */}
      <header className="app-header">
        <div>
          <h1>CodeLens</h1>
          <p>See through any codebase. Instantly.</p>
        </div>
        <span className="header-right">
          AI-powered code understanding
        </span>
      </header>

      {/* WORKSPACE */}
      <div className="workspace">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <h3>Workspace</h3>

          <button onClick={() => setView("files")}>Files</button>
          <button onClick={() => setView("mylearning")}>
            My Learnings
          </button>

          {user && (
            <div className="user-block">
              <strong>{user.name}</strong>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </aside>

        {/* CENTER PANEL */}
        <main className="main-panel">
          {view === "files" && (
            <>
              <UploadBox onUploadSuccess={handleUploadSuccess} />
              {Array.isArray(tree) && (
                <FolderTree
                  tree={tree}
                  onFileClick={handleFileClick}
                />
              )}
            </>
          )}

          {view === "mylearning" && <MyLearnings />}
        </main>

        {/* RIGHT PANEL */}
        <section className="right-panel">
          <CodeViewer
            code={code}
            explanation={explanation}
            onExplain={handleExplain}
          />
        </section>
      </div>
    </div>
  );
}
