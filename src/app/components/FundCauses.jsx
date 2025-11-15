import React from "react";
import Image from "next/image";
import Link from "next/link";


const causes =[
  { text: "Medical", url: "/medical_crowdfunding" },
  { text: "Cancer", url: "/cancer_crowdfunding"},
  { text: "Organ Transplant", url: "/transplant_crowdfunding"},
    { text: "Children", url: "/child_welfare" },
    { text: "Education", url: "/education_crowdfunding"},
    { text: "Animal", url: "/animal_fundraisers"},
    { text: "Sports", url: "/sports_crowdfunding"},
]

const FundCauses = () => {
  return (
    <div className="p-4 my-12 md:my-28">
  <div className="flex flex-col gap-4 mb-10 md:mb-20">
    <h1 className="text-3xl md:text-5xl font-medium text-red-400 text-center">
      Causes you can raise Funds for.
    </h1>
    <p className="text-center text-gray-500 text-sm md:text-base">
      Be it for a personal need, social cause or a creative idea - you can count on us for
      <br className="hidden md:block" /> the project that you want to raise funds for.
    </p>
  </div>
  <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 lg:px-10">
  {causes.map((cause, index) => (
    <Link 
      href={cause.url}
      key={index}
      className="
        w-40 h-40   /* Default box size */
        md:w-48 md:h-48  /* Medium screen box size */
        lg:w-56 lg:h-56  /* Large screen box size */
         /* Extra-large screen box size */
        text-center 
        bg-red-400 rounded-2xl 
        hover:bg-red-500 hover:scale-105 
        duration-200 text-white 
        text-base 
        md:text-lg 
        lg:text-xl 
        xl:text-2xl 
        flex items-center justify-center
      "
    >
      {cause.text}
    </Link>
  ))}
</div>

</div>
  );
};

export default FundCauses;
