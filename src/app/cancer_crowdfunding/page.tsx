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
              src="/assets/cancer_cf.png"
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
            <h1 className="text-red-400 text-2xl md:text-4xl lg:text-5xl font-medium">
              What is Cancer Crowdfunding?
            </h1>
            <p className="text-gray-500 text-sm md:text-base lg:text-lg">
              Online cancer crowdfunding campaigns that seek small monetary
              donations to help an individual or family cover expensive cancer
              treatments and chemotherapy is called cancer crowdfunding.
              Crowdfunding to raise funds for cancer treatment expense and
              chemotherapy drugs is the most cost-effective and easy way to
              begin. You can start an individual cancer fundraising campaign or
              begin raising funds for a nonprofit that serves individuals
              affected by cancer.
            </p>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-8">
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-4 text-start">
              <h1 className="text-red-400 text-lg md:text-xl lg:text-2xl font-medium">
                How does cancer crowdfunding work?
              </h1>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                Using Ketto’s online crowdfunding platform individuals, families
                and friends of cancer patients can start a “ZERO PERCENT
                PLATFORM FEE” free online cancer crowdfunding and cancer
                fundraising campaign to raise funds and pay for high cancer
                bills, cancer treatments and expensive chemotherapy drugs,
                treatments and procedures. It’s effortless to start your cancer
                fundraising campaign. Log in on the online crowdfunding
                platform, select start a new campaign, set a fundraising goal,
                fill in few mandatory details, create your crowdfunding campaign
                page, and promote your campaign.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src="/assets/cancer_cf.png"
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
                src="/assets/cancer_cf.png"
                width={100}
                height={100}
                alt="cancer Crowdfunding"
                className="w-2/3 object-contain"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-4 text-start">
              <h1 className="text-red-400 text-lg md:text-xl lg:text-2xl font-medium">
                Diagnosed with Cancer?
              </h1>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                You can speak to a hundred different people and get a hundred
                different answers related to cancer and factors that cause
                cancer. At its most basic, cancer is a malfunction of genes
                within cells of our body that causes cells to grow and divide
                uncontrollably—or prevent them from deteriorating when they
                should. These abnormal cells become cancerous and cause cancer.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-8">
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-4 text-start">
              <h1 className="text-red-400 text-lg md:text-xl lg:text-2xl font-medium">
                How can Ketto help you To Fund Your Cancer Treatment?
              </h1>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                You can start a cancer crowdfunding campaign for free on Ketto &
                raise funds to pay for your or a close relative and friends
                cancer treatments and cancer-related medical bills.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src="/assets/cancer_cf.png"
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
            <h1 className="text-3xl md:text-5xl font-medium text-red-400">
              Different types of Cancers that you can raise funds for on Ketto
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              You can Raise Money For Cancer Treatments Costs which includes
              Chemotherapy, Medicines, Light Therapy etc. Below are some of the
              major Cancers for which you can raise funds for:
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
            {[
              "Leukemia & Lymphoma",
              "Lung Cancer",
              "Prostate Cancer",
              "Kidney Cancer",
              "Breast Cancer",
              "Throat Cancer"
            ].map((cause, index) => (
              <div
                key={index}
                className="px-4 py-8 md:px-6 md:py-12 lg:px-10 lg:py-16 text-center shadow-lg bg-red-400 rounded-3xl hover:bg-red-600 hover:rounded-lg hover:shadow-2xl hover:scale-105 duration-200 text-white text-lg md:text-xl lg:text-2xl"
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
