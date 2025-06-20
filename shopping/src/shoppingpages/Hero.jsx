import { useEffect, useState } from 'react';
import styles from '../styles/Hero.module.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/home6.jpg",
      title: "New Collection Just Dropped",
      subtitle: "Shop the Latest Trends Now",
      buttonText: "Explore Collection"
    },
    {
      image: "/images/home4.jpg",
      title: "Elevate Your Wardrobe",
      subtitle: "Premium Quality Fashion",
      buttonText: "Shop Now"
    },
    {
      image: "/images/home5.jpg",
      title: "Sustainable & Stylish",
      subtitle: "Ethically Made Apparel",
      buttonText: "Discover More"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className={styles.hero}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${styles.slideBackground} ${
            currentSlide === index ? styles.active : ''
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}
      <div className={styles.overlay}></div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            {slides[currentSlide].title}
          </h1>
          <p className={styles.subtitle}>
            {slides[currentSlide].subtitle}
          </p>
          <button className={styles.button}>
            {slides[currentSlide].buttonText}
          </button>
        </div>
      </div>

      <div className={styles.slideIndicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${currentSlide === index ? styles.active : ''}`}
            onClick={() => handleSlideChange(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className={styles.scrollingBar}>
        <div className={styles.scrollingWrapper}>
          <div className={styles.scrollingContent}>
            <div className={styles.scrollText}>
              <span>Trendy</span>
              <span className={styles.dot}>•</span>
              <span>Fashionable</span>
              <span className={styles.dot}>•</span>
              <span>Comfortable</span>
            </div>
            
            {/* Repeat to make scrolling seamless */}
            <div className={styles.scrollText}>
              <span>Trendy</span>
              <span className={styles.dot}>•</span>
              <span>Fashionable</span>
              <span className={styles.dot}>•</span>
              <span>Comfortable</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;