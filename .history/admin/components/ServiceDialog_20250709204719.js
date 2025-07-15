import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { FaPaintBrush, FaUtensils, FaCamera, FaMusic } from "react-icons/fa";

import React, { useState, useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { FaPaintBrush, FaUtensils, FaCamera, FaMusic } from "react-icons/fa";
import {
  Editor,
  EditorState,
  convertFromRaw,
  convertToRaw,
  RichUtils,
  Modifier,
  CompositeDecorator,
  getDefaultKeyBinding,
  KeyBindingUtil,
} from "draft-js";
import "draft-js/dist/Draft.css";

const INLINE_STYLES = [
  { label: "B", style: "BOLD", title: "Bold" },
  { label: "I", style: "ITALIC", title: "Italic" },
  { label: "U", style: "UNDERLINE", title: "Underline" },
  { label: "S", style: "STRIKETHROUGH", title: "Strikethrough" },
];

const BLOCK_TYPES = [
  { label: "UL", style: "unordered-list-item", title: "Unordered List" },
  { label: "OL", style: "ordered-list-item", title: "Ordered List" },
  { label: "Blockquote", style: "blockquote", title: "Blockquote" },
