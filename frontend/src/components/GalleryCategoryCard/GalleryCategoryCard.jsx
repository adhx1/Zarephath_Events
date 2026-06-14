import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './GalleryCategoryCard.css';

const GalleryCategoryCard = ({ service, index = 0 }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="gallery-category-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => navigate(`/gallery/${service.slug}`)}
    >
      <img src={service.image} alt={service.title} loading="lazy" />
      <div className="gallery-category-overlay">
        <span className="gallery-category-title">{service.title}</span>
      </div>
    </motion.div>
  );
};

export default GalleryCategoryCard;
