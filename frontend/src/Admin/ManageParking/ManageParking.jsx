import { useState, useEffect } from "react";
import { CarFront, Trash2, Pencil, Zap } from "lucide-react";

import EditParkingForm from "./EditParkingForm";
import AdminLayout from "@/layouts/AdminLayout";
import ParkingRegistrationForm from "./ParkingRegistration";

import { getAllParkings, deleteParking } from "@/api/adminApi";

export default function ManageParking() {

  const [parkings, setParkings] = useState([]);

  const [search, setSearch] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [selectedParking, setSelectedParking] = useState(null);

  useEffect(() => {
    fetchParkings();
  }, []);

  const fetchParkings = async () => {
    try {
      const res = await getAllParkings();

      // ✅ UPDATED MAPPING (EV INCLUDED)
      const mapped = res.map((p) => ({
        id: p.id,
        name: p.parkingName,
        area: p.parkingAddress,
        location: p.parkingAddress,

        totalSlots: p.totalSlot,
        occupiedSlots: p.totalSlot - p.availableSlot,

        // ✅ NEW EV FIELDS
        evStation: p.evStation || 0,
        evAvailable: p.evAvailable || 0
      }));

      setParkings(mapped);

    } catch (err) {
      console.error("Failed to fetch parkings", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteParking(id);
      setParkings(prev => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (parking) => {
    setSelectedParking({
      ...parking,
      available: parking.totalSlots - parking.occupiedSlots,
      occupied: parking.occupiedSlots
    });
    setEditOpen(true);
  };

  const handleUpdate = (updated) => {
    const totalSlots =
      Number(updated.available) + Number(updated.occupied);

    setParkings(prev =>
      prev.map(p =>
        p.id === selectedParking.id
          ? {
              ...p,
              name: updated.name,
              area: updated.area,
              location: updated.location,
              totalSlots,
              occupiedSlots: Number(updated.occupied)
            }
          : p
      )
    );
  };

  const filteredParkings = parkings.filter((p) =>
    `${p.name} ${p.area} ${p.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getStatus = (percent) => {
    if (percent < 50) return "bg-green-100 text-green-600";
    if (percent < 80) return "bg-yellow-100 text-yellow-600";
    return "bg-red-100 text-red-600";
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-7xl mx-auto px-4 space-y-8">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
          <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-800">
            <CarFront className="text-blue-600 w-8 h-8" />
            Register New Parking
          </h1>

          <ParkingRegistrationForm />
        </div>

        {/* SEARCH */}
        <div className="max-w-md">
          <input
            type="text"
            placeholder="🔍 Search parking by name, area, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
          />
        </div>

        {/* EMPTY */}
        {filteredParkings.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            No parking found
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {filteredParkings.map((p) => {

            const available = p.totalSlots - p.occupiedSlots;
            const percent = (p.occupiedSlots / p.totalSlots) * 100;

            return (
              <div key={p.id}
                   className="relative rounded-3xl border bg-white p-5 shadow-md hover:shadow-xl transition">

                {/* ACTIONS */}
                <div className="absolute top-3 right-3 flex gap-2">

                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-500 hover:scale-110 transition"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

                <h2 className="text-lg font-semibold text-gray-800">
                  {p.name}
                </h2>

                <p className="text-sm text-gray-500 mb-3">
                  📍 {p.area}
                </p>

                <div className="flex justify-between text-sm mb-2">
                  <span>Total: {p.totalSlots}</span>

                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatus(percent)}`}>
                    {percent.toFixed(0)}% Full
                  </span>
                </div>

                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
                  <div
                    style={{ width: `${percent}%` }}
                    className={`h-full ${
                      percent < 50 ? "bg-green-500"
                      : percent < 80 ? "bg-yellow-500"
                      : "bg-red-500"
                    }`}
                  />
                </div>

                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-green-600">Avl: {available}</span>
                  <span className="text-red-500">Occ: {p.occupiedSlots}</span>
                </div>

                {/* ✅ NEW EV SECTION */}
                {p.evStation > 0 && (
                  <div className="flex justify-between text-xs bg-blue-50 px-3 py-2 rounded-lg">
                    <span className="flex items-center gap-1 text-blue-600">
                      <Zap size={14} /> EV: {p.evStation}
                    </span>
                    <span className="text-green-600">
                      Avl: {p.evAvailable}
                    </span>
                  </div>
                )}

              </div>
            );
          })}

        </div>

        {/* EDIT */}
        <EditParkingForm
          open={editOpen}
          setOpen={setEditOpen}
          data={selectedParking}
          onUpdate={handleUpdate}
        />

      </div>
    </AdminLayout>
  );
}