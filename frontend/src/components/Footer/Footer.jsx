import { Link } from "react-router-dom";
import { useSiteSettings } from "../../context/SiteSettingsContext";
import "./Footer.css";

const Footer = () => {
  const { settings } = useSiteSettings();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <h3>{settings?.business_name || "Zarephath Events"}</h3>
          <p>
            Delivering elegant fine dining experiences and premium event
            management services. Every detail, crafted to perfection.
          </p>
          <div className="footer-social">
            {settings?.instagram && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            )}
            {settings?.facebook && (
              <a
                href={settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            )}
            {settings?.youtube && (
              <a
                href={settings.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/testimonials">Testimonials</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h4>Our Services</h4>
          <div className="footer-links">
            <Link to="/gallery/family-events">Family Events</Link>
            <Link to="/gallery/corporate-events">Corporate Events</Link>
            <Link to="/gallery/catering">Catering</Link>
            <Link to="/gallery/decorations">Decorations</Link>
            <Link to="/gallery/photography-videography">Photography</Link>
          </div>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          {settings?.phone && (
            <div className="footer-contact-item">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{settings.phone}</span>
            </div>
          )}
          {settings?.email && (
            <div className="footer-contact-item">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>{settings.email}</span>
            </div>
          )}
          {settings?.address && (
            <div className="footer-contact-item">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{settings.address}</span>
              

            </div>

          
            

            
          )}

          {
        <div className="footer-map-link">
            <a href="https://www.google.com/maps/place/Zarephath+Events+And+Catering/@9.0267505,76.5754986,827m/data=!3m1!1e3!4m14!1m7!3m6!1s0x3b06069c3f3076f1:0x7bcc257c8ae07385!2sZarephath+Events+And+Catering!8m2!3d9.0267505!4d76.5754986!16s%2Fg%2F11gfjvs9z3!3m5!1s0x3b06069c3f3076f1:0x7bcc257c8ae07385!8m2!3d9.0267505!4d76.5754986!16s%2Fg%2F11gfjvs9z3!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D">
              View on Google Maps
              </a>
           </div>
          }
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>
            © {new Date().getFullYear()}{" "}
            <span>{settings?.business_name || "Zarephath Events"}</span>. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
