import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/MenCollection.module.css';

const MenCollection = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('https://codealpha-task2.onrender.com/api/products/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });

        setProducts(response.data);

        
        const uniqueCategories = [...new Set(response.data.map(p => p.category))];
        const categoryData = uniqueCategories.map((category, index) => ({
          id: index + 1,
          name: category,
          image: response.data.find(p => p.category === category)?.image || '/placeholder.jpg'
        }));
        
        setCategories(categoryData);
        setLoading(false);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('authToken');
          navigate('/login');
        } else {
          setError(err.message || 'Failed to load products');
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleAddToCart = async (product) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    const response = await axios.post(
      'https://codealpha-task2.onrender.com/api/cart/items/',
      {
        product_id: product.id,
        price: product.price, // Include the current price
        quantity: 1 // Default quantity
      },
      {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Added to cart:', response.data);
    // You can add a success notification here
    alert(`${product.name} added to cart!`);
  } catch (error) {
    console.error('Error adding to cart:', error);
    alert('Failed to add item to cart');
  }
};


  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.menCollection}>
      {/* Hero Banner */}
      <div className={styles.heroBanner}>
        <h1>Men's Collection</h1>
        <p>Discover premium styles for every occasion</p>
      </div>

      {/* Categories Section */}
      <section className={styles.categoriesSection}>
        <h2 className={styles.sectionTitle}>Shop by Category</h2>
        <div className={styles.categoryGrid}>
          {categories.map(category => (
            <Link 
              to={`/men/${category.name.toLowerCase().replace(' ', '-')}`} 
              key={category.id} 
              className={styles.categoryCard}
            >
              <div className={styles.categoryImageContainer}>
                <img 
                  src={category.image} 
                  alt={category.name}
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = '/placeholder.jpg';
                  }}
                />
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
          {products.map(product => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImageContainer}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = '/placeholder.jpg';
                  }}
                />
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
                <p className={styles.price}>${parseFloat(product.price).toFixed(2)}</p>
                      <button 
                        className={styles.addToCart}
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals Callout */}
      <section className={styles.newArrivals}>
        <div className={styles.newArrivalsContent}>
          <h2>New Arrivals</h2>
          <p>Discover our latest men's fashion pieces</p>
          <Link to="/men/new-arrivals" className={styles.shopNowBtn}>
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MenCollection;