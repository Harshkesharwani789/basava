import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";

const Hero = () => {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Custom Previous Arrow with improved styling
  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 cursor-pointer bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      onClick={onClick}
      aria-label="Previous slide"
    >
      <FaArrowLeft className="text-gray-800 text-xl" />
    </div>
  );

  // Custom Next Arrow with improved styling
  const NextArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 cursor-pointer bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      onClick={onClick}
      aria-label="Next slide"
    >
      <FaArrowRight className="text-gray-800 text-xl" />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  };

  const fetchBanners = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(
        "https://basavamart.in/api/testimonials/getBanners"
      );
      if (response.data) {
        setBanners(response.data.slice(0, 3));
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
      setError("Failed to load banners. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[360px] bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Loading banners...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[360px] bg-gray-100 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!banners || banners.length === 0) {
    return (
      <div className="h-[360px] bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">No banners available</div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-6">
      <div className="rounded-lg overflow-hidden shadow-lg">
        <Slider {...settings}>
          {banners.map((banner) => (
            <div key={banner?._id} className="relative h-[360px]">
              <img
                src={`https://basavamart.in${banner?.image}`}
                alt={banner?.title || "Banner"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/1200x360?text=Banner+Not+Available';
                }}
                loading="lazy"
              />
              {banner?.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                  <h2 className="text-xl font-semibold">{banner.title}</h2>
                </div>
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;