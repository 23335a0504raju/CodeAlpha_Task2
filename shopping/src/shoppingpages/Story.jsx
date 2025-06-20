import styles from '../styles/Story.module.css';

const Story = () => {
  const deliveryPartners = [
    {
      name: 'Blinkit',
      logo: '/images/blinkit-logo.webp',
      url: 'https://blinkit.com'
    },
    {
      name: 'Swiggy Instamart',
      logo: '/images/instagram-logo.webp',
      url: 'https://www.swiggy.com/instamart'
    },
    {
      name: 'Amazon',
      logo: '/images/amazon-logo.webp',
      url: 'https://www.amazon.in'
    },
    {
      name: 'Zepto',
      logo: '/images/zepto.avif',
      url: 'https://www.zeptonow.com'
    }
  ];

  return (
    <section id='story' className={styles.story}>
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>OUR FASHION JOURNEY</h2>
        
        <div className={styles.videoSection}>
          <div className={styles.videoContent}>
            <div className={styles.brandLogo}>
              <img src="images/shoplogo1.png" alt="Style Haven" />
            </div>
            
          </div>
          <video 
            className={styles.video}
            controls
            poster="images/click.jpg"
          >
            <source src="vedios/8306452-uhd_4096_2160_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className={styles.storyContent}>
          <div className={styles.storyText}>
            <h3>Our Fashion Evolution</h3>
            <p>
              At Style Haven, we believe in the power of timeless fashion reimagined for modern lifestyles. Our journey began with a simple mission: to create stylish, comfortable clothing that honors craftsmanship while meeting contemporary style standards.
            </p>
          </div>

          <div className={styles.values}>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>🌿</span>
              <h4>Sustainable Fabrics</h4>
              <p>We use only premium sustainable materials, carefully sourced from ethical suppliers.</p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>💎</span>
              <h4>Quality Craftsmanship</h4>
              <p>Every garment is crafted for lasting quality without compromising on style.</p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>🧵</span>
              <h4>Artisanal Techniques</h4>
              <p>Our designs incorporate traditional tailoring methods with modern aesthetics.</p>
            </div>
          </div>
        </div>

        <div className={styles.deliverySection}>
          <h2 className={styles.deliveryTitle}>FAST FASHION DELIVERY!</h2>
          <div className={styles.deliveryPartners}>
            {deliveryPartners.map((partner, index) => (
              <a 
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.partnerLink}
              >
                <img src={partner.logo} alt={partner.name} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;