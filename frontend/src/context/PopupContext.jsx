import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const PopupContext = createContext(null);

export const PopupProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

useEffect(() => {
  console.log("Popup timer started");

  const dismissed = sessionStorage.getItem(
    "inquiry_popup_dismissed"
  );

  console.log("Dismissed value:", dismissed);

   // if (dismissed) return;
   
  const timer = setTimeout(() => {
    console.log("Opening popup now");
    setIsOpen(true);
  }, 5000);

  return () => clearTimeout(timer);
}, []);// empty deps: run once on mount only

  const openPopup = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closePopup = useCallback(() => {
    setIsOpen(false);
    sessionStorage.setItem('inquiry_popup_dismissed', 'true');
  }, []);

  return (
    <PopupContext.Provider value={{ isOpen, openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};

export default PopupContext;
