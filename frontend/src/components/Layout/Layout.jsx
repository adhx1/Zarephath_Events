import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import WhatsAppButton from "../WhatsAppButton/WhatsAppButton";
import InquiryPopup from "../InquiryPopup/InquiryPopup";
import { Outlet } from "react-router-dom";
import "./Layout.css";

function Layout() {
  return (
    <>
      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
        <WhatsAppButton />
        <InquiryPopup />

    </>
  );
}

export default Layout;