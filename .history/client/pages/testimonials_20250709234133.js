import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

import dynamic from "next/dynamic";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

function decodeJwt(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const payload = parts[1];
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  // Add padding if missing
  const paddedBase64 = base64.padEnd(
