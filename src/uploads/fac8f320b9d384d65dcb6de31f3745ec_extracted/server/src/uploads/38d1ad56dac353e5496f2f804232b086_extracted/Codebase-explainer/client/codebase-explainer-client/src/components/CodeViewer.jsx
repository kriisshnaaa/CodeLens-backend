function CodeViewer({ code, explanation, onExplain }) {
  return (
    <div>
      <h3>Code</h3>
      <pre style={{ background: "#f5f5f5", padding: 10 }}>
        {code || "Select a file"}
      </pre>

      {code && (
        <>
          <button onClick={onExplain}>Explain with AI</button>

          {explanation && (
            <>
              <h3>Explanation</h3>
              <p>{explanation}</p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default CodeViewer;
