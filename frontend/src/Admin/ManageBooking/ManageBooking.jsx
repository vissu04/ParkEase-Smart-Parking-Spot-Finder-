import { useState, useEffect } from "react";
import {
  CalendarDays,
  BellRing,
  Eye,
  Search
} from "lucide-react";
import AdminLayout from "@/layouts/AdminLayout";
import { getTodayBookings } from "@/api/adminApi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ManageBookings() {

  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [page, setPage] = useState(1);
  console.log(bookings)

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getTodayBookings();

        const mapped = res.map((b, i) => ({
          id: `${b.customId}-${i}`,
          customId: b.customId || "-",
          user: b.user || "-",
          parking: b.parking || "-",
          slot: b.slot || "-",
          car: b.car || "-",
          date: b.date ? new Date(b.date).toLocaleString() : "-", 
          status: b.status || "PENDING",
          amount: b.amount || 0
        }));

        setBookings(mapped);

      } catch (err) {
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  const totalRevenue = bookings.reduce((sum, b) => sum + b.amount, 0);

  const filteredBookings = bookings.filter((b) =>
    `${b.user} ${b.parking} ${b.slot} ${b.status} ${b.customId}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const paginatedBookings =
    filteredBookings.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // ✅ PDF EXPORT (PRODUCTION STYLE)
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Parking Bookings Report", 14, 15);

    const tableData = filteredBookings.map(b => [
      b.customId,
      b.user,
      b.parking,
      b.slot,
      b.date,
      b.amount,
      b.status
    ]);

    autoTable(doc, {
      startY: 25,
      head: [["ID", "User", "Parking", "Slot", "Date", "Amount", "Status"]],
      body: tableData,

      headStyles: {
        fillColor: [37, 99, 235], // blue
        textColor: 255
      },

      alternateRowStyles: {
        fillColor: [245, 247, 250]
      }
    });

    doc.save("bookings-report.pdf");
  };

  return (
    <AdminLayout>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">

        <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
          <CalendarDays className="text-blue-600 w-9 h-9"/> Booking Analytics
        </h1>

        {toast && (
          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl w-fit">
            <BellRing size={18}/> {toast}
          </div>
        )}

        {/* SEARCH + PDF BUTTON */}

        <div className="flex flex-wrap gap-3 items-center">

          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-3 text-gray-400" size={18}/>
            <input
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              placeholder="Search booking, user, parking, ID..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
          </div>

          <button
            onClick={exportPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Export PDF
          </button>

        </div>

        {/* TABLE */}

        <div className="bg-white rounded-2xl shadow overflow-hidden">

          <table className="w-full text-sm">

            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">UserID</th>
                <th className="p-4 text-left">User</th>
                <th className="p-4 text-left">Parking</th>
                <th className="p-4 text-left">Slot</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>

              {paginatedBookings.map(b => {

                const rowColor =
                  b.status === "CONFIRMED"
                    ? "bg-green-50"
                    : b.status === "PENDING"
                    ? "bg-yellow-50"
                    : "bg-red-50";

                return (
                  <tr key={b.id} className={`border-t ${rowColor}`}>

                    <td className="p-4">{b.customId}</td>
                    <td className="p-4">{b.user}</td>
                    <td className="p-4">{b.parking}</td>
                    <td className="p-4">{b.slot}</td>
                    <td className="p-4">{b.date}</td>
                    <td className="p-4 text-blue-600 font-semibold">₹ {b.amount}</td>

                    <td className="p-4">
                      <StatusBadge status={b.status}/>
                    </td>

                    <td className="p-4 text-right flex gap-2 justify-end">

                      <button
                        className="bg-gray-200 px-3 py-1 rounded-lg text-xs flex items-center gap-1"
                      >
                        <Eye size={14}/> View
                      </button>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>
  );
}

/* STATUS BADGE */

const StatusBadge=({status})=>(
  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
    status==="CONFIRMED"
      ? "bg-green-100 text-green-700"
      : status==="PENDING"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-600"
  }`}>
    {status}
  </span>
);