"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { usePathname } from "next/navigation";

// Fetch data for the specific fund
const getData = async (fund: string) => {
  const res = await fetch(
    `/api/browse_fundraisers/${fund}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Something Went Wrong");
  }
  return res.json();
};

// Define menu links and corresponding content

const Page = ({ params }: any) => {
  const pathname = usePathname();
  const fundId = params.fund_id;

  const [fund, setFund] = useState<any>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fundArray = await getData(fundId);
        setFund(fundArray[0]);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data");
        setLoading(false);
      }
    };
    fetchData();
  }, [fundId]);

  const menuLinks = [
    {
      text: "About",
      content: fund?.situation,
    },
    {
      text: "Documents",
      content: "This section contains important documents for the fundraiser.",
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  

  const neededAmount = fund.amountForFund / 1;
  const receivedAmount = neededAmount / 2;
  const formattedNeededAmount = neededAmount.toLocaleString();
  const formattedReceivedAmount = receivedAmount.toLocaleString();
  const receivedPercentage = (receivedAmount / neededAmount) * 100;

  // Toggle dropdown content visibility
  const toggleDropdown = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <main>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl mb-4 font-medium text-center my-6">{fund.reasonForFund}</h1>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-3/5 flex flex-col order-2 lg:order-1 gap-8">
            <Image
              src="/assets/art2.jpg"
              width={1000}
              height={2000}
              alt="Background"
              className="w-full h-auto object-scale-down rounded-[50px]"
            />

            <div className="flex flex-row gap-4 items-center">
              <Image
                src="/assets/art2.jpg"
                width={100}
                height={100}
                alt="Background"
                className="w-[60px] h-[60px]  rounded-full"
              />
              <p><span className="font-medium">{fund.firstName}</span> is organizing this fundraiser for <span className="font-medium">{fund.beneficiaryName}</span></p>
            </div>

            <hr className="border border-[#898783]" />

            <div className="flex flex-col gap-8">
              <h1 className="text-2xl font-medium">
                Organizer and Beneficiary
              </h1>
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-40">
                <div className="flex flex-row gap-4 items-center">
                  <Image
                    src="/assets/art2.jpg"
                    width={100}
                    height={100}
                    alt="Background"
                    className="w-[60px] h-[60px]  rounded-full"
                  />
                  <div>
                    <p><span className="font-medium">{fund.firstName}</span></p>
                    <p>Campaigner</p>
                  </div>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <Image
                    src="/assets/art2.jpg"
                    width={100}
                    height={100}
                    alt="Background"
                    className="w-[60px] h-[60px] rounded-full"
                  />
                  <div>
                    <p><span className="font-medium">{fund.beneficiaryName}</span></p>
                    <p>Beneficiary</p>
                  </div>
                </div>

              </div>
            </div>

            <hr className="border border-[#898783]" />

            <div className="flex flex-col gap-8">
              <h1 className="text-2xl font-medium">
                About
              </h1>
              <p className="w-full text-justify">
                {fund.situation}
              </p>
            </div>

            <hr className="border border-[#898783]" />

            <div className="flex flex-col gap-8">
              <h1 className="text-2xl font-medium">
                Documents
              </h1>
              <p className="w-full text-justify">
                  Documents for verification
              </p>
            </div>

          </div>
          <div className="lg:w-2/5 order-1 lg:order-2 border-[3px] h-fit border-black rounded-[50px] p-10 flex flex-col gap-8 lg:sticky top-10">
            <p className="text-lg"><span className="text-3xl font-medium mr-2"> Rs.{formattedReceivedAmount}</span> raised out of <span className="text-3xl font-medium mx-2">Rs.{formattedNeededAmount}</span></p>
            <div>

              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-[#267f35] h-2.5 rounded-full"
                      style={{ width: `${receivedPercentage}%` }}
                    ></div>
              </div>
              <p className="font-medium">100 donations so far</p>
            </div>
            <div className="w-full flex justify-center items-center">
              <button className="px-16 py-4 bg-[#FF6868] font-medium text-2xl">Donate</button>
            </div>
            <h1 className="text-2xl font-medium">Recent Donations</h1>
            <div className="flex flex-row gap-4 items-center">
                  <Image
                    src="/assets/art2.jpg"
                    width={100}
                    height={100}
                    alt="Background"
                    className="w-[60px] h-[60px]  rounded-full"
                  />
                  <div>
                    <p><span className="text-lg">Randy Pitts</span></p>
                    <p className="font-medium">Rs.5000</p>
                  </div>
                </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Page;
