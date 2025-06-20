import styles from '../styles/About.module.css';

const About = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <h2 className={`${styles.title} ${styles.fadeInUp}`}>Our Boutique</h2>
            <p className={`${styles.description} ${styles.fadeInUp}`}>
              At StyleHub, we believe that fashion should be stylish and accessible to everyone. 
              Our journey began with a simple mission: to create trendy clothing options that don't compromise on quality or comfort.
            </p>
            <p className={`${styles.description} ${styles.fadeInUp}`}>
              Every piece in our collection is carefully curated from the finest fabrics, 
              ensuring you get the best of both style and comfort in every outfit.
            </p>
            <button className={`${styles.button} ${styles.pulseEffect}`}>Discover Our Story</button>
          </div>
          <div className={`${styles.imageContainer} ${styles.fadeInRight}`}>
            <img src="/images/about1.jpeg" alt="About StyleHub" className={styles.image} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;