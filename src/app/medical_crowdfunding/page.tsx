"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CrowdFundingForm from "../components/CrowdFundingForm";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-6 px-4 md:px-8 lg:px-16 xl:px-32">
        {/* 1 */}
        <div className="flex flex-col lg:flex-row w-full h-auto xl:h-[100vh] items-center justify-center gap-10 my-10">
          {/* Image */}
          <div className="w-full lg:w-1/2 h-[40vh] lg:h-full flex justify-center items-center">
            <Image
              src="/assets/medical_cf.png"
              width={1000}
              height={2000}
              alt="Background"
              className="w-full h-full mt-10 md:mt-0 object-contain"
            />
          </div>
          {/* Form Content */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <CrowdFundingForm />
          </div>
        </div>

        {/* 2 */}
        <div className="flex flex-col items-center gap-10 lg:gap-20 justify-center text-center lg:px-20 lg:my-10 xl:my-16">
          <div className="flex flex-col gap-4">
            <h1 className="text-[#5ac2b3] text-2xl md:text-4xl lg:text-5xl font-medium">
              Medical Fundraising & Crowdfunding
            </h1>
            <p className="text-gray-500 text-sm md:text-base lg:text-lg">
              Online Medical crowdfunding is an alternative method for
              individuals and organizations to generate funds required for
              costly medical treatments like open-heart surgeries, NICU care,
              bone marrow transplants, cancer treatments, and more.
            </p>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-8">
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-4 text-start">
              <h1 className="text-[#5ac2b3] text-lg md:text-xl lg:text-2xl font-medium">
                Medical Bills are a Burden for Many
              </h1>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                Expenses related to hospital stays, cancer treatments with
                high-cost chemotherapy routines, and other medical costs can be
                overwhelming. Treatment costs and living expenses can strain
                families, and insurance policies often fall short.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src="/assets/medical_cf.png"
                width={100}
                height={100}
                alt="Medical Crowdfunding"
                className="w-2/3 object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src="/assets/medical_cf.png"
                width={100}
                height={100}
                alt="Medical Crowdfunding"
                className="w-2/3 object-contain"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-4 text-start">
              <h1 className="text-[#5ac2b3] text-lg md:text-xl lg:text-2xl font-medium">
                Try Medical Crowdfunding
              </h1>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                Stop worrying about medical bills and start a fundraising
                campaign with Ketto, a Crowdfunding platform based in India.
                Crowdfunding is an effective way to get support from friends,
                family, and others willing to help.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-8">
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-4 text-start">
              <h1 className="text-[#5ac2b3] text-lg md:text-xl lg:text-2xl font-medium">
                Start a Medical Fundraiser
              </h1>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                With Ketto, you can start a free, easy fundraiser in minutes for
                medical bills. You can also spread the word for a loved one in
                need. Medical fundraising campaigns allow well-wishers to
                contribute when needed.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src="/assets/medical_cf.png"
                width={100}
                height={100}
                alt="Medical Crowdfunding"
                className="w-2/3 object-contain"
              />
            </div>
          </div>
        </div>

        {/* 3 */}
        <div className="px-4 py-10 my-12">
          <div className="flex flex-col gap-6 mb-10 md:mb-20 text-center">
            <h1 className="text-3xl md:text-5xl font-medium text-[#5ac2b3]">
              What Medical Treatments Can You Raise Funds For?
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Whether it’s a personal need, social cause, or creative idea, you
              can count on us for the project you want to raise funds for.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
            {[
              "Open Heart Surgery",
              "Kidney Transplant",
              "NICU Care",
              "Bone Marrow Transplant",
              "Cancer Treatment",
            ].map((cause, index) => (
              <div
                key={index}
                className="px-4 py-8 md:px-6 md:py-12 lg:px-10 lg:py-16 text-center shadow-lg bg-[#5ac2b3] rounded-3xl hover:bg-[#6be6db] hover:rounded-lg hover:shadow-2xl hover:scale-105 duration-200 text-white text-lg md:text-xl lg:text-2xl"
              >
                {cause}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
