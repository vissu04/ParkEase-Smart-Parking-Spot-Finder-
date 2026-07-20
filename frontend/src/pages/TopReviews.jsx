import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Pro1 from "../assets/Pro1.png";
import Pro2 from "../assets/Pro2.png";
import Pro3 from "../assets/Pro3.png";
import Pro4 from "../assets/Pro4.png";
import Pro5 from "../assets/Pro5.png";

const reviews = [
  {
    name: "Riya Sharma",
    city: "Delhi",
    comment:
      "Everyone I know really likes ParkEase services. The booking process is smooth and parking spots are always available.",
    image: Pro1,
  },
  {
    name: "Pratee Sharma",
    city: "Mumbai",
    comment:
      "I absolutely love this service because it guarantees parking whenever I need it. The interface is simple and easy to use.",
    image: Pro2,
  },
  {
    name: "Soniya Jain",
    city: "Bangalore",
    comment:
      "Perfect for daily office commuters. It saves time every morning and reduces the stress of searching for parking.",
    image: Pro3,
  },
  {
    name: "Neha Verma",
    city: "Noida",
    comment:
      "Real-time slot availability works very well. Booking is fast and the parking locations are secure.",
    image: Pro4,
  },
  {
    name: "Rohit Mehta",
    city: "Gurgaon",
    comment:
      "Very convenient parking system. The app design is clean and the booking confirmation is instant.",
    image: Pro5,
  },
  {
    name: "Kriti Gupta",
    city: "Jaipur",
    comment:
      "This service has made parking so much easier. I can reserve my slot before reaching the destination.",
    image: Pro1,
  },
  {
    name: "Mohit Verma",
    city: "Pune",
    comment:
      "Very smooth experience. The interface is clean and booking a parking spot takes only seconds.",
    image: Pro2,
  },
  {
    name: "Amrit Kaur",
    city: "Chandigarh",
    comment:
      "Great app for office parking. It saves a lot of time and removes the daily parking hassle.",
    image: Pro3,
  },
];

const TopReviews = () => {
  return (
    <section
      className="py-24 text-white relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">What Our Customers Say</h2>
          <div className="w-16 h-1 bg-green-500 mx-auto mt-4"></div>
        </div>

        <div className="w-full px-8">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={4}
            spaceBetween={25}
            loop={true}
            speed={900}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              el: ".custom-pagination",
              clickable: true,
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              900: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <div
                  className="bg-white text-gray-700 rounded-xl shadow-lg
                  w-full h-[300px] p-6 text-center flex flex-col
                  items-center justify-center"
                >
                  <div className="text-green-500 text-4xl mb-3">“</div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 px-2">
                    {review.comment}
                  </p>

                  <h3 className="font-semibold text-gray-900">
                    {review.name}
                  </h3>

                  <p className="text-gray-500 text-sm mb-4">
                    {review.city}
                  </p>

                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-16 h-16 rounded-full border-4 border-green-500 object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination dots */}
          <div className="custom-pagination mt-10 flex justify-center"></div>
        </div>
      </div>
    </section>
  );
};

export default TopReviews;