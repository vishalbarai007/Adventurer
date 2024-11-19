import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import xyz from "../../public/assets/IND/ContactUs.png";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-[#112c1d] min-h-screen py-10">
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto p-6">
        {/* Left Section */}
        <div className="bg-white rounded-lg h-fit shadow-lg p-8">
          <h2 className="text-2xl font-bold text-green-900 mb-4">Let's Chat, Reach Out to Us</h2>
          <p className="text-green-800 mb-6">
            Have questions about our tours? We're here to help. Send us a message, and we'll respond
            within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={4}
              className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
              required
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="privacy"
                className="rounded border-green-300 text-green-600 focus:ring-green-500"
                required
              />
              <label htmlFor="privacy" className="text-sm text-green-700">
                I agree to the privacy policy
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
            >
              Send Message
            </button>
          </form>
          {submitted && (
            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
              Thank you! We'll get back to you soon.
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="space-y-8">
          {/* Image */}
          <div className="relative w-full h-64 md:h-auto rounded-lg overflow-hidden">
            <img
              src={xyz}
              alt="Contact Us"
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Contact Info */}
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Mail className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h3 className="font-medium text-green-900">Email</h3>
                <p className="text-green-700">adventurer2024@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Phone className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h3 className="font-medium text-green-900">Phone</h3>
                <p className="text-green-700">+91 7709692329</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <MapPin className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h3 className="font-medium text-green-900">Address</h3>
                <p className="text-green-700">Andheri,Mumbai,Maharashtra,India.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
