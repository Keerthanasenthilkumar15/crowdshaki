"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { raiseFundDetails } from "@/app/actions/raiseFundDetails";

const RaiseFundsForm = ({ user }: any) => {
  const uid = user?.uid
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    pincode: "",
    block: "",
    center: "",
    chaName: "",
    chaPhoneNumber: "",
    chaLeader: "",
    documentsFinished: false,
    aeStudentName: "",
    aePhoneNumber: "",
    hrName: "",
    beneficiaryName: "",
    relationship: "",
    amountForFund: "",
    reasonForFund: "",
    situation: "",
    category: "",
    accountHolder: "",
    accountNumber: "",
    accountType: "",
    ifscCode: "",
  });
  useEffect(() => {
    const fetchPersonalDetails = async () => {
      try {
        const response = await fetch(`/api/personalDetails/fetchData?uid=${uid}`);
        const data = await response.json();
        if (response.ok) {
          // Populate the form with fetched data
          setFormData({
            firstName: data?.firstName || "",
            lastName: data?.lastName || "",
            email: data?.email || "",
            mobile: data?.mobile || "",
            address: data?.address || "",
            pincode: data?.pincode || "",
            block: data?.block || "",
            center: data?.center || "",
            chaName: data?.chaName || "",
            chaPhoneNumber: data?.chaPhoneNumber || "",
            chaLeader: data?.chaLeader || "",
            documentsFinished: data?.documentsFinished || false,
            aeStudentName: data?.aeStudentName || "",
            aePhoneNumber: data?.aePhoneNumber || "",
            hrName: data?.hrName || "",
            beneficiaryName: data?.beneficiaryName || "",
            relationship: data?.relationship || "",
            amountForFund: data?.amountForFund || "",
            reasonForFund: data?.reasonForFund || "",
            situation: data?.situation || "",
            category: data?.category || "",
            accountHolder: data?.accountHolder || "",
            accountNumber: data?.accountNumber || "",
            accountType: data?.accountType || "",
            ifscCode: data?.ifscCode || "",
          });
        } else {
          console.error("Failed to fetch personal details:", data?.message);
        }
      } catch (error) {
        console.error("Error fetching personal details:", error);
      }
    };
  }, [uid]);

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
    Object.entries(formData).forEach(([key, value]:any) => {
      data.append(key, value);
    });

    await raiseFundDetails(data, uid);
  };

  return (
    <main className="md:px-8 md:py-4 shadow-xl md:border-2 md:border-gray-200">
      <form onSubmit={handleSubmit}>
        <h1 className="m-2 my-12 text-2xl font-medium">
          1. Campaigner Details
        </h1>
        <div className="m-2 flex flex-col gap-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
            <div>
              <label htmlFor="firstName" className="block font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
              />
            </div>
          </div>
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
                type="tel"
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
                type="text"
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

          <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
            <div>
              <label htmlFor="block" className="block font-medium mb-2">
                Block Name
              </label>
              <input
                type="text"
                name="block"
                id="block"
                placeholder="Enter your block name"
                value={formData.block}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="center" className="block font-medium mb-2">
                Centre Name
              </label>
              <input
                type="text"
                name="center"
                id="center"
                placeholder="Enter your center name"
                value={formData.center}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
            <div>
              <label htmlFor="chaName" className="block font-medium mb-2">
                Cha Name
              </label>
              <input
                type="text"
                name="chaName"
                id="chaName"
                placeholder="Enter your cha name"
                value={formData.chaName}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="chaPhoneNumber" className="block font-medium mb-2">
                Cha Phone Number
              </label>
              <input
                type="text"
                name="chaPhoneNumber"
                id="chaPhoneNumber"
                placeholder="Enter your cha phone number"
                value={formData.chaPhoneNumber}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
            <div>
              <label htmlFor="chaLeader" className="block font-medium mb-2">
                Cha Leader
              </label>
              <input
                type="text"
                name="chaLeader"
                id="chaLeader"
                placeholder="Enter your cha leader"
                value={formData.chaLeader}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
              />
            </div>
            
          </div>


          <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
            <div>
              <label htmlFor="aeStudentName" className="block font-medium mb-2">
                AE Student Name
              </label>
              <input
                type="text"
                name="aeStudentName"
                id="aeStudentName"
                placeholder="Enter your ae student name"
                value={formData.aeStudentName}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="aePhoneNumber" className="block font-medium mb-2">
                AE Phone Number
              </label>
              <input
                type="text"
                name="aePhoneNumber"
                id="aePhoneNumber"
                placeholder="Enter your AE phone number"
                value={formData.aePhoneNumber}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
            <div>
              <label htmlFor="hrName" className="block font-medium mb-2">
                  HR Name
              </label>
              <input
                type="text"
                name="hrName"
                id="hrName"
                placeholder="Enter your HR name"
                value={formData.hrName}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
              />
            </div>
            
          </div>

          <div>
                <label className="block font-medium mb-2">
                  Documents Finished
                </label>
                <div className="flex gap-4">
                  <label htmlFor="documentsFinishedYes" className="flex items-center">
                    <input
                      type="radio"
                      name="documentsFinished"
                      id="documentsFinished"
                      value="true"
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          documentsFinished: e.target.value === "true",
                        }));
                      }}
                      checked={formData.documentsFinished === true}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label htmlFor="documentsFinishedNo" className="flex items-center">
                    <input
                      type="radio"
                      name="documentsFinished"
                      id="documentsFinished"
                      value="false"
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          documentsFinished: e.target.value === "true",
                        }));
                      }}
                      checked={formData.documentsFinished === false}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>

          <h1 className="my-12 text-2xl font-medium">2. Beneficiary Details</h1>
          <div className=" flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
              <div>
                <label
                  htmlFor="beneficiaryName"
                  className="block font-medium mb-2"
                >
                  Beneficiary Name
                </label>
                <input
                  type="text"
                  name="beneficiaryName"
                  id="beneficiaryName"
                  placeholder="Enter beneficiary name"
                  value={formData.beneficiaryName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
              <div>
                <label
                  htmlFor="relationship"
                  className="block font-medium mb-2"
                >
                  Relationship
                </label>
                <input
                  type="text"
                  name="relationship"
                  id="relationship"
                  placeholder="Enter your relationship with beneficiary"
                  value={formData.relationship}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
              <div>
                <label
                  htmlFor="amountForFund"
                  className="block font-medium mb-2"
                >
                  Amount For Fund
                </label>
                <input
                  type="text"
                  name="amountForFund"
                  id="amountForFund"
                  placeholder="Enter the amount for fund raising"
                  value={formData.amountForFund}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
              <div>
                <label
                  htmlFor="reasonForFund"
                  className="block font-medium mb-2"
                >
                  Reason For Fund
                </label>
                <textarea
                  name="reasonForFund"
                  id="reasonForFund"
                  placeholder="Enter the reason for the fund raising"
                  value={formData.reasonForFund}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                ></textarea>
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
              <div>
                <label
                  htmlFor="situation"
                  className="block font-medium mb-2"
                >
                  Situation
                </label>
                <textarea
                  name="situation"
                  id="situation"
                  placeholder="Your situation in 500 words"
                  value={formData.situation}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                ></textarea>
              </div>
              <div>
                <label htmlFor="category" className="block font-medium mb-2">
                  Fund Category
                </label>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                >
                  <option value="" disabled>
                    Select your choice
                  </option>
                  <option value="Education">Education</option>
                  <option value="Medical">Medical</option>
                  <option value="Women & Girls">Women & Girls</option>
                  <option value="Animals">Animals</option>
                  <option value="Creative">Creative</option>
                  <option value="Food Hunger">Food & Hunger</option>
                  <option value="Environment">Environment</option>
                  <option value="Children">Children</option>
                  <option value="Memorial">Memorial</option>
                  <option value="Community Development">
                    Community Development
                  </option>
                </select>
              </div>
            </div>
          </div>

          <h1 className="my-12 text-2xl font-medium">3. Account Details</h1>
          <div className=" flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
              <div>
                <label
                  htmlFor="accountHolder"
                  className="block font-medium mb-2"
                >
                  Account Holder Name
                </label>
                <input
                  type="text"
                  name="accountHolder"
                  id="accountHolder"
                  placeholder="Enter account holder name"
                  value={formData.accountHolder}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
              <div>
                <label
                  htmlFor="accountNumber"
                  className="block font-medium mb-2"
                >
                  Account Number
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  id="accountNumber"
                  placeholder="Enter the account number"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
              <div>
                <label htmlFor="accountType" className="block font-medium mb-2">
                  Account Type
                </label>
                <input
                  type="text"
                  name="accountType"
                  id="accountType"
                  placeholder="Enter the account type"
                  value={formData.accountType}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
              <div>
                <label htmlFor="ifscCode" className="block font-medium mb-2">
                  IFSC Code
                </label>
                <input
                  type="text"
                  name="ifscCode"
                  id="ifscCode"
                  placeholder="Enter the IFSC code"
                  value={formData.ifscCode}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-[200px] p-4 bg-black text-white rounded-sm my-10 lg:w-[400px]"
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
};

export default RaiseFundsForm;
