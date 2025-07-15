import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const { email } = router.query;

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      setError("Email is required to register.");
    }
  }, [email]);

  const handleSubmit = async (e) => {
};

export default Register;
