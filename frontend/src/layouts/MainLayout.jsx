import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import bgImage from "../assets/home.jpg";

const MainLayout = () => {
  return (
    <div
      className="min-h-screen flex flex-col text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Global Overlay */}
      <div className="min-h-screen flex flex-col bg-black/60 backdrop-blur-sm">
        
        <Navbar />

        {/* Page Content */}
        <main className="flex-grow pt-20 ">
          <Outlet />
        </main>

        <Footer />

      </div>
    </div>
  );
};

export default MainLayout;
