import { Card, CardContent, CardTitle } from "../ui/card"
import { Link } from "react-router-dom"

const UsefulLinks = () => {
  const links = [
    { to: "#", text: "Offers" },
    { to: "#", text: "Organizations" },
    { to: "#", text: "Quick Bookings" },
    { to: "/login", text: "Login" },
    { to: "/seasonal_destinations", text: "Destinations" },
    { to: "/blogs", text: "Blogs" },
    { to: "/about", text: "About us" },
    { to: "/contact", text: "Contact us" },
  ]

  return (
    <Card className="w-full bg-transparent border-none shadow-none">
      
      <CardContent className="relative flex p-0 justify-center ">
      <CardTitle className="text-center text-white text-2xl md:text-3xl font-bold">Useful Links</CardTitle>

        <ul className="flex flex-wrap gap-4 justify-center  md:justify-start ">
          {links.map((link, index) => (
            <li key={index} className="w-[calc(50%-0.5rem)] text-white md:w-auto">
              <Link
                to={link.to}
                className="block w-full p-2 rounded-md hover:bg-white/10 transition-colors duration-200 ease-in-out text-center md:text-left"
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default UsefulLinks

