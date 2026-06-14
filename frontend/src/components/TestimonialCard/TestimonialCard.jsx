import { motion } from 'framer-motion';
import './TestimonialCard.css';

const TestimonialCard = ({ testimonial, index = 0 }) => {
  const rating = parseInt(testimonial.rating, 10) || 5;

  return (
    <motion.div
      className="testimonial-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      <div className="testimonial-header">
        <div className="testimonial-user">
          {testimonial.customer_image ? (
            <img 
              src={testimonial.customer_image} 
              alt={testimonial.customer_name} 
              className="testimonial-avatar"
              loading="lazy"
            />
          ) : (
            <div className="testimonial-avatar-placeholder">
              {testimonial.customer_name.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="testimonial-name">{testimonial.customer_name}</span>
        </div>
        
        <div className="testimonial-stars">
          {[1, 2, 3, 4, 5].map((star, i) => (
            <motion.svg 
              key={star} 
              className={`testimonial-star ${star <= rating ? 'filled' : ''}`} 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (i * 0.1), type: 'spring', stiffness: 200 }}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </motion.svg>
          ))}
        </div>
      </div>
      
      <p className="testimonial-review">
        {testimonial.review}
      </p>
    </motion.div>
  );
};

export default TestimonialCard;
