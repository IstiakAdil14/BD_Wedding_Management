import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";
