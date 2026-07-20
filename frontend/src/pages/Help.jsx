import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

const faqData = {
  Booking: [
    {
      title: "How do I book a parking space?",
      content:
        "Open the Book Parking page, select your location from the live map, choose arrival and departure time, and complete payment. A confirmation and QR code will be generated instantly.",
    },
    {
      title: "Can I modify my booking after reservation?",
      content:
        "Yes, bookings can be modified before the scheduled start time from the My Bookings section.",
    },
    {
      title: "How far in advance can I book?",
      content:
        "You can reserve parking spaces up to 60 days in advance depending on availability.",
    },
    {
      title: "What happens if I arrive late?",
      content:
        "Your slot remains reserved during your selected time window. If you expect delays, you may extend your booking if slots are available.",
    },
  ],

  "Payments & Pricing": [
    {
      title: "How is pricing calculated?",
      content:
        "Pricing depends on location, duration, and peak hours. The final price is shown before confirming your booking.",
    },
    {
      title: "Are there any hidden charges?",
      content:
        "No hidden charges. The amount displayed at checkout includes all applicable fees.",
    },
    {
      title: "Do you offer monthly parking plans?",
      content:
        "Yes, monthly and corporate subscription plans are available for frequent users.",
    },
    {
      title: "Why did my payment fail?",
      content:
        "Payment failures may occur due to insufficient balance, bank authorization issues, or network problems.",
    },
  ],

  "QR & Entry Access": [
    {
      title: "How does QR entry work?",
      content:
        "After booking, your QR code appears in My Bookings. Scan it at the parking gate scanner for seamless entry.",
    },
    {
      title: "What if my QR code doesn’t scan?",
      content:
        "Increase your screen brightness and ensure the QR code is clearly visible. If issues persist, contact parking staff.",
    },
    {
      title: "Can someone else use my QR code?",
      content:
        "No. QR codes are unique and linked to your booking and account.",
    },
  ],

  "Cancellations & Refunds": [
    {
      title: "Can I cancel my booking?",
      content:
        "Yes, bookings can be cancelled before the scheduled start time from your dashboard.",
    },
    {
      title: "How long does refund processing take?",
      content:
        "Refunds are processed within 3–5 working days to your original payment method.",
    },
    {
      title: "Is there a cancellation fee?",
      content:
        "Late cancellations may incur minimal charges depending on the parking location policy.",
    },
  ],

  "Account & Security": [
    {
      title: "How do I reset my password?",
      content:
        "Click 'Forgot Password' on the login page and follow the instructions sent to your registered email.",
    },
    {
      title: "How do I update vehicle details?",
      content:
        "Go to Profile → Vehicle Details and update your vehicle number, type, or color.",
    },
    {
      title: "Is my payment information secure?",
      content:
        "Yes. All transactions are encrypted and processed via secure payment gateways.",
    },
    {
      title: "Is my personal data protected?",
      content:
        "We follow strict data protection standards and never share user information without consent.",
    },
  ],
};

export default function Help() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItem, setOpenItem] = useState(null);

  const handleToggle = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  // 🔎 SEARCH FILTER LOGIC (FULL CONTENT)
  const filteredData = Object.entries(faqData).reduce(
    (acc, [category, items]) => {
      const filteredItems = items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.content.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      if (filteredItems.length > 0) {
        acc[category] = filteredItems;
      }

      return acc;
    },
    {},
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 pb-24 text-black flex flex-col items-center">
      {/* HEADER */}
      <div className="text-center mt-20 mb-12 px-6">
        <h1 className="text-5xl font-bold mb-4">Help & Support</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse frequently asked questions about ParkEase.
        </p>
      </div>

      {/* SEARCH */}
      <div className="w-full flex justify-center mb-16 px-6">
        <div className="relative w-full max-w-3xl">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg
                       focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/40"
          />
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="w-full flex justify-center px-6">
        <div className="w-full max-w-4xl space-y-16">
          {Object.keys(filteredData).length === 0 && (
            <div className="text-center text-gray-500">
              No results found for "{searchTerm}"
            </div>
          )}

          {Object.entries(filteredData).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-green-500/40">
                {category}
              </h2>

              <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
                {items.map((item, index) => {
                  const id = category + index;
                  const isOpen = openItem === id;

                  return (
                    <div key={id} className="border-b last:border-none">
                      <div
                        className="flex justify-between items-center px-6 py-5 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleToggle(id)}
                      >
                        <h3 className="font-medium text-lg">{item.title}</h3>
                        <ChevronDown
                          className={`transition-transform ${
                            isOpen
                              ? "rotate-180 text-green-600"
                              : "text-green-600"
                          }`}
                        />
                      </div>

                      {isOpen && (
                        <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                          {item.content}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
