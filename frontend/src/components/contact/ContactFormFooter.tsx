import React, { useState } from "react";
import axios from "axios";
import { FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

interface FormData {
  name: string;
  email: string;
  location: string;
  contact: string;
  message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const ContactFormFooter: React.FC = () => {
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
      await axios.post("http://localhost:5000/api/user-query", formData, {
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
    <div className="footer-form-wrapper" id="footer-contact-form">
      <h3 className="footer-section-title">
        <span className="footer-title-accent">Send Us</span> a Message
      </h3>
      <p className="footer-section-subtitle">
        Have a question? We'd love to hear from you.
      </p>

      <form onSubmit={handleSubmit} className="footer-form" autoComplete="off">
        <div className="footer-form-row">
          <div className="footer-form-group">
            <input
              type="text"
              id="footer-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name *"
              required
              className="footer-input"
              disabled={status === "loading"}
            />
          </div>
          <div className="footer-form-group">
            <input
              type="email"
              id="footer-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address *"
              required
              className="footer-input"
              disabled={status === "loading"}
            />
          </div>
        </div>

        <div className="footer-form-row">
          <div className="footer-form-group">
            <input
              type="text"
              id="footer-location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Your Location"
              className="footer-input"
              disabled={status === "loading"}
            />
          </div>
          <div className="footer-form-group">
            <input
              type="tel"
              id="footer-contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Phone Number"
              className="footer-input"
              disabled={status === "loading"}
            />
          </div>
        </div>

        <div className="footer-form-group">
          <textarea
            id="footer-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message *"
            required
            rows={3}
            className="footer-input footer-textarea"
            disabled={status === "loading"}
          />
        </div>

        <button
          type="submit"
          className={`footer-submit-btn ${status === "loading" ? "footer-btn-loading" : ""}`}
          disabled={status === "loading"}
          id="footer-submit-btn"
        >
          {status === "loading" ? (
            <>
              <span className="footer-spinner" />
              Sending...
            </>
          ) : status === "success" ? (
            <>
              <FiCheckCircle size={18} />
              Sent Successfully!
            </>
          ) : (
            <>
              <FiSend size={16} />
              Send Message
            </>
          )}
        </button>

        {status === "error" && (
          <div className="footer-form-error">
            <FiAlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {status === "success" && (
          <div className="footer-form-success">
            <FiCheckCircle size={16} />
            <span>Thank you! We'll get back to you soon.</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactFormFooter;
