import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { getBookingHistory } from "@/api/userApi";

const MyBooking = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
 
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookingHistory();

        const mapped = data.map((b) => ({
          id: b.bookingId || b.id || "",
          bookingId: b.bookingId || b.id || "",

          name: b.parkingName || "Parking",
          address: b.parkingAddress || "",

          parkingId: b.parkingId || "",
          parkingCity: b.parkingCity || "", 
          vehicleNumber: b.vehicleNumber || "",
          phone: b.phone || "",
          amount: b.amount || 0,

          spotNumber: b.spotNumber || "",
          floorName: b.floorName || "", 

          startDate: b.startTime,
          endDate: b.endTime,

          price: `₹${b.amount || 0} / hr`,
          date: b.startTime ? new Date(b.startTime).toLocaleDateString() : "",
          time:
            b.startTime && b.endTime
              ? `${new Date(b.startTime).toLocaleTimeString()} - ${new Date(
                  b.endTime,
                ).toLocaleTimeString()}`
              : "",

          status:
            b.status === "PENDING"
              ? "Active"
              : b.status === "CONFIRMED"
                ? "Completed"
                : "Cancelled",
        }));
        setBookings(mapped);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  const total = bookings.length;
  const active = bookings.filter((b) => b.status === "Active").length;
  const completed = bookings.filter((b) => b.status === "Completed").length;
  const cancelled = bookings.filter((b) => b.status === "Cancelled").length;

  const filteredBookings = bookings.filter((b) => {
    const matchSearch =
      (b.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (b.id || "").toLowerCase().includes(search.toLowerCase());

    const matchStatus = filter === "All" || b.status === filter;

    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-[calc(100vh-80px)] text-black">
      <div className="bg-white/95 rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-500 text-sm">
            Manage and view all your parking reservations.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-xs text-gray-500">Total</p>
            <h3 className="text-xl font-bold">{total}</h3>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border">
            <p className="text-xs text-gray-500">Active</p>
            <h3 className="text-xl font-bold text-yellow-600">{active}</h3>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border">
            <p className="text-xs text-gray-500">Completed</p>
            <h3 className="text-xl font-bold text-green-600">{completed}</h3>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border">
            <p className="text-xs text-gray-500">Cancelled</p>
            <h3 className="text-xl font-bold text-red-600">{cancelled}</h3>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 justify-between">
          <div className="flex items-center border rounded-lg px-3 py-2 w-full md:w-1/3">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search booking..."
              className="outline-none text-sm w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="border rounded-lg px-4 py-2 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Bookings</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {filteredBookings.map((b) => (
          <div
            key={b.id}
            className="border rounded-xl p-4 flex flex-col md:flex-row md:justify-between gap-3 hover:shadow-md transition"
          >
            <div>
              <h3 className="font-semibold text-gray-900">{b.name}</h3>
              <p className="text-sm text-gray-600">{b.address}</p>

              <p className="text-xs text-gray-500">
                🚗 {b.vehicleNumber} • 🅿 {b.parkingId}
              </p>

              <p className="text-xs text-gray-500">
                📍 {b.parkingCity} • 🧭 Spot: {b.spotNumber} • Floor:{" "}
                {b.floorName}
              </p>
              <p className="text-sm text-gray-500">
                {b.date} • {b.time}
              </p>

              <p className="text-sm font-medium text-green-600">{b.price}</p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* ✅ STATUS COLOR */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  b.status === "Active"
                    ? "bg-yellow-100 text-yellow-700"
                    : b.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {b.status}
              </span>

              <button
                onClick={() => navigate("/booking-confirm", { state: b })}
                className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100 text-black"
              >
                {b.status === "Active" ? "View QR" : "View Details"}
              </button>

              {b.status === "Active" && (
                <button
                  onClick={() =>
                    setBookings((prev) =>
                      prev.map((x) =>
                        x.id === b.id ? { ...x, status: "Cancelled" } : x,
                      ),
                    )
                  }
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
