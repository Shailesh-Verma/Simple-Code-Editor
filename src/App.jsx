import React from "react";
import CodeEditor from "./CodeEditor";

const App = () => {
  return (
    <>
    <div className="main-container">
      <h1 className="title">react-simple-code-editor</h1>
      <p className="sub-title">A simple no-frills code editor with syntax highlighting.</p>
      <button className="btn-github">GitHub</button>
    </div>
    <CodeEditor />
    </>
  );
};

export default App;
