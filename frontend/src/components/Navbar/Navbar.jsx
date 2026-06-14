import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import api from '../../services/axios';
import './Navbar.css';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/services/explore', label: 'Services' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/about', label: 'About' },
  { path: '/testimonials', label: 'Testimonials' },
  { path: '/contact', label: 'Contact' },
  
  

];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useSiteSettings();


  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Services Dropdown State
  const [services, setServices] = useState([]);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const isHome = location.pathname === '/';

  // Fetch Services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services/');
        setServices(response.data);
      } catch (error) {
        console.error('Failed to fetch services for navbar:', error);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDesktopDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset mobile accordion when closing drawer
      setTimeout(() => setMobileServicesOpen(false), 300);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Determine navbar appearance based on scroll and route
  let navbarClass = 'navbar-white';
  if (isHome && !scrolled) {
    navbarClass = 'navbar-transparent';
  } else if (scrolled) {
    navbarClass = 'navbar-gold';
  }

  // Determine logo text color
  let logoZColor = 'var(--gold)';
  let logoTextColor = 'var(--black)';
  if (navbarClass === 'navbar-transparent') {
    logoZColor = 'var(--gold)';
    logoTextColor = 'var(--white)';
  } else if (navbarClass === 'navbar-gold') {
    logoZColor = 'var(--white)';
    logoTextColor = 'var(--black)';
  }
console.log("Logo URL:", settings?.logo);
  return (
    <>
      <nav className={`navbar ${navbarClass}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo hover-lift-logo">
            {settings?.logo ? (
              
<img
  src={settings?.logo}
  alt="Logo"
  className="navbar-dynamic-logo"


/>

            ) : (
              <div className="navbar-logo-text" style={{ color: logoTextColor, transition: 'color 0.4s ease' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, color: logoZColor, transition: 'color 0.4s ease' }}>Z</span>
                <br />
                <span style={{ letterSpacing: '2px' }}>ZAREPHATH</span>
                <br />
                <span style={{ fontSize: '0.65rem', letterSpacing: '4px', opacity: 0.8 }}>— EVENTS —</span>
              </div>
            )}
          </Link>

          {/* Desktop Links */}
          <ul className="navbar-links">
            {navItems.map((item) => {
              if (item.label === 'Services') {
                return (
                  <li 
                    key={item.path}
                    className="navbar-dropdown-container"
                    onMouseEnter={() => setDesktopDropdownOpen(true)}
                    onMouseLeave={() => setDesktopDropdownOpen(false)}
                    onFocus={() => setDesktopDropdownOpen(true)}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `navbar-link ${isActive ? 'active' : ''}`
                      }
                      end={item.path === '/'}
                    >
                      {item.label}
                    </NavLink>
                    
                    <AnimatePresence>
                      {desktopDropdownOpen && (
                        <motion.div
                          className="navbar-dropdown-menu"
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          role="menu"
                          aria-orientation="vertical"
                        >
                          <ul className="dropdown-list">
                            {services.map(service => (
                              <li key={service.id} role="none">
                                <button 
                                  className="dropdown-link"
                                  role="menuitem"
                                  onClick={() => {
                                    setDesktopDropdownOpen(false);
                                    navigate(`/gallery/${service.slug}`);
                                  }}
                                >
                                  {service.title}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `navbar-link ${isActive ? 'active' : ''}`
                    }
                    end={item.path === '/'}
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className={`navbar-menu-btn ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer (Animated with Framer Motion) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Mobile Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="navbar-mobile-overlay show"
              onClick={() => setMobileOpen(false)}
            />
            
            {/* Mobile Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }}
              className="navbar-mobile-drawer open"
            >
              <ul className="navbar-mobile-links">
                {navItems.map((item, i) => {
                  if (item.label === 'Services') {
                    return (
                      <motion.li 
                        key={item.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + (i * 0.05), duration: 0.3 }}
                        className="mobile-accordion-container"
                      >
                        <div 
                          className={`navbar-mobile-link mobile-services-toggle ${mobileServicesOpen ? 'expanded' : ''}`}
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        >
                          <span>{item.label}</span>
                          <motion.span
                            animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="accordion-icon"
                          >
                            ▼
                          </motion.span>
                        </div>
                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="mobile-accordion-content"
                            >
                              <ul className="mobile-services-list">
                                {services.map(service => (
                                  <li key={service.id}>
                                    <button
                                      className="mobile-service-link"
                                      onClick={() => {
                                        setMobileOpen(false);
                                        navigate(`/gallery/${service.slug}`);
                                      }}
                                    >
                                      {service.title}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.li>
                    );
                  }

                  return (
                    <motion.li 
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (i * 0.05), duration: 0.3 }}
                    >
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `navbar-mobile-link ${isActive ? 'active' : ''}`
                        }
                        end={item.path === '/'}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </NavLink>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
