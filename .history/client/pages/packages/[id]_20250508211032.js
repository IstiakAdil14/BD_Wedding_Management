import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import { DarkModeContext } from "../../context/DarkModeContext";

const packages = [

      <h2 className="text-2xl font-semibold mb-4">Book this package</h2>

      {bookingSuccess && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">
          Booking submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={bookingDetails.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-semibold mb-1">
            Email
          </label>
          {isAuthenticated ? (
            <input
              type="email"
              id="email"
              name="email"
              value={authEmail}
              disabled
              className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
            />
          ) : (
            <input
              type="email"
              id="email"
              name="email"
              value={bookingDetails.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block font-semibold mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={bookingDetails.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="eventDate" className="block font-semibold mb-1">
            Event Date
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={bookingDetails.eventDate}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="specialRequests" className="block font-semibold mb-1">
            Special Requests
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={bookingDetails.specialRequests}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
        >
          Submit Booking
        </button>
      </form>
    </section>
  );
};

export default PackageDetails;
