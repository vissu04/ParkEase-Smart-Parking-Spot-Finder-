import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent to support!");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-white py-16 px-6 text-black">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <Mail size={48} className="mx-auto text-[#0F172A] mb-4" />
          <h1 className="text-5xl font-bold text-[#0F172A] mb-3">
            Contact Support
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Have a question or facing an issue? Our support team is ready to
            help you. Fill out the form below and we’ll respond shortly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-6 text-[#0F172A]">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-emerald-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-emerald-500"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-emerald-500"
              />

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold transition"
              >
                Send Message
              </button>

            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">

            <div className="bg-gray-50 p-6 rounded-xl shadow flex items-start gap-4">
              <Mail className="text-emerald-500" />
              <div>
                <h3 className="font-semibold text-lg">Email Support</h3>
                <p className="text-gray-600">support@parksmart.com</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow flex items-start gap-4">
              <Phone className="text-emerald-500" />
              <div>
                <h3 className="font-semibold text-lg">Phone Support</h3>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow flex items-start gap-4">
              <MapPin className="text-emerald-500" />
              <div>
                <h3 className="font-semibold text-lg">Office Address</h3>
                <p className="text-gray-600">
                  ParkSmart HQ  
                  <br />
                  New Delhi, India
                </p>
              </div>
            </div>

            <div className="bg-emerald-500 text-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-lg mb-2">Support Hours</h3>
              <p>Monday – Friday</p>
              <p>9:00 AM – 6:00 PM</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}