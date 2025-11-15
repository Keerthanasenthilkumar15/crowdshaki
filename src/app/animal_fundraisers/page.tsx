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
              src="/assets/animal_cf.png"
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
            <h1 className="text-[#744884] text-2xl md:text-4xl lg:text-5xl font-medium">
              Animal Fundraising and Crowdfunding
            </h1>
            <p className="text-gray-500 text-sm md:text-base lg:text-lg">
              Crowdfunding and Fundraising for Animal-related causes is an
              alternative method for individuals, NGOs, and corporate
              organisations to collect funds for costly medical treatments of
              pets and animals. Similarly, rescue organisations, animal
              shelters, and animal adoption groups can receive funds from
              numerous individuals to sustain daily expenses, including
              providing nutritious food, adequate hygiene and daily veterinary
              care.
            </p>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-8">
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-4 text-start">
              <h1 className="text-[#744884] text-lg md:text-xl lg:text-2xl font-medium">
                Veterinary Expenses and Pet Surgeries Can Be Very Expensive for
                Many Individuals and NGOs.
              </h1>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                The pain and suffering that pets and animals experience is
                heart-wrenching. The sight of these animals suffering makes
                everyone want to provide them with care and assistance to
                relieve this pain. Unfortunately, the cost of surgeries and vet
                bills are very expensive. The infrastructure is not adequate.
                Numerous individuals, NGOs and corporate organisations
                constantly seek funds to support these animals. Ketto's Animal
                Fundraising and Animal Crowdfunding can Help!
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src="/assets/animal_cf.png"
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
                src="/assets/animal_cf.png"
                width={100}
                height={100}
                alt="sports Crowdfunding"
                className="w-2/3 object-contain"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-4 text-start">
              <h1 className="text-[#744884] text-lg md:text-xl lg:text-2xl font-medium">
                Use Animal Crowdfunding.
              </h1>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                Don't be disheartened about the recurring expenses and being
                unable to provide the basic needs of these loving animals and
                pets. Instead, Start an Animal Crowdfunding Campaign with Ketto
                Today! Ketto is rated the Ketto is a Crowdfunding Platform based
                out of India In Asia for Animal Fundraising. Animal Crowdfunding
                is the simplest and quickest way to support individuals who want
                to assist such animal fundraising causes. Similarly, friends,
                family and numerous corporate entities are waiting to donate
                funds to animal-related charities and fundraisers on Ketto's
                Online Crowdfunding Platform.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-8">
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-4 text-start">
              <h1 className="text-[#744884] text-lg md:text-xl lg:text-2xl font-medium">
                Start An Animal Fundraising Campaign For Pet Or Any Animal.
              </h1>
              <p className="text-gray-500 text-sm md:text-base lg:text-lg">
                On Ketto, you can Start A Fundraiser Campaign in minutes to
                assist or pay for vet bills and pet surgery costs. You can also
                help bring in funds by sharing ongoing animal campaigns that you
                feel require mentioning in your friend circles and corporate
                network. Animal and Pet Fundraising Campaigns can give countless
                individuals a means to express their support in a monetary form.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src="/assets/animal_cf.png"
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
            <h1 className="text-3xl md:text-5xl font-medium text-[#744884]">
              What can you raise funds for?
            </h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
            {[
              "Pet Surgeries",
              "Expensive Veterinarian Bills",
              "Animal Shelters",
              "Stray Animal Rescue Groups",
              "Animal Kennels & Adoption Centers",
            ].map((cause, index) => (
              <div
                key={index}
                className="px-4 py-8 md:px-6 md:py-12 lg:px-10 lg:py-16 text-center shadow-lg bg-[#744884] rounded-3xl hover:bg-[#b699bb] hover:text-black hover:rounded-lg hover:shadow-2xl hover:scale-105 duration-200 text-white text-lg md:text-xl lg:text-2xl"
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
