"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CrowdFundingForm from "../components/CrowdFundingForm";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const page = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    pincode: "",
    usage: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-col items-center justify-center gap-6 px-4 md:px-8 lg:px-16 xl:px-32">
        {/* 1 */}
        <div className="flex flex-col lg:flex-row w-full h-auto xl:h-[100vh] items-center justify-center gap-10 my-10">
          {/* Image */}
          <div className="w-full lg:w-1/2 h-[40vh] lg:h-full flex justify-center items-center">
            <Image
              src="/assets/child_welfare.png"
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
            <h1 className="text-[#54618b] text-2xl md:text-4xl lg:text-5xl font-medium">
              Raise funds to help children!
            </h1>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-8">
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-4 text-start">
              <h1 className="text-[#54618b] text-lg md:text-xl lg:text-2xl font-medium">
                Keeping children healthy
              </h1>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                Children are God’s gift to us and are looked upon as a blessing!
                Keeping children healthy, safe and well provided for is a cause
                to which we can all unite and help selflessly. After all,
                there's nothing more rewarding than helping the little ones we
                care for. Hence, crowdfunding for child welfare and donation for
                children fund is so authoritative and powerful with Ketto’s
                online crowdfunding platform.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src="/assets/child_welfare.png"
                width={100}
                height={100}
                alt="sports Crowdfunding"
                className="w-2/3 object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src="/assets/child_welfare.png"
                width={100}
                height={100}
                alt="sports Crowdfunding"
                className="w-2/3 object-contain"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-4 text-start">
              <h1 className="text-[#54618b] text-lg md:text-xl lg:text-2xl font-medium">
                Survey Report
              </h1>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                A survey done by the Child Rights and You (CRY) census report
                says, 1 out of 4 children don't receive schooling, more than 19
                million are malnourished, 10 million are oppressed through child
                labour, and more than 11 million are on the streets.
                Crowdfunding online using Ketto’s online crowdfunding platform
                can be the change and make a huge impact to reduce these
                numbers. By fundraising online, you can quickly raise money
                online from donors, supporters and well-wishers to offer a child
                an inspiring living.
              </p>
            </div>
          </div>
        </div>

        {/* 3 */}
        <div className="px-4 py-10 my-12">
          <div className="flex flex-col gap-6 mb-10 md:mb-20 text-center">
            <h1 className="text-3xl md:text-5xl font-medium text-[#54618b]">
              What can you raise funds for?
            </h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
            {[
              "Child's Medical Treatment",
              "Child Education",
              "Sponsors Healthy Meal to Children",
              "Supports Child Athletes",
              "Become a Champion for an NGO",
            ].map((cause, index) => (
              <div
                key={index}
                className="px-4 py-8 md:px-6 md:py-12 lg:px-10 lg:py-16 text-center shadow-lg bg-[#54618b] rounded-3xl hover:bg-[#51a5db] hover:text-black hover:rounded-lg hover:shadow-2xl hover:scale-105 duration-200 text-white text-lg md:text-xl lg:text-2xl"
              >
                {cause}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default page;
