import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

const UsefulLinks = () => {
  const linkGroups = [
    {
      title: "Explore",
      links: [
        { to: "/seasonal_destinations", text: "Destinations" },
        { to: "#", text: "Offers" },
        { to: "#", text: "Quick Bookings" },
        { to: "#", text: "Organizations" },
      ],
    },
    {
      title: "Company",
      links: [
        { to: "/about", text: "About Us" },
        { to: "/contact", text: "Contact Us" },
        { to: "/blogs", text: "Blog" },
        { to: "/login", text: "My Account" },
      ],
    },
  ];

  return (
    <div className="footer-links-wrapper" id="footer-useful-links">
      {linkGroups.map((group, gIdx) => (
        <div key={gIdx} className="footer-link-group">
          <h3 className="footer-section-title">
            <span className="footer-title-accent">{group.title.split(" ")[0]}</span>{" "}
            {group.title.split(" ").slice(1).join(" ")}
          </h3>
          <ul className="footer-link-list">
            {group.links.map((link, index) => (
              <li key={index} className="footer-link-item">
                <Link to={link.to} className="footer-link">
                  <FiChevronRight className="footer-link-icon" size={14} />
                  <span>{link.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default UsefulLinks;
