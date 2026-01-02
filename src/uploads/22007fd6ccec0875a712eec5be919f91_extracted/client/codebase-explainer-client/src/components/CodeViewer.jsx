import React from "react";

function CodeViewer({ code, explanation, onExplain, onSave }) {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>

      <h3 className="panel-title">Code</h3>

      {!code && (
        <div className="empty-code">
          Select a file from the tree to view code
        </div>
      )}

      {code && (
        <>
          <pre className="code-block">
            {code}
          </pre>

          <div className="code-actions">
            <button className="primary-btn" onClick={onExplain}>
              Explain with AI
            </button>

            <button className="secondary-btn" onClick={onSave}>
              Save Learning
            </button>
          </div>
        </>
      )}

      {explanation && (
        <>
          <h3 className="panel-title">AI Explanation</h3>
          <div className="explanation-box">
            {explanation}
          </div>
        </>
      )}

    </div>
  );
}

export default CodeViewer;
