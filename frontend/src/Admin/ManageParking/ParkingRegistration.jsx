import React, { useState } from "react";
import {
  Building2, MapPin, IndianRupee, Clock3,
  Layers, Zap
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader,
  DialogTitle, DialogTrigger, DialogClose
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import Input from "@/components/ui/Input";
import { createParking } from "@/api/adminApi";

export default function ParkingRegistrationForm() {

  const [open, setOpen] = useState(false);
  const [parkingType, setParkingType] = useState("NORMAL");
  const [floors, setFloors] = useState(0);
  const [evEnabled, setEvEnabled] = useState(false);

  const [formData, setFormData] = useState({
    parkingName: "",
    address: "",
    city: "",
    phone: "",
    pinCode: "",
    price: "",
    openTime: "",
    closeTime: "",
    evPrice: "",
    latitude: "",
    longitude: "",
    monthlyBookingPrice: ""
  });

  const [bookingTypes, setBookingTypes] = useState([]);

  const [normalSlots, setNormalSlots] = useState({
    prefix: "",
    total: "",
    evStations: ""
  });

  const [floorData, setFloorData] = useState([]);

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFloorCount = (count) => {
    const num = Number(count);
    setFloors(num);

    setFloorData(
      Array.from({ length: num }, () => ({
        floorName: "",
        prefix: "",
        total: "",
        evStations: ""
      }))
    );
  };

  const updateFloor = (index, field, value) => {
    const updated = [...floorData];
    updated[index][field] = value;
    setFloorData(updated);
  };

  // ✅ ONLY HOURLY & MONTHLY
  const toggleBookingType = (type) => {
    setBookingTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // ✅ AUTO GPS LOCATION
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData(prev => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        }));
      },
      () => {
        alert("Location permission denied");
      }
    );
  };

  const resetForm = () => {
    setFormData({
      parkingName: "",
      address: "",
      city: "",
      phone: "",
      pinCode: "",
      price: "",
      openTime: "",
      closeTime: "",
      evPrice: "",
      latitude: "",
      longitude: "",
      monthlyBookingPrice: ""
    });

    setBookingTypes([]);
    setNormalSlots({
      prefix: "",
      total: "",
      evStations: ""
    });

    setFloorData([]);
    setFloors(0);
    setEvEnabled(false);
    setParkingType("NORMAL");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      parkingName: formData.parkingName,
      address: formData.address,
      city: formData.city,
      phone: formData.phone,
      pinCode: formData.pinCode,

      price: Number(formData.price),
      openTime: formData.openTime,
      closeTime: formData.closeTime,
      monthlyBookingPrice: formData.monthlyBookingPrice,

      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),

      evEnabled,
      evPrice: evEnabled ? Number(formData.evPrice) : null,

      parkingType,
      bookingTypes,

      normalSlots:
        parkingType === "NORMAL"
          ? {
              prefix: normalSlots.prefix,
              totalSlots: Number(normalSlots.total),
              evStations: evEnabled ? Number(normalSlots.evStations) : 0
            }
          : null,

      floors:
        parkingType === "MULTI"
          ? floorData.map((f) => ({
              floorName: f.floorName,
              prefix: f.prefix,
              totalSlots: Number(f.total),
              evStations: evEnabled ? Number(f.evStations) : 0
            }))
          : []
    };

    try {
      const res = await createParking(payload);
      alert("Parking Created Successfully!");
      setOpen(false);
      resetForm();
    } catch (err) {
      alert(err.message || "Failed to create parking");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <Button className="bg-indigo-600 text-white">
          + New Parking
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-5xl bg-slate-100 rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Register Parking
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8">

          <Card title="Basic Details">
            <PremiumInput label="Parking Name" name="parkingName" onChange={handleChange} />
            <PremiumInput label="Address" name="address" onChange={handleChange} />

            <Grid2>
              <PremiumInput label="City" name="city" onChange={handleChange} />
              <PremiumInput label="Pincode" name="pinCode" onChange={handleChange} />
            </Grid2>

            <Grid2>
              <PremiumInput label="Price" name="price" onChange={handleChange} />
              <PremiumInput type="time" label="Open Time" name="openTime" onChange={handleChange} />
            </Grid2>

            <PremiumInput type="time" label="Close Time" name="closeTime" onChange={handleChange} />

            <Grid2>
              <PremiumInput label="Latitude" name="latitude" value={formData.latitude} readOnly />
              <PremiumInput label="Longitude" name="longitude" value={formData.longitude} readOnly />
            </Grid2>

            <Button type="button" onClick={getLocation} className="bg-green-600 text-white">
              📍 Use Current Location
            </Button>

            <PremiumInput label="Monthly Booking Price" name="monthlyBookingPrice" onChange={handleChange} />
          </Card>

          <Card title="Parking Configuration">

            <select
              className="w-full h-12 border rounded-xl px-4"
              value={parkingType}
              onChange={(e) => setParkingType(e.target.value)}
            >
              <option value="NORMAL">Normal Parking</option>
              <option value="MULTI">Multi Floor Parking</option>
            </select>

            {/* ✅ ONLY HOURLY + MONTHLY */}
            <div className="flex gap-4 mt-3">
              <label><input type="checkbox" onChange={() => toggleBookingType("HOURLY")} /> Hourly</label>
              <label><input type="checkbox" onChange={() => toggleBookingType("MONTHLY")} /> Monthly</label>
            </div>

            <div className="flex gap-2 mt-3">
              <input type="checkbox" onChange={() => setEvEnabled(!evEnabled)} />
              <Label>EV Enabled</Label>
            </div>

            {evEnabled && (
              <PremiumInput label="EV Price" name="evPrice" onChange={handleChange} />
            )}

          </Card>

          {parkingType === "NORMAL" && (
            <Card title="Normal Slots">
              <PremiumInput label="Prefix" onChange={(e) => setNormalSlots(prev => ({ ...prev, prefix: e.target.value }))} />
              <PremiumInput label="Total Slots" onChange={(e) => setNormalSlots(prev => ({ ...prev, total: e.target.value }))} />
              {evEnabled && (
                <PremiumInput label="EV Stations" onChange={(e) => setNormalSlots(prev => ({ ...prev, evStations: e.target.value }))} />
              )}
            </Card>
          )}

          {parkingType === "MULTI" && (
            <Card title="Floors">
              <PremiumInput type="number" label="No of Floors" onChange={(e) => handleFloorCount(e.target.value)} />

              {floorData.map((floor, index) => (
                <div key={index} className="bg-white p-4 rounded-xl">
                  <PremiumInput label="Floor Name" onChange={(e) => updateFloor(index, "floorName", e.target.value)} />
                  <PremiumInput label="Prefix" onChange={(e) => updateFloor(index, "prefix", e.target.value)} />
                  <PremiumInput label="Total Slots" onChange={(e) => updateFloor(index, "total", e.target.value)} />
                  {evEnabled && (
                    <PremiumInput label="EV Stations" onChange={(e) => updateFloor(index, "evStations", e.target.value)} />
                  )}
                </div>
              ))}
            </Card>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
}

const Card = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl space-y-4">
    <h2 className="font-bold">{title}</h2>
    {children}
  </div>
);

const Grid2 = ({ children }) => (
  <div className="grid grid-cols-2 gap-4">{children}</div>
);

const PremiumInput = ({ label, ...props }) => (
  <div>
    <Label>{label}</Label>
    <Input {...props} />
  </div>
);