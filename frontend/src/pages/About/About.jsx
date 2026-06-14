import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import './About.css';

const About = () => {
  const { settings } = useSiteSettings();
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Parallax Header */}
      <div ref={ref} className="about-parallax-container">
        <motion.div 
          className="about-parallax-bg" 
          style={{ 
            y: yBg,
            backgroundImage: `url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80')`
          }} 
        />
        <div className="about-parallax-overlay"></div>
        <motion.div 
          className="about-parallax-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="about-title">Our Story</h1>
          <p className="about-subtitle">Crafting unforgettable experiences through culinary excellence</p>
        </motion.div>
      </div>

      <div className="container about-main-content">
        <motion.div 
          className="about-content"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="about-text-block">
            <h2 className="about-heading-elegant">
              Fine Dining at {settings?.business_name || 'Food Catering & Services'}
            </h2>
            <div className="about-divider"></div>
            
            <p className="about-paragraph highlight">
              {settings?.business_name || 'Food Catering & Services'} brings an elegant fine dining experience with a refined touch, offering carefully curated dishes made from high-quality, fresh ingredients.
            </p>
            <p className="about-paragraph">
              Every meal is thoughtfully prepared, blending traditional flavors with modern culinary techniques to create a luxurious dining experience. We believe that food is not just sustenance, but an art form that brings people together and creates lasting memories.
            </p>
            <p className="about-paragraph">
              Guests can expect beautifully plated dishes, impeccable service, and a well-crafted menu featuring classic favorites with a refined twist—from succulent meats to gourmet seafood and elevated golden desserts.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
