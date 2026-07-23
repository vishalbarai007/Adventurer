import React, { useState } from "react";
import axios from "axios";
import { FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";


import { API_BASE_URL } from "@/services/httpClient";


 interface FormData {
    name: string;
    email: string;
    location: string;
    contact: string;
    message: string;
  }

  type SubmitStatus = "idle" | "loading" | "success" | "error";


const ContactForm: React.FC = () => {

    const [formData, setFormData] = useState<FormData>({
      name: "",
      email: "",
      location: "",
      contact: "",
      message: "",
    });

    const [status, setStatus] = useState<SubmitStatus>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus("loading");
      setErrorMessage("");

      try {
        await axios.post(`${API_BASE_URL}/api/user-query`, formData, {
          withCredentials: true,
        });

        setStatus("success");
        setFormData({ name: "", email: "", location: "", contact: "", message: "" });

        // Reset status after 4 seconds
        setTimeout(() => setStatus("idle"), 4000);
      } catch (error: any) {
        setStatus("error");
        setErrorMessage(
          error.response?.data?.error || "Something went wrong. Please try again."
        );
        setTimeout(() => setStatus("idle"), 4000);
      }
    };

    return (
      <div className="container mx-auto px-4 py-10 grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Our Team</h2>
          <p className="text-gray-600">
            Have questions about our adventure trips, custom tour packages, or safety guidelines?
            Send us your query, and we will get back to you as soon as possible.
          </p>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed"
            className="w-full h-64 mt-4 border rounded-lg"
            loading="lazy"
          ></iframe>
        </div>
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Your Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={status === "loading"}
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status === "loading"}
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium">Your Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={status === "loading"}
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter location"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Contact Number</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                disabled={status === "loading"}
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter contact number"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Your Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={status === "loading"}
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your message"
              rows={5}
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {status === "loading" ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending...</span>
              </>
            ) : status === "success" ? (
              <>
                <FiCheckCircle size={18} />
                <span>Sent Successfully!</span>
              </>
            ) : (
              <>
                <FiSend size={18} />
                <span>Get in Touch</span>
              </>
            )}
          </button>

          {status === "error" && (
            <div className="mt-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
              <FiAlertCircle size={18} className="flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {status === "success" && (
            <div className="mt-4 p-3 bg-green-100 border border-green-200 text-green-700 rounded-lg flex items-center gap-2">
              <FiCheckCircle size={18} className="flex-shrink-0" />
              <span>Thank you! Your query has been submitted successfully.</span>
            </div>
          )}
        </form>
      </div>
    );
  };

  export default ContactForm;
