import Navbar from "../components/web/Navbar";
import Hero from "../components/web/Hero"
import Destinations from "../components/web/Destination";
import Services from "../components/web/Services"
import Packages from "../components/web/Packeges";
import WhyChoose from "../components/web/WhyChooseUs";
import Testimonials from "../components/web/Testiminals";
import CTA from "../components/web/CTA";
import Footer from "../components/Footer";

const Home=()=> {
  return (
    <>
      <Navbar />
      <Hero />
      <Destinations />
      <Services />
      <Packages />
      <WhyChoose />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}

export default Home