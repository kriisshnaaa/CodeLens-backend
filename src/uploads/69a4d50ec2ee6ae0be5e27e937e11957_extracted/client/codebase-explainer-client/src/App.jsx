import { useEffect, useState } from "react";
import UploadBox from "./components/UploadBox";
import FolderTree from "./components/FolderTree";
import CodeViewer from "./components/CodeViewer";
import MyLearnings from "./components/MyLearnings";
import "./styles/theme.css";

function App() {
  const [files, setFiles] = useState(null);
  const [selectedFilePath, setSelectedFilePath] = useState("");
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [user, setUser] = useState(null);
  const [view, setView] = useState("files");
  const [darkMode, setDarkMode] = useState(false);

  /* ---------------- THEME ---------------- */
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  /* ---------------- AUTH ---------------- */
  useEffect(() => {
    fetch("http://localhost:5000/auth/me", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = () => {
    window.location.href = "http://localhost:5000/auth/logout";
  };

  /* ---------------- UPLOAD ---------------- */
  const handleUploadSuccess = (tree) => {
    setFiles(tree);
    setCode("");
    setExplanation("");
  };

  /* ---------------- FILE READ ---------------- */
  const handleFileClick = async (filePath) => {
    setSelectedFilePath(filePath);

    const res = await fetch("http://localhost:5000/api/read-file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filePath })
    });

    const data = await res.json();
    setCode(data.content);
    setExplanation("");
  };

  /* ---------------- AI ---------------- */
  const handleExplain = async () => {
    const res = await fetch("http://localhost:5000/api/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });

    const data = await res.json();
    setExplanation(data.explanation);
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = async () => {
    await fetch("http://localhost:5000/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        filePath: selectedFilePath,
        code,
        explanation
      })
    });
  };

  return (
    <div className="app-root">

      {/* HEADER */}
      <header className="app-header">
        <div>
          <h1>CodeLens</h1>
          <p>See through any codebase. Instantly.</p>
        </div>

        <div className="header-right">
          {user ? (
            <div className="user-info">
              <img src={user.avatar} alt="avatar" />
              <span>{user.name}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <a href="http://localhost:5000/auth/google">
              <button>Login with Google</button>
            </a>
          )}
        </div>
      </header>

      {/* MAIN GRID */}
      <div className="workspace-grid">

        {/* LEFT PANEL */}
        <aside className="left-panel">
          <h3>Workspace</h3>
          <button onClick={() => setView("files")}>Files</button>
          <button onClick={() => setView("learnings")}>My Learnings</button>
          <button onClick={() => setDarkMode(prev => !prev)}>
            {darkMode ? "☀ Light mode" : "🌙 Dark mode"}
          </button>
        </aside>

        {/* CENTER PANEL */}
        <main className="center-panel">
          {view === "files" && (
            <>
              {!files && (
                <div className="empty-center">
                  <div className="upload-card">
                    <UploadBox onUploadSuccess={handleUploadSuccess} />
                  </div>
                  <p className="hint-text">
                    Upload a ZIP project to explore files and generate AI explanations.
                  </p>
                </div>
              )}

              {files && (
                <div className="files-section">
                  <div className="upload-card small">
                    <UploadBox onUploadSuccess={handleUploadSuccess} />
                  </div>

                  <div className="tree-card">
                    <FolderTree
                      tree={files}
                      onFileClick={handleFileClick}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {view === "learnings" && <MyLearnings />}
        </main>

        {/* RIGHT PANEL */}
        <aside className="right-panel">
          <CodeViewer
            code={code}
            explanation={explanation}
            onExplain={handleExplain}
            onSave={handleSave}
          />
        </aside>

      </div>
    </div>
  );
}

export default App;
