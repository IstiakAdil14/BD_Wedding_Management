<<<<<<< import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { MdSend as SendIcon } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
=======

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { MdSend as SendIcon } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
>>>>>>> import React, { useState, useRef, useEffect } from "react";

<<<<<<< const Contact = () => {
  const { email: authEmail } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: authEmail || "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileName, setProfileName] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (authEmail) {
      const fetchProfileData = async () => {
        try {
          const res = await fetch(
            `/api/auth/client-personal-details?email=${encodeURIComponent(
              authEmail
            )}`
          );
          if (!res.ok) {
            throw new Error("Failed to fetch profile data");
          }
          const data = await res.json();
          setProfileName(data.fullName || "");
          setFormData((prev) => ({
            ...prev,
            name: data.fullName || "",
            email: authEmail,
          }));
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
      fetchProfileData();
    }
  }, [authEmail]);
=======
const Contact = () => {
  const { email: authEmail } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: authEmail || "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    location: "",
    mapEmbedUrl: "",
  });
  const scrollRef = useRef(null);

  useEffect(() => {
    // Fetch contact info and social links from API
    const fetchContactInfo = async () => {
      try {
        const res = await fetch("/api/homepage");
        if (!res.ok) {
          throw new Error("Failed to fetch contact info");
        }
        const data = await res.json();
        setContactInfo({
          phone: data.contactInfo.phoneNumbers ? data.contactInfo.phoneNumbers[0] : "",
          email: data.contactInfo.email || "",
          location: data.contactInfo.officeLocation || "",
          mapEmbedUrl: data.contactInfo.mapEmbedUrl || "",
        });
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };
    fetchContactInfo();
  }, []);

  useEffect(() => {
    if (authEmail) {
      const fetchProfileData = async () => {
        try {
          const res = await fetch(
            `/api/auth/client-personal-details?email=${encodeURIComponent(
              authEmail
            )}`
          );
          if (!res.ok) {
            throw new Error("Failed to fetch profile data");
          }
          const data = await res.json();
          setProfileName(data.fullName || "");
          setFormData((prev) => ({
            ...prev,
            name: data.fullName || "",
            email: authEmail,
          }));
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
      fetchProfileData();
    }
  }, [authEmail]);
>>>>>>> const Contact = () => {

<<<<<<<           <p>
                <strong>Phone:</strong> +880 1234 567890
              </p>
              <p>
                <strong>Email:</strong> info@bdweddingplanner.com
              </p>
              <p>
                <strong>Location:</strong> Sylhet, Bangladesh
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <iframe
                title="BD Wedding Planner Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0000000000005!2d91.87000000000001!3d24.894999999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0b0b0b0b0b1%3A0x123456789abcdef!2sSylhet%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
                className="border-0"
              ></iframe>
            </div>
          </div>
        </div>
      </motion.main>
=======
          <p>
            <strong>Phone:</strong> +880 1234 567890
          </p>
          <p>
            <strong>Email:</strong> info@bdweddingplanner.com
          </p>
          <p>
            <strong>Location:</strong> Sylhet, Bangladesh
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <iframe
            title="BD Wedding Planner Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0000000000005!2d91.87000000000001!3d24.894999999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0b0b0b0b0b1%3A0x123456789abcdef!2sSylhet%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
            width="100%"
            height="300"
            allowFullScreen=""
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </div>
    </div>
  </motion.main>
>>>>>>>           <p>
                <strong>Phone:</strong> +880 1234 567890

<<<<<<<           <p>
                <strong>Phone:</strong> {contactInfo.phone}
              </p>
              <p>
                <strong>Email:</strong> {contactInfo.email}
              </p>
              <p>
                <strong>Location:</strong> {contactInfo.location}
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              {contactInfo.mapEmbedUrl ? (
                <iframe
                  title="BD Wedding Planner Location"
                  src={contactInfo.mapEmbedUrl}
                  width="100%"
                  height="300"
                  allowFullScreen=""
                  loading="lazy"
                  className="border-0"
                ></iframe>
              ) : (
                <p className="p-6 text-center text-gray-500">
                  Map is not available.
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.main>
>>>>>>>           <p>
                <strong>Phone:</strong> +880 1234 567890
