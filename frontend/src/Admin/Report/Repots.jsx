import { useEffect, useState } from "react";
import ReportCard from "./ReportCard";
import Chart from "react-apexcharts";
import { Search, Crown } from "lucide-react";
import { getAllUsers, getUserDetails } from "@/api/adminApi";
import AdminLayout from "@/layouts/AdminLayout";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function UserReports() {

  const [usersData, setUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    fetchUsers();
  },[]);

  useEffect(()=>{
    if(selectedUser) fetchUserDetails(selectedUser);
  },[selectedUser]);

  const fetchUsers = async () => {
    try{
      setLoading(true);
      const res = await getAllUsers();
      const list = res?.data || res || [];

      setUsersData(list);

      if(list.length > 0){
        setSelectedUser(list[0].customId || list[0]._id);
      }

    }catch(e){console.error(e);}
    finally{setLoading(false);}
  };

  const fetchUserDetails = async (id) => {
    try{
      setLoading(true);
      const res = await getUserDetails(id);
      setProfile(res?.data || res);
    }catch(e){console.error(e);}
    finally{setLoading(false);}
  };

  const users = usersData.map(u=>({
    id: u.customId || u._id,
    name: u.name || "Unknown"
  }));

  const filtered = users.filter(u=>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const data = profile?.bookingHistory || [];
  const totalSpent = profile?.totalSpent || 0;

  const lastVisit = data.length
    ? [...data].sort((a,b)=> new Date(b.date) - new Date(a.date))[0]?.date
    : "-";

  const chart = {
    series: data.length ? data.map(d => Number(d.amount) || 0) : [1],
    options: {
      labels: data.length ? data.map(d => d.date || "N/A") : ["No Data"]
    }
  };

  // ✅ DATE FORMAT
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN");
  };

  // ✅ PDF DOWNLOAD
  const downloadPDF = () => {

    if (!profile) return;

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`${profile.name} Report`, 14, 15);

    let startY = 25;

    doc.setFontSize(11);
    doc.text(`Phone: ${profile.phone}`, 14, startY);
    doc.text(`Email: ${profile.email}`, 14, startY + 7);
    doc.text(`City: ${profile.address?.city || "-"}`, 14, startY + 14);
    doc.text(`Vehicle: ${profile.vehicle || "-"}`, 14, startY + 21);

    startY += 30;

    const tableData = data.map(r => [
      r.user,
      r.parking,
      r.car,
      `₹${r.amount}`,
      formatDate(r.date)
    ]);

    autoTable(doc, {
      head: [["User","Parking","Car","Amount","Date"]],
      body: tableData,
      startY: startY
    });

    doc.save(`${profile.name}-report.pdf`);
  };

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">User Reports</h1>

      {/* 🔍 SEARCH */}
      <div className="sticky top-0 z-10 bg-white pb-4">
        <div className="flex items-center gap-3 border rounded-xl px-4 py-3 shadow-sm">
          <Search size={18} className="text-gray-400"/>
          <input
            placeholder="Search user..."
            className="w-full outline-none"
            onChange={e=>setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* 👥 USER LIST */}
      <div className="flex gap-2 flex-wrap my-4">
        {filtered.map(u => (
          <button
            key={u.id}
            onClick={()=>setSelectedUser(u.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium
              ${selectedUser === u.id
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 hover:bg-blue-50 hover:text-blue-600"}
            `}
          >
            {u.name==="Rahul" && <Crown size={14} className="inline mr-1"/>}
            {u.name}
          </button>
        ))}
      </div>

      {/* ⏳ LOADING */}
      {loading && <p className="p-4 text-gray-500">Loading...</p>}

      {/* 📊 REPORT */}
      {!loading && profile && (
        <ReportCard 
          title={`User 360° – ${profile.name}`}
          action={
            <button
              onClick={downloadPDF}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Download PDF
            </button>
          }
        >

          <div className="grid lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 space-y-4">

              {/* USER INFO */}
              <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                <p>📅 Joined: {profile.joinedDate || "-"}</p>
                <p>📞 {profile.phone || "-"}</p>
                <p>📧 {profile.email || "-"}</p>
                <p>🏠 {profile.address?.city || "-"}</p>
                <p>🚗 {profile.vehicle || "-"}</p>
              </div>

              {/* STATS */}
              <div className="grid sm:grid-cols-3 gap-4">
                <Stat label="Bookings" value={profile.totalBookings || 0}/>
                <Stat label="Revenue" value={`₹${totalSpent}`}/>
                <Stat label="Last Visit" value={formatDate(lastVisit)}/>
              </div>

              {/* TABLE */}
              <Table rows={data}/>

            </div>

            {/* 📈 CHART */}
            <div className="bg-white rounded-xl shadow p-4">
              <Chart
                options={chart.options}
                series={chart.series}
                type="donut"
                height={280}
              />
            </div>

          </div>

        </ReportCard>
      )}

    </AdminLayout>
  );
}

// ✅ STAT
const Stat = ({label,value}) => (
  <div className="bg-blue-50 p-4 rounded-xl">
    <p className="text-sm text-gray-600">{label}</p>
    <h3 className="text-xl font-bold text-blue-700">{value}</h3>
  </div>
);

// ✅ FULL DETAIL TABLE
const Table = ({ rows }) => (
  <div className="overflow-x-auto mt-4 border rounded-xl">
    <table className="w-full text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left">User</th>
          <th className="p-3 text-left">Parking</th>
          <th className="p-3 text-left">Car</th>
          <th className="p-3 text-left">Amount</th>
          <th className="p-3 text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r,i)=>(
          <tr key={i} className="border-t">
            <td className="p-3">{r.user}</td>
            <td className="p-3">{r.parking}</td>
            <td className="p-3">{r.car}</td>
            <td className="p-3 text-green-600 font-medium">₹{r.amount}</td>
            <td className="p-3">{new Date(r.date).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);