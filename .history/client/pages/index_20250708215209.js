import React from "react";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import HeroSection from "../components/HeroSection";
import ServicePackages from "../components/ServicePackages";
import EventGallery from "../components/EventGallery";
import Testimonials from "../components/Testimonials";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default function Home() {
  const { isAuthenticated, loggingOut } = useAuth();

  return (
    <>
      <div
        className={loggingOut ? "blur-sm pointer-events-none select-none" : ""}
      >
        <HeroSection
          Editor={Editor}
          EditorState={EditorState}
          convertFromRaw={convertFromRaw}
        />
        <ServicePackages
          Editor={Editor}
          EditorState={EditorState}
          convertToRaw={convertToRaw}
          convertFromRaw={convertFromRaw}
        />
        <EventGallery />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
}
