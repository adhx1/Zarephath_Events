//no need this file , didnt used in web

import "./ServiceSection.css";
import ServiceCard from "../ServiceCard/ServiceCard";
import heroImg from "../../assets/images/images.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServices } from "../../services/serviceApi";

function Services() {

  const navigate = useNavigate();
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
    <section className="services-page">

      <div className="services-header">

        <h1>
          Our Services
        </h1>

        <p>
          Creating memorable experiences
          through premium catering and
          event management.
        </p>

      </div>

      <div className="services-grid">
  {services.map(service => (
    <ServiceCard
      key={service.id}
      title={service.title}
      description={service.description}
      image={service.image}
    />
  ))}
</div>

      <div className="explore-events">

        <button
          onClick={() =>
            navigate("/services/explore")
          }
        >
          Explore Our Events
        </button>

      </div>

    </section>
  );
}

export default Services;