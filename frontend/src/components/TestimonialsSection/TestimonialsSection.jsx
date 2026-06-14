import "./TestimonialsSection.css";
import {
 getTestimonials
}
from "../../services/testimonialApi";

import { useState, useEffect } from "react";

function TestimonialsSection() {
  const [testimonials,setTestimonials] = useState([]);
 
  console.log(testimonials);

  useEffect(() => {
  fetchTestimonials();
}, []);

const fetchTestimonials =
async () => {
  try {
    const data =
      await getTestimonials();

    setTestimonials(data);
  } catch(error) {
    console.error(error);
  }
};

  return (
    <section
      id="testimonials"
      className="testimonials-section"
    >
      <div className="testimonials-header">
        <h2>What Our Clients Say</h2>

        <p>
          Trusted by families, businesses,
          and event organizers across Kerala.
        </p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div
  key={testimonial.id}
  className="testimonial-card"
>
  <div className="stars">
    {"★".repeat(testimonial.rating)}
  </div>

  <img
    src={testimonial.customer_image}
    alt={testimonial.customer_name}
    className="testimonial-image"
  />

  <h4>{testimonial.customer_name}</h4>

  <p>{testimonial.review}</p>
</div>
        ))}
      </div>
    </section>
  );
}

export default TestimonialsSection;