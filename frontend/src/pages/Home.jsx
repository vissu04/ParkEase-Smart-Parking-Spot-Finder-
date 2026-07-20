import HeroSlider from "../components/home/HeroSlider";
import TopReviews from "./TopReviews"; // ✅ correct path

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSlider />

      {/* Top Feedback Reviews */}
      <TopReviews />
    </div>
  );
};

export default Home;
