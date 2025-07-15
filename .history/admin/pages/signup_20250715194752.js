import React, { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { DarkModeContext } from "../context/DarkModeContext";

const AdminSignup = () => {
  const router = useRouter();
  const { darkMode } = useContext(DarkModeContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
