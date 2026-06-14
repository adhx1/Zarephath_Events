import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../services/axios';
import GalleryImageCard from '../../components/GalleryImageCard/GalleryImageCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './EventGallery.css';

const EventGallery = () => {
  const { serviceSlug } = useParams();
  const navigate = useNavigate();
  
  const [gallery, setGallery] = useState([]);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const [galleryRes, servicesRes] = await Promise.all([
          api.get(`/gallery/service/${serviceSlug}/`).catch(() => ({ data: [] })),
          api.get('/services/')
        ]);
        
        setGallery(galleryRes.data);
        
        const currentService = servicesRes.data.find(s => s.slug === serviceSlug);
        if (currentService) {
          setService(currentService);
        } else {
          // Fallback title formatting
          setService({ title: serviceSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') });
        }
      } catch (error) {
        console.error('Failed to fetch event gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [serviceSlug]);

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      className="event-gallery-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container-wide">
        <div className="event-gallery-header">
          <button 
            className="gold-btn-outline" 
            style={{ padding: '8px 16px', marginBottom: '20px', fontSize: '0.85rem' }}
            onClick={() => navigate('/gallery')}
          >
            &lsaquo; Back to Categories
          </button>
          <h1>{service?.title || 'Gallery'}</h1>
        </div>

        {gallery.length > 0 ? (
          <div className="event-gallery-masonry">
            {gallery.map((item, index) => (
              <GalleryImageCard key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="event-gallery-empty">
            <p>We are currently updating our gallery for {service?.title || 'this service'}. Check back soon!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EventGallery;
