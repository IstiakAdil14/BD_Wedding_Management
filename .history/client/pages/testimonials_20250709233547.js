import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";

function decodeJwt(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const payload = parts[1];
