import ContactForm from "@/components/contact/ContactFormFooter";
import Copyright from "@/components/common/Copyright";
import SocialMedia from "@/components/common/SocialMedia";
import UsefulLinks from "@/components/common/UsefulLinks";
import "@/styles/footer.css";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

const Footer = (props: { color: string | undefined }) => {
  return (
    <footer
      className="site-footer"
      id="site-footer"
      style={
        {
          "--footer-bg": props.color || "#012c18",
        } as React.CSSProperties
      }
    >
      {/* Decorative top edge */}
      <div className="footer-top-edge" />

      <div className="footer-container">
        {/* Brand & Info Section */}
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-brand-col">
            <div className="footer-brand" id="footer-brand">
              <h2 className="footer-brand-name">
                Adven<span className="footer-brand-accent">turer</span>
              </h2>
              <p className="footer-brand-tagline">
                Discover extraordinary destinations across Maharashtra.
                Your adventure begins with a single step.
              </p>
            </div>

            {/* Contact Info */}
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <FiMapPin size={16} className="footer-contact-icon" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
              <div className="footer-contact-item">
                <FiPhone size={16} className="footer-contact-icon" />
                <span>+91 98765 43210</span>
              </div>
              <div className="footer-contact-item">
                <FiMail size={16} className="footer-contact-icon" />
                <span>hello@adventurer.com</span>
              </div>
            </div>

            {/* Social section (visible on mobile below brand) */}
            <div className="footer-social-mobile">
              <SocialMedia />
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="footer-links-col">
            <UsefulLinks />
          </div>

          {/* Column 3: Social (hidden on mobile, shown on desktop) */}
          <div className="footer-social-col">
            <SocialMedia />
          </div>

          {/* Column 4: Contact Form */}
          <div className="footer-form-col">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <Copyright />
    </footer>
  );
};

export default Footer;
