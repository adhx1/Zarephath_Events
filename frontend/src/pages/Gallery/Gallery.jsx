import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/axios';
import GalleryCategoryCard from '../../components/GalleryCategoryCard/GalleryCategoryCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './Gallery.css';

const Gallery = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services/');
        setServices(response.data);
      } catch (error) {
        console.error('Failed to fetch services for gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      className="gallery-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container">
        <div className="gallery-header">
          <h1 className="section-title">Gallery</h1>
        </div>

        <div className="gallery-grid">
          {services.map((service, index) => (
            <GalleryCategoryCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Gallery;
