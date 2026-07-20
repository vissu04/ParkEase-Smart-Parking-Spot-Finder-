import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ParkingCircle } from 'lucide-react';
import Input from '../components/ui/Input';
import { Button } from '@/components/ui/button';
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: "",
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const newErrors = { ...errors };

    if (name === 'email') {
      if (!value) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(value)) {
        newErrors.email = 'Please enter a valid email address';
      } else {
        delete newErrors.email;
      }
    }

    if (name === "phone") {
      if (!value) {
        newErrors.phone = "Phone number is required";
      } else if (!/^[0-9]{10}$/.test(value)) {
        newErrors.phone = "Enter a valid 10-digit phone number";
      } else {
        delete newErrors.phone;
      }
    }

    if (name === 'name') {
      if (!value) {
        newErrors.name = 'Full name is required';
      } else {
        delete newErrors.name;
      }
    }

    if (name === 'password') {
      if (!value) {
        newErrors.password = 'Password is required';
      } else if (value.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    const res = await signup({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });

    if (res.success) {
      alert("Signup successful");
    } else {
      alert(res.message);
    }

    setIsSubmitting(false);
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.password &&
    formData.password.length >= 8 &&
    validateEmail(formData.email);

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

        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 flex items-center gap-5">
          <div className="grid grid-cols-2 gap-2">
            <div className="w-8 h-8 rounded-full bg-red-600"></div>
            <div className="w-7 h-10 rounded-full bg-yellow-400"></div>
            <div className="w-7 h-10 rounded-full bg-blue-600"></div>
            <div className="w-8 h-8 rounded-full bg-emerald-500"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-extrabold text-white">PARK</span>
            <span className="text-4xl font-light text-white tracking-[0.35em]">SMART</span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[38%] flex items-center justify-center p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100">

            <h2 className="text-3xl font-bold text-gray-900 mb-1">Create an Account</h2>
            <p className="text-gray-600 mb-4 text-sm">Get started with ParkSmart</p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                label="Full Name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />

              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="mail@website.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
              />

              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? 'Creating account...' : 'Create Account'}
              </Button>

              <p className="text-center text-sm text-gray-600 mt-3">
                Already have an account?{' '}
                <Link to="/login" className="text-emerald-600 font-semibold">
                  Sign in
                </Link>
              </p>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}