"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CrowdFundingForm from "../components/CrowdFundingForm";
import Steps from "../components/Steps";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    url: "/assets/art2.jpg",
  },
  {
    url: "/assets/art2.jpg",
  },
  {
    url: "/assets/art2.jpg",
  },
  {
    url: "/assets/art2.jpg",
  },
];

const Page = () => {
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
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-6 px-4 md:px-8 ">
        {/* 1 */}
        <div className="flex flex-col lg:flex-row w-full h-auto xl:h-[100vh] items-center justify-center gap-10 lg:px-16 xl:px-32">
          {/* Image */}
          <div className="w-full lg:w-1/2 h-[40vh] lg:h-full flex justify-center items-center">
            <div className="relative w-full">
              {/* Carousel Container */}
              <div className="overflow-hidden rounded-lg shadow-lg">
                <div
                  className="flex transition-transform ease-out duration-500"
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
                          className="rounded-t-lg"
                        />
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
                        current === i
                          ? "bg-white p-2"
                          : "bg-white bg-opacity-50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Form Content */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <CrowdFundingForm />
          </div>
        </div>

        {/* 2 */}
        <div className="flex flex-col items-center gap-10 lg:gap-20 justify-center text-center lg:my-10 xl:my-16 ">
          <div className="flex flex-col gap-4 lg:px-16 xl:px-32">
            <h1 className="text-red-400 text-2xl md:text-4xl lg:text-5xl font-medium">
              What is Crowdfunding?
            </h1>
            <p className="text-gray-500 text-sm md:text-base lg:text-lg">
              In its simplest form, Crowdfunding is a practice of giving
              monetary funds to overcome specific social, cultural, or economic
              hurdles individuals face in their daily lives.
            </p>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-8 lg:px-16 xl:px-32">
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-4 text-start">
              <h1 className="text-red-400 text-lg md:text-xl lg:text-2xl font-medium">
                So how does Crowdfunding work On Ketto?
              </h1>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                Let us assume an individual, unfortunately, meets with an
                accident on the road. His medical expenses and hospital bills
                start piling up. Now he needs ₹5 Lakh to pay his expensive
                medical bills. Fortunately, his best friend signed up on Ketto’s
                crowdfunding platform, completed the process of submitting valid
                documents needed for verification. In a few minutes, he created
                a crowdfunding campaign to raise funds for his friend’s medical
                expenses. Now, this campaign can be shared with all his near and
                dear ones through WhatsApp, Instagram, Twitter, Facebook and
                E-mail. In a matter of few minutes, funds start coming in to
                support the financial needs of the injured friend.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src="/assets/art2.jpg"
                width={100}
                height={100}
                alt="Medical Crowdfunding"
                className="w-2/3 object-contain"
              />
            </div>
          </div>
          <Steps></Steps>
        </div>

        {/* 3 */}
        <div className="px-4 py-10 my-12">
          <div className="flex flex-col gap-6 mb-10 md:mb-20 text-center">
            <h1 className="text-3xl md:text-5xl font-medium text-red-400">
            We provide everything you need
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Whether it’s a personal need, social cause, or creative idea, you
              can count on us for the project you want to raise funds for.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
            {[
              "Payout",
              "Multiple people - Same Fundraiser",
              "Personalized Web App",
              "Dedicated Fundraiser expert",
              "Keep the raised amount",
              "24/7 support",
            ].map((cause, index) => (
              <div
                key={index}
                className="px-4 py-8 md:px-6 md:py-12 lg:px-10 lg:py-16 text-center shadow-lg bg-red-600 rounded-3xl hover:bg-red-200 hover:text-black hover:rounded-lg hover:shadow-2xl hover:scale-105 duration-200 text-white text-lg md:text-xl lg:text-2xl"
              >
                {cause}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-10">
          <Link
          href="/raise_funds"
          className="text-lg md:text-xl lg:text-2xl font-medium bg-red-400 py-3 px-6 lg:py-4 lg:px-8 text-white hover:scale-105 border-2 border-red-400 hover:bg-white hover:text-red-400 transition-transform duration-300 ease-in-out mt-8"
        >
          Start a Fundraiser
        </Link>
          <Link
        href="/browse_fundraisers"
        className="text-lg md:text-xl lg:text-2xl font-medium bg-white border-2 border-red-400 text-red-400 py-3 px-6 lg:py-4 lg:px-8 text-center hover:scale-105 hover:bg-red-400 hover:text-white transition-transform duration-300 ease-in-out mt-8"
      >
        Browse Fundraisers
      </Link>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
