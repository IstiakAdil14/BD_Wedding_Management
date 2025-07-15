import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../../context/DarkModeContext";
import ManagementMenu from "../../components/ManagementMenu";
import HamburgerMenu from "../../components/HamburgerMenu";

export default function EventGallery() {
  const { darkMode } = useContext(DarkModeContext);

  const [images, setImages] = useState([]);
  const [galleryCategories, setGalleryCategories] = useState([
    "All",
    "Wedding",
    "Reception",
    "Engagement",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch("/api/eventGallery");
        if (res.ok) {
          const data = await res.json();
          setImages(data);
        } else {
          console.error("Failed to fetch event gallery items");
        }
      } catch (error) {
        console.error("Error fetching event gallery items:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  const addImage = () => {
    setImages([
      ...images,
      {
        id: null,
        title: "",
        imagePath: "",
        description: "",
        category: "Wedding",
      },
    ]);
  };

  const removeImage = async (index) => {
    const img = images[index];
    if (img.id) {
      try {
        const res = await fetch(`/api/eventGallery/${img.id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          console.error("Failed to delete event gallery item");
          return;
        }
      } catch (error) {
        console.error("Error deleting event gallery item:", error);
        return;
      }
    }
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const saveImage = async (index) => {
    const img = images[index];
    if (img.id) {
      // Update existing image
      try {
        const res = await fetch(`/api/eventGallery/${img.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: img.title,
            imagePath: img.imagePath,
            description: img.description,
          }),
        });
        if (!res.ok) {
          console.error("Failed to update event gallery item");
        }
      } catch (error) {
        console.error("Error updating event gallery item:", error);
      }
    } else {
      // Create new image
      try {
        const res = await fetch("/api/eventGallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: img.title,
            imagePath: img.imagePath,
            description: img.description,
          }),
        });
        if (res.ok) {
          const newImg = await res.json();
          const newImages = [...images];
          newImages[index] = newImg;
          setImages(newImages);
        } else {
          console.error("Failed to create event gallery item");
        }
      } catch (error) {
        console.error("Error creating event gallery item:", error);
      }
    }
  };

  const updateImageField = (index, field, value) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], [field]: value };
    setImages(newImages);
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

  if (loading) {
    return <div>Loading event gallery items...</div>;
  }

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
        {window.innerWidth <= 768 ? (
          <div className="p-4 sticky top-0 left-0 z-50">
            <HamburgerMenu />
          </div>
        ) : (
          <motion.nav
            className={`flex flex-col w-70 h-screen p-4 space-y-4 shadow-lg sticky top-0 left-0 overflow-visible rounded-r-lg ${
              darkMode
                ? "bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800"
                : "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
            }`}
            variants={itemVariants}
          >
            <ManagementMenu />
          </motion.nav>
        )}

        <motion.main
          className="flex-1 p-4 md:p-8 overflow-auto h-screen max-h-screen ml-0 md:ml-72"
          variants={itemVariants}
        >
          <motion.h1 className="text-3xl font-bold mb-6" variants={itemVariants}>
            Event Gallery Management
          </motion.h1>

          <motion.section className="mb-8" variants={itemVariants}>
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
                    key={img.id || index}
                    className="p-2 border rounded shadow-lg flex flex-col"
                  >
                    <label className="block font-semibold mb-1">Title</label>
                    <input
                      type="text"
                      value={img.title || ""}
                      onChange={(e) =>
                        updateImageField(index, "title", e.target.value)
                      }
                      className="w-full p-1 border rounded mb-2"
                    />
                    <label className="block font-semibold mb-1">Image URL</label>
                    <input
                      type="text"
                      value={img.imagePath || ""}
                      onChange={(e) =>
                        updateImageField(index, "imagePath", e.target.value)
                      }
                      className="w-full p-1 border rounded mb-2"
                    />
                    <label className="block font-semibold mb-1">Description</label>
                    <textarea
                      value={img.description || ""}
                      onChange={(e) =>
                        updateImageField(index, "description", e.target.value)
                      }
                      className="w-full p-1 border rounded mb-2"
                    />
                    <label className="block font-semibold mb-1">Category</label>
                    <select
                      value={img.category || "Wedding"}
                      onChange={(e) =>
                        updateImageField(index, "category", e.target.value)
                      }
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
                        onClick={() => saveImage(index)}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                      >
                        Save
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
          </motion.section>
        </motion.main>
      </div>
    </motion.div>
  );
}
