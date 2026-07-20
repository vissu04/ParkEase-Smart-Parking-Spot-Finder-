import { Link } from "react-router-dom";
import {
  FaUserFriends,
  FaSearch,
  FaShieldAlt,
  FaLightbulb,
} from "react-icons/fa";

import Pro1 from "../assets/Pro1.png";
import Pro2 from "../assets/Pro2.png";
import Pro3 from "../assets/Pro3.png";

const About = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pb-24">
      <div className="w-full px-6 md:px-16 lg:px-24 py-16 space-y-24">
        {/* HERO */}
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            About ParkEase
          </h1>
          <p className="text-gray-600 text-xl leading-relaxed">
            ParkEase solves one everyday problem —{" "}
            <span className="font-semibold text-green-700">
              finding parking without stress.
            </span>
          </p>
        </section>

        {/* MISSION & VISION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To simplify urban parking through smart technology that saves
              time, reduces congestion, and improves mobility.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold text-emerald-600 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To become a core infrastructure component in smart, sustainable
              cities worldwide.
            </p>
          </div>
        </section>

        {/* STORY */}
        <section>
          <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
            Our Story
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 text-gray-700 text-lg leading-relaxed text-center">
            <p>
              ParkEase began as an academic project to solve real parking
              challenges faced in busy urban areas.
            </p>
            <p>
              It evolved into a full smart parking ecosystem including booking,
              digital payments, QR entry, and partner management.
            </p>
            <p>
              Today, ParkEase is scalable, secure, and ready for real-world
              deployment.
            </p>
          </div>
        </section>

        {/* CORE VALUES */}
        <section>
          <h2 className="text-3xl font-bold text-green-700 mb-12 text-center">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <FaUserFriends />,
                title: "User First",
                desc: "Designed to reduce user effort and confusion.",
              },
              {
                icon: <FaSearch />,
                title: "Transparency",
                desc: "Clear pricing and real-time availability.",
              },
              {
                icon: <FaShieldAlt />,
                title: "Security",
                desc: "Secure payments and QR-based access.",
              },
              {
                icon: <FaLightbulb />,
                title: "Innovation",
                desc: "Continuous improvement using smart tech.",
              },
            ].map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
              >
                <div className="text-4xl text-green-600 mb-5 flex justify-center">
                  {v.icon}
                </div>
                <h4 className="font-semibold text-lg text-green-700 mb-3">
                  {v.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* USP */}
        <section>
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-3xl p-12 text-center shadow-xl">
            <h2 className="text-3xl font-bold mb-4">
              What Makes ParkEase Different?
            </h2>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed">
              ParkEase integrates booking, real-time availability, digital
              payments, and QR-based entry into one seamless, user-friendly
              ecosystem.
            </p>
          </div>
        </section>

        {/* TEAM */}
        <section>
          <h2 className="text-3xl font-bold text-green-700 mb-12 text-center">
            Meet the Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              {
                name: "Project Lead",
                role: "System Design & Architecture",
                img: Pro1,
              },
              {
                name: "Frontend Developer",
                role: "UI / UX & React",
                img: Pro2,
              },
              {
                name: "Backend Developer",
                role: "API & Database",
                img: Pro3,
              },
            ].map((m, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-28 h-28 mx-auto rounded-full object-cover mb-5 border-4 border-green-100"
                />
                <h4 className="font-semibold text-xl text-green-700">
                  {m.name}
                </h4>
                <p className="text-sm text-gray-600 mt-2">{m.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white rounded-3xl shadow-lg p-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-700 text-lg">
            Have questions or want to share your experience?
          </p>

          <div className="flex gap-5">
            <Link
              to="/help"
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 
                         text-white rounded-full shadow-lg 
                         hover:scale-105 transition transform"
            >
              Contact Us
            </Link>

            <Link
              to="/feedback"
              className="px-8 py-3 border-2 border-green-600 
                         text-green-600 rounded-full 
                         hover:bg-green-50 transition"
            >
              Give Feedback
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
