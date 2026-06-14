import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import ServiceExplore from './pages/ServiceExplore/ServiceExplore';
import Gallery from './pages/Gallery/Gallery';
import EventGallery from './pages/EventGallery/EventGallery';
import Testimonials from './pages/Testimonials/Testimonials';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/explore" element={<ServiceExplore />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:serviceSlug" element={<EventGallery />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
