import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import ReportCard from "./ReportCard";
import Chart from "react-apexcharts";
import { Search, Crown } from "lucide-react";
import { getAllUsers, getUserDetails } from "@/services/api";

export default function UserReports() {

  const [usersData, setUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState(null);

  useEffect(()=>{
    fetchUsers();
  },[]);

  useEffect(()=>{
    if(selectedUser) fetchUserDetails(selectedUser);
  },[selectedUser]);

  const fetchUsers = async () => {
    try{
      const res = await getAllUsers();
      const list = res?.data || res || [];
      setUsersData(list);
      if(list.length > 0) setSelectedUser(list[0].customId);
    }catch(e){console.error(e);}
  };

  const fetchUserDetails = async (id) => {
    try{
      const res = await getUserDetails(id);
      setProfile(res?.data || res);
    }catch(e){console.error(e);}
  };

  const users = usersData.map(u=>({
    id:u.customId,
    name:u.name
  }));

  const filtered = users.filter(u=>
    u.name?.toLowerCase().includes(search.toLowerCase())
  );

  const data = profile?.bookingHistory || [];
  const totalSpent = profile?.totalSpent || 0;
  const lastVisit = data.length ? data[data.length - 1].date : "-";

  const chart = {
    series: data.length ? data.map(d=>d.amount) : [0],
    options:{ labels: data.length ? data.map(d=>d.date) : ["No Data"] }
  };

  return (
    <AdminLayout>

      <div className="sticky top-0 bg-white p-3 shadow flex gap-2">
        <Search size={18}/>
        <input placeholder="Search user..." onChange={e=>setSearch(e.target.value)} />
      </div>

      <div className="flex gap-2 flex-wrap p-4">
        {filtered.map(u => (
          <button key={u.id} onClick={()=>setSelectedUser(u.id)} className="bg-gray-200 px-3 py-2 rounded flex gap-1">
            {u.name==="Rahul" && <Crown size={14}/>} {u.name}
          </button>
        ))}
      </div>

      <ReportCard title={`User 360° – ${profile?.name || ""}`}>

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-4">

            {profile && (
              <div className="bg-gray-100 p-4 rounded">
                <p>📅 {profile.joinedDate}</p>
                <p>📞 {profile.phone}</p>
                <p>🏠 {profile.address?.city}</p>
                <p>🚗 {profile.vehicle}</p>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              <Stat label="Bookings" value={profile?.totalBookings}/>
              <Stat label="Spent" value={`₹${totalSpent}`}/>
              <Stat label="Last Visit" value={lastVisit}/>
            </div>

            <Table rows={data}/>

          </div>

          <Chart options={chart.options} series={chart.series} type="donut" height={300}/>

        </div>

      </ReportCard>

    </AdminLayout>
  );
}

const Stat = ({label,value}) => (
  <div className="bg-blue-50 p-4 rounded">
    <p>{label}</p>
    <h3>{value}</h3>
  </div>
);

const Table = ({ rows }) => (
  <table className="w-full text-sm">
    <thead>
      <tr>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((r,i)=>(
        <tr key={i}>
          <td>₹{r.amount}</td>
          <td>{r.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
);  