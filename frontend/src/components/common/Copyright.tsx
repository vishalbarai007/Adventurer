import { FiHeart } from "react-icons/fi";

const Copyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer-copyright" id="footer-copyright">
      <div className="footer-copyright-divider" />
      <div className="footer-copyright-content">
        <p className="footer-copyright-text">
          © {currentYear} <span className="footer-copyright-brand">Adventurer</span>. All rights reserved.
        </p>
        <p className="footer-copyright-made">
          Made with <FiHeart className="footer-heart-icon" size={14} /> by Vishal
        </p>
      </div>
    </div>
  );
};

export default Copyright;
