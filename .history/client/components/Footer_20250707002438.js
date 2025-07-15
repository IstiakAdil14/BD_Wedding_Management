import React, { useEffect, useState } from "react";

const Footer = () => {
  const [aboutUs, setAboutUs] = useState("");
  const [contactInfo, setContactInfo] = useState({
    address: "",
    email: "",
    phone: "",
  });
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
