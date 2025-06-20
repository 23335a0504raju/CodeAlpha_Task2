import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <h3 className={styles.logo}>StyleHaven</h3>
            <p className={styles.description}>Bringing premium fashion to your wardrobe with effortless style.</p>
          </div>
          <div>
            <h4 className={styles.title}>Quick Links</h4>
            <ul className={styles.linkList}>
              <li><a href="#home" className={styles.link}>Home</a></li>
              <li><a href="#about" className={styles.link}>About</a></li>
              <li><a href="#products" className={styles.link}>Collections</a></li>
              <li><a href="#contact" className={styles.link}>Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className={styles.title}>Contact Info</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>456 Fashion Avenue</li>
              <li className={styles.contactItem}>Style District, SD 54321</li>
              <li className={styles.contactItem}>Phone: (987) 654-3210</li>
              <li className={styles.contactItem}>Email: info@stylehaven.com</li>
            </ul>
          </div>
          <div>
            <h4 className={styles.title}>Follow Us</h4>
            <div className={styles.socialLinks}>
              <a href="https://facebook.com/stylehaven" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://twitter.com/stylehaven" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://instagram.com/stylehaven" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} StyleHaven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;