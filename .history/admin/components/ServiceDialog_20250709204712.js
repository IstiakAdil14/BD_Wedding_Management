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
