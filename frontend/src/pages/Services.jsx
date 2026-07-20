import {
  FaCar,
  FaMotorcycle,
  FaChargingStation,
  FaShieldAlt,
  FaClock,
  FaParking
} from "react-icons/fa";

import serviceImg from "../assets/service.jpg";

const leftServices = [
  {
    icon: <FaCar />,
    title: "Car Parking",
    desc: "Secure parking spaces available for cars with real-time slot availability.",
  },
  {
    icon: <FaMotorcycle />,
    title: "Bike Parking",
    desc: "Affordable parking spots specially designed for motorcycles and scooters.",
  },
  {
    icon: <FaClock />,
    title: "Hourly Parking",
    desc: "Flexible hourly parking for quick visits and short stops.",
  },
];

const rightServices = [
  {
    icon: <FaChargingStation />,
    title: "EV Charging",
    desc: "Electric vehicle charging stations available at selected parking locations.",
  },
  {
    icon: <FaShieldAlt />,
    title: "24/7 Security",
    desc: "CCTV monitoring and security guards to keep your vehicle safe.",
  },
  {
    icon: <FaParking />,
    title: "Smart Parking",
    desc: "Find and reserve parking slots easily using our smart parking system.",
  },
];

const Services = () => {
  return (
    <section className="bg-gray-50 py-20 px-6 text-black">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-700 mb-3">
            Our Parking Services
          </h2>
          <p className="text-gray-600">
            ParkEase provides smart, secure, and convenient parking solutions
            for every type of vehicle.
          </p>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-3 gap-12 items-center">

          {/* Left Services */}
          <div className="flex flex-col justify-between h-[420px]">
            {leftServices.map((service, index) => (
              <div
                key={index}
                className="flex items-start gap-5 p-3 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-full border-2 border-green-300 text-green-600 text-2xl transition-all duration-300 hover:bg-green-600 hover:text-white">
                  {service.icon}
                </div>

                <div>
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Center Image */}
          <div className="flex justify-center">
            <img
              src={serviceImg}
              alt="Parking Services"
              className="rounded-xl shadow-lg h-[420px] object-cover"
            />
          </div>

          {/* Right Services */}
          <div className="flex flex-col justify-between h-[420px]">
            {rightServices.map((service, index) => (
              <div
                key={index}
                className="flex items-start gap-5 p-3 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-full border-2 border-green-300 text-green-600 text-2xl transition-all duration-300 hover:bg-green-600 hover:text-white">
                  {service.icon}
                </div>

                <div>
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Services;