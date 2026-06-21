import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import './HeroStats.css';

const StatCounter = ({ value, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: 'easeOut',
        onUpdate(latest) {
          if (ref.current) {
            ref.current.textContent = Math.floor(latest) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, suffix]);

  return (
    <span ref={ref} className="hero-stat-number">
      0{suffix}
    </span>
  );
};

const HeroStats = () => {
  const stats = [
    {
      value: 500,
      suffix: '+',
      title: 'Successful Events',
      description:
        'Successfully planned and managed memorable events of all sizes.',
    },
    {
      value: 15,
      suffix: '+',
      title: 'Years of Excellence',
      description:
        'Delivering quality service and exceptional experiences over the years.',
    },
    {
      value: 300,
      suffix: '+',
      title: 'Satisfied Clients',
      description:
        'Building long-term relationships through trust and professionalism.',
    },
    {
      value: 100,
      suffix: '%',
      title: 'Commitment to Quality',
      description:
        'Dedicated to excellence in every detail of every event.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: 'easeOut' },
    },
  };

  return (
    <section className="hero-stats-section" aria-label="Key Statistics">
      <div className="hero-stats-container">
        <motion.div
          className="hero-stats-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="hero-stat-card"
              variants={itemVariants}
            >
              <div className="hero-stat-card-inner">
                <div className="hero-stat-value">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <h3 className="hero-stat-title">{stat.title}</h3>
                
              </div>
              <span className="hero-stat-divider" aria-hidden="true" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroStats;
