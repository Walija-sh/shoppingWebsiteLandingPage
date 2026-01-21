import Hero from "../components/Hero.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import BannerGroupOne from "../components/BannerGroupOne.jsx";
import DealOfWeek from "../components/DealOfWeek.jsx";
import BannerGroupTwo from "../components/BannerGroupTwo.jsx";
import AboutSection from "../components/About.jsx";

const Home = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProductGrid />
      <BannerGroupOne />
      <DealOfWeek />
      <BannerGroupTwo />
    </>
  );
};

export default Home;
