import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../../context/DarkModeContext";
import ManagementMenu from "../../components/ManagementMenu";
import HamburgerMenu from "../../components/HamburgerMenu";

export default function ServicePackages() {
  const { darkMode } = useContext(DarkModeContext);

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          setPackages(data);
        } else {
          console.error("Failed to fetch service packages");
        }
      } catch (error) {
        console.error("Error fetching service packages:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPackages();
  }, []);

  const addPackage = () => {
    setPackages([
      ...packages,
      {
        id: null,
        title: "",
        description: "",
        price: "",
        iconName: "",
        enabled: true,
      },
    ]);
  };

  const removePackage = async (index) => {
    const pkg = packages[index];
    if (pkg.id) {
      try {
        const res = await fetch(`/api/services/${pkg.id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          console.error("Failed to delete service package");
          return;
        }
      } catch (error) {
        console.error("Error deleting service package:", error);
        return;
      }
    }
    const newPackages = [...packages];
    newPackages.splice(index, 1);
    setPackages(newPackages);
  };

  const savePackage = async (index) => {
    const pkg = packages[index];
    if (pkg.id) {
      // Update existing package
      try {
        const res = await fetch(`/api/services/${pkg.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pkg),
        });
        if (!res.ok) {
          console.error("Failed to update service package");
        }
      } catch (error) {
        console.error("Error updating service package:", error);
      }
    } else {
      // Create new package
      try {
        const res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pkg),
        });
        if (res.ok) {
          const newPkg = await res.json();
          const newPackages = [...packages];
          newPackages[index] = newPkg;
          setPackages(newPackages);
        } else {
          console.error("Failed to create service package");
        }
      } catch (error) {
        console.error("Error creating service package:", error);
      }
    }
  };

  const updatePackageField = (index, field, value) => {
    const newPackages = [...packages];
    newPackages[index] = { ...newPackages[index], [field]: value };
    setPackages(newPackages);
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
    return <div>Loading service packages...</div>;
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

        <motion.main
          className="flex-1 p-4 md:p-8 overflow-auto h-screen max-h-screen ml-2 md:ml-8"
          variants={itemVariants}
        >
          <motion.h1 className="text-3xl font-bold mb-6" variants={itemVariants}>
            Service Packages Management
          </motion.h1>

          <motion.section className="mb-8" variants={itemVariants}>
            <div className="space-y-4">
              {packages.map((pkg, index) => (
                <div
                  key={pkg.id || index}
                  className="p-4 rounded-lg shadow-lg border border-pink-300"
                >
                  <label className="block font-semibold mb-1">Title</label>
                  <input
                    type="text"
                    value={pkg.title}
                    onChange={(e) =>
                      updatePackageField(index, "title", e.target.value)
                    }
                    className="w-full p-2 border rounded mb-2"
                  />
                  <label className="block font-semibold mb-1">Description</label>
                  <textarea
                    value={pkg.description}
                    onChange={(e) =>
                      updatePackageField(index, "description", e.target.value)
                    }
                    className="w-full p-2 border rounded mb-2"
                  />
                  <label className="block font-semibold mb-1">Price</label>
                  <input
                    type="text"
                    value={pkg.price}
                    onChange={(e) =>
                      updatePackageField(index, "price", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                  <label className="block font-semibold mb-1">Icon Name</label>
                  <input
                    type="text"
                    value={pkg.iconName}
                    onChange={(e) =>
                      updatePackageField(index, "iconName", e.target.value)
                    }
                    className="w-full p-2 border rounded mb-2"
                  />
                  <label className="block font-semibold mb-1">Enabled</label>
                  <input
                    type="checkbox"
                    checked={pkg.enabled}
                    onChange={(e) =>
                      updatePackageField(index, "enabled", e.target.checked)
                    }
                    className="mr-2"
                  />
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => savePackage(index)}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => removePackage(index)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Remove Package
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={addPackage}
                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
              >
                Add New Package
              </button>
            </div>
          </motion.section>
        </motion.main>
      </div>
    </motion.div>
  );
}
