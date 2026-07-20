import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SiPaytm, SiPhonepe } from "react-icons/si";
import { FaAmazon, FaCheckCircle } from "react-icons/fa";
import jsPDF from "jspdf";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking;
  const mode = location.state?.mode;

  const [method, setMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [wallet, setWallet] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        No booking details found.
      </div>
    );
  }

  const price =
    mode === "HOURLY"
      ? `₹${booking.hourly} / hr`
      : `₹${booking.monthly} / month`;

  const handlePay = () => {
    if (!method) {
      alert("Please select a payment method");
      return;
    }
    setPaymentSuccess(true);
  };

  const generateInvoice = () => {
    const doc = new jsPDF();

    const transactionId = "TXN" + Math.floor(100000 + Math.random() * 900000);

    doc.setFontSize(18);
    doc.text("ParkEase Parking Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Transaction ID: ${transactionId}`, 20, 40);
    doc.text(`Location: ${booking.name}`, 20, 50);
    doc.text(`Address: ${booking.address}`, 20, 60);

    doc.text(
      `Plan: ${mode === "HOURLY" ? "Hourly Parking" : "Monthly Parking"}`,
      20,
      70,
    );

    doc.text(`Payment Method: ${method}`, 20, 80);

    if (wallet) {
      doc.text(`Wallet: ${wallet}`, 20, 90);
    }

    doc.text(
      `Amount Paid: ${
        mode === "HOURLY"
          ? `₹${booking.hourly} / hr`
          : `₹${booking.monthly} / month`
      }`,
      20,
      100,
    );

    doc.text("Status: Successful", 20, 120);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 130);

    doc.save("ParkEase-Invoice.pdf");
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-xl bg-white rounded-2xl p-10 shadow-xl text-center space-y-6">
          <FaCheckCircle className="text-green-600 text-6xl mx-auto" />

          <h2 className="text-2xl font-bold text-gray-900">
            Payment Successful
          </h2>

          <p className="text-gray-600">
            Your parking has been booked successfully.
          </p>

          <div className="flex flex-col gap-3 items-center">
            <button
              onClick={() =>
                navigate("/my-booking", {
                  state: {
                    newBooking: {
                      ...booking,
                      mode,
                      paymentMethod: method,
                      wallet,
                      status: "Active",
                    },
                  },
                })
              }
              className="w-full md:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
            >
              View Booking Details
            </button>

            <button
              onClick={generateInvoice}
              className="w-full md:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
            >
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-10 text-black">
      <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 md:p-8 shadow-md space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Payment
          </h1>
          <p className="text-gray-600">
            Complete your payment to confirm booking.
          </p>
        </div>

        <div className="border rounded-xl p-5 text-gray-700 space-y-2">
          <p>
            <strong>Location:</strong> {booking.name}
          </p>
          <p>
            <strong>Address:</strong> {booking.address}
          </p>
          <p>
            <strong>Plan:</strong>{" "}
            {mode === "HOURLY" ? "Hourly Parking" : "Monthly Parking"}
          </p>
          <p className="text-green-600 font-semibold text-lg">{price}</p>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold text-gray-900 text-lg">
            Select Payment Method
          </h2>

          <label className="block border rounded-lg p-4 cursor-pointer hover:border-green-500">
            <input
              type="radio"
              name="payment"
              className="mr-2"
              onChange={() => setMethod("UPI")}
            />
            UPI
          </label>

          {method === "UPI" && (
            <input
              type="text"
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500"
            />
          )}

          <label className="block border rounded-lg p-4 cursor-pointer hover:border-green-500">
            <input
              type="radio"
              name="payment"
              className="mr-2"
              onChange={() => setMethod("CARD")}
            />
            Debit / Credit Card
          </label>

          {method === "CARD" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Card Number"
                className="border rounded-lg px-4 py-3 md:col-span-2"
                value={card.number}
                onChange={(e) => setCard({ ...card, number: e.target.value })}
              />

              <input
                placeholder="Name on Card"
                className="border rounded-lg px-4 py-3 md:col-span-2"
                value={card.name}
                onChange={(e) => setCard({ ...card, name: e.target.value })}
              />

              <input
                placeholder="MM/YY"
                className="border rounded-lg px-4 py-3"
                value={card.expiry}
                onChange={(e) => setCard({ ...card, expiry: e.target.value })}
              />

              <input
                placeholder="CVV"
                className="border rounded-lg px-4 py-3"
                value={card.cvv}
                onChange={(e) => setCard({ ...card, cvv: e.target.value })}
              />
            </div>
          )}

          <label className="block border rounded-lg p-4 cursor-pointer hover:border-green-500">
            <input
              type="radio"
              name="payment"
              className="mr-2"
              onChange={() => setMethod("WALLET")}
            />
            Wallet
          </label>

          {method === "WALLET" && (
            <div className="space-y-3">
              <button
                onClick={() => setWallet("Paytm")}
                className="w-full flex items-center gap-3 border rounded-lg px-4 py-3 hover:bg-gray-50"
              >
                <SiPaytm className="text-blue-600 text-xl" /> Paytm
              </button>

              <button
                onClick={() => setWallet("PhonePe")}
                className="w-full flex items-center gap-3 border rounded-lg px-4 py-3 hover:bg-gray-50"
              >
                <SiPhonepe className="text-purple-600 text-xl" /> PhonePe
              </button>

              <button
                onClick={() => setWallet("Amazon Pay")}
                className="w-full flex items-center gap-3 border rounded-lg px-4 py-3 hover:bg-gray-50"
              >
                <FaAmazon className="text-yellow-600 text-xl" /> Amazon Pay
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full md:w-1/2 bg-gray-100 hover:bg-gray-200 py-3 rounded-lg"
          >
            Back
          </button>

          <button
            onClick={handlePay}
            className="w-full md:w-1/2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            Pay & Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;