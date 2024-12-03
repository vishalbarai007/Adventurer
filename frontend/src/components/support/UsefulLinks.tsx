import { Link } from "react-router-dom";

const UsefulLinks = () => {
  return (
<div className="relative p-8 rounded-lg shadow-md h-auto mb-10">
<h1 className="text-center font-bold text-3xl mb-6 ">Useful Links</h1>
      <ul className="QuickLinks grid grid-cols-2 gap-y-4 gap-x-6 md:gap-x-10 md:gap-y-6 justify-items-start">
        <li className="rounded min-w-[150px] hover:text-blue-600 transition-colors">
          <Link to="#">Offers</Link>
        </li>
        <li className="rounded min-w-[150px] hover:text-blue-600 transition-colors">
          <Link to="#">Organizations</Link>
        </li>
        <li className="rounded min-w-[150px] hover:text-blue-600 transition-colors">
          <Link to="#">Quick Bookings</Link>
        </li>
        <li className="rounded min-w-[150px] hover:text-blue-600 transition-colors">
          <Link to="/login">Login</Link>
        </li>
        <li className="rounded min-w-[150px] hover:text-blue-600 transition-colors">
          <Link to="/seasonal_destinations">Destinations</Link>
        </li>
        <li className="rounded min-w-[150px] hover:text-blue-600 transition-colors">
          <Link to="/blogs">Blogs</Link>
        </li>
        <li className="rounded min-w-[150px] hover:text-blue-600 transition-colors">
          <Link to="/about">About us</Link>
        </li>
        <li className="rounded min-w-[150px] hover:text-blue-600 transition-colors">
          <Link to="/contact">Contact us</Link>
        </li>
      </ul>
    </div>
  );
};

export default UsefulLinks;
