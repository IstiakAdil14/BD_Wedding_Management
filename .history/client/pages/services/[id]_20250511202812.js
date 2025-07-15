import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaPaintBrush, FaUtensils, FaCamera, FaMusic } from "react-icons/fa";
import Footer from "../../components/Footer";

const iconMap = {
  FaPaintBrush: <FaPaintBrush className="w-16 h-16 text-pink-500 mb-6 mx-auto" />,
  FaUtensils: <FaUtensils className="w-16 h-16 text-pink-500 mb-6 mx-auto" />,
  FaCamera: <FaCamera className="w-16 h-16 text-pink-500 mb-6 mx-auto" />,
  FaMusic: <FaMusic className="w-16 h-16 text-pink-500 mb-6 mx-auto" />,
};

const ServiceDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchService = async () => {
      try {
