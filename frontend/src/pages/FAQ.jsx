import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Mail, HelpCircle } from "lucide-react";
import { Accordion } from "../components/ui/Accordion";

const faqData = {
  Booking: [
    {
      title: "How do I book a parking space?",
      content:
        'Simply enter your location, arrival time, and departure time in the booking form. Browse available parking spaces in your area, compare prices, and select the one that best suits your needs. Click "Reserve Your Spot" to complete your booking.',
    },
    {
      title: "Can I modify my booking after reservation?",
      content:
        'Yes, you can modify your booking up to 2 hours before your arrival time. Log into your account, go to "My Bookings," select the booking you want to edit, and adjust your time or location. If modifications are not possible, you can cancel and create a new booking.',
    },
    {
      title: "How far in advance can I book a parking space?",
      content:
        "You can book parking spaces up to 90 days in advance. This gives you flexibility for planning upcoming trips, business meetings, or travel plans. For last-minute needs, we also offer same-day and hourly bookings.",
    },
    {
      title: "What payment methods are accepted?",
      content:
        "ParkSmart accepts all major credit and debit cards (Visa, Mastercard, American Express), digital wallets (Apple Pay, Google Pay), and bank transfers. All transactions are secure and encrypted.",
    },
  ],
  "Payments & Pricing": [
    {
      title: "How is pricing calculated?",
      content:
        "Our pricing depends on location, parking type, and duration. Hourly rates typically range from $2-$8 per hour, while monthly passes offer significant savings. Peak hours may have premium pricing. You can see the exact price before confirming your booking.",
    },
    {
      title: "Are there any hidden charges?",
      content:
        "No hidden charges. The price you see during booking is the final price. This includes the parking fee and any applicable taxes. Occasionally, we offer discounts and promotions that are clearly displayed before checkout.",
    },
    {
      title: "Do you offer monthly or annual parking plans?",
      content:
        "Yes! We offer flexible monthly parking plans starting at $89/month and annual plans at $899/year. These plans come with unlimited parking in designated zones, priority access to premium spots, and exclusive member discounts.",
    },
    {
      title: "Can I get a refund if I don't use my booking?",
      content:
        "Yes, cancellations made 6 hours or more before your arrival time receive a full refund. Cancellations within 6 hours are subject to a 20% processing fee. Emergency cancellations may qualify for a full refund on a case-by-case basis.",
    },
  ],
  "Cancellation & Refund": [
    {
      title: "What is your cancellation policy?",
      content:
        "You can cancel any booking for free up to 6 hours before your arrival time. Cancellations within 6 hours will incur a 20% fee. No-shows forfeit the entire booking fee. Monthly and annual plans can be cancelled with 7 days notice for a prorated refund.",
    },
    {
      title: "How long does it take to receive a refund?",
      content:
        "Refunds are processed within 3-5 business days after cancellation. The money will be returned to your original payment method. For PayPal or digital wallets, refunds may appear faster (24-48 hours).",
    },
    {
      title: "Can I transfer my booking to someone else?",
      content:
        "Currently, bookings are tied to your account and cannot be directly transferred. However, you can cancel your booking and provide the parking space details to another person, who can then book the same spot. Cancellation fees apply as per our policy.",
    },
    {
      title: "What happens if the parking lot is full when I arrive?",
      content:
        "Since your spot is reserved, it's guaranteed to be available for your exact time slot. If you experience any issues accessing your reserved spot, contact our support team immediately for assistance or receive a full refund.",
    },
  ],
  "Account & Dashboard": [
    {
      title: "How do I create a ParkSmart account?",
      content:
        'Click "Sign Up" on our website or mobile app. Enter your email address, create a secure password, and provide your basic details (name, phone number). Verify your email, and you\'re ready to start booking. You can also sign up using Google or Apple ID for faster registration.',
    },
    {
      title: "How do I reset my password?",
      content:
        "Click \"Forgot Password\" on the login page. Enter your email address, and we'll send you a password reset link. Click the link in the email, create a new password, and you're all set. The reset link expires in 24 hours for security.",
    },
    {
      title: "Can I view my booking history?",
      content:
        'Yes, all your bookings are saved in your "My Bookings" section. You can see past, current, and upcoming bookings, track spending, download receipts, and leave reviews for parking locations. This history helps us improve our service.',
    },
    {
      title: "How do I update my profile information?",
      content:
        'Go to "Account Settings" in your dashboard. You can update your name, phone number, email address, and payment methods. For security reasons, you\'ll need to verify any email changes before they take effect.',
    },
  ],
  "Security & Safety": [
    {
      title: "Is my payment information safe?",
      content:
        "Absolutely. ParkSmart uses industry-leading SSL encryption and PCI-DSS compliance to protect your payment data. We never store full credit card details on our servers. Your information is protected by advanced security measures and regular audits.",
    },
    {
      title: "How does digital access to parking work?",
      content:
        "Once your booking is confirmed, you receive a unique access code and QR code. Show this code at the parking entrance or scan the QR code to gain access. Some partnered locations also support mobile app integration for seamless entry.",
    },
    {
      title: "What if my vehicle is damaged while parked?",
      content:
        "Most of our partnered parking locations have 24/7 surveillance and security staff. If your vehicle is damaged, report it immediately to the parking management and file a claim through ParkSmart. Documentation like photos is helpful for claims processing.",
    },
    {
      title: "Is my personal data protected?",
      content:
        "Yes, we comply with all data protection regulations including GDPR and CCPA. Your personal data is encrypted, never shared with third parties without consent, and used solely to improve your parking experience. You can request data deletion anytime from your account settings.",
    },
  ],
};

export default function FAQ() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(faqData);

  const handleSearch = (value) => {
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredData(faqData);
      return;
    }

    const searchLower = value.toLowerCase();
    const filtered = {};

    Object.entries(faqData).forEach(([category, items]) => {
      const matchedItems = items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.content.toLowerCase().includes(searchLower),
      );
      if (matchedItems.length > 0) {
        filtered[category] = matchedItems;
      }
    });

    setFilteredData(filtered);
  };

  return (
    <div className="min-h-screen bg-cover bg-white bg-right bg-no-repeat relative">
      {/* <div className="absolute inset-0 bg-gray-200 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div> */}

      <div className="relative max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <HelpCircle size={48} className="text-[#0F172A]" />
          </div>
          <h1 className="text-5xl font-bold text-[#0F172A] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-[#374151] max-w-2xl mx-auto">
            Find answers to common questions about ParkSmart. Can't find what
            you're looking for? Our support team is here to help.
          </p>
        </div>

        <div className="mb-12 relative ">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 "
            size={20}
          />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-3 bg-gray-100 text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500/70 border-2 focus:ring-0  shadow-sm"
          />
        </div>

        {Object.entries(filteredData).length > 0 ? (
          <div className="space-y-10 mb-16">
            {Object.entries(filteredData).map(([category, items]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-[#0F172A] mb-4 pb-2 border-b-2 border-green-500/30">
                  {category}
                </h2>
                <Accordion items={items} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <HelpCircle size={32} className="mx-auto text-white/60 mb-3" />
            <p className="text-white/80">
              No results found for "{searchTerm}". Try searching with different
              keywords.
            </p>
          </div>
        )}

        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg rounded-xl p-8 text-white text-center">
          <Mail size={40} className="mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Our dedicated support team is ready to help you. Reach out to us and
            we'll get back to you within 2 hours.
          </p>
          <button
  onClick={() => navigate("/contact")}
  className="px-8 py-3 bg-white text-[#0F172A] font-semibold rounded-lg hover:bg-gray-100 transition shadow-lg"
>
  Contact Support
</button>
        </div>
      </div>
    </div>
  );
}
