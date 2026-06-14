import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../services/axios';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './Services.css';

const Services = () => {
  const navigate = useNavigate();
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
      className="services-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container">
        <div className="services-header">
          <h1 className="section-title">Our Services</h1>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <div className="services-bottom-cta">
          <button 
            className="gold-btn" 
            style={{ padding: '15px 40px', fontSize: '1.1rem' }}
            onClick={() => navigate('/services/explore')}
          >
            Explore our events &rsaquo;
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Services;
