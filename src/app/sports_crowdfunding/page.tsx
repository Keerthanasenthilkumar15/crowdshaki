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
              src="/assets/sports_cf.png"
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
            <h1 className="text-[#3a7b6b] text-2xl md:text-4xl lg:text-5xl font-medium">
              What is Sports Crowdfunding?
            </h1>
            <p className="text-gray-500 text-sm md:text-base lg:text-lg">
              It is essential to any athlete or sportsperson trying to become
              the best they can be in what they do. However, unfortunately, it
              isn’t always easy for them to get the funds they need for
              training, equipment, and overall development.
            </p>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-8">
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-4 text-start">
              <h1 className="text-[#3a7b6b] text-lg md:text-xl lg:text-2xl font-medium">
                Equipment, Nutrition & Coaching costs are a Burden for Many
                Individuals and Families of Athletes
              </h1>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                Participation in local, state, and international sports
                competitions are costly. With the continuously shrinking of
                monetary funds from numerous sports & governing bodies, the
                expense provided by family and friends is exhausted quickly.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src="/assets/sports_cf.png"
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
                src="/assets/sports_cf.png"
                width={100}
                height={100}
                alt="sports Crowdfunding"
                className="w-2/3 object-contain"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-4 text-start">
              <h1 className="text-[#3a7b6b] text-lg md:text-xl lg:text-2xl font-medium">
                Try Sports Crowdfunding with Ketto
              </h1>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                Through Sports Crowdfunding, we at Ketto aim to provide
                athletes, parents, friends, and sports governing bodies a unique
                platform that can empower athletes while simultaneously allowing
                you to be part of their journey and share their dreams as well
                as making sure your money is going towards a great cause!
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-8">
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-4 text-start">
              <h1 className="text-[#3a7b6b] text-lg md:text-xl lg:text-2xl font-medium">
                Start a Sports Crowdfunding Campaign for Yourself or a Deserving
                Athlete/Sportsmen
              </h1>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                Rather than look for sponsors via traditional channels, why not
                go online through Ketto Crowdfunding and reach a massive
                audience! It’s simple; create your crowdfunding campaign and let
                everyone know about it. We will provide you with a page where
                you can tell your story, and display photos and videos about
                what inspired you to do this in the first place. This will give
                supporters and people a chance to get to know who you are as an
                athlete. It’s a great way to connect with them, take them on the
                journey with you, and share your passion! By using Ketto’s
                Crowdfunding and fundraising platform, we will also enhance your
                profile and increase your fanbase. Start your Sports Fundraising
                Campaign on Ketto today!
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src="/assets/sports_cf.png"
                width={100}
                height={100}
                alt="sports Crowdfunding"
                className="w-2/3 object-contain"
              />
            </div>
          </div>
        </div>

        {/* 3 */}
        <div className="px-4 py-10 my-12">
          <div className="flex flex-col gap-6 mb-10 md:mb-20 text-center">
            <h1 className="text-3xl md:text-5xl font-medium text-[#3a7b6b]">
              Start an sports Crowdfunding Campaign for
            </h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
            {[
              "Tournament",
              "Team Trips",
              "Equipment Purchase",
              "Uniforms & Jerseys",
              "Membership Fees or Monthly Dues",
            ].map((cause, index) => (
              <div
                key={index}
                className="px-4 py-8 md:px-6 md:py-12 lg:px-10 lg:py-16 text-center shadow-lg bg-[#3a7b6b] rounded-3xl hover:bg-[#4b9f96] hover:text-black hover:rounded-lg hover:shadow-2xl hover:scale-105 duration-200 text-white text-lg md:text-xl lg:text-2xl"
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
