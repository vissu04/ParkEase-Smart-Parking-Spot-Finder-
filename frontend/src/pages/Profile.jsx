import { useState } from "react";

function Input({ label, name, value, type = "text", disabled, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className="w-full mt-1 px-4 py-3 border rounded-lg 
        text-black placeholder:text-gray-500
        disabled:bg-gray-100 disabled:text-gray-700
        focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );
}

function Select({ label, name, value, children, disabled, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>

      <select
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className="w-full mt-1 px-4 py-3 border rounded-lg 
        text-black bg-white
        disabled:bg-gray-100 disabled:text-gray-700
        focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        {children}
      </select>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>

      <div className="mt-1 px-4 py-3 border rounded-lg bg-gray-100 text-black">
        {value}
      </div>
    </div>
  );
}

//  MAIN COMPONENT

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Mohit Verma",
    email: "mohit@example.com",
    phone: "+91 8057XXXXXX",
    dob: "2002-05-15",
    gender: "Male",
    address: "Connaught Place",
    city: "Delhi",
    pincode: "110001",

    vehicleType: "Car",
    vehicleBrand: "Hyundai",
    vehicleNumber: "DL 01 AB 1234",
    vehicleColor: "White",
    fuelType: "Petrol",
    modelYear: "2022",

    customerId: "PKR-102345",
    memberSince: "Jan 2025",
    accountStatus: "Active",
  });

  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10 space-y-10">

        {/* HEADER */}
        <section>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">
            Manage your personal and vehicle details.
          </p>
        </section>

        {/* PERSONAL INFO */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input
              label="Full Name"
              name="name"
              value={profile.name}
              disabled={!isEditing}
              onChange={handleChange}
            />

            <Input
              label="Email"
              name="email"
              value={profile.email}
              disabled
            />

            <Input
              label="Phone"
              name="phone"
              value={profile.phone}
              disabled={!isEditing}
              onChange={handleChange}
            />

            <Input
              label="Date of Birth"
              name="dob"
              type="date"
              value={profile.dob}
              disabled={!isEditing}
              onChange={handleChange}
            />

            <Select
              label="Gender"
              name="gender"
              value={profile.gender}
              disabled={!isEditing}
              onChange={handleChange}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Select>

            <Input
              label="Address"
              name="address"
              value={profile.address}
              disabled={!isEditing}
              onChange={handleChange}
            />

            <Input
              label="City"
              name="city"
              value={profile.city}
              disabled={!isEditing}
              onChange={handleChange}
            />

            <Input
              label="Pincode"
              name="pincode"
              value={profile.pincode}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* VEHICLE DETAILS */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Vehicle Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Select
              label="Vehicle Type"
              name="vehicleType"
              value={profile.vehicleType}
              disabled={!isEditing}
              onChange={handleChange}
            >
              <option>Car</option>
              <option>Bike</option>
              <option>SUV</option>
            </Select>

            <Input
              label="Vehicle Brand"
              name="vehicleBrand"
              value={profile.vehicleBrand}
              disabled={!isEditing}
              onChange={handleChange}
            />

            <Input
              label="Vehicle Number"
              name="vehicleNumber"
              value={profile.vehicleNumber}
              disabled={!isEditing}
              onChange={handleChange}
            />

            <Input
              label="Vehicle Color"
              name="vehicleColor"
              value={profile.vehicleColor}
              disabled={!isEditing}
              onChange={handleChange}
            />

            <Select
              label="Fuel Type"
              name="fuelType"
              value={profile.fuelType}
              disabled={!isEditing}
              onChange={handleChange}
            >
              <option>Petrol</option>
              <option>Diesel</option>
              <option>Electric</option>
              <option>CNG</option>
            </Select>

            <Input
              label="Model Year"
              name="modelYear"
              value={profile.modelYear}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Account Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Info label="Customer ID" value={profile.customerId} />
            <Info label="Member Since" value={profile.memberSince} />
            <Info label="Account Status" value={profile.accountStatus} />
          </div>
        </section>

        {/* ACTION BUTTONS */}
        <section className="flex flex-col sm:flex-row justify-end gap-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 
              text-white font-semibold rounded-xl shadow-md transition"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 border rounded-lg text-black hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg"
              >
                Save Changes
              </button>
            </>
          )}
        </section>

      </div>
    </div>
  );
};

export default Profile;
