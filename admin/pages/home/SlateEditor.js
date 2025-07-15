import React, { useCallback, useMemo, useState, useEffect } from "react";
import { createEditor, Transforms, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";

const SlateEditor = ({ value, onChange, darkMode }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  // Initialize editor value from prop
  const [editorValue, setEditorValue] = useState(() => {
    try {
      return value && value.length > 0 ? JSON.parse(value) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (value) {
      try {
        const parsed = JSON.parse(value);
        setEditorValue(parsed);
      } catch {
        setEditorValue(initialValue);
      }
    }
  }, [value]);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />;
  }, []);

  const onEditorChange = newValue => {
    setEditorValue(newValue);
    if (onChange) {
      onChange(JSON.stringify(newValue));
    }
  };

  return (
    <Slate editor={editor} value={editorValue} onChange={onEditorChange}>
      <Editable
        renderLeaf={renderLeaf}
        placeholder="Enter about us content..."
        spellCheck
        autoFocus
        style={{
          minHeight: "150px",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor: darkMode ? "#374151" : "white",
          color: darkMode ? "white" : "black",
        }}
      />
    </Slate>
  );
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  return <span {...attributes}>{children}</span>;
};

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default SlateEditor;
