"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { ObjectId } from 'mongodb';
import DonateButton from "../components/DonateButton"
interface Fundraiser {
  _id: ObjectId | string;
  category: string;
  reasonForFund: string;
  amountForFund: number;
}

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/browse_fundraisers", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Something Went Wrong");
        }
        const data: Fundraiser[] = await res.json();
        setFundraisers(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on mount

  const filteredFundraisers =
    selectedCategory === "All Categories"
      ? fundraisers
      : fundraisers.filter((fund) => fund.category === selectedCategory);

  if (loading) {
    return <div>Loading...</div>; // Loading state to show while data is fetched
  }

  return (
    <div className="">
      <Navbar />
      <Image
        src="/assets/raise_funds.jpg"
        width={1000}
        height={600}
        className="object-scale-down w-full h-[350px]"
        alt="illustration"
      />
      <div className="flex flex-col md:flex-row gap-10 px-4 my-16">
        <div className="max-h-[650px] flex flex-col gap-4 border border-gray-300 px-6 w-full md:w-1/4 py-4 shadow-lg text-left">
          <div className="border-b-2 border-gray-300 py-4 w-full">
            <h1 className="text-left font-semibold">CATEGORIES</h1>
          </div>

          <div className="flex flex-col gap-4 border-b-2 border-gray-300 py-4">
            {[
              "All Categories",
              "Education",
              "Medical",
              "Women & Girls",
              "Animals",
              "Creative",
              "Food & Hunger",
              "Environment",
              "Children",
              "Memorial",
              "Community Development",
            ].map((cause, index) => (
              <h1
                key={index}
                className={`hover:cursor-pointer hover:text-red-400 font-medium ${
                  selectedCategory === cause ? "text-red-400" : ""
                }`}
                onClick={() => setSelectedCategory(cause)}
              >
                {cause}
              </h1>
            ))}
          </div>

          <Link
            href="/raise_funds"
            className="font-bold py-4 px-6 bg-red-400 text-white text-center w-full"
          >
            Start a fundraiser
          </Link>
        </div>

        <div className="w-full my-10">
          <button
            className="text-right font-medium text-red-400 hover:underline hover:underline-offset-4 hover:scale-105"
            onClick={() => setSelectedCategory("All Categories")}
          >
            Reset filters
          </button>
          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-5">
            {filteredFundraisers.map((fund, index) => (
              <div key={index} className="w-full p-4 sm:w-[250px] md:w-[ 250px] rounded-3xl backdrop-blur-md bg-white/20 flex flex-col shadow-[0_5px_60px_-30px_rgba(0,0,0,0.3)] ">
              <Link
              href={`/browse_fundraisers/${fund._id.toString()}`}
              >
                <Image
                  src="/assets/art2.jpg"
                  width={1000}
                  height={700}
                  alt="item"
                  className="object-cover rounded-br-none rounded-bl-none rounded-3xl"
                />
                <div className="flex flex-col py-4">
                  <h1 className="font-medium text-xl">{fund.reasonForFund}</h1>
                  <div className="mt-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        Received: Rs.{(fund.amountForFund/2).toLocaleString()}/-
                      </span>
                      <span className="text-sm font-medium">
                        Goal: Rs.{fund.amountForFund.toLocaleString()}/-
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                      <div
                        className="bg-[#F74541] h-2.5 rounded-full"
                        style={{
                          width: `${(fund.amountForFund / (2 * fund.amountForFund))*100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  {/* bg-[#F74541] */}
                  
                </div>
              </Link>
              <DonateButton style="px-auto py-3 mt-4 bg-teal-950 w-full h-[50px] text-center rounded-full text-white font-medium hover:scale-105 duration-300 hover:transition-all hover:ease-in" fundraiserId={fund._id}/>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
