import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/axios';
import ServiceShowcase from '../../components/ServiceShowcase/ServiceShowcase';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './ServiceExplore.css';

const ServiceExplore = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services/');
        setServices(response.data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      className="service-explore-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="service-explore-hero">
        <div className="container text-center">
          <motion.h1 
            className="section-title"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Explore Our Services
          </motion.h1>
          <motion.p
            style={{ fontSize: '1.1rem', color: 'var(--gray-text)', maxWidth: '700px', margin: '0 auto 60px auto' }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover our comprehensive range of premium catering and event management services, tailored to make your special occasions truly extraordinary.
          </motion.p>
        </div>
      </div>

      <div className="container">
        <div className="service-explore-list">
          {services.map((service, index) => (
            <ServiceShowcase key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceExplore;
