import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiYoutube, FiMail } from "react-icons/fi";

const SocialMedia = () => {
  const socialLinks = [
    {
      icon: FaInstagram,
      name: "Instagram",
      url: "https://www.instagram.com",
      hoverClass: "footer-social-instagram",
    },
    {
      icon: FaXTwitter,
      name: "Twitter",
      url: "https://www.twitter.com",
      hoverClass: "footer-social-twitter",
    },
    {
      icon: FaFacebookF,
      name: "Facebook",
      url: "https://www.facebook.com",
      hoverClass: "footer-social-facebook",
    },
    {
      icon: FiYoutube,
      name: "YouTube",
      url: "https://www.youtube.com",
      hoverClass: "footer-social-youtube",
    },
    {
      icon: FiMail,
      name: "Email",
      url: "mailto:contact@adventurer.com",
      hoverClass: "footer-social-email",
    },
  ];

  return (
    <div className="footer-social-wrapper" id="footer-social-media">
      <h3 className="footer-section-title">
        <span className="footer-title-accent">Connect</span> With Us
      </h3>
      <p className="footer-section-subtitle">
        Follow us on social media for travel inspiration
      </p>
      <div className="footer-social-icons">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`footer-social-link ${social.hoverClass}`}
            aria-label={social.name}
          >
            <social.icon size={20} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;
