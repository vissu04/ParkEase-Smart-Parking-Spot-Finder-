import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const ParkingRates = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const pricingPlans = [
    {
      id: 1,
      name: "Premium",
      price: "150",
      description:
        "Best for frequent visitors who want hassle-free and premium parking.",
      features: [
        "Priority parking access",
        "Covered parking",
        "24/7 security",
        "Free entry & exit",
      ],
    },
    {
      id: 2,
      name: "Standard",
      price: "80",
      description:
        "Perfect for regular commuters with dependable parking availability.",
      features: ["Reliable parking space", "CCTV monitored", "Easy access"],
    },
    {
      id: 3,
      name: "Basic",
      price: "50",
      description:
        "Ideal for occasional users who want simple and affordable parking.",
      features: ["Affordable parking", "Open parking area", "Quick booking"],
    },
    {
      id: 4,
      name: "Economy",
      price: "30",
      description: "Budget-friendly option for short stays and quick visits.",
      features: ["Lowest cost option", "Short-term parking", "Pay & park"],
    },
  ];

  return (
    <>
      {/* MAIN PAGE */}
      <div className="min-h-screen bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Parking Options and Rates
            </h1>
            <p className="text-gray-600 text-lg">
              Choose the perfect plan for your parking needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white border border-gray-300 rounded-xl 
                           shadow-md hover:shadow-xl transition 
                           p-8 flex flex-col"
              >
                <div className="mb-6">
                  <span className="text-5xl font-bold text-green-600">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600 text-sm ml-2">/day</span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {plan.name}
                </h2>

                <p className="text-gray-600 text-sm mb-8 flex-grow">
                  {plan.description}
                </p>

                <button
                  onClick={() => setSelectedPlan(plan)}
                  className="w-full py-3 rounded-lg font-semibold 
                             text-white bg-green-600 hover:bg-green-700"
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedPlan && (
        <div
          className="fixed inset-0 z-[9999]
               flex justify-center items-start pt-40
               bg-black/60 backdrop-blur-md backdrop-saturate-150"
        >
          <div
            className="bg-white rounded-2xl p-8 w-[420px]
                 shadow-2xl relative animate-fadeIn"
          >
            {/* ❌ CLOSE ICON */}
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-4 right-4
                   text-gray-400 hover:text-gray-700
                   transition"
              aria-label="Close dialog"
            >
              <X size={22} />
            </button>

            {/* TITLE */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedPlan.name} Plan
            </h2>

            <p className="text-gray-600 mb-4">{selectedPlan.description}</p>

            {/* PRICE */}
            <div className="mb-4">
              <span className="text-3xl font-bold text-green-600">
                ${selectedPlan.price}
              </span>
              <span className="text-gray-500 ml-2">/day</span>
            </div>

            {/* FEATURES */}
            <ul className="space-y-2 text-sm text-gray-700 mb-6">
              {selectedPlan.features.map((feature, index) => (
                <li key={index}>✔ {feature}</li>
              ))}
            </ul>

            {/* ACTIONS */}
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedPlan(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200
                     text-gray-700 py-2 rounded-lg"
              >
                Close
              </button>

              <button
                onClick={() => navigate("/book-parking")}
                className="flex-1 bg-green-600 hover:bg-green-700
                     text-white py-2 rounded-lg"
              >
                Book Parking
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ParkingRates;
