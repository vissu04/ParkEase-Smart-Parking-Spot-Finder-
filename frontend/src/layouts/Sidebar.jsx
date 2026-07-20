import { NavLink, useNavigate } from "react-router";

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: "🏠" },
  { name: "Manage Parking", path: "/admin/parking", icon: "🅿" },
  { name: "Manage Users", path: "/admin/users", icon: "👤" },
  { name: "Manage Bookings", path: "/admin/bookings", icon: "📅" },
  { name: "Reports", path: "/admin/reports", icon: "📊" },
  { name: "Admin Profile", path: "/admin/profile", icon: "🧑‍💼" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Remove JWT
    localStorage.removeItem("jwt");

    // ✅ Remove image (optional)
    localStorage.removeItem("adminImage");

    // ✅ Redirect to home
    navigate("/", { replace: true });

    // ✅ Hard refresh (important)
    window.location.reload();
  };

  return (
    <div className="w-64 bg-gray-900 text-gray-300 min-h-screen p-5 flex flex-col">

      {/* PROFILE */}
      <div className="flex items-center gap-3 mb-8 border-b border-gray-700 pb-5">
        <img
          src="https://i.pravatar.cc/100?img=12"
          alt="admin"
          className="w-12 h-12 rounded-full border-2 border-teal-500"
        />

        <div>
          <h2 className="text-white font-semibold text-sm">Amit Admin</h2>
          <p className="text-xs text-gray-400">Admin</p>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
              ${isActive
                ? "bg-teal-500 text-white shadow"
                : "hover:bg-gray-800 hover:text-white"}`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium transition"
      >
        🚪 Logout
      </button>

    </div>
  );
}