import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import api from '../../services/axios';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import HeroStats from '../../components/HeroStats/HeroStats';
import './Home.css';

const fallbackImages = [
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80'
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
};

const Home = () => {
  const navigate = useNavigate();
  const { settings, loading: settingsLoading } = useSiteSettings();
  
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = fallbackImages;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, testimonialsRes] = await Promise.all([
          api.get('/services/'),
          api.get('/testimonials/')
        ]);
        
        // Take top 3 for preview
        setServices(servicesRes.data.slice(0, 3));
        setTestimonials(testimonialsRes.data.slice(0, 2));
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Auto slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  if (settingsLoading || loading) return <LoadingSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="home-hero">
        <AnimatePresence mode="popLayout">
          <motion.img 
            key={currentSlide}
            src={heroImages[currentSlide]} 
            alt="Zarephath Events Catering" 
            className="home-hero-bg"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.5, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>
        
        <div className="home-hero-overlay"></div>
        <div className="container">
          <motion.div 
            className="home-hero-content"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="home-hero-title">
              {settings?.hero_title || 'Fresh Flavors & Creative Catering Services'}
            </h1>
            <p className="home-hero-subtitle">
              {settings?.hero_subtitle || 'Food Catering & Services offers an elegant fine dining experience, blending modern culinary techniques with exquisite flavors.'}
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
              <button className="gold-btn" onClick={() => navigate('/services')}>
                Explore Our Services
              </button>
              <button className="gold-btn-outline" style={{ borderColor: 'var(--white)', color: 'var(--white)' }} onClick={() => navigate('/contact')}>
                Book an Event
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Stats */}
      <HeroStats />

      {/* Services Preview */}
      <section className="page-section home-services">
        <div className="container">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Our Services</h2>
            <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
              We provide premium, full-service catering for weddings, corporate events, and private gatherings, focusing on luxury, taste, and impeccable presentation.
            </p>
          </motion.div>

          <motion.div 
            className="home-services-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {services.map((service, index) => (
              <motion.div key={service.id} variants={itemVariants}>
                <ServiceCard service={service} index={index} />
              </motion.div>
            ))}
          </motion.div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button className="gold-btn-outline" onClick={() => navigate('/services/explore')}>
              Explore our events &rsaquo;
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="page-section" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container-wide">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title" style={{ textTransform: 'lowercase', letterSpacing: '2px' }}>
              what clients say
            </h2>
          </motion.div>
          <motion.div 
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px', maxWidth: '1000px', margin: '0 auto' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.id} variants={itemVariants}>
                <TestimonialCard testimonial={testimonial} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="home-cta">
        <img src={heroImages[0]} alt="Background" className="home-cta-bg" />
        <div className="home-cta-overlay"></div>
        <div className="container home-cta-content">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass-dark"
            style={{ padding: '60px 40px', borderRadius: 'var(--radius-xl)', maxWidth: '800px', margin: '0 auto' }}
          >
            <h2 style={{ color: 'var(--gold)', marginBottom: '20px', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Ready to plan your next event?</h2>
            <p style={{ color: 'var(--white)', fontSize: '1.1rem', marginBottom: '30px' }}>
              Get in touch with us today to discuss your requirements and let us make your event unforgettable.
            </p>
            <button className="gold-btn" onClick={() => navigate('/contact')} style={{ padding: '16px 48px', fontSize: '1.1rem' }}>
              Contact Us Now
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
