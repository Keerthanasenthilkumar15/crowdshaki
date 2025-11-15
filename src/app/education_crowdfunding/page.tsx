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
              src="/assets/education_cf.png"
              width={1000}
              height={2000}
              alt="Background"
              className="w-full h-full mt-10 md:mt-0 object-contain"
            />
          </div>
          {/* Form Content */}
          <div className="w-full flex justify-center">
            <CrowdFundingForm />
          </div>
        </div>

        {/* 2 */}
        <div className="flex flex-col items-center gap-10 lg:gap-20 justify-center text-center lg:px-20 lg:my-10 xl:my-16">
          <div className="flex flex-col gap-4">
            <h1 className="text-[#e87d3e] text-2xl md:text-4xl lg:text-5xl font-medium">
              Crowdfunding for Education
            </h1>
            <p className="text-gray-500 text-sm md:text-base lg:text-lg">
              The term “Education Crowdfunding” defines itself as a process of
              raising money by seeking small donations from several people
              towards an education-related cause.
            </p>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-8">
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-4 text-start">
              <h1 className="text-[#e87d3e] text-lg md:text-xl lg:text-2xl font-medium">
                What is Education Crowdfunding in India?
              </h1>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                Education Crowdfunding helps teachers, students and NGOs raise
                funds to buy classroom supplies, take children on special field
                trips and build toilets. Crowdfunding can also provide funds for
                distributing daily meals, upgrade school infrastructures like
                gymnasium, play areas, classroom renovation and expansion.
                Online crowdfunding for education is gaining more and more
                recognition. It is safe, easy and effective, and can reach a
                much larger pool of people in far less time.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src="/assets/education_cf.png"
                width={100}
                height={100}
                alt="education Crowdfunding"
                className="w-2/3 object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src="/assets/education_cf.png"
                width={100}
                height={100}
                alt="education Crowdfunding"
                className="w-2/3 object-contain"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-4 text-start">
              <h1 className="text-[#e87d3e] text-lg md:text-xl lg:text-2xl font-medium">
                Why Start an Education Fundraiser with Ketto?
              </h1>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                Education Crowdfunding on Ketto’s online crowdfunding platform
                is Effective, Swift and Simple. Education Crowdfunding is also
                the most economical medium to raise funds for education funding
                campaigns.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-8">
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-4 text-start">
              <h1 className="text-[#e87d3e] text-lg md:text-xl lg:text-2xl font-medium">
                Who can Start An Education Crowdfunding Campaign on Ketto?
              </h1>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                Students can Start An Education Fundraising Campaign for
                themself or provide support to a friend’s education campaign.
                Parents can Start An Education Crowdfunding Campaign for their
                Child's Future Education. Similarly, you can fundraise for
                education-related causes or collaborate with NGOs that improve
                the education quality provided in rural schools. The education
                crowdfunding platform of Ketto offers a fast campaign startup
                for students, teachers, NGOs and organisations looking to
                crowdfund for education projects in India and around the world.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src="/assets/education_cf.png"
                width={100}
                height={100}
                alt="education Crowdfunding"
                className="w-2/3 object-contain"
              />
            </div>
          </div>
        </div>

        {/* 3 */}
        <div className="px-4 py-10 my-12">
          <div className="flex flex-col gap-6 mb-10 md:mb-20 text-center">
            <h1 className="text-3xl md:text-5xl font-medium text-[#e87d3e]">
            Start an Education Crowdfunding Campaign for
            </h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
            {[
              "Public Schools",
              "Education Association",
              "After School Programs",
              "Parent Teachers Associations (PTA)",
              "Extra-curricular Activities",
            ].map((cause, index) => (
              <div
                key={index}
                className="px-4 py-8 md:px-6 md:py-12 lg:px-10 lg:py-16 text-center shadow-lg bg-[#e87d3e] rounded-3xl hover:bg-[#f6c84e] hover:text-black hover:rounded-lg hover:shadow-2xl hover:scale-105 duration-200 text-white text-lg md:text-xl lg:text-2xl"
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
