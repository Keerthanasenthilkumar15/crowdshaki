"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Define the types
interface NGO {
  _id: string;
  NGO_Name: string;
  Annual_Report: object;
  Area_Of_Operation: string;
  Audit_Report: object;
  Bank_Details: object;
  Block: string;
  District: string;
  Governing_Board: string;
  Land_Status: string;
  Leader: object;
  Legal_Information: object;
  Major_Activity: any[];
  Project_Experience: string;
  Record_Maintenance: string;
  Staff_Details: object;
}

interface APIResponse {
  ngo_details: NGO[];
}

// Fetch data function
const getData = async (): Promise<APIResponse> => {
  const res = await fetch("/api/ngoList", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Something Went Wrong");
  }
  const data: APIResponse = await res.json();
  return data;
};

// Component to display each NGO
const NGOCard: React.FC<{ ngo: NGO }> = ({ ngo }) => (
  <div className="flex flex-col justify-between max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white m-4">
    <div>
      <div className="font-bold text-xl mb-2">
        {ngo.NGO_Name || "Unnamed NGO"}
      </div>
      <p className="text-gray-700 text-base">
        <strong>District:</strong> {ngo.District || "Unknown District"}
      </p>
    </div>
    <Link href={`/gcare_council/${ngo._id.toString()}`}>
      <button className="mt-2 p-2 bg-blue-500 text-white rounded">
        View More
      </button>
    </Link>
  </div>
);

// Main page component
const NGOPage: React.FC = () => {
  const [ngoList, setNgoList] = useState<NGO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState("All Categories");

  useEffect(() => {
    getData()
      .then((data: APIResponse) => {
        if (Array.isArray(data.ngo_details)) {
          setNgoList(data.ngo_details);
        } else {
          console.error("Expected an array but received:", data.ngo_details);
          setNgoList([]); // Set an empty array to avoid map errors
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredNGO =
    selectedDistrict === "All Categories"
      ? ngoList
      : ngoList.filter((ngo) => ngo.District === selectedDistrict);

  // console.log("DATA :", ngoList);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
    <Navbar />
    <div className="min-h-screen items-center my-10">
    <h1 className="text-3xl font-bold text-center mb-8">List of NGOs</h1>
      <div className="md:flex gap-10 container mx-auto p-4">

        {/* filter box */}
        <div className="h-fit sticky flex flex-col gap-4 border border-gray-300 px-6 w-full md:w-1/4 py-4 shadow-lg text-left">
          <div className="border-b-2 border-gray-300 py-4 w-full">
            <h1 className="text-left font-semibold">CATEGORIES</h1>
          </div>

          <div className="flex flex-col gap-4 border-b-2 border-gray-300 py-4">
            {[
              "All Categories",
              "Chennai",
              "Chengalpattu",
              "Coimbatore",
              "Cuddalore",
              "Dharmapuri",
              "Dindigul",
              "Erode",
              "Kallakurichi",
              "Kancheepuram",
              "Kanyakumari",
              "Thiruvallur",
              "Krishnagiri",
              "Madurai",
              "Mayiladuthurai",
              "Nagapattinam",
            ].map((district, index) => (
              <h1
                key={index}
                className={`hover:cursor-pointer hover:text-red-400 font-medium ${
                  selectedDistrict === district ? "text-red-400" : ""
                }`}
                onClick={() => setSelectedDistrict(district)}
              >
                {district}
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


        {/* list of NGOs */}
        <div className="my-10 md:my-0 ">
          <button
            className="items-end font-medium text-red-400 hover:underline hover:underline-offset-4 hover:scale-105"
            onClick={() => setSelectedDistrict("All Categories")}
          >
            Reset filters
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNGO.map((ngo) => ( 
              <NGOCard key={ngo._id} ngo={ngo} />
            ))}
          </div>
        </div>

      </div>
    </div>
    <Footer />
    </>
  );
};

export default NGOPage;
