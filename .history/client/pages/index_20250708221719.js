import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import HeroSection from "../components/HeroSection";
import ServicePackages from "../components/ServicePackages";
import EventGallery from "../components/EventGallery";
import Testimonials from "../components/Testimonials";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { isAuthenticated, loggingOut } = useAuth();

  const [heroData, setHeroData] = useState(null);

  const router = useRouter();

  async function fetchHeroData() {
    try {
      const res = await fetch("http://localhost:5000/home/hero-section");
      if (res.ok) {
        const data = await res.json();
        setHeroData(data);
      } else {
        console.error("Failed to fetch hero section data");
      }
    } catch (error) {
      console.error("Error fetching hero section data:", error);
    }
  }

  useEffect(() => {
    fetchHeroData();

    const handleRouteChange = (url) => {
      if (url === "/") {
        fetchHeroData();
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <div
        className={loggingOut ? "blur-sm pointer-events-none select-none" : ""}
      >
        <HeroSection heroData={heroData} />
        <ServicePackages />
        <EventGallery />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
}
