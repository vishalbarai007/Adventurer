import React from "react";

const ContactForm: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10 grid md:grid-cols-2 gap-6">
      <div>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fuga
          quis odio fugiat ea quae.
        </p>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed"
          className="w-full h-64 mt-4 border rounded-lg"
          loading="lazy"
        ></iframe>
      </div>
      <form className="p-6 bg-white rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-gray-700">Your Name</label>
          <input
            type="text"
            className="w-full mt-2 px-4 py-2 border rounded-lg"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email Address</label>
          <input
            type="email"
            className="w-full mt-2 px-4 py-2 border rounded-lg"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Your Message</label>
          <textarea
            className="w-full mt-2 px-4 py-2 border rounded-lg"
            placeholder="Enter your message"
            rows={5}
          ></textarea>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Get in Touch
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
