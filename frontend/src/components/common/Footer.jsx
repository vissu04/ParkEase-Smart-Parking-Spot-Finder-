import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative text-gray-300 pt-14 pb-6 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">

      {/* background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              PARK
            </span>{" "}
            <span className="text-white tracking-widest text-sm">Ease</span>
          </h2>

          <p className="text-sm text-gray-400 leading-relaxed">
            ParkEase helps drivers find and reserve parking spaces instantly,
            reducing traffic congestion and saving time in smart cities.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>

          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-green-400 transition">Home</Link></li>
            <li><Link to="/book-parking" className="hover:text-green-400 transition">Book Parking</Link></li>
            <li><Link to="/my-booking" className="hover:text-green-400 transition">My Bookings</Link></li>
            <li><Link to="/parking-status" className="hover:text-green-400 transition">Parking Status</Link></li>
            <li><Link to="/help" className="hover:text-green-400 transition">Help</Link></li>
            <li><Link to="/feedback" className="hover:text-green-400 transition">Feedback</Link></li>
            <li><Link to="/why-choose" className="hover:text-green-400 transition">Why Choose Us?</Link></li>
            <li><Link to="/faq" className="hover:text-green-400 transition">FAQs</Link></li>
          </ul>
        </div>

        {/* PARTNERS */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">
            For Partners
          </h3>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-green-400 cursor-pointer transition">List Your Parking Space</li>
            <li className="hover:text-green-400 cursor-pointer transition">Partner Login</li>
            <li className="hover:text-green-400 cursor-pointer transition">Business Solutions</li>
            <li className="hover:text-green-400 cursor-pointer transition">Contact for Partnership</li>
          </ul>

          <button className="mt-5 bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105 transition text-white px-5 py-2 rounded-lg text-sm font-medium shadow-md">
            Become a Partner
          </button>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>

          <ul className="space-y-2 text-sm text-gray-400">
            <li>📍 Aligarh, Uttar Pradesh, India</li>
            <li>📧 support@parkease.com</li>
            <li>📞 +91 9XXXXXXXXX</li>
            <li>🕒 Mon – Sat: 9 AM – 8 PM</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Follow Us</h3>

          <p className="text-sm text-gray-400 mb-4">
            Stay connected for updates.
          </p>

          <div className="flex gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-[#1877F2] hover:scale-110 transition">
              <FaFacebookF size={18} />
            </a>

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:scale-110 transition">
              <FaInstagram size={18} />
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-[#0A66C2] hover:scale-110 transition">
              <FaLinkedinIn size={18} />
            </a>

            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-black border border-gray-600 hover:scale-110 transition">
              <FaXTwitter size={18} />
            </a>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="relative border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
        © 2026 <span className="text-white font-semibold">ParkEase</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;