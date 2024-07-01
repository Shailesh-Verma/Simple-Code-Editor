import React, { useState, useRef, useEffect } from "react";
import { Highlight, themes } from "prism-react-renderer";
import "prismjs/themes/prism.css"; // Import Prism CSS for syntax highlighting styles

const CodeEditor = () => {
  const [code, setCode] = useState(""); // State to hold the code in the textarea
  const textareaRef = useRef(null); // Reference to access the textarea DOM element
  const preRef = useRef(null); // Reference to access the pre DOM element

  useEffect(() => {
    const textarea = textareaRef.current; // Reference to the textarea DOM element
    const pre = preRef.current; // Reference to the pre DOM element

    // Function to synchronize scrolling between textarea and pre elements
    const syncScroll = () => {
      if (textarea && pre) {
        const textareaScrollTop = textarea.scrollTop; // Current scroll position of textarea
        const textareaScrollHeight = textarea.scrollHeight; // Total height of scrollable content in textarea
        const textareaClientHeight = textarea.clientHeight; // Visible height of textarea

        const preScrollHeight = pre.scrollHeight; // Total height of scrollable content in pre
        const preClientHeight = pre.clientHeight; // Visible height of pre

        const textareaRatio =
          textareaScrollTop / (textareaScrollHeight - textareaClientHeight); // Ratio of scrolled position in textarea
        const preScrollTop =
          textareaRatio * (preScrollHeight - preClientHeight); // Corresponding scroll position in pre

        pre.scrollTop = preScrollTop; // calculated scroll position to pre
      }
    };

    if (textarea && pre) {
      textarea.addEventListener("scroll", syncScroll); // Add scroll event listener to textarea
      return () => {
        textarea.removeEventListener("scroll", syncScroll); // Clean up by removing event listener on unmount
      };
    }
  }, []); // Dependency array to ensure useEffect runs only once

  // Function to handle changes in textarea content
  const handleChange = (e) => {
    setCode(e.target.value); // Update the code state with the new textarea value
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "350px",
        overflow: "hidden",
      }}
    >
      {/* Textarea for user input */}
      <textarea
        ref={textareaRef} // Connect ref to textareaRef for DOM access
        value={code}
        onChange={handleChange}
        spellCheck="false"
        style={{
          width: "inherit", // Inherit width from parent container
          height: "inherit", // Inherit height from parent container
          fontSize: "16px",
          fontFamily: "monospace",
          padding: "10px",
          border: "2px solid black",
          background: "transparent",
          caretColor: "black",
          position: "absolute",
          top: 0,
          left: 0,
          resize: "none", // Disable resizing of textarea
          overflow: "auto", // Allow overflow with scrollbar
          whiteSpace: "pre", // Preserve whitespace
          outline: "none",
          color: "transparent",
          zIndex: 1, // Place above pre element
          boxSizing: "border-box",
        }}
      />
      {/* Pre element for displaying highlighted code */}
      <pre
        ref={preRef} // Connect ref to preRef for DOM access
        style={{
          padding: "10px",
          fontSize: "16px",
          fontFamily: "monospace",
          height: "inherit",
          width: "inherit",
          overflow: "auto", // Allow overflow with scrollbar
          position: "absolute",
          top: 0,
          left: 0,
          margin: 0,
          pointerEvents: "none", // Disable pointer events
          whiteSpace: "pre-wrap", // Wrap text at whitespace
          wordWrap: "break-word", // Break words if necessary
          zIndex: 0, // Place behind textarea
          boxSizing: "border-box",
        }}
      >
        {/* Highlight component for syntax highlighting */}
        <Highlight theme={themes.github} code={code} language="cpp">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </>
          )}
        </Highlight>
      </pre>
    </div>
  );
};

export default CodeEditor;
