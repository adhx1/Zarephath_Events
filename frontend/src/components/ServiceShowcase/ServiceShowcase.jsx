import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ServiceShowcase.css';

const ServiceShowcase = ({ service, index = 0 }) => {
  const navigate = useNavigate();
  const isReverse = index % 2 !== 0;

  return (
    <div className={`service-showcase-item ${isReverse ? 'reverse' : ''}`}>
      <motion.div 
        className="service-showcase-content"
        initial={{ opacity: 0, x: isReverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h3 className="showcase-title">{service.title}</h3>
        <div className="showcase-divider"></div>
        <p className="showcase-desc">{service.description}</p>
        <button
          className="gold-btn-outline"
          onClick={() => navigate(`/gallery/${service.slug}`)}
        >
          View Events
        </button>
      </motion.div>
      
      <motion.div 
        className="service-showcase-image-wrapper"
        initial={{ opacity: 0, x: isReverse ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <div className="service-showcase-image">
          <img src={service.image} alt={service.title} loading="lazy" />
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceShowcase;
