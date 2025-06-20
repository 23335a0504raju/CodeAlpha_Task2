import { faBars, faSearch, faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';
import Cart from './Cart';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleUser = () => {
    navigate('/profile');
  };
  
  const handleContactClick = () => {
    navigate('/contact');
  };
  
  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <div className={styles.announcement}>
        <p>FREE SHIPPING on orders above Rs 399</p>
      </div>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.navContent}>
            
            {/* Search Icon and Expandable Search Box */}
            <FontAwesomeIcon 
              icon={faSearch} 
              className={styles.searchIcon}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            {isSearchOpen && (
              <div className={styles.expandedSearch}>
                <div className={styles.searchInputWrapper}>
                  <input
                    type="text"
                    placeholder="Search..."
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSearch();
                    }}
                    autoFocus
                  />
                  <FontAwesomeIcon 
                    icon={faSearch} 
                    className={styles.searchInputIcon}
                    onClick={handleSearch}
                  />
                </div>
              </div>
            )}

            <div className={styles.mainNav}>
              <a href="#bestseller" className={styles.link}>BESTSELLERS</a>
              <div className={styles.shopDropdown}>
                <a href="#features" className={styles.link}>SHOP</a>
              </div>
            </div>

            <div className={styles.logo}>
              <img src="/images/shoplogo1.png" alt="FitFinder" />
            </div>

            <div className={styles.mainNav}>
              <a href="#story" className={styles.link}>OUR STORY</a>
              <a href="#contact" onClick={handleContactClick} className={styles.link}>CONTACT US</a>
            </div>

            <div className={styles.navIcons}>
              <FontAwesomeIcon 
                icon={faShoppingCart} 
                className={styles.icon} 
                onClick={handleCartClick}
              />
            </div>

            <div className={styles.mobileMenuButton}>
              <button onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
              </button>
            </div>
            <div className={styles.navIcons}>
              <FaUserCircle
                className={styles.icon}
                onClick={handleUser} // Fixed: removed the arrow function wrapper
              />
            </div>
          </div>

          {isOpen && (
            <div className={styles.mobileMenu}>
              <div className={styles.mobileMenuLinks}>
                <a href="#bestseller">BESTSELLERS</a>
                <a href="#features">SHOP</a>
                <a href="#story">OUR STORY</a>
                <a href="#contact">CONTACT US</a>
                <a onClick={handleUser} style={{cursor: 'pointer'}}>Profile</a>
              </div>
            </div>
          )}
        </div>
      </nav>
      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </>
  );
};

export default Navbar;