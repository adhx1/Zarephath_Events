import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/axios';

const SiteSettingsContext = createContext(null);

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get('/site-settings/');
        setSettings(response.data);
      } catch (error) {
        console.error('Failed to fetch site settings:', error);
        // Fallback defaults
        setSettings({
          business_name: 'Zarephath Events',
          phone: '',
          whatsapp: '',
          email: '',
          address: '',
          hero_title: 'Crafting Memorable Events Through Exquisite Catering',
          hero_subtitle: 'From intimate gatherings to grand celebrations, Zarephath Events delivers exceptional catering services with delicious cuisine, impeccable presentation, and unmatched hospitality.',
          instagram: '',
          facebook: '',
          youtube: '',
          logo: null,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};

export default SiteSettingsContext;
