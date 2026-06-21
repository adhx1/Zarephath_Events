import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSiteSettings } from "../../context/SiteSettingsContext";
import "./About.css";

const About = () => {
  const { settings } = useSiteSettings();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Parallax Header */}
      <div ref={ref} className="about-parallax-container">
        <motion.div
          className="about-parallax-bg"
          style={{
            y: yBg,
            backgroundImage: `url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80')`,
          }}
        />
        <div className="about-parallax-overlay"></div>
        <motion.div
          className="about-parallax-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="about-title">Our Story</h1>
          <p className="about-subtitle">
            33+ Years of Excellence in Event Management & Catering
          </p>
        </motion.div>
      </div>

      <div className="container about-main-content">
        <motion.div
          className="about-content"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="about-text-block">
            <h2 className="about-heading-elegant">
              About {settings?.business_name || "Zarephath Events"}
            </h2>

            <div className="about-divider"></div>

            <p className="about-paragraph ">
              <span className="about-highlight">Zarephath Events</span> is a
              trusted name in event management and catering, proudly serving
              clients for more than three decades. With{" "}
              <span className="about-highlight"> 33+ years </span>
              of experience and{" "}
              <span className="about-highlight"> 25,000+ happy customers </span>
              , we have built a reputation for delivering exceptional events
              that create lasting memories.
            </p>

            <p className="about-paragraph">
              <span className="about-highlight"> Based in Thevalakkara, </span>,
              we are a passionate and dedicated team that works together like a
              family, bringing creativity, professionalism, and attention to
              detail to every celebration. From elegant weddings and grand
              receptions to corporate events, church gatherings, birthdays,
              cultural programs, stage decorations, photography, sound &
              lighting, and complete event management solutions, we provide
              everything needed to make your event truly extraordinary.
            </p>

            <p className="about-paragraph">
              What makes Zarephath Events unique is our commitment to quality
              and customer satisfaction. Our catering services focus on
              preparing delicious and wholesome food using carefully selected
              ingredients while maintaining the highest standards of hygiene and
              taste.
            </p>

            <p className="about-paragraph">
              Over the years,{" "}
              <span className="about-highlight">
                we have successfully managed thousands of events
              </span>
              , earning the trust of families, organizations, and businesses
              through our reliability, excellence, and personalized approach.
              Every event is treated with the same passion and dedication,
              whether it is an intimate family gathering or a large-scale
              celebration.
            </p>

            <p className="about-paragraph">
              Guided by our vision,{" "}
              <span className="about-highlight">
                "A Colourful Team to Shape Your Events"
              </span>
              , we continue to create unique experiences that reflect the dreams
              and expectations of our clients. Our mission is to transform ideas
              into unforgettable celebrations through innovation, quality, and
              heartfelt service.
            </p>
           
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
