"use client";
import React, { useState, Suspense, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { UserAuth } from "../context/AuthContext";

const RaiseFundsForm = dynamic(() => import("../components/RaiseFundsForm"), {
  ssr: false,
});
 
const Page = () => {
  const { user } = UserAuth();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Navbar />
        <Image
          src="/assets/give_funds.jpg"
          width={1000}
          height={600}
          className="object-scale-down w-full h-[350px]"
          alt="illustration"
        />
        <div className="p-4 md:flex md:flex-row md:justify-center md:items-center">
          <RaiseFundsForm user={user}/>
        </div>
        <Footer />
      </div>
    </Suspense>
  );
};

export default Page;
