import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getServices } from '../../services/serviceApi';
import { submitInquiry } from '../../services/inquiryApi';
import './Contact.css';

const Contact = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    place: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitInquiry({
        name: formData.name,
        phone: formData.phone,
        service: formData.service,
        place: formData.place,
        message: formData.message,
      });

      setSubmitStatus('success');
      setFormData({ name: '', phone: '', service: '', place: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (err) {
      console.error('Failed to submit inquiry:', err);
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="contact-container">
        <motion.div
          className="contact-card"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="contact-card-header">
            <h1 className="contact-title">Get in Touch</h1>
            <p className="contact-subtitle">We would love to hear from you and craft your perfect event.</p>
            <div className="contact-divider"></div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-field floating-label-group">
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="name">Full Name <span>*</span></label>
            </div>

            <div className="contact-field floating-label-group">
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="phone">Phone Number <span>*</span></label>
            </div>

            <div className="contact-field floating-label-group">
              <select
                name="service"
                id="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">Select a Service *</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>

            <div className="contact-field floating-label-group">
              <input
                type="text"
                name="place"
                id="place"
                value={formData.place}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="place">Event Location <span>*</span></label>
            </div>

            <div className="contact-field floating-label-group">
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
              ></textarea>
              <label htmlFor="message">Your Message</label>
            </div>

            {submitStatus === 'error' && (
              <div className="contact-error-msg">There was an error sending your message. Please try again.</div>
            )}

            {submitStatus === 'success' && (
              <div className="contact-success-msg">Inquiry submitted successfully.
Our team will contact you shortly.</div>
            )}

            <button
              type="submit"
              className={`gold-btn contact-submit ${submitting ? 'loading' : ''}`}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : 'Send Message'}
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
