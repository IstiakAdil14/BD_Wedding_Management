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
        <div className="w-16 h-16 text-pink-500 mb-6 mx-auto">{service.icon}</div>
        <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
        <p className="text-lg mb-6">{service.description}</p>
        <p className="text-pink-600 dark:text-pink-400 font-semibold text-xl">{service.price}</p>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetails;
