import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialMedia = () => {
    return (
        <div className="relative px-10 py-24 flex justify-center items-center bg-gray-100 rounded-lg shadow-md h-auto">
            <h1 className="absolute text-center text-3xl mb-10 -mt-16 font-bold text-gray-800">Follow Us</h1>
            <ul className="grid grid-cols-3 -mt-8 gap-y-6 gap-x-4 justify-items-center">
                <li className="flex flex-col items-center">
                    <Link
                        to="www.instagram.com"
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-md transition-all duration-300 hover:bg-gray-200"
                    >
                        <FaInstagram className="text-2xl sm:text-3xl lg:text-3xl xl:text-3xl text-pink-600" />
                        <span className="text-sm sm:text-base font-medium text-gray-700">Instagram</span>
                    </Link>
                </li>
                <li className="flex flex-col items-center">
                    <Link
                        to="www.twitter.com"
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-md transition-all duration-300 hover:bg-gray-200"
                    >
                        <FaXTwitter className="text-2xl sm:text-3xl lg:text-3xl xl:text-3xl text-blue-600" />
                        <span className="text-sm sm:text-base font-medium text-gray-700">Twitter</span>
                    </Link>
                </li>
                <li className="flex flex-col items-center">
                    <Link
                        to="www.facebook.com"
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-md transition-all duration-300 hover:bg-gray-200"
                    >
                        <FaFacebookSquare className="text-2xl sm:text-3xl lg:text-3xl xl:text-3xl text-blue-700" />
                        <span className="text-sm sm:text-base font-medium text-gray-700">Facebook</span>
                    </Link>
                </li>
            </ul>

        </div>
    );
};

export default SocialMedia;
