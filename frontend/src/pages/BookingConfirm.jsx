import { useLocation, useNavigate } from "react-router-dom";
import { createOrder, verifyPayment } from "@/api/paymentApi";
import { getQrCode } from "@/api/userApi"; // ✅ NEW

import { useEffect, useState } from "react"; // ✅ NEW
import jsPDF from "jspdf";

const BookingConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;

  const [qr, setQr] = useState(null); // ✅ NEW

  // ✅ FETCH QR CODE
  useEffect(() => {
    if (booking?.id) {
      getQrCode(booking.id)
        .then((res) => setQr(res))
        .catch((err) => console.error(err));
    }
  }, [booking]);
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Parking Booking Receipt", 20, 20);

    doc.setFontSize(12);

    doc.text(`Name: ${booking.name}`, 20, 40);
    doc.text(`Phone: ${booking.phone}`, 20, 50);
    doc.text(`Vehicle: ${booking.vehicleNumber}`, 20, 60);
    doc.text(`Parking ID: ${booking.parkingId}`, 20, 70);
    doc.text(`Amount: ₹${booking.amount}`, 20, 80);

    doc.text(`Start: ${new Date(booking.startDate).toLocaleString()}`, 20, 90);
    doc.text(`End: ${new Date(booking.endDate).toLocaleString()}`, 20, 100);

    if (qr) {
      doc.text(`Slot: ${qr.spot}`, 20, 110);
      doc.text(`Floor: ${qr.floor}`, 20, 120);

      // ✅ QR IMAGE ADD
      doc.addImage(
        `data:image/png;base64,${qr.qrCode}`,
        "PNG",
        60,
        140,
        80,
        80,
      );
    }

    doc.save("Parking_Booking.pdf");
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6 text-black">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Booking Confirmation
        </h1>

        <div className="space-y-2 text-sm">
          <p>
            <strong>Name:</strong> {booking.name}
          </p>
          <p>
            <strong>Phone:</strong> {booking.phone}
          </p>
          <p>
            <strong>Vehicle:</strong> {booking.vehicleNumber}
          </p>
          <p>
            <strong>Parking ID:</strong> {booking.parkingId}
          </p>
          <p>
            <strong>Amount:</strong> ₹{booking.amount}
          </p>
          <p>
            <strong>Starting Time:</strong>{" "}
            {new Date(booking.startDate).toLocaleString()}
          </p>
          <p>
            <strong>Ending Time:</strong>{" "}
            {new Date(booking.endDate).toLocaleString()}
          </p>

          {/* ✅ NEW: spot details (minimal add) */}
          {qr && (
            <>
              <p>
                <strong>Slot Number:</strong> {qr.spot}
              </p>
              <p>
                <strong>Floor:</strong> {qr.floor}
              </p>
            </>
          )}
        </div>

        {/* ✅ QR CODE DISPLAY (NEW - minimal UI add) */}
        {qr && qr.status === "CONFIRMED" && (
          <div className="flex flex-col items-center mt-4">
            <p className="text-sm font-semibold text-gray-700">
              Scan for Entry / Exit
            </p>
            <img
              src={`data:image/png;base64,${qr.qrCode}`}
              alt="QR Code"
              className="w-50 h-50 mt-2"
            />
          </div>
        )}

        <button
          onClick={downloadPDF}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
        >
          Download Ticket PDF
        </button>

        <button
          onClick={() => navigate(-1)}
          className="w-full mt-2 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-semibold text-lg py-3 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default BookingConfirm;
