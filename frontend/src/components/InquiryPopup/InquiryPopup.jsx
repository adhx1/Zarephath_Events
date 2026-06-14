import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePopup } from "../../context/PopupContext";
import { submitInquiry } from "../../services/inquiryApi";
import { getServices } from "../../services/serviceApi";
import "./InquiryPopup.css";

const InquiryPopup = () => {
  const { isOpen, closePopup } = usePopup();
  console.log("Popup isOpen:", isOpen);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    place: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getServices();
        setServices(res);
      } catch (err) {
        console.error("Failed to fetch services for popup:", err);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await submitInquiry(formData);
      closePopup();
      setFormData({ name: "", phone: "", service: "", place: "" });
    } catch (err) {
      console.log("Backend Error:", err.response?.data);

      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="inquiry-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closePopup}
        >
          <motion.div
            className="inquiry-popup"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="inquiry-close" onClick={closePopup}>
              ✕
            </button>
            <h3>Get In Touch</h3>
            <p className="inquiry-subtitle">
              Fill in your details and we'll reach out shortly
            </p>

            <form className="inquiry-form" onSubmit={handleSubmit}>
              <div className="inquiry-field">
                <label>
                  Name <span>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="inquiry-field">
                <label>
                  Phone <span>*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  required
                />
              </div>

              <div className="inquiry-field">
                <label>Service</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="inquiry-field">
                <label>Place</label>
                <input
                  type="text"
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  placeholder="Event location"
                />
              </div>

              <button
                type="submit"
                className="inquiry-submit"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InquiryPopup;
