import React from "react";
import Image from "next/image";
import Link from "next/link";

const Herosection = () => {
  return (
    <div className="flex flex-col w-full md:h-auto gap-10">
      {/* Text Content */}
      <div className="w-full md:w-2/2 h-[40vh] md:h-full flex justify-center ">
        <Image
          src="/assets/hero_bg.png"
          width={2000}
          height={1000}
          alt="Background"
          className="w-full h-full md:h-[500px] object-cover"
        />
      </div>

      {/* Image */}
      <div className="flex flex-col items-center justify-center w-full px-4 sm:px-8 my-10">
        <h1 className="font-semibold text-[36px] md:text-[40px] lg:text-[60px] xl:text-[70px] leading-tight text-black text-center md:text-center">
          Your Generosity Can Change Lives
        </h1>
        <Link
          href="/raise_funds"
          className="text-lg md:text-xl lg:text-2xl font-medium bg-teal-600 py-3 px-6 lg:py-4 lg:px-8 text-white hover:scale-105 transition-transform duration-300 ease-in-out mt-8"
        >
          Start a Fundraiser
        </Link>
      </div>
    </div>
  );
};

export default Herosection;
