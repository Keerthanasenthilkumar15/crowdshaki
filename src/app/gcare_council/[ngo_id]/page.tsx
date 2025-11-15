'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { usePathname } from "next/navigation";


const getData = async (ngo: string) => {
    const res = await fetch(
      `/api/ngoList/${ngo}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      throw new Error("Something Went Wrong");
    }
    return res.json();
  };

const Page = ({params} : any) => {
    const ngoId = params.ngo_id;
    const [ngo, setNgo] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ngoArray = await getData(ngoId);
        setNgo(ngoArray[0]);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data");
        setLoading(false);
      }
    };
    fetchData();
  }, [ngoId]);

  console.log("ngoname", ngo);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          {ngo.NGO_Name}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* NGO General Details */}
          <div className="border p-4 rounded-lg shadow-lg bg-white">
            <h2 className="font-bold text-xl">General Information</h2>
            <p><strong>District:</strong> {ngo.District}</p>
            <p><strong>Block:</strong> {ngo.Block}</p>
            <p><strong>Area Of Operation:</strong> {ngo.Area_Of_Operation}</p>
            <p><strong>Land Status:</strong> {ngo.Land_Status}</p>
            <p><strong>Governing Board:</strong> {ngo.Governing_Board}</p>
          </div>

          {/* Leader Information */}
          <div className="border p-4 rounded-lg shadow-lg bg-white">
            <h2 className="font-bold text-xl">Leader Information</h2>
            <p><strong>Name:</strong> {ngo.Leader.Name}</p>
            <p><strong>Phone:</strong> {ngo.Leader.Contact.Phone}</p>
            <p><strong>Email:</strong> {ngo.Leader.Contact.Email}</p>
            <p><strong>Address:</strong> {ngo.Leader.Contact.Address}</p>
            {ngo.Leader.Contact.Website !== "NIL" && (
              <p><strong>Website:</strong> {ngo.Leader.Contact.Website}</p>
            )}
          </div>

          {/* Staff and Record Maintenance */}
          <div className="border p-4 rounded-lg shadow-lg bg-white">
            <h2 className="font-bold text-xl">Staff & Records</h2>
            <p><strong>Total Staff:</strong> {ngo.Staff_Details.Total_Staff}</p>
            <p><strong>Record Maintenance:</strong> {ngo.Record_Maintenance}</p>
          </div>

          {/* Legal Information */}
          <div className="border p-4 rounded-lg shadow-lg bg-white">
            <h2 className="font-bold text-xl">Legal Information</h2>
            <p><strong>Trust Deed:</strong> {ngo.Legal_Information.Trust_Deed}</p>
            <p><strong>12A:</strong> {ngo.Legal_Information["12A"]}</p>
            <p><strong>80G:</strong> {ngo.Legal_Information["80G"]}</p>
            <p><strong>CSR:</strong> {ngo.Legal_Information.CSR}</p>
            <p><strong>Niti Aayog Darpan:</strong> {ngo.Legal_Information.Niti_Aayog_Darpan}</p>
            {ngo.Legal_Information.FCRA !== "Not Available" && (
              <p><strong>FCRA:</strong> {ngo.Legal_Information.FCRA}</p>
            )}
          </div>

          {/* Audit Report */}
          <div className="border p-4 rounded-lg shadow-lg bg-white">
            <h2 className="font-bold text-xl">Audit Report</h2>
            <p><strong>2019-2020 Turnover:</strong> {ngo.Audit_Report.Turnover["2019-2020"]}</p>
            <p><strong>2020-2021 Turnover:</strong> {ngo.Audit_Report.Turnover["2020-2021"]}</p>
            <p><strong>2021-2022 Turnover:</strong> {ngo.Audit_Report.Turnover["2021-2022"]}</p>
          </div>

          {/* Major Activities */}
          <div className="border p-4 rounded-lg shadow-lg bg-white">
            <h2 className="font-bold text-xl">Major Activities</h2>
            <ul className="list-disc ml-6">
              {ngo.Major_Activity.map((activity: any, index: any) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>

          {/* Bank Details */}
          <div className="border p-4 rounded-lg shadow-lg bg-white">
            <h2 className="font-bold text-xl">Bank Details</h2>
            <p><strong>Account Number:</strong> {ngo.Bank_Details.Account_Number}</p>
            <p><strong>IFSC Code:</strong> {ngo.Bank_Details.IFSC_Code}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
};

export default Page;