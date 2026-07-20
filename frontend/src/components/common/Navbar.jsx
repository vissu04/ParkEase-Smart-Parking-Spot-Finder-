import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  FaUserCircle,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaUserShield,
} from "react-icons/fa";

const Navbar = () => {
  const isLoggedIn = true;

  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // ✅ JWT ROLE CHECK
  const token = localStorage.getItem("jwt");

  let isAdmin = false;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      isAdmin = payload?.role === "ADMIN";
    } catch (err) {
      console.error("Invalid token");
    }
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Parking Options", path: "/parking-rates" },
    { name: "Book Parking", path: "/book-parking" },
  ];

  const handleLogout = () => {
    setOpen(false);
    setMobileMenu(false);
    localStorage.removeItem("token"); // optional cleanup
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 text-white">
          <div className="grid grid-cols-2 gap-1">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>

          <span className="text-xl font-bold text-white">ParkEase</span>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-8 text-white font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative hover:text-green-400 transition ${
                    isActive ? "text-green-400" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          {/* PROFILE */}
          {isLoggedIn && (
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="hidden md:flex items-center gap-2 text-white hover:text-blue-400 transition"
            >
              <FaUserCircle size={28} />
              <FaChevronDown size={12} />
            </button>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenu((prev) => !prev)}
          >
            {mobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* PROFILE DROPDOWN */}
          {open && (
            <div className="absolute right-0 top-12 w-60 z-9999 bg-white rounded-xl shadow-xl text-gray-800 border overflow-hidden">
              <button
                onClick={() => {
                  navigate("/profile");
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                👤 Profile
              </button>

              <button
                onClick={() => {
                  navigate("/my-booking");
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                📅 My Bookings
              </button>

              <button
                onClick={() => {
                  navigate("/payment-history");
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                💳 Payment History
              </button>
              {true && (
                <button
                  onClick={() => {
                    navigate("/admin");
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100 font-medium  transition"
                >
                  <FaUserShield />
                  Switch to Admin Panel
                </button>
              )}

              <div className="border-t"></div>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="md:hidden bg-black/95 text-white px-6 py-6 space-y-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenu(false)}
              className="block text-lg border-b border-white/20 pb-2 hover:text-blue-400"
            >
              {item.name}
            </NavLink>
          ))}

          {isLoggedIn && (
            <>
              <NavLink
                to="/profile"
                onClick={() => setMobileMenu(false)}
                className="block text-lg border-b border-white/20 pb-2"
              >
                Profile
              </NavLink>

              <NavLink
                to="/my-booking"
                onClick={() => setMobileMenu(false)}
                className="block text-lg border-b border-white/20 pb-2"
              >
                My Bookings
              </NavLink>

              <NavLink
                to="/payment-history"
                onClick={() => setMobileMenu(false)}
                className="block text-lg border-b border-white/20 pb-2"
              >
                Payment History
              </NavLink>

              {/* ✅ OPTIONAL: ADMIN IN MOBILE */}
              {isAdmin && (
                <NavLink
                  to="/admin"
                  onClick={() => setMobileMenu(false)}
                  className="block text-lg border-b border-white/20 pb-2 text-purple-400"
                >
                  Admin Panel
                </NavLink>
              )}

              <button
                onClick={handleLogout}
                className="block text-left text-red-400 text-lg mt-4"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;