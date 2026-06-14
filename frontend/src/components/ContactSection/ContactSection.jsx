import "./ContactSection.css";

import { useState, useEffect } from "react";

import { submitInquiry } from "../../services/inquiryApi";
import { getServices } from "../../services/serviceApi";

import {
  useSiteSettings,
} from "../../context/SiteSettingsContext";

function ContactSection() {

  const [services, setServices] = useState([]);

  const [success, setSuccess] = useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const {
    settings,
    loading,
  } = useSiteSettings();

  const [formData, setFormData] =
    useState({
      name: "",
      phone: "",
      service: "",
      place: "",
      message: "",
    });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data =
        await getServices();

      setServices(data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setSubmitting(true);

    try {

      await submitInquiry(formData);

      setSuccess(true);

      setFormData({
        name: "",
        phone: "",
        service: "",
        place: "",
        message: "",
      });

    } catch (error) {

      console.log(
        error.response?.data
      );

      console.error(error);

    } finally {

      setSubmitting(false);

    }
  };

  if (loading || !settings) {
    return null;
  }

  return (
    <section
      id="contact"
      className="contact-section"
    >
      <div className="contact-content">

        <h2>
          Let's Create Your
          Next Memorable Event
        </h2>

        <p>
          Contact us today to discuss your
          catering and event requirements.
        </p>

        <div className="contact-info">

          <p>
            <strong>Phone:</strong>{" "}
            {settings.phone}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {settings.email}
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {settings.address}
          </p>

        </div>

        <a
          href={`https://wa.me/${settings.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="whatsapp-contact-btn"
        >
          Chat on WhatsApp
        </a>

        <div className="social-links">

          {settings.instagram && (
            <a
              href={settings.instagram}
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          )}

          {settings.facebook && (
            <a
              href={settings.facebook}
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          )}

          {settings.youtube && (
            <a
              href={settings.youtube}
              target="_blank"
              rel="noreferrer"
            >
              YouTube
            </a>
          )}

        </div>

      </div>

      <form
        className="contact-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          placeholder="Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        >
          <option value="">
            Select Event Type
          </option>

          {services.map((service) => (
            <option
              key={service.id}
              value={service.id}
            >
              {service.title}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Location"
          name="place"
          value={formData.place}
          onChange={handleChange}
          required
        />

        <textarea
          rows="5"
          placeholder="Tell us about your event..."
          name="message"
          value={formData.message}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={submitting}
        >
          {
            submitting
              ? "Sending..."
              : "Send Inquiry"
          }
        </button>

        {success && (
          <p className="success-msg">
            Inquiry submitted successfully.
          </p>
        )}

      </form>
    </section>
  );
}

export default ContactSection;