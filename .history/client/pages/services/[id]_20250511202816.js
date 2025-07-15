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
        const res = await fetch(`/api/services/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch service");
        }
        const data = await res.json();
        setService(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!service) return <div className="min-h-screen flex items-center justify-center">Service not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <main className="flex-grow max-w-4xl mx-auto p-8 text-center">
        {iconMap[service.iconName] || null}
        <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
        <p className="text-lg mb-6">{service.description}</p>
        <p className="text-pink-600 dark:text-pink-400 font-semibold text-xl">{service.price}</p>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetails;
