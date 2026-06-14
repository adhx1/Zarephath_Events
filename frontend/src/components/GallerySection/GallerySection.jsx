import "./GallerySection.css";
import GalleryCategoryCard from "../../components/GalleryCategoryCard/GalleryCategoryCard";
import heroImg from "../../assets/images/images.png";
import { useEffect, useState } from "react";
import { getServices } from "../../services/serviceApi";
function Gallery() {

  const [services, setServices] = useState([]);

 useEffect(() => {
  fetchServices();
}, []);

const fetchServices = async () => {
  try {
    const data = await getServices();
    setServices(data);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <section className="gallery-page">

      <div className="gallery-header">

        <h1>Our Gallery</h1>

        <p>
          Explore our memorable events,
          celebrations, and premium
          catering experiences.
        </p>

      </div>

      <div className="gallery-grid">

        {services.map((service) => (
  <GalleryCategoryCard
    key={service.id}
    title={service.title}
    image={service.image}
    slug={service.slug}
  />
))}

      </div>

    </section>
  );
}

export default Gallery;