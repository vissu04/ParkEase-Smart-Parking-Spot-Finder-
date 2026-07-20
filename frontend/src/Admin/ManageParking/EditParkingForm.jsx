import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogFooter,
  DialogHeader, DialogTitle
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import Input from "@/components/ui/Input";

// ✅ IMPORT API
import { updateParking } from "@/api/adminApi";

export default function EditParkingForm({ open, setOpen, data, onUpdate }) {

  const [form, setForm] = useState({
    name: "",
    area: "",
    location: "",
    available: 0,
    occupied: 0
  });

  // ✅ PREFILL DATA
  useEffect(() => {
    if (data) {
      setForm({
        name: data.name || "",
        area: data.area || "",
        location: data.location || "",
        available: data.available || 0,
        occupied: data.occupied || 0
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: name === "available" || name === "occupied"
        ? Number(value)
        : value
    }));
  };

  // ✅ FIXED SUBMIT (API CALL)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 BACKEND PAYLOAD
    const payload = {
      parkingName: form.name,
      parkingAddress: form.area,

      totalSlot: Number(form.available) + Number(form.occupied),
      availableSlot: Number(form.available),

      evStation: data.evStation || 0,
      evAvailable: data.evAvailable || 0,

      parkingPrice: 0,
      evPrice: 0
    };

    try {
      // ✅ CALL UPDATE API
      await updateParking(data.id, payload);

      // ✅ UPDATE UI LOCALLY
      onUpdate(form);

      alert("Parking Updated!");

      setOpen(false);

    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl bg-slate-100 rounded-3xl">

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Edit Parking
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">

          <InputField label="Parking Name" name="name" value={form.name} onChange={handleChange} />
          <InputField label="Area" name="area" value={form.area} onChange={handleChange} />
          <InputField label="City" name="location" value={form.location} onChange={handleChange} />

          <div className="grid grid-cols-2 gap-4">
            <InputField label="Available Slots" name="available" type="number" value={form.available} onChange={handleChange} />
            <InputField label="Occupied Slots" name="occupied" type="number" value={form.occupied} onChange={handleChange} />
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-indigo-600 text-white w-full">
              Update Parking
            </Button>
          </DialogFooter>

        </form>

      </DialogContent>
    </Dialog>
  );
}

const InputField = ({ label, ...props }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Input {...props} className="bg-white" />
  </div>
);