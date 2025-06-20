import { Link } from 'react-router-dom';
import styles from '../styles/ProductSection.module.css';

const ProductSection = () => {
  return (
    <div className={styles.productSectionContainer}>
      <h1 className={styles.mainTitle}>STYLES FOR EVERY OCCASION – CASUAL TO ELEGANT!</h1>
      
      <div className={styles.categoriesContainer}>
        <Link to="/menscollection" className={styles.categoryCard}>
          <div className={styles.imageContainer}>
            <img src="/images/about.jpg" alt="Men's Collection" />
            <div className={styles.imageOverlay}>
              <h2>MEN'S COLLECTION</h2>
              <p>Click to explore our stylish and comfortable men's wear</p>
            </div>
          </div>
        </Link>

        <Link to="/womenscollection" className={styles.categoryCard}>
          <div className={styles.imageContainer}>
            <img src="/images/product.jpeg" alt="Women's Collection" />
            <div className={styles.imageOverlay}>
              <h2>WOMEN'S COLLECTION</h2>
              <p>Click to explore our fashionable and trendy women's wear</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductSection;