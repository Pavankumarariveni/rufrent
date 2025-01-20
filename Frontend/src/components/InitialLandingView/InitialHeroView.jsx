import { useState, useEffect } from "react";

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

import CarouselImages from "./models/carouselImages";

import ContentOverlay from "./InitialContentOverlay";

const HeroSection = () => {
  const images = CarouselImages;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-carousel logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      id="home"
      className="relative bg-gray-200 mt-16 flex flex-col items-center justify-center text-center px-4 py-24"
      style={{ height: "500px" }}
    >
      {/* Background Carousel */}
      <div className="absolute inset-0 overflow-hidden w-full ">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.imageUrl}
            alt={`Carousel ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Content Overlay */}
      <ContentOverlay />
    </section>
  );
};

export default HeroSection;
