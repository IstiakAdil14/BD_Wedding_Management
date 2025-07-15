import React from "react";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import { services } from "../services";

const ServiceDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const service = services.find((s) => s.id === parseInt(id));

  if (!service) {
    return <div className="min-h-screen flex items-center justify-center">Service not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <main className="flex-grow max-w-4xl mx-auto p-8 text-center">
