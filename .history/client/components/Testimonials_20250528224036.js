import React, { useEffect, useState } from "react";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        if (res.ok) {
          const data = await res.json();
          // Filter testimonials to only those with display=true
          const displayedTestimonials = data.filter(t => t.display);
          setTestimonials(displayedTestimonials);
        } else {
          console.error("Failed to fetch testimonials");
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6 text-center text-pink-700 dark:text-pink-300">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
