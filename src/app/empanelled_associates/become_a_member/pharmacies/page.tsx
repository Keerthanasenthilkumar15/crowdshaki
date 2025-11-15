"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { pharmaciesDetails, sendOTP, verifyOTP } from "../../../actions/pharmaciesDetails";
import Navbar from "../../../components/Navbar";
import { toast } from "react-toastify";
import Footer from "../../../components/Footer";
import useAuthStore from "../../../store/authStore"

const pharmacyForm = () => {
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    //pharmacyName
    pharmacyName: "",

    //contact details
    email: "",
    mobile: "",
    address: "",
    pincode: "",

    //lab details
    pharmacyType: "",
    yearsOfOperation: "",

    //lab license & accreditation
    pharmacyLicenseNumber: "",
    dateOfIssue: "",
    issuingAuthority: "",

    //services provided
    serviceTypes: "",
    specialTests: "",
    facilities: "",

    //compliance
    compliantOrnot: "",
  });

  const { isAuthenticated, user, logout } = useAuthStore();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the form from submitting on load/reload

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (!otpSent) {
      const otpHasSent = await sendOTP(user?.email, user?.phone)
      if (otpHasSent.success == true) {
        setOtpSent(true)
      }
    } else {
      const verifyingOTP = await verifyOTP(user?.email, otp)
      if (verifyingOTP.success == true) {

        const res = await pharmaciesDetails(data);
        if (
          (res)
        ) {
          toast.success("Updated Successfully", {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          setFormData({
            pharmacyName: "",

            //contact details
            email: "",
            mobile: "",
            address: "",
            pincode: "",

            //lab details
            pharmacyType: "",
            yearsOfOperation: "",

            //lab license & accreditation
            pharmacyLicenseNumber: "",
            dateOfIssue: "",
            issuingAuthority: "",

            //services provided
            serviceTypes: "",
            specialTests: "",
            facilities: "",

            //compliance
            compliantOrnot: "",
          })
        }
        else {
          toast.error("Something went wrong", {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    }
  };

  return (
    <main className="md:px-8 md:py-4 shadow-xl md:border-2 md:border-gray-200">
      <Navbar></Navbar>
      <h1 className="font-semibold text-[24px] my-8 lg:text-[28px] xl:text-[34px] leading-tight text-black text-center md:text-center">
        Fill the form! Become a Member!
      </h1>
      <div className="p-4 md:flex md:flex-row md:justify-center md:items-center">
        <form onSubmit={handleSubmit}>
          {/* pharmacyName */}
          <h1 className="my-8 text-2xl font-semibold">1. Pharmacy Details</h1>
          <div className="m-2 flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
              <div>
                <label htmlFor="pharmacyName" className="block font-medium mb-2">
                  Pharmacy Name
                </label>
                <input
                  type="text"
                  name="pharmacyName"
                  id="pharmacyName"
                  placeholder="Enter your pharmacy name"
                  value={formData.pharmacyName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
            </div>
          </div>
          {/* contact details */}
          <h1 className="my-8 text-2xl font-semibold">2. Contact Details</h1>
          <div className="m-2 flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
              <div>
                <label htmlFor="email" className="block font-medium mb-2">
                  Email ID
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email ID"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
              <div>
                <label htmlFor="mobile" className="block font-medium mb-2">
                  Mobile Number
                </label>
                <input
                  type="number"
                  name="mobile"
                  id="mobile"
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  maxLength={10}
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
            </div>
          </div>
          <div className="m-2 flex flex-col gap-4">
            <div>
              <label htmlFor="address" className="block font-medium mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
              />
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
              <div>
                <label htmlFor="pincode" className="block font-medium mb-2">
                  Pincode
                </label>
                <input
                  type="number"
                  name="pincode"
                  id="pincode"
                  placeholder="Enter your pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                  maxLength={6}
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
            </div>
            {/* lab details */}
            <h1 className="my-8 text-2xl font-semibold">3. Business Details</h1>
            <div className=" flex flex-col gap-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
                <div>
                  <label htmlFor="pharmacyType" className="block font-medium mb-2">
                    Lab type
                  </label>
                  <select
                    name="pharmacyType"
                    id="pharmacyType"
                    value={formData.pharmacyType}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                  >
                    <option value="" disabled>
                      Select your choice
                    </option>
                    <option value="independent">Independent</option>
                    <option value="franchise">Franchise</option>
                    {/* <option value="others">Others</option> */}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="yearsOfOperation"
                    className="block font-medium mb-2"
                  >
                    Years of Operation
                  </label>
                  <input
                    type="number"
                    name="yearsOfOperation"
                    id="yearsOfOperation"
                    placeholder="Enter the years of operation"
                    value={formData.yearsOfOperation}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                  />
                </div>
              </div>
            </div>
            <h1 className="my-8 text-2xl font-semibold">
              4. Pharmacy License & Accreditation
            </h1>
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
              <div>
                <label
                  htmlFor="pharmacyLicenseNumber"
                  className="block font-medium mb-2"
                >
                  Pharmacy License Number
                </label>
                <input
                  type="number"
                  name="pharmacyLicenseNumber"
                  id="pharmacyLicenseNumber"
                  placeholder="Enter the license number"
                  value={formData.pharmacyLicenseNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
              <div>
                <label htmlFor="dateOfIssue" className="block font-medium mb-2">
                  Date of Issue
                </label>
                <input
                  type="text"
                  name="dateOfIssue"
                  id="dateOfIssue"
                  placeholder="dd/mm/yyyy"
                  value={formData.dateOfIssue}
                  onChange={handleInputChange}
                  required
                  pattern="\d{2}/\d{2}/\d{4}"
                  title="Enter the Pharmacy Issue date"
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
              <div>
                <label
                  htmlFor="issuingAuthority"
                  className="block font-medium mb-2"
                >
                  Issuing Authority
                </label>
                <input
                  type="text"
                  name="issuingAuthority"
                  id="issuingAuthority"
                  placeholder="Enter the Issuing Authority Name"
                  value={formData.issuingAuthority}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
            </div>
            {/* 3 dropdowns - services provided */}
            <h1 className="my-8 text-2xl font-semibold">5. Services Provided</h1>
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-40 mb-8">
              {/* serviceTypes */}
              <div>
                <label
                  htmlFor="serviceTypes"
                  className="block font-medium mb-2"
                >
                  Service Type
                </label>

                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="serviceTypes"
                      value="Retail Pharmacy Services"
                      className="mr-2"
                    />
                    Retail Pharmacy Services
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="serviceTypes"
                      value="Over-the-Counter (OTC) Medicine Sales"
                      className="mr-2"
                    />
                    Over-the-Counter (OTC) Medicine Sales
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="serviceTypes"
                      value="Prescription Medicine Sales"
                      className="mr-2"
                    />
                    Prescription Medicine Sales
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="serviceTypes"
                      value="Medical Equipment Sales"
                      className="mr-2"
                    />
                    Medical Equipment Sales
                  </label>
                </div>
              </div>

              {/* specialTests */}
              <div>
                <label
                  htmlFor="serviceTypes"
                  className="block font-medium mb-2"
                >
                  Special Tests
                </label>

                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="specialTests"
                      value="Compounding Services"
                      className="mr-2"
                    />
                    Compounding Services
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="specialTests"
                      value="Home Delivery Services"
                      className="mr-2"
                    />
                    Home Delivery Services
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="specialTests"
                      value="Medical Consultation Services"
                      className="mr-2"
                    />
                    Medical Consultation Services
                  </label>
                </div>
              </div>
            </div>
            {/* facilities */}
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
              <div>
                <label htmlFor="facilities" className="block font-medium mb-2">
                  Facilities
                </label>

                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="serviceTypes"
                      value="Air-conditioned Storage"
                      className="mr-2"
                    />
                    Air-conditioned Storage
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="serviceTypes"
                      value="Refrigerated Storage for Samples"
                      className="mr-2"
                    />
                    Refrigerated Storage for Samples
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="serviceTypes"
                      value="Automated Dispensing Systems"
                      className="mr-2"
                    />
                    Automated Dispensing Systems
                  </label>
                </div>
              </div>
            </div>
            <h1 className="my-8 text-2xl font-semibold">6. Compliance and Quality Assurance</h1>
            <div className=" flex flex-col gap-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
                <div>
                  <label
                    htmlFor="compliantOrnot"
                    className="block font-medium mb-2"
                  >
                    Are you Compliant to Government Regulations or not?
                  </label>
                  <select
                    name="compliantOrnot"
                    id="compliantOrnot"
                    value={formData.compliantOrnot}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                  >
                    <option value="" disabled>
                      Select your choice
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>
            {!otpSent ? (
              <button
                type="submit"
                className="w-[200px] p-4 bg-black text-white rounded-sm my-10 lg:w-[400px]"
              >
                Submit
              </button>
            ) : (
              <div className="flex flex-col">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-[200px] p-4 border rounded-sm my-4 lg:w-[400px]"
                />
                <button
                  type="submit"
                  className="w-[200px] p-4 bg-black text-white rounded-sm my-10 lg:w-[400px]"
                >
                  Verify OTP and Submit
                </button>
              </div>
            )}

          </div>
        </form>
      </div>
      <Footer></Footer>
    </main>
  );
};

export default pharmacyForm;
