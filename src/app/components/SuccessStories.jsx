"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";

const slides = [
  {
    text: "Our son’s cancer had relapsed after 2.5 years of chemotherapy & we knew we couldn’t afford his life-saving treatment. But thanks to your donations & prayers, he underwent successful treatment & is recovering well. May God bless you all for saving his life!” -Dhanasar (Father)",
    url: "/assets/success_1.jpg",
  },
  {
    text: "Our son’s cancer had relapsed after 2.5 years of chemotherapy & we knew we couldn’t afford his life-saving treatment. But thanks to your donations & prayers, he underwent successful treatment & is recovering well. May God bless you all for saving his life!” -Dhanasar (Father)",
    url: "/assets/art2.jpg",
  },
  {
    text: "Our son’s cancer had relapsed after 2.5 years of chemotherapy & we knew we couldn’t afford his life-saving treatment. But thanks to your donations & prayers, he underwent successful treatment & is recovering well. May God bless you all for saving his life!” -Dhanasar (Father)",
    url: "/assets/art2.jpg",
  },
  {
    text: "Our son’s cancer had relapsed after 2.5 years of chemotherapy & we knew we couldn’t afford his life-saving treatment. But thanks to your donations & prayers, he underwent successful treatment & is recovering well. May God bless you all for saving his life!” -Dhanasar (Father)",
    url: "/assets/art2.jpg",
  },
];

const SuccessStories = () => {
  const [current, setCurrent] = useState(0);
  const prev = () =>
    setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1));
  const next = () =>
    setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));
  useEffect(() => {
    const slideInterval = setInterval(next, 10000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-3/4 mx-auto px-4 py-8 my-20">
      {/* Section Heading */}
      <div className="flex flex-col gap-4 mb-20 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-red-400">
          Success Stories
        </h1>
        <p className="text-gray-500 text-sm sm:text-base md:text-lg">
          Be it for a personal need, social cause, or a creative idea - you can
          count on
          <br className="hidden sm:block" /> us for the project that you want to
          raise funds for.
        </p>
      </div>

      {/* Carousel Section */}
      <div className="relative w-full">
        {/* Carousel Container */}
        <div className="overflow-hidden rounded-lg shadow-lg">
          <div
            className="flex transition-transform ease-in duration-500"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="relative h-48 sm:h-64 md:h-80">
                  <Image
                    src={slide.url}
                    alt={`Success story ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg object-fit"
                  />
                </div>
                <div className="bg-white p-4 md:p-6 rounded-b-lg">
                  <h1 className="font-semibold text-base sm:text-lg">
                    By Dhanasar
                  </h1>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                    {slide.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-200"
        >
          &#10094;
        </button>
        <button
          onClick={next}
          className="absolute top-1/2 right-2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-200"
        >
          &#10095;
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 right-0 left-0">
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`transition-all w-2 h-2 rounded-full ${
                  current === i ? "bg-white p-2" : "bg-white bg-opacity-50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Call-to-Action Button */}
      <Link
        href="/raise_funds"
        className="text-lg sm:text-xl md:text-2xl font-medium bg-red-400 py-3 px-6 sm:py-4 sm:px-8 text-center text-white hover:scale-105 transition-transform duration-300 ease-in-out rounded-full mt-10"
      >
        Start a fundraiser
      </Link>
    </div>
  );
};

export default SuccessStories;
