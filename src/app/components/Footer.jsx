import React from "react";
import Image from "next/image";
import Link from "next/link";
// import BlackCursor from "./BlackCursor";

const Footer = () => {
  const categories = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Funds Raised",
      link: "/personal_details",
    },
    {
      name: "Funds Given",
      link: "/personal_details",
    },
  ];

  return (
    <>
      {/* <BlackCursor /> */}
      <div className="p-4">
        <section className="bg-white flex flex-col text-black p-4 shadow-[0_5px_60px_-15px_rgba(0,0,0,0.3)] rounded-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
            {/* Logo Section */}
            <div className="mt-4">
              <Link href="/" className="md:justify-start md:items-left">
                <span className="text-xl font-medium">Crowdshaki.</span>
              </Link>
            </div>

            {/* Links and Information Section */}
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-20 lg:mt-12">
              {/* Causes Section */}
              <div className="flex flex-col gap-4">
                <div className="text-xl text-red-700 font-medium mb-2">
                  Causes
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    {text:"Medical Crowdfunding", url: "/medical_crowdfunding"},
                    {text:"Cancer Crowdfunding", url: "/cancer_crowdfunding"},
                    {text:"Transplant Crowdfunding", url: "/transplant_crowdfunding"},
                    {text:"Education Crowdfunding", url: "/education_crowdfunding"},
                    {text:"Sports Crowdfunding", url: "/sports_crowdfunding"},
                    {text:"Child Welfare", url: "/child_welfare"},
                    {text:"Animal Fundraisers", url: "/animal_fundraisers"},
                  ].map((cause, index) => (
                    <Link
                      key={index}
                      href={cause.url}
                      className="hover:text-red-600 text-xl font-regular hover:cursor-pointer transition-all"
                    >
                      {cause.text}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col gap-4">
                <h2 className="text-xl text-red-700 font-medium mb-2">
                  Content
                </h2>
                {categories.map((category) => (
                  <Link href={category.link} key={category.name}>
                    <h1 className="hover:text-red-600 text-xl font-regular transition-all">
                      {category.name}
                    </h1>
                  </Link>
                ))}
              </div>

              {/* Social Media Section */}
              <div className="flex flex-col gap-4">
                <div className="text-xl text-red-700 font-medium mb-2">
                  Social Media
                </div>
                <div className="flex flex-col gap-3">
                  <span className="bg-black text-transparent w-[120px] bg-clip-text hover:bg-gradient-to-r hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:cursor-pointer text-xl font-regular hover:font-medium transition-all">
                    Instagram
                  </span>
                  <span className="bg-black text-transparent w-[120px] bg-clip-text hover:bg-gradient-to-r hover:from-[#00c6ff] hover:to-[#0072ff] hover:cursor-pointer text-xl font-regular hover:font-medium transition-all">
                    Facebook
                  </span>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="flex flex-col gap-8 lg:mr-10">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl text-red-700 font-medium mb-2">
                      Contact
                    </h2>
                    <p className="font-regular text-xl">+91 9789420775</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl text-red-700 font-medium mb-2">
                      Email ID
                    </h2>
                    <p className="font-regular text-xl">crowdshaki@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-[1px] border-gray-300 my-10" />

          {/* Footer Section */}
          <div className="flex flex-col gap-2 lg:flex-row justify-between">
            <p className="font-regular text-lg mb-4">
              Copyright© 2024 Crowdshaki All Rights Reserved.
            </p>
            {/* Optional Powered By Section */}
            {/* <p className="font-light text-lg mb-4">
        Powered by{" "}
        <Link
          href="https://theweekendcoders.vercel.app"
          className="underline text-red-500"
          target="_blank"
        >
          theweekendcoders
        </Link>
      </p> */}
          </div>
        </section>
      </div>
    </>
  );
};

export default Footer;
