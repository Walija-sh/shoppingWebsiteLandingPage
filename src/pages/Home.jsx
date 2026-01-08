import Hero from "../components/Hero.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import BannerGroupOne from "../components/BannerGroupOne.jsx";
import DealOfWeek from "../components/DealOfWeek.jsx";
import BannerGroupTwo from "../components/BannerGroupTwo.jsx";

const Home = () => {
  return (
    <>
      <Hero />
      <ProductGrid />
      <BannerGroupOne />
      <DealOfWeek />
      <BannerGroupTwo />
    </>
  );
};

export default Home;
