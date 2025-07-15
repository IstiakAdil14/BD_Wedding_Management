import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

import React, { useState, useEffect } from "react";

const PortfolioCategoryDialog = ({ isOpen, onClose, onSave, category }) => {
  const [name, setName] = useState("");
