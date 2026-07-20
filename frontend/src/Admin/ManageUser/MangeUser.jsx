import { useState, useEffect } from "react";
import { Users, MoreVertical } from "lucide-react";
import AdminLayout from "@/layouts/AdminLayout";
import { getAllUsers, makeAdmin } from "@/api/adminApi";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  console.log(users)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();

        const mappedUsers = res.map((u, index) => ({
          id: u.customId || index,
          customId: u.customId,
          name: u.name,
          phone: u.phone,
          city: u.cityName,
          cars: u.vehicle ? [u.vehicle] : [],
          totalBookings: Number(u.totalBooking || 0),
          totalSpent: u.lastBooking?.amount || 0,
          status: u.userStatusType,

          lastBooking: u.lastBooking
            ? {
                parkingId: u.lastBooking.parkingId,
                date: u.lastBooking.startTime,
                slot: u.lastBooking.spotNumber,
                floor: u.lastBooking.floorName,
                amount: u.lastBooking.amount,
              }
            : {
                parkingId: "-",
                date: "-",
                slot: "-",
                floor: "-",
                amount: 0,
              },
        }));

        setUsers(mappedUsers);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };

    fetchUsers();
  }, []);

  const getStatus = (user) => user.status || "ACTIVE";

  const filteredUsers = users.filter((u) => {
    const searchText = query.toLowerCase().trim();

    return (
      (u.name || "").toLowerCase().includes(searchText) ||
      (u.phone || "").includes(searchText) ||
      (u.city || "").toLowerCase().includes(searchText) ||
      (u.customId || "").toLowerCase().includes(searchText) ||
      (u.cars || []).join(" ").toLowerCase().includes(searchText)
    );
  });
  const handleRegisterAdmin = async () => {
  if (!email) {
    alert("Please enter email ❌");
    return;
  }

  try {
    const res = await makeAdmin(email);

    alert(res); // backend message
    setShowForm(false);
    setEmail("");
  } catch (err) {
    alert(err.message || "Failed ❌");
  }
};

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
          <Users className="text-blue-600 w-8 h-8" /> User Insights
        </h1>
        <div className="flex justify-between border-b pb-4">
          <p className="text-2xl">Register New Admin</p>

          <button
            onClick={() => setShowForm(!showForm)}
            className="py-2 px-4 active:scale-95 bg-blue-600 text-white rounded-2xl"
          >
            Register now
          </button>
        </div>
        {showForm && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl shadow-md space-y-3">
            <input
              type="email"
              placeholder="Enter user email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-3">
              <button
                onClick={() => handleRegisterAdmin()}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Submit
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className="bg-white border rounded-2xl shadow-sm p-4 flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
          <div className="relative w-full lg:max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, phone, city, car number, user ID..."
              className="w-full pl-11 pr-24 py-3 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-red-500 hover:text-red-600"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {filteredUsers.length}
            </span>{" "}
            of {users.length}
          </div>
        </div>
        {filteredUsers.length === 0 && (
          <div className="text-center text-gray-400 py-16">No user found</div>
        )}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
          {filteredUsers.map((user) => {
            const status = getStatus(user);

            return (
              <div
                key={user.id}
                className="bg-white rounded-2xl border p-6 space-y-5 shadow-sm hover:shadow-lg transition relative"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {user.name}
                    </h2>

                    <p className="text-xs text-gray-400">
                      USER-ID: {user.customId}
                    </p>

                    <p className="text-sm text-gray-500">{user.phone}</p>
                    <p className="text-sm text-gray-400">{user.city}</p>
                  </div>

                  <div className="relative">
                    <MoreVertical
                      className="cursor-pointer text-gray-500"
                      onClick={() =>
                        setOpenMenu(openMenu === user.id ? null : user.id)
                      }
                    />

                    {openMenu === user.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg text-sm z-10">
                        <button className="block w-full text-left px-4 py-2 text-gray-400">
                          No Actions
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Bookings</p>
                    <p className="font-semibold text-blue-600">
                      {user.totalBookings}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Spent</p>
                    <p className="font-semibold text-green-600">
                      ₹ {user.totalSpent}
                    </p>
                  </div>
                </div>

                <div className="text-sm space-y-1">
                  <p className="text-gray-400">Cars</p>
                  <p className="text-gray-700">{user.cars.join(", ")}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 space-y-1">
                  <p className="text-xs text-gray-400">Last Booking</p>

                  <p className="text-sm font-medium">
                    Parking ID: {user.lastBooking?.parkingId || "-"}
                  </p>

                  <p className="text-xs text-gray-500">
                    {user.lastBooking?.date || "-"} • Slot{" "}
                    {user.lastBooking?.slot || "-"} • Floor{" "}
                    {user.lastBooking?.floor || "-"}
                  </p>

                  <p className="text-sm font-semibold text-blue-600">
                    ₹ {user.lastBooking?.amount || 0}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium w-fit ${
                    status === "ACTIVE"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
