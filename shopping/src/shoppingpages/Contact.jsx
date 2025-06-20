import { FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';
import styles from '../styles/Contact.module.css';

const Contact = () => {
  const contactInfo = [
 {
      icon: <FaEnvelope />,
      title: 'Mail',
      info: 'smilyraju8464@gmail.com',
      link: 'mailto:smilyraju8464@gmail.com'
    },
    {
      icon: <FaWhatsapp />,
      title: 'WhatsApp',
      info: '6281924785',
      link: 'https://api.whatsapp.com/send?phone=916281924785'
    },
    {
      icon: <FaPhone />,
      title: 'Call',
      info: '6281924785',
      link: 'tel:+916281924785'
    }
  ];

  return (
    <section id='contact' className={styles.contact}>
      <h2 className={styles.mainTitle}>REACH OUT TO US</h2>
      
      <div className={styles.contactCards}>
        {contactInfo.map((item, index) => (
          <a 
            key={index} 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.card}
          >
            <div className={styles.iconWrapper}>
              {item.icon}
            </div>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.info}>{item.info}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;