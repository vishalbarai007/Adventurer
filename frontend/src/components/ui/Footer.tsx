import { Link } from "react-router-dom";
import ContactForm from "../support/ContactFormFooter";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="h-fit w-full bg-[#1F3D3B] p-10 mt-10  text-[#EADED0]">

        <footer className="h-fit w-full grid gap-3 grid-cols-3 grid-rows-1">
          <div className="p-20">
            <h1 className="text-center font-bold mb-4">Quick Links</h1>
            <ul className="QuickLinks relative -mt-10 z-20 grid grid-cols-2 gap-x-40 gap-y-1 ">
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
                <Link to={"#"}>Login</Link>
              </li>
              <li className="rounded min-w-[150px]">
                <Link to={"#"}>Destinations</Link>
              </li>
              <li className="rounded min-w-[150px]">
                <Link to={"/blogs"}>Blogs</Link>
              </li>
              <li className="rounded min-w-[150px]">
                <Link to={"#"}>About us</Link>
              </li>
              <li className="rounded min-w-[150px]">
                <Link to={"#"}>Contact us</Link>
              </li>
            </ul>
          </div>

          <div className="relative p-20">
            <h1 className="text-center mb-4 font-bold">Social Media</h1>
            <ul className="QuickLinks relative -mt-10 z-20 grid grid-cols-3 gap-x-40 gap-y-1">
              <li><Link to={""} className="flex justify-center items-center gap-2"><FaInstagram />Instagram</Link></li>
              <li><Link to={""} className="flex justify-center items-center gap-2"><FaXTwitter /> Twitter </Link></li>
              <li><Link to={""} className="flex justify-center items-center gap-2"><FaFacebookSquare /> Facebook</Link></li>
            </ul>
          </div>
          <div className="relative p-20">
            <ContactForm />
          </div>




        </footer>
        <div className="w-full flex items-center justify-center border-t border-t-[#EADED0]">
        <h1 className="">@2024 Copyright Vishal All Rights Reserved </h1>

          </div>
      </div>
    </>
  )
}

export default Footer;
