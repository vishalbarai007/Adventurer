import { Link } from "react-router-dom"
import { FaInstagram, FaFacebookSquare } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const SocialMedia = () => {
  const socialLinks = [
    { icon: FaInstagram, name: "Instagram", url: "https://www.instagram.com", color: "text-pink-600" },
    { icon: FaXTwitter, name: "Twitter", url: "https://www.twitter.com", color: "text-blue-400" },
    { icon: FaFacebookSquare, name: "Facebook", url: "https://www.facebook.com", color: "text-blue-600" },
  ]

  return (
    <Card className="w-full bg-white border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-center text-2xl md:text-3xl font-bold mb-4">Follow Us</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-center gap-4">
          {socialLinks.map((social, index) => (
            <Link
              key={index}
              to={social.url}
              className="flex flex-col items-center justify-center p-3 rounded-md transition-all duration-300 hover:bg-white/10"
            >
              <social.icon className={`text-3xl sm:text-4xl ${social.color}`} />
              <span className="mt-2 text-sm sm:text-base font-medium">{social.name}</span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default SocialMedia

