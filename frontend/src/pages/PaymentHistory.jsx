import { useState, useEffect } from "react";
import { FaSearch, FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import { getPaymentHistory } from "@/api/userApi"; // ✅ ADD

const PaymentHistory = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [paymentHistoryData, setPaymentHistoryData] = useState([]); // ✅ NEW

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getPaymentHistory();

        const mapped = data.map((p) => ({
          id: p.paymentId || p.id,
          location: p.parkingName || "Parking",

          // ✅ FIXED
          date: p.paymentDate
            ? new Date(p.paymentDate).toLocaleDateString()
            : "",

          time: p.paymentDate
            ? new Date(p.paymentDate).toLocaleTimeString()
            : "",

          amount: p.amount || 0,
          method: p.paymentMethod || "Online",
          status: p.status === "SUCCESS" ? "Success" : "Failed",
        }));

        setPaymentHistoryData(mapped);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPayments();
  }, []);

  const filteredData = paymentHistoryData.filter((item) => {
    const matchSearch =
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === "All" || item.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const totalAmount = paymentHistoryData.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  const successAmount = paymentHistoryData
    .filter((i) => i.status === "Success")
    .reduce((sum, item) => sum + item.amount, 0);

  const failedAmount = paymentHistoryData
    .filter((i) => i.status === "Failed")
    .reduce((sum, item) => sum + item.amount, 0);

  // ✅ Invoice Download Function (UNCHANGED)
  const downloadInvoice = (item) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Parking Payment Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Transaction ID: ${item.id}`, 20, 40);
    doc.text(`Location: ${item.location}`, 20, 50);
    doc.text(`Date: ${item?.Date}`, 20, 60);
    doc.text(`Time: ${item?.time}`, 20, 70);
    doc.text(`Payment Method: ${item?.method}`, 20, 80);
    doc.text(`Amount Paid: ₹${item?.amount}`, 20, 90);
    doc.text(`Status: ${item?.status}`, 20, 100);

    doc.text("Thank you for using our parking service.", 20, 130);

    doc.save(`Invoice-${item.id}.pdf`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 text-black">
      <div className="w-full p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
          <p className="text-gray-600">
            View all your parking transactions and payment details.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl shadow border">
            <p className="text-gray-500 text-sm">Total Payments</p>
            <h2 className="text-2xl font-bold text-gray-900">₹{totalAmount}</h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow border">
            <p className="text-gray-500 text-sm">Successful Payments</p>
            <h2 className="text-2xl font-bold text-green-600">
              ₹{successAmount}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow border">
            <p className="text-gray-500 text-sm">Failed Payments</p>
            <h2 className="text-2xl font-bold text-red-600">₹{failedAmount}</h2>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center bg-white border rounded-lg px-3 py-2 w-full md:w-1/3">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search transaction or location..."
              className="outline-none w-full text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="bg-white border rounded-lg px-4 py-2 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl border shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-700">
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Location</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Method</th>
                <th className="p-4">Status</th>
                <th className="p-4">Invoice</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition text-sm"
                >
                  <td className="p-4 font-medium">{item.id}</td>
                  <td className="p-4">{item.location}</td>
                  <td className="p-4">
                    {item.date}
                    <br />
                    <span className="text-gray-500 text-xs">{item.time}</span>
                  </td>

                  <td
                    className={`p-4 font-semibold ${
                      item.status === "Success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    ₹{item.amount}
                  </td>

                  <td className="p-4">{item.method}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => downloadInvoice(item)}
                      className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs hover:bg-blue-700"
                    >
                      <FaDownload />
                      Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
