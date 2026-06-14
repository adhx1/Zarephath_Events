import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './GalleryImageCard.css';

const GalleryImageCard = ({ item, index = 0 }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const isVideo = item.media_type === 'video';

  return (
    <>
      <motion.div
        className="gallery-image-card"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
        onClick={() => setIsLightboxOpen(true)}
      >
        {isVideo ? (
          <video src={item.media_file} muted loop playsInline />
        ) : (
          <img src={item.media_file} alt={item.title || 'Gallery image'} loading="lazy" />
        )}
        
        <div className="gallery-image-icon">
          {isVideo ? (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={() => setIsLightboxOpen(false)}>&times;</button>
              
              {isVideo ? (
                <video className="lightbox-media" src={item.media_file} controls autoPlay />
              ) : (
                <img className="lightbox-media" src={item.media_file} alt={item.title || 'Gallery view'} />
              )}
              
              {(item.title || item.description) && (
                <div className="lightbox-caption">
                  {item.title && <strong>{item.title}</strong>}
                  {item.title && item.description && ' - '}
                  {item.description}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryImageCard;
