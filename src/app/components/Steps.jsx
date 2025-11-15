import React from "react";
import Image from "next/image";
import Link from "next/link";

const Steps = () => {
  return (
    <div className="p-4 flex flex-col items-center justify-center my-20">
      {/* Optional Background Image */}
      {/* <Image
    src="/assets/art1.png"
    width={1000}
    height={2000}
    alt="Background"
    className="w-full absolute h-auto object-fit opacity-40"
  /> */}
      <div className="flex flex-col gap-4 mb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-medium text-red-400">
          Steps to raise funds
        </h1>
        <p className="text-gray-500">
          Be it for a personal need, social cause, or a creative idea - you can
          count on
          <br className="hidden md:block" /> us for the project that you want to
          raise funds for.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full px-5 md:px-20">
        {/* Steps Image */}
        <Image
          src="/assets/steps.jpg"
          width={1000}
          height={700}
          alt="steps"
          className="w-3/4 lg:w-2/3 mb-8 lg:mb-0"
        />

        {/* Steps Information */}
        <div className="flex flex-col gap-8 md:gap-12 bg-[#ed7f73] text-white py-12 md:py-16 px-8 md:px-12 justify-between w-full lg:w-1/2 rounded-lg">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl md:text-2xl font-semibold">
              Start your fundraiser
            </h1>
            <p className="text-sm md:text-base">
              It'll take only 2 minutes; just tell us a few details about you
              and the ones whom you are raising funds for.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl md:text-2xl font-semibold">
              Share your fundraiser
            </h1>
            <p className="text-sm md:text-base">
              All you need to do is share the fundraiser with your friends and
              family. In no time, support will start pouring in.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl md:text-2xl font-semibold">
              Withdraw Funds
            </h1>
            <p className="text-sm md:text-base">
              The funds raised can be withdrawn without any hassle directly to
              your bank account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
