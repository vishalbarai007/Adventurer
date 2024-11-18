import React from "react";

const ContactDetails: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-6 border rounded-lg shadow">
          <h3 className="font-semibold text-lg">Address Line</h3>
          <p className="text-gray-600">Broadway St. New York NY 10012, USA</p>
        </div>
        <div className="p-6 border rounded-lg shadow">
          <h3 className="font-semibold text-lg">Phone Number</h3>
          <p className="text-gray-600">+1234-566-4233</p>
        </div>
        <div className="p-6 border rounded-lg shadow">
          <h3 className="font-semibold text-lg">Mail Address</h3>
          <p className="text-gray-600">email@domain.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
