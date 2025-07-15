import { useState, useEffect, useCallback, useContext } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../context/DarkModeContext";
import ManagementMenu from "../components/ManagementMenu";
import HamburgerMenu from "../components/HamburgerMenu";
import HorizontalCardScroller from "../components/HorizontalCardScroller";

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default function HomeManagement() {
  const { darkMode } = useContext(DarkModeContext);
  const width = useWindowWidth();

  const [mounted, setMounted] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState("Hero Section");

  // Add state to control hamburger menu open/close
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Save handler to send data to backend
  async function handleSave() {
    try {
      const formData = new FormData();
      formData.append("heroTitle", heroTitle);
      formData.append("heroSubtitle", heroSubtitle);
      formData.append("heroCTA", heroCTA);
      formData.append("highlightServices", JSON.stringify(highlightServices));
      formData.append("featuredPortfolio", JSON.stringify(featuredPortfolio));
      if (heroVideo) {
        formData.append("backgroundVideo", heroVideo);
      }
      if (bannerImage) {
        formData.append("bannerImage", bannerImage);
      }
      formData.append("aboutUs", aboutUs);
      formData.append("quickLinks", JSON.stringify(quickLinks));
      formData.append("contactInfo", JSON.stringify(contactInfo));
      formData.append("socialLinks", JSON.stringify(socialLinks));
      formData.append("eventGallery", JSON.stringify(images));

      // Console log the form data entries for debugging
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      const response = await fetch("http://localhost:5000/home", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Home page data saved successfully");
      } else {
        alert("Failed to save home page data");
      }
    } catch (error) {
      console.error("Error saving home page data:", error);
      alert("Error saving home page data");
    }
  }

  // Save testimonials to backend
  async function handleSaveTestimonials() {
    try {
      for (const testi of testimonials) {
        const response = await fetch("http://localhost:5000/api/testimonials", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientName: testi.name,
            message: testi.message,
            clientImage: testi.photo,
            display: true,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to save testimonial");
        }
      }
      alert("Testimonials saved successfully");
    } catch (error) {
      console.error("Error saving testimonials:", error);
      alert("Error saving testimonials");
    }
  }

  const handleSavePackages = async () => {
    try {
      const response = await fetch("http://localhost:5000/home/save-packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ packages }),
      });
      if (response.ok) {
        alert("Service packages saved successfully");
      } else {
        alert("Failed to save service packages");
      }
    } catch (error) {
      console.error("Error saving service packages:", error);
      alert("Error saving service packages");
    }
  };

  const handleSaveGallery = async () => {
    try {
      const formData = new FormData();
      images.forEach((img, index) => {
        if (img.file) {
          formData.append("galleryImages", img.file);
        }
      });
      // Optionally send categories or other metadata if needed
      // formData.append('category', 'some category');

      const response = await fetch("http://localhost:5000/home/save-gallery", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Event gallery saved successfully");
      } else {
        alert("Failed to save event gallery");
      }
    } catch (error) {
      console.error("Error saving event gallery:", error);
      alert("Error saving event gallery");
    }
  };

  const saveSingleImage = async (index) => {
    try {
      const img = images[index];
      const formData = new FormData();
      if (img.file) {
        formData.append("galleryImages", img.file);
      } else if (img.src) {
        // If no file object, send the src URL as text
        formData.append("imageUrl", img.src);
      }
      formData.append("category", img.category);

      const response = await fetch("http://localhost:5000/home/save-gallery", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert(`Image ${index + 1} saved successfully`);
      } else {
        alert(`Failed to save image ${index + 1}`);
      }
    } catch (error) {
      console.error(`Error saving image ${index + 1}:`, error);
      alert(`Error saving image ${index + 1}`);
    }
  };

  // Save content of this file locally
  const handleSaveFileContent = () => {
    try {
      const fileContent = `import { useState, useEffect, useCallback, useContext } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../context/DarkModeContext";
import ManagementMenu from "../components/ManagementMenu";
import HamburgerMenu from "../components/HamburgerMenu";
import HorizontalCardScroller from "../components/HorizontalCardScroller";

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default function HomeManagement() {
  const { darkMode } = useContext(DarkModeContext);
  const width = useWindowWidth();

  // Save handler to send data to backend
  async function handleSave() {
    // ... existing save logic ...
  }

  // ... rest of the component code ...
}

`;

      const blob = new Blob([fileContent], {
        type: "text/plain;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "home.js";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      alert("File content saved as home.js");
    } catch (error) {
      alert("Failed to save file content");
    }
  };

  // Hero Section State
  const [heroTitle, setHeroTitle] = useState("BD Wedding Planner");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Your dream wedding, perfectly planned and beautifully executed."
  );
  const [heroCTA, setHeroCTA] = useState("Explore Our Services");
  const [heroVideo, setHeroVideo] = useState(null);
  const [heroVideoURL, setHeroVideoURL] = useState(
    "https://cdn.pixabay.com/video/2022/10/23/136132-764371500_tiny.mp4"
  );

  // New state for banner image and highlightServices, featuredPortfolio to match backend model
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerImageURL, setBannerImageURL] = useState("");
  const [highlightServices, setHighlightServices] = useState([]);
  const [featuredPortfolio, setFeaturedPortfolio] = useState([]);

  const handleHeroVideoChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        if (heroVideoURL) URL.revokeObjectURL(heroVideoURL);
        setHeroVideo(file);
        setHeroVideoURL(URL.createObjectURL(file));
      }
    },
    [heroVideoURL]
  );

  // Service Packages State
  const [packages, setPackages] = useState([
    {
      id: 1,
      title: "Basic Wedding Package",
      description:
        "Includes venue decoration, photography, and catering for up to 100 guests.",
      price: "BDT 50,000",
      iconName: "",
      enabled: true,
    },
    {
      id: 2,
      title: "Premium Wedding Package",
      description:
        "Includes all Basic features plus live music, bridal makeup, and luxury transport.",
      price: "BDT 1,20,000",
      iconName: "",
      enabled: true,
    },
    {
      id: 3,
      title: "Ultimate Wedding Package",
      description:
        "Full wedding planning, premium venue, entertainment, and personalized services.",
      price: "BDT 2,50,000",
      iconName: "",
      enabled: true,
    },
    {
      id: 4,
      title: "Customize Package",
      description: "",
      price: "",
      iconName: "",
      enabled: true,
    },
  ]);

  // Handler for banner image change
  const handleBannerImageChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        if (bannerImageURL) URL.revokeObjectURL(bannerImageURL);
        setBannerImage(file);
        setBannerImageURL(URL.createObjectURL(file));
      }
    },
    [bannerImageURL]
  );

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Venue Decoration",
      description:
        "Includes venue decoration, photography, and catering for up to 100 guests.",
    },
    {
      id: 2,
      name: "Premium Features",
      description:
        "Includes all Basic features plus live music, bridal makeup, and luxury transport.",
    },
    {
      id: 3,
      name: "Full Planning",
      description:
        "Full wedding planning, premium venue, entertainment, and personalized services.",
    },
  ]);

  const eventTypeRates = {
    Wedding: 1000,
    Reception: 800,
    Engagement: 600,
    Other: 500,
  };

  const [customDetails, setCustomDetails] = useState({
    eventType: "Wedding",
    guestCount: "",
    specialRequests: "",
    ratePerGuest: eventTypeRates["Wedding"],
    selectedCategory: categories[0].id,
    categoryDescription: categories[0].description,
    totalPrice: 0,
  });

  const [showCustomizeForm, setShowCustomizeForm] = useState(false);

  const calculatePrice = (guestCount, ratePerGuest) => {
    const guests = parseInt(guestCount, 10);
    const rateGuest = parseFloat(ratePerGuest);
    if (isNaN(guests) || isNaN(rateGuest)) return 0;
    return guests * rateGuest;
  };

  const handleCustomChange = (e) => {
    const { name, value } = e.target;
    let updatedDetails = { ...customDetails, [name]: value };

    if (name === "eventType") {
      updatedDetails.ratePerGuest =
        eventTypeRates[value] || eventTypeRates["Other"];
    }

    if (name === "selectedCategory") {
      const category = categories.find((cat) => cat.id === parseInt(value, 10));
      updatedDetails.categoryDescription = category ? category.description : "";
    }

    updatedDetails.totalPrice = calculatePrice(
      updatedDetails.guestCount,
      updatedDetails.ratePerGuest
    );

    setCustomDetails(updatedDetails);
  };

  const handleSubmitCustomize = (e) => {
    e.preventDefault();
    // Placeholder for saving customization data to database
    alert(
      "Customization submitted:\n" +
        JSON.stringify(customDetails, null, 2) +
        `\nTotal Price: BDT ${customDetails.totalPrice.toFixed(2)}`
    );
    setShowCustomizeForm(false);
    setCustomDetails({
      eventType: "Wedding",
      guestCount: "",
      specialRequests: "",
      ratePerGuest: eventTypeRates["Wedding"],
      selectedCategory: categories[0].id,
      categoryDescription: categories[0].description,
      totalPrice: 0,
    });
  };

  const handlePackageClick = (pkg) => {
    if (pkg.title === "Customize Package") {
      setShowCustomizeForm(true);
    } else {
      // Placeholder for navigation or other action
      alert(`Selected package: ${pkg.title}`);
    }
  };

  // Event Gallery State
  const [images, setImages] = useState([
    {
      id: 1,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA9QL2ZHLD2YXWr0iyxSNYjm-1aTVxoKM2FA&s",
      category: "Wedding",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1612110822013-e97c053f25dc?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Reception",
    },
    {
      id: 3,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0chohVOjwll6tZts6QvozEhDuGV3milR_2g&s",
      category: "Engagement",
    },
  ]);

  const [galleryCategories, setGalleryCategories] = useState([
    "All",
    "Wedding",
    "Reception",
    "Engagement",
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    if (file) {
      newImages[index].src = URL.createObjectURL(file);
      setImages(newImages);
    }
  };

  const addImage = () => {
    const newId = images.length ? images[images.length - 1].id + 1 : 1;
    setImages([...images, { id: newId, src: "", category: "Wedding" }]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // Testimonials State
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Ayesha Rahman",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEKx64sTh3pznO3x6wuViyf8WnSDJM263kDQ&s",
      message:
        "BD Wedding Planner made our special day unforgettable. Highly recommended!",
    },
    {
      id: 2,
      name: "Rafiq Ahmed",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZtsdkF_04HrGNXX6NWJyFm5f2BlcG6ONyGg&s",
      message: "Professional and attentive service. Everything was perfect!",
    },
    {
      id: 3,
      name: "Nusrat Jahan",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCjKKe8_NAJkgfQuR0PA4lhyGMtkC62ZmWf1eH9CW4KpnDvaCrFKVLCfW30KMOXLAEpZ0&usqp=CAU",
      message: "The team handled everything smoothly. We enjoyed every moment.",
    },
  ]);

  const addTestimonial = () => {
    const newId = testimonials.length
      ? testimonials[testimonials.length - 1].id + 1
      : 1;
    setTestimonials([
      ...testimonials,
      { id: newId, name: "", photo: "", message: "" },
    ]);
  };

  const removeTestimonial = (index) => {
    const newTestimonials = [...testimonials];
    newTestimonials.splice(index, 1);
    setTestimonials(newTestimonials);
  };

  const handleTestimonialChange = (index, field, value) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index][field] = value;
    setTestimonials(newTestimonials);
  };

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Placeholder for saving contact form data
    alert("Contact form submitted:\n" + JSON.stringify(contactForm, null, 2));
  };

  // Footer State
  const [aboutUs, setAboutUs] = useState(
    "BD Wedding Planner is your trusted partner for creating unforgettable wedding experiences. We bring your dream wedding to life with passion and precision."
  );

  const [quickLinks, setQuickLinks] = useState([
    { id: 1, text: "About", url: "/about" },
    { id: 2, text: "Services", url: "/services" },
    { id: 3, text: "Portfolio", url: "/portfolio" },
    { id: 4, text: "Contact", url: "/contact" },
  ]);

  const [contactInfo, setContactInfo] = useState({
    address: "123 Wedding St, Dhaka, Bangladesh",
    email: "info@bdweddingplanner.com",
    phone: "+880 1234 567890",
  });

  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  });

  const handleQuickLinkChange = (index, field, value) => {
    const newLinks = [...quickLinks];
    newLinks[index][field] = value;
    setQuickLinks(newLinks);
  };

  const addQuickLink = () => {
    const newId = quickLinks.length
      ? quickLinks[quickLinks.length - 1].id + 1
      : 1;
    setQuickLinks([...quickLinks, { id: newId, text: "", url: "" }]);
  };

  const removeQuickLink = (index) => {
    const newLinks = [...quickLinks];
    newLinks.splice(index, 1);
    setQuickLinks(newLinks);
  };

  const handleSocialLinkChange = (field, value) => {
    setSocialLinks((prev) => ({ ...prev, [field]: value }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <motion.div
      className={`flex h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-1">
        {/* Sidebar */}
        {mounted && width >= 580 ? (
          <motion.nav
            className={`flex flex-col w-16 md:w-70 h-screen p-4 space-y-4 shadow-lg sticky top-0 left-0 overflow-visible rounded-r-lg ${
              darkMode
                ? "bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800"
                : "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
            }`}
            variants={itemVariants}
          >
            <ManagementMenu />
          </motion.nav>
        ) : (
          <div className="p-4 sticky top-0 left-0 overflow-visible">
            <HamburgerMenu
              isOpen={hamburgerMenuOpen}
              setIsOpen={setHamburgerMenuOpen}
            />
          </div>
        )}

        <motion.main
          className="flex-1 p-4 md:p-8 overflow-auto h-screen max-h-screen ml-2 md:ml-8"
          variants={itemVariants}
        >
          <motion.h1
            className="text-3xl font-bold mb-6 flex justify-between items-center"
            variants={itemVariants}
          >
            Home Page Management
          </motion.h1>

          {/* Submenu Navigation */}
          <div className="mb-6 flex space-x-2 overflow-x-auto scrollbar-hide">
            {[
              "Hero Section",
              "Service Packages",
              "Event Gallery",
              "Testimonials",
              "Contact Form",
              "Footer",
            ].map((section) => (
              <button
                key={section}
                onClick={() => {
                  setActiveSubmenu(section);
                  // Close hamburger menu on phone screen after submenu click
                  if (width < 580) {
                    setHamburgerMenuOpen(false);
                  }
                }}
                className={`px-4 py-2 rounded whitespace-nowrap ${
                  activeSubmenu === section
                    ? "bg-pink-600 text-white"
                    : "bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          {/* Content Display Based on Active Submenu */}
          {activeSubmenu === "Hero Section" && (
            <motion.section className="mb-8" variants={itemVariants}>
              <h2 className="text-2xl font-semibold mb-4">Hero Section</h2>
              <div className="mb-4">
                <label htmlFor="heroTitle" className="block font-semibold mb-1">
                  Title
                </label>
                <input
                  id="heroTitle"
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className={`w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 transition ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600 placeholder-gray-4100"
                      : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="heroSubtitle"
                  className="block font-semibold mb-1"
                >
                  Subtitle
                </label>
                <input
                  id="heroSubtitle"
                  type="text"
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className={`w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 transition ${
                    darkMode
                      ? "bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                      : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
                  }`}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="heroCTA" className="block font-semibold mb-1">
                  Call to Action Text
                </label>
                <input
                  id="heroCTA"
                  type="text"
                  value={heroCTA}
                  onChange={(e) => setHeroCTA(e.target.value)}
                  className={`w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 transition ${
                    darkMode
                      ? "bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                      : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
                  }`}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="heroVideo" className="block font-semibold mb-1">
                  Background Video
                </label>
                <input
                  id="heroVideo"
                  type="file"
                  accept="video/*"
                  onChange={handleHeroVideoChange}
                  className="block"
                />
                {heroVideoURL && (
                  <video
                    src={heroVideoURL}
                    controls
                    className="mt-2 max-h-48 rounded shadow-lg"
                  />
                )}
              </div>
            </motion.section>
          )}
          {activeSubmenu === "Service Packages" && (
            <motion.section className="mb-8" variants={itemVariants}>
              <h2 className="text-2xl font-semibold mb-4">Service Packages</h2>
              <div className="space-y-4">
                {packages.map((pkg, index) => (
                  <div
                    key={pkg.id}
                    className="p-4 rounded-lg shadow-lg border border-pink-300"
                  >
                    <label className="block font-semibold mb-1">Title</label>
                    <input
                      type="text"
                      value={pkg.title}
                      onChange={(e) => {
                        const newPackages = [...packages];
                        newPackages[index] = {
                          ...newPackages[index],
                          title: e.target.value,
                        };
                        setPackages(newPackages);
                      }}
                      className="w-full p-2 border rounded mb-2"
                    />
                    <label className="block font-semibold mb-1">
                      Description
                    </label>
                    <textarea
                      value={pkg.description}
                      onChange={(e) => {
                        const newPackages = [...packages];
                        newPackages[index] = {
                          ...newPackages[index],
                          description: e.target.value,
                        };
                        setPackages(newPackages);
                      }}
                      className="w-full p-2 border rounded mb-2"
                    />
                    <label className="block font-semibold mb-1">Price</label>
                    <input
                      type="text"
                      value={pkg.price}
                      onChange={(e) => {
                        const newPackages = [...packages];
                        newPackages[index] = {
                          ...newPackages[index],
                          price: e.target.value,
                        };
                        setPackages(newPackages);
                      }}
                      className="w-full p-2 border rounded"
                    />
                    <label className="block font-semibold mb-1">
                      Icon Name
                    </label>
                    <input
                      type="text"
                      value={pkg.iconName}
                      onChange={(e) => {
                        const newPackages = [...packages];
                        newPackages[index] = {
                          ...newPackages[index],
                          iconName: e.target.value,
                        };
                        setPackages(newPackages);
                      }}
                      className="w-full p-2 border rounded mb-2"
                    />
                    <label className="block font-semibold mb-1">Enabled</label>
                    <input
                      type="checkbox"
                      checked={pkg.enabled}
                      onChange={(e) => {
                        const newPackages = [...packages];
                        newPackages[index] = {
                          ...newPackages[index],
                          enabled: e.target.checked,
                        };
                        setPackages(newPackages);
                      }}
                      className="mr-2"
                    />
                    <button
                      onClick={() => {
                        const newPackages = [...packages];
                        newPackages.splice(index, 1);
                        setPackages(newPackages);
                      }}
                      className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Remove Package
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setPackages([
                      ...packages,
                      {
                        id: packages.length + 1,
                        title: "",
                        description: "",
                        price: "",
                        iconName: "",
                        enabled: true,
                      },
                    ]);
                  }}
                  className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
                >
                  Add New Package
                </button>
              </div>
              <button
                onClick={handleSavePackages}
                className="mt-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
              >
                Save Packages
              </button>
            </motion.section>
          )}
          {activeSubmenu === "Event Gallery" && (
            <motion.section className="mb-8" variants={itemVariants}>
              <h2 className="text-2xl font-semibold mb-4 flex justify-between items-center">
                Event Gallery
              </h2>
              <div className="mb-4">
                {galleryCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`mx-1 px-3 py-1 rounded-full font-semibold transition text-sm sm:text-base ${
                      selectedCategory === cat
                        ? "bg-pink-600 text-white"
                        : "bg-pink-200 dark:bg-pink-700 text-pink-700 dark:text-pink-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {images
                  .filter((img) =>
                    selectedCategory === "All"
                      ? true
                      : img.category === selectedCategory
                  )
                  .map((img, index) => (
                    <div
                      key={img.id}
                      className="p-2 border rounded shadow-lg flex flex-col"
                    >
                      <img
                        src={img.src || ""}
                        alt={img.category}
                        className="mb-2 rounded object-cover h-32 w-full"
                      />
                      <label className="block font-semibold mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={img.src}
                        onChange={(e) => {
                          const newImages = [...images];
                          newImages[index].src = e.target.value;
                          setImages(newImages);
                        }}
                        className="w-full p-1 border rounded mb-2"
                      />
                      <label className="block font-semibold mb-1">
                        Category
                      </label>
                      <select
                        value={img.category}
                        onChange={(e) => {
                          const newImages = [...images];
                          newImages[index].category = e.target.value;
                          setImages(newImages);
                        }}
                        className="w-full p-1 border rounded"
                      >
                        {galleryCategories
                          .filter((cat) => cat !== "All")
                          .map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                      </select>
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() => saveSingleImage(index)}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                          Save Image
                        </button>
                        <button
                          onClick={() => removeImage(index)}
                          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  onClick={addImage}
                  className="col-span-full px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
                >
                  Add Image
                </button>
              </div>
              <button
                onClick={handleSaveGallery}
                className="mt-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
              >
                Save Gallery
              </button>
            </motion.section>
          )}
          {activeSubmenu === "Testimonials" && (
            <motion.section className="mb-8" variants={itemVariants}>
              <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {testimonials.map((testi, index) => (
                  <div
                    key={testi.id}
                    className="p-4 border rounded shadow-lg flex flex-col"
                  >
                    <label className="block font-semibold mb-1">Name</label>
                    <input
                      type="text"
                      value={testi.name}
                      onChange={(e) =>
                        handleTestimonialChange(index, "name", e.target.value)
                      }
                      className="w-full p-2 border rounded mb-2"
                    />
                    <label className="block font-semibold mb-1">
                      Photo URL
                    </label>
                    <input
                      type="text"
                      value={testi.photo}
                      onChange={(e) =>
                        handleTestimonialChange(index, "photo", e.target.value)
                      }
                      className="w-full p-2 border rounded mb-2"
                    />
                    <label className="block font-semibold mb-1">Message</label>
                    <textarea
                      value={testi.message}
                      onChange={(e) =>
                        handleTestimonialChange(
                          index,
                          "message",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border rounded"
                    />
                    <button
                      onClick={() => removeTestimonial(index)}
                      className="mt-2 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={addTestimonial}
                  className="col-span-full px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
                >
                  Add Testimonial
                </button>
              </div>
              <button
                onClick={handleSaveTestimonials}
                className="mt-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
              >
                Save Testimonials
              </button>
            </motion.section>
          )}
          {activeSubmenu === "Contact Form" && (
            <motion.section className="mb-8" variants={itemVariants}>
              <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>
              <form
                onSubmit={handleContactSubmit}
                className="space-y-4 max-w-md"
              >
                <div>
                  <label htmlFor="name" className="block font-semibold mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-semibold mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block font-semibold mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    className="w-full p-2 border rounded"
                    rows={4}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
                >
                  Submit
                </button>
              </form>
            </motion.section>
          )}
          {activeSubmenu === "Footer" && (
            <motion.section className="mb-8" variants={itemVariants}>
              <h2 className="text-2xl font-semibold mb-4">Footer</h2>
              <div className="mb-4">
                <label className="block font-semibold mb-1">About Us</label>
                <textarea
                  value={aboutUs}
                  onChange={(e) => setAboutUs(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={4}
                />
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Quick Links</h3>
                {quickLinks.map((link, index) => (
                  <div key={link.id} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={link.text}
                      onChange={(e) =>
                        handleQuickLinkChange(index, "text", e.target.value)
                      }
                      placeholder="Link Text"
                      className="flex-1 p-2 border rounded"
                    />
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) =>
                        handleQuickLinkChange(index, "url", e.target.value)
                      }
                      placeholder="Link URL"
                      className="flex-1 p-2 border rounded"
                    />
                    <button
                      onClick={() => removeQuickLink(index)}
                      className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={addQuickLink}
                  className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
                >
                  Add Link
                </button>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Contact Info</h3>
                <label className="block font-semibold mb-1">Address</label>
                <input
                  type="text"
                  value={contactInfo.address}
                  onChange={(e) =>
                    setContactInfo((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded mb-2"
                />
                <label className="block font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) =>
                    setContactInfo((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded mb-2"
                />
                <label className="block font-semibold mb-1">Phone</label>
                <input
                  type="text"
                  value={contactInfo.phone}
                  onChange={(e) =>
                    setContactInfo((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Social Media Links</h3>
                {Object.entries(socialLinks).map(([key, value]) => (
                  <div key={key} className="mb-2">
                    <label className="block font-semibold mb-1 capitalize">
                      {key}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        handleSocialLinkChange(key, e.target.value)
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </motion.main>
      </div>
    </motion.div>
  );
}
