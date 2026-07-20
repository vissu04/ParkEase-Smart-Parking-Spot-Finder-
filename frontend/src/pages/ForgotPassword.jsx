import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, ParkingCircle } from "lucide-react";
import Input from "../components/ui/Input";
import { Button } from "@/components/ui/button";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Password reset requested for:", email);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  const isFormValid = email && validateEmail(email);

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block lg:w-[62%] relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/WhatsApp_Image_2026-02-18_at_12.31.15_PM.jpeg"
            alt="Luxury parking"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent"></div>
        </div>

        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10 flex items-center gap-5">
          <div className="grid grid-cols-2 gap-2">
            <div className="w-8 h-8 rounded-full bg-red-600"></div>
            <div className="w-7 h-10 rounded-full bg-yellow-400"></div>
            <div className="w-7 h-10 rounded-full bg-blue-600"></div>
            <div className="w-8 h-8 rounded-full bg-emerald-500"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-extrabold text-white tracking-wide leading-none">
              PARK
            </span>
            <span className="text-4xl font-light text-white tracking-[0.35em] leading-none">
              SMART
            </span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[38%] flex items-center justify-center p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100">
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="grid grid-cols-2 gap-0.5 w-12 h-12">
                <div className="w-5.5 h-5.5 rounded-full bg-red-600"></div>
                <div className="w-5.5 h-5.5 rounded-full bg-yellow-400"></div>
                <div className="w-5.5 h-5.5 rounded-full bg-blue-600"></div>
                <div className="w-5.5 h-5.5 rounded-full bg-emerald-500"></div>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-2xl font-black text-gray-800 tracking-wider leading-none">
                  PARK
                </span>
                <span className="text-2xl font-light text-gray-800 tracking-[0.3em] leading-none">
                  SMART
                </span>
              </div>
            </div>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="font-medium">Back to Login</span>
            </Link>

            {!isSuccess ? (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Forgot Password?
                </h2>
                <p className="text-gray-600 mb-8">
                  No worries, we'll send you reset instructions
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="mail@website.com"
                    value={email}
                    onChange={handleChange}
                    error={error}
                    required
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!isFormValid || isSubmitting}
                    className="mt-6"
                  >
                    {isSubmitting ? "Sending..." : "Reset Password"}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                  <CheckCircle size={32} className="text-emerald-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Check your email
                </h2>
                <p className="text-gray-600 mb-8">
                  We sent a password reset link to <br />
                  <span className="font-semibold text-gray-900">{email}</span>
                </p>
                <Link to="/login">
                  <Button variant="primary">Back to Login</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
