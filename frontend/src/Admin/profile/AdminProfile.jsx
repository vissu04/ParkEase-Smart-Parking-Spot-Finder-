import AdminLayout from "@/layouts/AdminLayout";
import { useState, useEffect } from "react";
import { getAdminProfile } from "@/api/adminApi"; 

export default function AdminProfile() {

  const [loading, setLoading] = useState(true);

  const [image, setImage] = useState(
    localStorage.getItem("adminImage") || ""
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    password: ""
  });

  const [adminInfo, setAdminInfo] = useState({
    adminId: "",
    role: "",
    createdAt: "",
    lastLogin: "N/A",
    status: "Active"
  });


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getAdminProfile();

        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          city: data.addresses?.city || "",
          address: data.addresses?.addressLine || "",
          password: ""
        });

        setAdminInfo({
          adminId: data.customId, 
          role: data.roles?.join(", ") || "ADMIN",
          createdAt: formatDate(data.createdAt),
          lastLogin: data.lastLogin
            ? formatDateTime(data.lastLogin)
            : "N/A",
          status: "Active"
        });

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  
  const handleImage = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImage(url);
    localStorage.setItem("adminImage", url);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });


  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return <div className="text-center p-10">Loading profile...</div>;
  }

  return (
    <AdminLayout>

      <div className="max-w-6xl mx-auto space-y-8">

        <h1 className="text-3xl font-bold text-gray-800">Admin Profile</h1>

        {/* PROFILE HEADER */}
        <div className="bg-white p-6 rounded-2xl shadow flex flex-col md:flex-row gap-6 items-center">

          <div className="text-center">
            <img
              src={image || "https://i.pravatar.cc/150?img=12"}
              className="w-32 h-32 rounded-full object-cover border-4 border-teal-500"
            />

            <label className="block mt-3 text-sm text-blue-600 cursor-pointer">
              Change Photo
              <input type="file" hidden onChange={handleImage}/>
            </label>
          </div>

          <div>
            <h2 className="text-xl font-semibold">{form.name}</h2>
            <p className="text-gray-500">{adminInfo.role}</p>
            <p className="text-gray-400 text-sm">{form.email}</p>

            <span className="inline-block mt-2 text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
              {adminInfo.status}
            </span>
          </div>

        </div>

        {/* ADMIN INFO */}
        <Section title="Admin Information">
          <ReadOnly label="Admin ID" value={adminInfo.adminId}/>
          <ReadOnly label="Role" value={adminInfo.role}/>
          <ReadOnly label="Account Created" value={adminInfo.createdAt}/>
          <ReadOnly label="Last Login" value={adminInfo.lastLogin}/>
        </Section>

        {/* PERSONAL INFO */}
        <Section title="Personal Information">
          <Input label="Full Name" name="name" value={form.name} onChange={handleChange}/>
          <Input label="Email" name="email" value={form.email} onChange={handleChange}/>
          <Input label="Phone" name="phone" value={form.phone} onChange={handleChange}/>
          <Input label="City" name="city" value={form.city} onChange={handleChange}/>
          <Input label="Address" name="address" value={form.address} onChange={handleChange}/>
        </Section>
      </div>

    </AdminLayout>
  );
}

// 🔹 Reusable Components
const Section = ({ title, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow space-y-4">
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <div className="grid md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-sm text-gray-500">{label}</label>
    <input
      {...props}
      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
    />
  </div>
);

const ReadOnly = ({ label, value }) => (
  <div className="space-y-1">
    <label className="text-sm text-gray-500">{label}</label>
    <input
      value={value}
      readOnly
      className="w-full border bg-gray-100 rounded-lg px-3 py-2 text-gray-500 cursor-not-allowed"
    />
  </div>
);