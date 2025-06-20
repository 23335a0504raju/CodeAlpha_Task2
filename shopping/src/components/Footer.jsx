import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import './Footer.css';

const Footer = ({ scrollToSection }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h2>Shopping Mart</h2>
          <p>Discover the key features that make our shopping platform unique.</p>
        </div>

        <div className="footer-center">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('Home'); }}>Home</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('About'); }}>About</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('Contact'); }}>Contact</a></li>
          </ul>
        </div>

        <div className="footer-right">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><Facebook /></a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><Twitter /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><Instagram /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><LinkedIn /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Cloth Shopping | All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;