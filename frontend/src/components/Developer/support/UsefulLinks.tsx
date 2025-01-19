import { Card, CardContent, CardTitle } from "../support/card"
import { Link } from "react-router-dom"

const UsefulLinks = () => {
  const links = [
    { to: "#", text: "Offers" },
    { to: "#", text: "Organizations" },
    { to: "/blogs", text: "Blogs" },
    { to: "#", text: "Quick Bookings" },
    { to: "/login", text: "Login" },
    { to: "/seasonal_destinations", text: "Destinations" },
    { to: "/about", text: "About us" },
    { to: "/contact", text: "Contact us" },
  ]

  return (
    <Card className="w-full bg-transparent border-none shadow-none">
      <CardContent className="relative p-0">
        <CardTitle className="text-center text-white text-2xl md:text-3xl font-bold">
          Useful Links
        </CardTitle>
        <ul className="grid grid-cols-2 mt-5">
          {links.map((link, index) => (
            <li key={index} className="text-center">
              <Link
                to={link.to}
                className="block p-2 rounded-md text-white hover:bg-white/10 transition-colors duration-200 ease-in-out"
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
