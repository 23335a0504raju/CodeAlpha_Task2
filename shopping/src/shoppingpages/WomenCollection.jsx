import { Link } from 'react-router-dom';
import styles from '../styles/WomenCollection.module.css';

const WomenCollection = () => {
  // Categories data
  const categories = [
    { id: 1, name: 'Tops', image: '/Women/1.jpg' },
    { id: 2, name: 'Dresses', image: '/Women/2.jpg' },
    { id: 3, name: 'Jeans', image: '/Women/3.jpg' },
    { id: 4, name: 'Jackets', image: '/Women/4.jpg' },
    { id: 5, name: 'Activewear', image: '/Women/5.jpg' },
    { id: 6, name: 'Formal Wear', image: '/Women/6.jpg' },
  ];

  // Featured products data
  const featuredProducts = [
    {
      id: 101,
      name: 'Silk Blouse',
      price: 39.99,
      image: '/Women/7.jpg',
      category: 'Tops',
      colors: ['White', 'Black', 'Navy']
    },
    {
      id: 102,
      name: 'Floral Summer Dress',
      price: 59.99,
      image: '/Women/8.jpg',
      category: 'Dresses',
      colors: ['Pink', 'Blue']
    },
    {
      id: 103,
      name: 'High-Waist Jeans',
      price: 49.99,
      image: '/Women/9.jpg',
      category: 'Jeans',
      colors: ['Blue', 'Black']
    },
    {
      id: 104,
      name: 'Faux Leather Jacket',
      price: 89.99,
      image: '/Women/11.jpg',
      category: 'Jackets',
      colors: ['Black', 'Brown']
    },
  ];

  return (
    <div className={styles.womenCollection}>
      {/* Hero Banner */}
      <div className={styles.heroBanner}>
        <h1>Women's Collection</h1>
        <p>Discover elegant styles for every occasion</p>
      </div>

      {/* Categories Section */}
      <section className={styles.categoriesSection}>
        <h2 className={styles.sectionTitle}>Shop by Category</h2>
        <div className={styles.categoryGrid}>
          {categories.map(category => (
            <Link 
              to={`/women/${category.name.toLowerCase().replace(' ', '-')}`} 
              key={category.id} 
              className={styles.categoryCard}
            >
              <div className={styles.categoryImageContainer}>
                <img src={category.image} alt={category.name} />
                <div className={styles.overlay}></div>
              </div>
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.featuredProducts}>
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        <div className={styles.productGrid}>
          {featuredProducts.map(product => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImageContainer}>
                <img src={product.image} alt={product.name} />
                <button className={styles.quickView}>Quick View</button>
              </div>
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <p className={styles.category}>{product.category}</p>
                <div className={styles.colorOptions}>
                  {product.colors.map((color, index) => (
                    <span 
                      key={index} 
                      className={styles.colorDot} 
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
                <p className={styles.price}>${product.price.toFixed(2)}</p>
                <button className={styles.addToCart}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals Callout */}
      <section className={styles.newArrivals}>
        <div className={styles.newArrivalsContent}>
          <h2>New Arrivals</h2>
          <p>Discover our latest women's fashion pieces</p>
          <Link to="/women/new-arrivals" className={styles.shopNowBtn}>
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WomenCollection;