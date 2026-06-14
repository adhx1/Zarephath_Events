import { BrowserRouter as Router } from 'react-router-dom';
import { SiteSettingsProvider } from './context/SiteSettingsContext';
import { PopupProvider } from './context/PopupContext';
import AppRoutes from './routes';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import InquiryPopup from './components/InquiryPopup/InquiryPopup';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {
  return (
    <SiteSettingsProvider>
      <PopupProvider>
        <Router>
          <ScrollToTop />
          <Navbar />
          <main>
            <AppRoutes />
          </main>
          <Footer />
          <WhatsAppButton />
          <InquiryPopup />
        </Router>
      </PopupProvider>
    </SiteSettingsProvider>
  );
}

export default App;
