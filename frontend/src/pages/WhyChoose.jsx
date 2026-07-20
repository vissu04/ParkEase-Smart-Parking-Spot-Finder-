import { useState } from "react";
import {
  FaClock,
  FaCalendarCheck,
  FaShieldAlt,
  FaRoute,
  FaUserCheck,
  FaChartLine,
} from "react-icons/fa";

const WhyChoose = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const whyChoose = [
    {
      icon: <FaClock className="text-blue-600 text-2xl" />,
      bg: "bg-blue-100",
      title: "Fast Parking Access",
      description: "Find and book parking spaces quickly without delays.",
    },
    {
      icon: <FaCalendarCheck className="text-green-600 text-2xl" />,
      bg: "bg-green-100",
      title: "Advance Slot Reservation",
      description: "Reserve your parking spot before arriving at the location.",
    },
    {
      icon: <FaShieldAlt className="text-purple-600 text-2xl" />,
      bg: "bg-purple-100",
      title: "Secure Transactions",
      description: "Your payments and booking information remain protected.",
    },
    {
      icon: <FaRoute className="text-yellow-600 text-2xl" />,
      bg: "bg-yellow-100",
      title: "Smart Navigation",
      description: "Get directions directly to your reserved parking spot.",
    },
    {
      icon: <FaUserCheck className="text-indigo-600 text-2xl" />,
      bg: "bg-indigo-100",
      title: "User Friendly Dashboard",
      description: "Manage bookings, payments, and parking history easily.",
    },
    {
      icon: <FaChartLine className="text-red-600 text-2xl" />,
      bg: "bg-red-100",
      title: "Real-time Insights",
      description: "Monitor parking availability and occupancy instantly.",
    },
  ];

  return (
    <div className="w-full bg-white py-20 px-6 min-h-screen">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            Why Choose ParkEase?
          </h1>

          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            Experience seamless parking with our comprehensive suite of features
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChoose.map((feature, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="bg-gray-50 border rounded-xl p-8
              transition duration-300 hover:shadow-xl
              hover:-translate-y-2 flex flex-col h-full"
            >
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-full mb-5 ${feature.bg}`}
              >
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default WhyChoose;