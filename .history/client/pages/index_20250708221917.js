
import React from "react";
import useSWR from "swr";
import HeroSection from "../components/HeroSection";
import ServicePackages from "../components/ServicePackages";
import EventGallery from "../components/EventGallery";
import Testimonials from "../components/Testimonials";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { isAuthenticated, loggingOut } = useAuth();

  const { data: heroData, error, mutate } = useSWR(
    "http://localhost:5000/home/hero-section",
    fetcher,
    { refreshWhenHidden: true, refreshWhenOffline: true }
  );

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
