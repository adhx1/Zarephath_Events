import "./HeroSection.css";
import heroImage from "../../assets/images/image2.jpeg";
import {
  useSiteSettings,
} from "../../context/SiteSettingsContext";
function HeroSection() {
  
   const {
  settings,
  loading,
} = useSiteSettings();

console.log(settings);

if (loading) {
  return <h2>Loading...</h2>;
}
  return (
    <section 
      id="home"
      className="hero-section"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="hero-overlay">

        <div className="hero-content">

         <h1>
  {settings.hero_title}
</h1>

          <p>
  {settings.hero_subtitle}
</p>

        </div>

      </div>
    </section>
  );
}

export default HeroSection;