import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import './AboutStats.css';

const StatCounter = ({ value, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(latest) {
          if (ref.current) {
            ref.current.textContent = Math.floor(latest) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value, suffix]);

  return <span ref={ref} className="stat-number">0{suffix}</span>;
};

const AboutStats = () => {
  const stats = [
    {
      value: 250,
      suffix: '+',
      title: 'Successful Events',
      description: 'Successfully planned and managed memorable events of all sizes.'
    },
    {
      value: 33,
      suffix: '+',
      title: 'Years of Excellence',
      description: 'Delivering quality service and exceptional experiences over the years.'
    },
    {
      value: 25000,
      suffix: '+',
      title: 'Satisfied Clients',
      description: 'Building long-term relationships through trust and professionalism.'
    },
    {
      value: 100,
      suffix: '%',
      title: 'Commitment to Quality',
      description: 'Dedicated to excellence in every detail of every event.'
    }
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="about-stats-section">
      <div className="about-stats-container">
        <motion.div 
          className="about-stats-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} className="stat-card" variants={itemVariants}>
              <div className="stat-card-inner">
                <div className="stat-value">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <h3 className="stat-title">{stat.title}</h3>
                <p className="stat-description">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStats;
