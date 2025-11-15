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
              src="/assets/organ_cf.png"
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
            <h1 className="text-[#395379] text-2xl md:text-4xl lg:text-5xl font-medium">
              Raise Funds for Organ Transplants
            </h1>
            <p className="text-gray-500 text-sm md:text-base lg:text-lg">
              The term “Transplant Crowdfunding” defines itself as a process of
              raising money by seeking small donations from several people for
              an organ transplant.
            </p>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-8">
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-4 text-start">
              <h1 className="text-[#395379] text-lg md:text-xl lg:text-2xl font-medium">
                What is Transplant Crowdfunding in India?
              </h1>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                Crowdfunding can help you raise funds for a surgery that you
                wouldn’t otherwise have the funds for. For example, if you're
                raising money on Ketto to pay for your heart transplant, this
                helps spare you a lot of worries over paying for the operation
                and additional costs. It also means that you won't be worried
                about money while focusing on the recovery at hand.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src="/assets/organ_cf.png"
                width={100}
                height={100}
                alt="cancer Crowdfunding"
                className="w-2/3 object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src="/assets/organ_cf.png"
                width={100}
                height={100}
                alt="cancer Crowdfunding"
                className="w-2/3 object-contain"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-4 text-start">
              <h1 className="text-[#395379] text-lg md:text-xl lg:text-2xl font-medium">
                Why Start a Crowdfunding Campaign for Transplant with Ketto?
              </h1>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                Costs pile up when you don't just have to pay for the surgery
                itself. The evaluation required, follow-up visits, necessary
                medications that must be taken regularly, and time away from
                work combined all add up quickly. The total cost can vary
                depending on each person’s circumstances and where they get
                their health care. Many people have to travel to a transplant
                center and stay in the area, leading to additional costs for
                transport, a place to stay, loss of income for time off work,
                and food during the recovery period after surgery. Many people
                also need alternative treatments or transportation.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-8">
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-4 text-start">
              <h1 className="text-[#395379] text-lg md:text-xl lg:text-2xl font-medium">
                Who can Start A Transplant Crowdfunding Campaign on Ketto?
              </h1>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                You can help out a friend, family member, or colleague
                struggling to pay for a kidney, heart, or liver transplant. You
                can also start a fundraiser for yourself if you are struggling
                with paying for a kidney, heart, or liver transplant and would
                like to independently take care of your medical treatment
                without taking on debt.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src="/assets/organ_cf.png"
                width={100}
                height={100}
                alt="cancer Crowdfunding"
                className="w-2/3 object-contain"
              />
            </div>
          </div>
        </div>

        {/* 3 */}
        <div className="px-4 py-10 my-12">
          <div className="flex flex-col gap-6 mb-10 md:mb-20 text-center">
            <h1 className="text-3xl md:text-5xl font-medium text-[#395379]">
              What Funds you can raise for Organ Transplants?
            </h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
            {[
              "For Family / For Friend",
              "Fund your own treatment  ",
              "Raise funds for At-Home Care",
              "Get money for Organ Transplant",
              "Daily Prescriptions and Care",
              "And More!",
            ].map((cause, index) => (
              <div
                key={index}
                className="px-4 py-8 md:px-6 md:py-12 lg:px-10 lg:py-16 text-center shadow-lg bg-[#395379] rounded-3xl hover:bg-[#bfd1e5] hover:text-black hover:rounded-lg hover:shadow-2xl hover:scale-105 duration-200 text-white text-lg md:text-xl lg:text-2xl"
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
