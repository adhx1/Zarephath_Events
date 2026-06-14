import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ServiceCard.css';

const ServiceCard = ({ service, index = 0 }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="service-card hover-lift"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
    >
  
      <h3 className="service-card-title">{service.title}</h3>
      <p className="service-card-desc">{service.description}</p>
      <button
        className="service-card-link"
        onClick={() => navigate(`/gallery/${service.slug}`)}
      >
        View Details <span>&rarr;</span>
      </button>
    </motion.div>
  );
};

export default ServiceCard;
