import { faAppleAlt, faHeart, faLeaf, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/Features.module.css';

const Features = () => {
  const features = [
    {
      icon: faLeaf,
      title: "Eco-Friendly Materials",
      description: "We use sustainable and organic fabrics to reduce environmental impact."
    },
    {
      icon: faHeart,
      title: "Comfort First",
      description: "Every garment is designed for both style and all-day comfort."
    },
    {
      icon: faShieldAlt,
      title: "Quality Craftsmanship",
      description: "Rigorous quality control ensures durable, long-lasting clothing."
    },
    {
      icon: faAppleAlt,
      title: "Premium Fabrics",
      description: "We source only the finest materials for superior feel and wear."
    }
  ];

  return (
    <section id="features" className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why Choose Us</h2>
          <p className={styles.subtitle}>Experience the difference of premium fashion</p>
        </div>
        
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconContainer}>
                <FontAwesomeIcon icon={feature.icon} className={styles.icon} />
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.description}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;