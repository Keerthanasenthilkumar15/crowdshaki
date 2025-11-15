import React from "react";
import Image from "next/image";
import Link from "next/link";

const FundRaising = () => {
  var neededAmount = 200000;
  var receivedAmount = 50000;
  var formattedNeededAmount = neededAmount.toLocaleString();
  var formattedReceivedAmount = receivedAmount.toLocaleString();
  var receivedPercentage = (receivedAmount / neededAmount) * 100;
  console.log(receivedPercentage);
  return (
    <div className="p-10 my-20">
      <div className="flex flex-col gap-4 mb-20">
        <h1 className="text-5xl font-medium text-red-400 text-center">
          Trending Fundraisers
        </h1>
        <p className="text-center text-gray-500">
          Be it for a personal need, social cause or a creative idea - you can
          count on <br /> us for the project that you want to raise funds for.
        </p>
      </div>
      <div className="flex flex-col overflow items-center justify-center w-full lg:px-20">
        <div className="flex flex-wrap items-center justify-center gap-10 py-5">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-full sm:w-[250px] md:w-[2/3] xl:w-1/4 rounded-3xl backdrop-blur-md bg-white/20 flex flex-col hover:scale-105 duration-300 hover:transition-all hover:ease-in"
            >
              <Image
                src="/assets/art2.jpg"
                width={1000}
                height={700}
                alt="item"
                className="object-cover rounded-br-none rounded-bl-none rounded-3xl"
              />
              <div className="flex flex-col">
                <div className="p-4">
                  <h1 className="font-[400] text-xl">Help 12-year old</h1>
                  <div className="flex items-center">
                    <img
                      src="/assets/art2.jpg" // Replace with your image path
                      alt="icon"
                      className="w-4 h-4 mr-2 rounded-full border-2 " // Adjust size and shape here
                    />
                    <h1 className="font-light text-black text-lg">by alpha</h1>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        Received: Rs.{formattedReceivedAmount}/-
                      </span>
                      <span className="text-sm font-medium">
                        Goal: Rs.{formattedNeededAmount}/-
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-black mt-2">
                      <div
                        className="bg-[#F74541] h-2.5 rounded-full"
                        style={{ width: `${receivedPercentage}%` }} // Adjust this percentage based on received amount/goal
                      ></div>
                    </div>
                  </div>
                  <h2 className="text-lg mt-4">Rs.{formattedNeededAmount}/-</h2>
                  <button className="px-auto py-3 mt-4 bg-red-400 w-full h-[50px] text-center rounded-full text-white font-medium">
                    Donate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link
        href="/browse_fundraisers"
        className="text-lg sm:text-xl md:text-2xl font-medium bg-red-400 py-3 px-6 sm:py-4 sm:px-8 text-center text-white hover:scale-105 transition-transform duration-300 ease-in-out mt-10"
      >
        Browse Fundraisers
      </Link>
      </div>
    </div>
  );
};

export default FundRaising;
