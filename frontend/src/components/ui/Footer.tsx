import { Link } from "react-router-dom";
import ContactForm from "../support/ContactFormFooter";
import { FaInstagram, FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
// import CouponsAndDeals from "./CouponsAndDeals";

const Footer = (props: { color: any; }) => {
  return (
    <div
      className="FooterBlock h-fit w-full  mt-10 text-[#EADED0] bg-cover "
      style={{ backgroundColor: props.color || "#1F3D3B" }}
    >
      <div className="h-full w-full p-10 inset-0 bg-black bg-opacity-50">
      <footer className="footer h-fit w-full grid gap-3 grid-cols-3 grid-rows-1 ">
      {/* md:gap-5 md:grid-cols-3 md:grid-rows-2 sm:grid-cols-1 sm:grid-rows-3 sm:gap-y-5 */}
  {/* Useful Links Section */}
  <div className="relative p-20">
    <h1 className="text-center font-bold text-2xl mb-4">Useful Links</h1>
    <ul className="QuickLinks relative -mt-10 z-20 grid grid-cols-2 gap-x-10 gap-y-1 md:gap-x-20">
      <li className="rounded min-w-[150px]">
        <Link to={"#"}>Offers</Link>
      </li>
      <li className="rounded min-w-[150px]">
        <Link to={"#"}>Organizations</Link>
      </li>
      <li className="rounded min-w-[150px]">
        <Link to={"#"}>Quick Bookings</Link>
      </li>
      <li className="rounded min-w-[150px]">
        <Link to={"/login"}>Login</Link>
      </li>
      <li className="rounded min-w-[150px]">
        <Link to={"/seasonal_destinations"}>Destinations</Link>
      </li>
      <li className="rounded min-w-[150px]">
        <Link to={"/blogs"}>Blogs</Link>
      </li>
      <li className="rounded min-w-[150px]">
        <Link to={"/about"}>About us</Link>
      </li>
      <li className="rounded min-w-[150px]">
        <Link to={"/contact"}>Contact us</Link>
      </li>
    </ul>
  </div>

  {/* Social Media Section */}
  <div className="relative p-20">
    <h1 className="text-center mb-4 text-2xl font-bold">Social Media</h1>
    <ul className="QuickLinks relative -mt-10 z-20 grid grid-cols-3 gap-x-5 sm:gap-x-10">
      <li>
        <Link to={""} className="flex justify-center items-center gap-2">
          <FaInstagram />
          Instagram
        </Link>
      </li>
      <li>
        <Link to={""} className="flex justify-center items-center gap-2">
          <FaXTwitter /> Twitter
        </Link>
      </li>
      <li>
        <Link to={""} className="flex justify-center items-center gap-2">
          <FaFacebookSquare /> Facebook
        </Link>
      </li>
    </ul>
  </div>

  {/* Contact Form Section */}
  <div className="relative p-20">
    <ContactForm />
  </div>
</footer>

      <div className="w-full flex items-center justify-center border-t border-t-[#EADED0]">
        <h1 className="">@2024 Copyright Vishal All Rights Reserved</h1>
      </div>
      </div>
     
    </div>
  );
};

export default Footer;
