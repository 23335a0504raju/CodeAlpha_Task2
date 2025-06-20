import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Cart.module.css';

const Cart = ({ onClose }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatPrice = (price) => {
    const num = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(num) ? '0.00' : num.toFixed(2);
  };

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/');
        return;
      }

      const response = await axios.get('http://127.0.0.1:8000/api/cart/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      
      setCart(response.data);
      setCartItems(response.data.items || []);
    } catch (err) {
      setError(err.message || 'Failed to load cart');
      if (err.response?.status === 401) {
        localStorage.removeItem('authToken');
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://127.0.0.1:8000/api/cart/items/${itemId}/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      fetchCart(); // Refresh cart data
    } catch (err) {
      console.error('Error removing item:', err);
      setError('Failed to remove item from cart');
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.patch(
        `http://127.0.0.1:8000/api/cart/items/${itemId}/`,
        { quantity: newQuantity },
        {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      fetchCart(); // Refresh cart data
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError('Failed to update quantity');
    }
  };

  // const clearCart = async () => {
  //   try {
  //     const token = localStorage.getItem('authToken');
  //     await axios.delete('http://127.0.0.1:8000/api/cart/clear/', {
  //       headers: {
  //         'Authorization': `Token ${token}`
  //       }
  //     });
  //     setCartItems([]);
  //     setCart(null);
  //   } catch (err) {
  //     console.error('Error clearing cart:', err);
  //     setError('Failed to clear cart');
  //   }
  // };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <div className={styles.loading}>Loading cart...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

 
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder.jpg';
    
 
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
 
    return `http://127.0.0.1:8000${imagePath}`;
  };


  if (loading) return <div className={styles.loading}>Loading cart...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

    return (
    <div className={styles.cartOverlay}>
      <div className={styles.cartContainer}>
        <div className={styles.cartHeader}>
          <h2>Your Cart</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        {cart && (
          <div className={styles.shippingProgress}>
            <div className={styles.progressText}>
              {parseFloat(cart.total_price) >= 399 ? 'Free Shipping Unlocked!' : `$${(399 - parseFloat(cart.total_price)).toFixed(2)} away from Free Shipping`}
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${Math.min((parseFloat(cart.total_price) / 399) * 100, 100)}%` }}
              ></div>
              <div className={styles.progressAmount}>$399</div>
            </div>
            <div className={styles.freeShippingText}>Free Shipping</div>
          </div>
        )}

        <div className={styles.cartItems}>
          {cartItems.length === 0 ? (
            <p className={styles.emptyCart}>Your cart is empty.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <img 
                  src={getImageUrl(item.product.image)} 
                  alt={item.product.name} 
                  className={styles.itemImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.jpg';
                  }}
                />
                <div className={styles.itemDetails}>
                  <h3>{item.product.name}</h3>
                  <p className={styles.category}>{item.product.category}</p>
                  <div className={styles.quantityControls}>
                    <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <span className={styles.price}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <button 
                  className={styles.removeItem}
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {cart && cartItems.length > 0 && (
          <div className={styles.cartFooter}>
            <div className={styles.totalSection}>
              <div className={styles.estimatedTotal}>
                <span>${formatPrice(cart.total_price)}</span>
                <span className={styles.totalLabel}>Estimated total</span>
              </div>
              <button 
                className={styles.checkoutButton}
                onClick={() => navigate('/checkout')}
              >
                Checkout
              </button>
            </div>

            <div className={styles.secureCheckout}>
              🔒 Secured Payment
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;