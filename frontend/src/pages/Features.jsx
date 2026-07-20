import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaMapMarkedAlt,
  FaCalendarCheck,
  FaQrcode,
  FaParking,
  FaCreditCard,
  FaClock,
  FaShieldAlt,
  FaRoute,
  FaUserCheck,
  FaChartLine,
  FaChargingStation,
  FaBatteryFull,
  FaTachometerAlt,
} from "react-icons/fa";

const Features = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  /* ---------------- FEATURES ---------------- */

  const features = [
    {
      title: "Real-time Slot Availability",
      description: "Check available parking slots instantly on live maps.",
      icon: <FaMapMarkedAlt className="text-blue-600 text-3xl" />,
      path: "/book-parking",
    },
    {
      title: "Smart Booking",
      description: "Book parking in advance with hourly or monthly plans.",
      icon: <FaCalendarCheck className="text-green-600 text-3xl" />,
      path: "/book-parking",
    },
    {
      title: "Secure QR Entry",
      description: "Hassle-free entry using secure QR code verification.",
      icon: <FaQrcode className="text-purple-600 text-3xl" />,
      path: "/my-booking",
    },
    {
      title: "Live Parking Status",
      description:
        "View live occupancy and availability status of parking areas.",
      icon: <FaParking className="text-yellow-600 text-3xl" />,
      path: "/parking-status",
    },
    {
      title: "Digital Payments",
      description: "Fast and secure payments using UPI, cards, or wallets.",
      icon: <FaCreditCard className="text-red-600 text-3xl" />,
      path: "/payment-history",
    },
  ];

  /* ---------------- WHY CHOOSE ---------------- */

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
    <div className="bg-gray-50">
      {/* ================= FEATURES ================= */}

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              ParkEase Features
            </h1>
            <p className="text-gray-600 mt-4 text-lg">
              Smart solutions designed to simplify your parking experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => navigate(feature.path)}
                className="cursor-pointer bg-white border border-gray-200
                rounded-xl p-8 shadow-sm hover:shadow-lg
                transition duration-300 hover:-translate-y-2 flex flex-col"
              >
                <div className="mb-5">{feature.icon}</div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-sm">{feature.description}</p>

                <span className="mt-auto pt-6 text-blue-600 text-sm font-medium">
                  Explore →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Why Choose ParkEase?
            </h2>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
              Experience seamless parking with our comprehensive suite of
              features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChoose.map((feature, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="bg-gray-50 border border-gray-200 rounded-xl
                p-8 hover:shadow-lg transition duration-300
                hover:-translate-y-2"
              >
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-full mb-5 ${feature.bg}`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PARKING AMENITIES ================= */}

      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Parking Amenities
            </h2>
            <div className="w-16 h-1 bg-green-500 mx-auto mt-4 rounded"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              {
                icon: <FaParking className="text-green-600 text-2xl" />,
                bg: "bg-green-100",
                text: "Open Air & Covered Parking",
              },
              {
                icon: <FaClock className="text-blue-600 text-2xl" />,
                bg: "bg-blue-100",
                text: "Parking Open 24 Hours",
              },
              {
                icon: <FaCalendarCheck className="text-purple-600 text-2xl" />,
                bg: "bg-purple-100",
                text: "Guaranteed Reservations",
              },
              {
                icon: (
                  <FaChargingStation className="text-yellow-600 text-2xl" />
                ),
                bg: "bg-yellow-100",
                text: "Electric Vehicle Charging",
              },
              {
                icon: <FaBatteryFull className="text-indigo-600 text-2xl" />,
                bg: "bg-indigo-100",
                text: "Battery Jump Service",
              },
              {
                icon: <FaTachometerAlt className="text-red-600 text-2xl" />,
                bg: "bg-red-100",
                text: "Tire Inflation Service",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6
          flex flex-col items-center text-center
          hover:shadow-lg transition duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-full mb-4 ${item.bg}`}
                >
                  {item.icon}
                </div>

                <p className="text-sm font-medium text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
