import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🔧 Fix default marker issue
delete L.Icon.Default.prototype._getIconUrl;

// 🎨 Marker by status
const getMarkerIcon = (status) => {
  const color =
    status === "Available" ? "green" : status === "Limited" ? "orange" : "red";

  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
};

// 📊 MULTIPLE PARKING STATUS DATA (15)
const parkingStatusData = [
  {
    id: 1,
    name: "City Center Parking",
    position: [28.6315, 77.2167],
    status: "Available",
    slots: 45,
  },
  {
    id: 2,
    name: "Railway Station Parking",
    position: [28.643, 77.2197],
    status: "Limited",
    slots: 4,
  },
  {
    id: 3,
    name: "Airport Parking",
    position: [28.5562, 77.1],
    status: "Full",
    slots: 0,
  },
  {
    id: 4,
    name: "Karol Bagh Parking",
    position: [28.6512, 77.1905],
    status: "Available",
    slots: 22,
  },
  {
    id: 5,
    name: "Rajiv Chowk Metro Parking",
    position: [28.6328, 77.2195],
    status: "Limited",
    slots: 6,
  },
  {
    id: 6,
    name: "Saket Mall Parking",
    position: [28.5286, 77.2194],
    status: "Available",
    slots: 18,
  },
  {
    id: 7,
    name: "Nehru Place Parking",
    position: [28.5485, 77.2507],
    status: "Limited",
    slots: 5,
  },
  {
    id: 8,
    name: "Lajpat Nagar Parking",
    position: [28.5677, 77.2433],
    status: "Available",
    slots: 14,
  },
  {
    id: 9,
    name: "Dwarka Sector 21 Parking",
    position: [28.5522, 77.0586],
    status: "Available",
    slots: 30,
  },
  {
    id: 10,
    name: "Noida Sector 18 Parking",
    position: [28.5708, 77.326],
    status: "Limited",
    slots: 3,
  },
  {
    id: 11,
    name: "Cyber City Parking",
    position: [28.4946, 77.088],
    status: "Available",
    slots: 60,
  },
  {
    id: 12,
    name: "South Extension Parking",
    position: [28.5733, 77.2197],
    status: "Limited",
    slots: 7,
  },
  {
    id: 13,
    name: "Kashmere Gate Parking",
    position: [28.6675, 77.2284],
    status: "Full",
    slots: 0,
  },
  {
    id: 14,
    name: "Vasant Kunj Parking",
    position: [28.5426, 77.155],
    status: "Available",
    slots: 25,
  },
  {
    id: 15,
    name: "Pitampura Parking",
    position: [28.6954, 77.1525],
    status: "Available",
    slots: 19,
  },
];

const ParkingStatus = () => {
  return (
    <div className="w-full min-h-screen bg-white pb-24">
      <div className="w-full bg-white/95 backdrop-blur-md p-8 shadow-xl space-y-10">
        {/* HEADER */}
        <section className="px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Parking Status
          </h1>
          <p className="text-gray-600">
            Real-time availability overview of parking locations.
          </p>
        </section>

        {/* MAP */}
        <section className="rounded-xl overflow-hidden border mx-6">
          <MapContainer
            center={[28.6315, 77.2167]}
            zoom={11}
            className="h-[420px] w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            {parkingStatusData.map((p) => (
              <Marker
                key={p.id}
                position={p.position}
                icon={getMarkerIcon(p.status)}
              >
                <Popup>
                  <div className="space-y-1">
                    <strong className="text-gray-900">{p.name}</strong>
                    <p className="text-sm">
                      Status:{" "}
                      <span
                        className={`font-semibold ${
                          p.status === "Available"
                            ? "text-green-600"
                            : p.status === "Limited"
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {p.status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-700">
                      Slots Available: {p.slots}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </section>

        {/* LEGEND */}
        <section className="flex flex-wrap gap-8 text-sm px-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-gray-700">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span className="text-gray-700">Limited</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="text-gray-700">Full</span>
          </div>
        </section>

        {/* STATUS CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {parkingStatusData.map((p) => (
            <div
              key={p.id}
              className="bg-white border rounded-xl p-6 shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {p.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">Live Availability</p>

              <div className="flex justify-between items-center">
                <span
                  className={`font-semibold ${
                    p.status === "Available"
                      ? "text-green-600"
                      : p.status === "Limited"
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                >
                  {p.status}
                </span>
                <span className="text-gray-700">Slots: {p.slots}</span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ParkingStatus;
