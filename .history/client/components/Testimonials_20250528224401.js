import React, { useEffect, useState } from "react";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/testimonials");
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
        <div className="flex space-x-6 overflow-x-scroll pb-4 scrollbar-none">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center w-[300px] flex-shrink-0"
            >
              <img
                src={testimonial.clientImage || "/default-profile.png"}
                alt={testimonial.clientName}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <p className="italic text-gray-700 dark:text-gray-300 mb-4">
                "{testimonial.message}"
              </p>
              <h3 className="text-xl font-semibold text-pink-700 dark:text-pink-200">
                {testimonial.clientName}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
