import { useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Search, MapPin, ChevronDown, ChevronUp, X, Zap } from "lucide-react";
import L from "leaflet";
import { createOrder, verifyPayment } from "@/api/paymentApi";
import "leaflet/dist/leaflet.css";
import { ZoomControl } from "react-leaflet";
import { ParkingUserContext } from "@/context/ParkingUserContext";
import { Label } from "radix-ui";

const carIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/743/743922.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
const createPriceIcon = (price, hasEV) => {
  return L.divIcon({
    html: `
      <div style="display:flex; flex-direction:column; align-items:center;">
        
        <div style="
          background:${hasEV ? "#2563eb" : "#16a34a"};
          width:46px;
          height:40px;
          border-radius:10px;
          display:flex;
          align-items:center;
          justify-content:center;
          box-shadow:0 6px 12px rgba(0,0,0,0.25);
          border:3px solid white;
          position:relative;
        ">
          
          <!-- 🚗 CAR ICON -->
          <svg xmlns="http://www.w3.org/2000/svg" 
               viewBox="0 0 24 24" 
               fill="white" 
               width="26" 
               height="26">
            <path d="M3 13l1-3h16l1 3v5h-2v-2H5v2H3v-5zm2.5-4l1-3h11l1 3h-13zM7 15a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm10 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
          </svg>

          ${
            hasEV
              ? `<span style="
                  position:absolute;
                  top:-6px;
                  right:-6px;
                  background:yellow;
                  border-radius:50%;
                  padding:3px 5px;
                  font-size:10px;
                ">⚡</span>`
              : ""
          }

        </div>

        <div style="
          background:white;
          color:black;
          font-weight:700;
          font-size:12px;
          padding:3px 8px;
          border-radius:6px;
          margin-top:4px;
          box-shadow:0 2px 6px rgba(0,0,0,0.2);
        ">
          ₹${price}
        </div>

      </div>
    `,
    className: "custom-div-icon",
    iconSize: [50, 60],
    iconAnchor: [25, 55],
  });
};

const BookParking = () => {
  const navigate = useNavigate();
  const { parkings, loading, error } = useContext(ParkingUserContext);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("HOURLY");
  const [expandedCards, setExpandedCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(1);
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    vehicle: "",
  });
  const [includeEVCharging, setIncludeEVCharging] = useState(false);

  const filteredParking = useMemo(() => {
    if (!search.trim()) return parkings;
    return parkings.filter((p) =>
      `${p.parkingName} ${p.parkingAddress}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [search, parkings]);

  const handleDetailsClick = (parkingId) => {
    setExpandedCards((prev) =>
      prev.includes(parkingId)
        ? prev.filter((id) => id !== parkingId)
        : [...prev, parkingId],
    );
  };

  const handleBookParking = (parking) => {
    setSelectedBooking(parking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
    setIncludeEVCharging(false);
  };

  const handleUserDetailsChange = (field, value) => {
    setUserDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getBasePrice = () => {
    return mode === "HOURLY"
      ? selectedBooking.parkingPrice
      : selectedBooking.monthlyBookingPrice;
  };

  const getEVChargingPrice = () => {
    return selectedBooking?.evPrice || 0;
  };

  const getTotalPrice = () => {
    const basePrice = getBasePrice();
    const evCharge = includeEVCharging ? getEVChargingPrice() : 0;
    return basePrice + evCharge;
  };
const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

const handleContinueToPayment = async () => {
  try {
    const loaded = await loadRazorpay();

    if (!loaded) {
      alert("Razorpay SDK failed ❌");
      return;
    }

    const now = new Date();

    const start =
      startDate && startTime
        ? new Date(`${startDate}T${startTime}`)
        : now;

    const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

    const bookingPayload = {
      name: userDetails.name,
      phone: userDetails.phone,
      vehicleNumber: userDetails.vehicle,
      amount: getTotalPrice(),
      parkingId: String(selectedBooking.id),
      startDate: start.toISOString().slice(0, 19),
      endDate: end.toISOString().slice(0, 19),
      evStation: includeEVCharging,
    };

    const res = await createOrder(bookingPayload);

    const data = typeof res === "string" ? JSON.parse(res) : res;
    const order =
      typeof data.order === "string"
        ? JSON.parse(data.order)
        : data.order;

    if (!order || !order.id) {
      alert("Order ID missing ❌");
      return;
    }

    const options = {
      key: data.key, 
      amount: order.amount,
      currency: order.currency,
      name: "ParkEasy",
      description: "Parking Booking",
      order_id: order.id,

      handler: async function (response) {
        await verifyPayment(
          response.razorpay_order_id,
          response.razorpay_payment_id
        );

        alert("Payment Successful ✅");
        navigate("/my-booking");
      },

      prefill: {
        name: userDetails.name,
        contact: userDetails.phone,
      },

      theme: {
        color: "#16a34a",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      alert("Payment Failed ❌");
    });

    rzp.open();

  } catch (err) {
    alert("Payment Error ❌");
  }
};
  const getCurrentPrice = (parking) => {
    if (!parking) return 0;

    if (mode === "MONTHLY") return parking.monthlyBookingPrice || 0;
    if (mode === "EV") return parking.evPrice || 0;

    return parking.parkingPrice || 0;
  };
  const getPriceLabel = () => {
    return mode === "HOURLY" ? "/hour" : "/month";
  };

  return (
    <div className="flex h-[calc(100vh-75px)] mx-auto px-4 overflow-hidden bg-gray-100">
      <div className="flex-1 relative h-full">
        <div className="absolute top-6 left-6 z-10 w-full max-w-145">
          <div className="border-3 border-blue-400 rounded-xl shadow-md">
            <div className="bg-white rounded-lg flex items-stretch overflow-hidden">
              <div className="relative flex-1">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search address"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
                />
              </div>

              <button
                onClick={() => {
                  setMode("HOURLY");
                  setExpandedCards([]);
                }}
                className={`px-6 py-3 text-sm font-semibold transition-all ${
                  mode === "HOURLY"
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="mr-1">🚗</span> Hourly
              </button>
              <button
                onClick={() => {
                  setMode("MONTHLY");
                  setExpandedCards([]);
                }}
                className={`px-6 py-3 text-sm font-semibold transition-all ${
                  mode === "MONTHLY"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="mr-1">📅</span> Monthly
              </button>
            </div>
          </div>
        </div>

        <MapContainer
          center={[21.1458, 79.0882]}
          zoom={13}
          className="h-full w-full"
          zoomControl={false}
        >
          <ZoomControl position="bottomleft" />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {filteredParking.map((p) => (
            <Marker
              key={p.id}
              position={[p.latitude, p.longitude]}
              icon={createPriceIcon(getCurrentPrice(p), p.evAvailable > 0)}
            >
              <Popup>
                <div className="text-sm">
                  <strong className="text-gray-900">{p.parkingName}</strong>
                  <p className="text-gray-600 text-xs mt-1">
                    {p.parkingAddress}
                  </p>
                  <p className="text-green-600 font-semibold mt-2">
                    ₹{getCurrentPrice(p)}
                    {getPriceLabel()}
                  </p>
                  <p className="text-gray-700 text-xs">
                    Day rate: ₹{p.parkingPrice * 6}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="w-100 bg-white shadow-xl overflow-y-auto flex flex-col">
        <div className="p-4 bg-gray-50 border-b sticky top-0 z-10 shrink-0">
          <h2 className="text-lg font-bold text-gray-900">
            Available Parkings ({parkings?.length})
          </h2>
        </div>

        <div className="space-y-0 flex-1 overflow-y-auto">
          {parkings?.map((parking) => {
            const isExpanded = expandedCards.includes(parking.id);

            return (
              <div
                key={parking.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <MapPin className="text-green-600" size={22} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-xl mb-1 leading-tight">
                        {parking?.parkingName}
                      </h3>
                      <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                        {parking?.parkingAddress}
                      </p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xl font-semibold text-gray-900">
                      ₹
                      {mode === "HOURLY"
                        ? parking?.parkingPrice
                        : parking?.monthlyBookingPrice}
                      <span className="text-sm font-normal text-gray-800">
                        {getPriceLabel()}
                      </span>
                    </p>
                  </div>

                  {isExpanded && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-3 space-y-2 animate-fadeIn">
                      {mode === "HOURLY" ? (
                        <>
                          <div className="flex gap-2">
                            <span className="text-gray-600 font-semibold">
                              Total Slots:
                            </span>
                            <span className="font-semibold text-gray-900">
                              {parking?.totalSlot}
                            </span>
                            <div className="flex gap-2">
                              <span className="text-gray-600 font-semibold">
                                {" "}
                                Total evStation:
                              </span>
                              <span className="font-semibold text-blue-600">
                                {parking?.evStation}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 font-semibold">
                              Available slots:
                            </span>
                            <span className="font-semibold text-gray-900">
                              {parking?.availableSlot}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 font-semibold">
                              Available EvStation:
                            </span>
                            <span className="font-semibold text-gray-900">
                              {parking?.evAvailable}
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Monthly rate:</span>
                            <span className="font-semibold text-gray-900">
                              ₹{parking.monthlyBookingPrice}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              Daily equivalent:
                            </span>
                            <span className="font-semibold text-gray-900">
                              ₹{Math.round(parking.monthlyBookingPrice / 30)}
                              /day
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              Billing cycle:
                            </span>
                            <span className="font-semibold text-gray-900">
                              Monthly (30 days)
                            </span>
                          </div>
                        </>
                      )}
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500 font-semibold">
                          24/7 secure parking with CCTV surveillance
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDetailsClick(parking.id)}
                      className="flex-1 px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 
                            border border-gray-300 bg-white
                            shadow-sm hover:shadow-md
                            hover:bg-gray-50 hover:border-gray-400
                            active:scale-95 active:shadow-inner
                            transition-all duration-200 ease-in-out
                            flex items-center justify-center gap-2"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp size={16} />
                          Hide Details
                        </>
                      ) : (
                        <>
                          <ChevronDown size={16} />
                          Show Details
                        </>
                      )}
                    </button>

                    {isExpanded && (
                      <button
                        onClick={() => handleBookParking(parking)}
                        className="flex-1 px-4 py-2 bg-green-600 text-white active:scale-95 rounded-lg text-sm font-semibold hover:bg-green-600 transition-all shadow-md hover:shadow-lg"
                      >
                        Book Parking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && selectedBooking && (
        <div className="fixed inset-0 z-3000 flex center justify-center bg-black/60 backdrop-blur-sm p-10 overflow-y-auto flex-1">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col animate-fadeIn">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between shrink-0">
              <h2 className="text-2xl font-bold text-gray-900">
                Confirm Booking
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="text-green-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {selectedBooking.parkingName}
                    </h3>
                    <p className="text-sm font-semibold text-gray-600">
                      {selectedBooking.parkingAddress}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">
                    Selected Plan
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      mode === "HOURLY"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {mode === "HOURLY" ? "Hourly Parking" : "Monthly Parking"}
                  </span>
                </div>

                <div className="space-y-3 py-3 border-b border-gray-200">
                  <div className="flex justify-between">
                    <span>Parking Price</span>
                    <span>₹{getBasePrice()}</span>
                  </div>

                  {includeEVCharging && (
                    <div className="flex justify-between text-blue-600">
                      <span>EV Charging</span>
                      <span>₹{getEVChargingPrice()}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-3 flex-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeEVCharging}
                        disabled={selectedBooking.evAvailable === 0}
                        onChange={(e) => setIncludeEVCharging(e.target.checked)}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                          <Zap size={16} className="text-amber-500" />
                          EV Charging
                        </p>
                        <p className="text-xs text-gray-500">
                          +₹{getEVChargingPrice()}
                          {mode === "HOURLY" ? "/hour" : "/month"}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Total Price</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{getTotalPrice()}
                    <span className="text-sm font-normal text-gray-500">
                      {getPriceLabel()}
                    </span>
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={userDetails.name}
                      onChange={(e) =>
                        handleUserDetailsChange("name", e.target.value)
                      }
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2 bg-white text-black  border border-gray-300 rounded-lg text-sm focus:outline-none      focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={userDetails.phone}
                      onChange={(e) =>
                        handleUserDetailsChange("phone", e.target.value)
                      }
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-2 bg-white text-black  border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Vehicle Number <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={userDetails.vehicle}
                      onChange={(e) =>
                        handleUserDetailsChange("vehicle", e.target.value)
                      }
                      placeholder="e.g., MH 01 AB 1234"
                      className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div className="space-y-3 py-3 border-b border-gray-200">
                    Date
                    <div>
                      <label
                        htmlFor="startDate"
                        className="block text-sm font-semibold text-gray-800 mb-1"
                      >
                        Select Date
                      </label>

                      <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-lg text-black bg-                        white"
                      />
                    </div>
                    {/* Time */}
                    <div>
                      <label
                        htmlFor="startTime"
                        className="block text-sm font-semibold text-gray-800 mb-1"
                      >
                        Starting Time
                      </label>

                      <input
                        id="startTime"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-lg text-black bg-white"
                      />
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label
                      htmlFor="duration"
                      className="block text-sm font-semibold text-gray-800 mb-1"
                    >
                      Duration (Hours)
                    </label>

                    <select
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full border border-gray-300 p-2 rounded-lg text-black bg-white"
                    >
                      <option value={1}>1 Hour</option>
                      <option value={2}>2 Hours</option>
                      <option value={3}>3 Hours</option>
                      <option value={4}>4 Hours</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-b-2xl flex gap-3 shrink-0">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleContinueToPayment}
                className="flex-1 px-6 py-3 bg-linear-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BookParking;
