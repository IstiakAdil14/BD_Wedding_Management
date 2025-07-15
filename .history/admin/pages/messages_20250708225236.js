import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../context/DarkModeContext";
import ManagementMenu from "../components/ManagementMenu";
import HamburgerMenu from "../components/HamburgerMenu";

import dynamic from "next/dynamic";
import { EditorState, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

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

export default function Messages() {
  const { darkMode } = useContext(DarkModeContext);
  const width = useWindowWidth();

  const [messages, setMessages] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bookings");
        if (!res.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await res.json();
        // Map bookings to message format for display
        const bookingMessages = data.map((booking) => ({
          id: booking._id,
          name: booking.name,
          email: booking.email,
          subject: `Booking: ${booking.packageName}`,
          phone: booking.phone,
          eventDate: booking.eventDate,
          specialRequestsRaw: booking.specialRequests,
          paymentMethod: booking.paymentMethod,
          read: false,
          status: booking.status,
        }));
        setMessages(bookingMessages);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const markAsRead = (id) => {
    setMessages(
      messages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    );
  };

  const markAsUnread = (id) => {
    setMessages(
      messages.map((msg) => (msg.id === id ? { ...msg, read: false } : msg))
    );
  };

  const deleteMessage = (id) => {
    if (confirm("Are you sure you want to delete this message?")) {
      setMessages(messages.filter((msg) => msg.id !== id));
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update status");
      }
      const responseJson = await res.json();
      console.log("Update status response:", responseJson);
      const newStatus = responseJson.booking
        ? responseJson.booking.status
        : responseJson.status;
      setMessages(
        messages.map((msg) =>
          msg.id === id ? { ...msg, status: newStatus } : msg
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update order status");
    }
  };
  if (!hasMounted) return null;

  return (
    <motion.div
      className={`flex h-fullscreen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Side Navbar */}
      {width >= 580 ? (
        <motion.nav
          className={`flex flex-col w-70 h-screen p-4 space-y-4 shadow-lg sticky top-0 left-0 overflow-y-auto rounded-r-lg ${
            darkMode
              ? "bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800"
              : "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
          }`}
          variants={itemVariants}
        >
          <ManagementMenu />
        </motion.nav>
      ) : (
        <div className="p-4 sticky top-0 left-0">
          <HamburgerMenu />
        </div>
      )}

      {/* Main Content */}
      <motion.main
        className="flex-1 p-4 md:p-8 overflow-auto h-screen max-h-screen"
        variants={itemVariants}
        style={{ marginLeft: "2rem" }}
      >
        <motion.h1 className="text-3xl font-bold mb-6" variants={itemVariants}>
          Messages / Inquiries Management
        </motion.h1>

        {messages.length === 0 ? (
          <p>No messages received yet.</p>
        ) : (
          <ul className="space-y-4">
            {messages.map((msg) => {
              let editorState = null;
              try {
                if (msg.specialRequestsRaw) {
                  const contentState = convertFromRaw(
                    JSON.parse(msg.specialRequestsRaw)
                  );
                  editorState = EditorState.createWithContent(contentState);
                }
              } catch {
                editorState = null;
              }
              return (
                <motion.li
                  key={msg.id}
                  className={`border p-4 rounded shadow ${
                    msg.read
                      ? darkMode
                        ? "bg-gray-700"
                        : "bg-gray-100"
                      : darkMode
                      ? "bg-gray-800"
                      : "bg-white"
                  }`}
                  variants={itemVariants}
                >
                  <h3 className="text-lg font-semibold">{msg.subject}</h3>
                  <p>
                    <strong>From:</strong> {msg.name} ({msg.email})
                  </p>
                  <p className="mt-2 whitespace-pre-line">
                    <strong>Phone:</strong> {msg.phone}
                  </p>
                  <p className="mt-2 whitespace-pre-line">
                    <strong>Event Date:</strong>{" "}
                    {new Date(msg.eventDate).toLocaleDateString()}
                  </p>
                  <div className="mt-2">
                    <strong>Special Requests:</strong>
                    {editorState ? (
                      <Editor
                        editorState={editorState}
                        toolbarHidden
                        readOnly
                        wrapperClassName="rdw-editor-wrapper"
                        editorClassName="rdw-editor-main"
                      />
                    ) : (
                      <p>None</p>
                    )}
                  </div>
                  <p className="mt-2 font-semibold">
                    {msg.read ? "Read" : "Unread"}
                  </p>
                  <p className="mt-2 font-semibold">
                    <strong>Status:</strong> {msg.status || "pending"}
                  </p>
                  <p className="mt-2 font-semibold">
                    <strong>Payment Method:</strong> {msg.paymentMethod || "N/A"}
                  </p>
                  <div className="mt-2 space-x-2">
                    {/* 
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                    */}
                    {["pending", "received", "cancelled", "completed"].map(
                      (statusOption) => (
                        <button
                          key={statusOption}
                          onClick={() => updateStatus(msg.id, statusOption)}
                          className={`px-2 py-1 rounded transition ${
                            msg.status === statusOption
                              ? "bg-blue-600 text-white"
                              : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                          }`}
                        >
                          {statusOption.charAt(0).toUpperCase() +
                            statusOption.slice(1)}
                        </button>
                      )
                    )}
                  </div>
                </motion.li>
              );
            })}
          </ul>
        )}
      </motion.main>
    </motion.div>
  );
}
