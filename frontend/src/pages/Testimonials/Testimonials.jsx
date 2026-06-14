import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/axios';
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './Testimonials.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get('/testimonials/');
        setTestimonials(response.data);
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto sliding carousel
  useEffect(() => {
    if (testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000); // 6 seconds slide

    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      className="testimonials-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-wide">
        <div className="testimonials-header">
          <motion.h1 
            className="section-title" 
            style={{ textTransform: 'lowercase', letterSpacing: '2px' }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            what clients say
          </motion.h1>
          <motion.p
            style={{ fontSize: '1.1rem', color: 'var(--gray-text)', maxWidth: '600px', margin: '0 auto 40px auto' }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Hear from our satisfied clients about their experiences with our premium catering and event management services.
          </motion.p>
        </div>

        {testimonials.length > 0 ? (
          <div className="testimonials-carousel-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="testimonials-carousel-slide"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <TestimonialCard testimonial={testimonials[currentIndex]} />
              </motion.div>
            </AnimatePresence>
            
            <div className="testimonials-indicators">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`testimonial-indicator ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="testimonials-empty">
            <p>No testimonials available yet.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Testimonials;
