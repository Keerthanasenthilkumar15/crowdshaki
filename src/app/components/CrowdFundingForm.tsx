'use client';
import React, { useState } from 'react';

const CrowdFundingForm = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
        pincode: "",
        usage: "",
      });
      const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      ): any => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
      };
  return (
    <div>
      <div className="flex flex-col items-center lg:items-start justify-center w-full px-4 sm:px-8">
          <form>
            <h1 className="m-2 mt-16 mb-12 text-2xl font-medium text-center">
              Need Money Urgently?
            </h1>
            <div className="m-2 flex flex-col gap-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
                <div>
                  <label htmlFor="name" className="block font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your first name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="mailid" className="block font-medium mb-2">
                  Email ID
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email ID"
                  value={formValues.email}
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
                  value={formValues.mobile}
                  onChange={handleInputChange}
                  required
                  maxLength={10}
                  className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                />
              </div>
              <div>
                <label htmlFor="address" className="block font-medium mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter your address"
                  value={formValues.address}
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
                    value={formValues.pincode}
                    onChange={handleInputChange}
                    required
                    maxLength={6}
                    className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
                <div>
                  <label htmlFor="usage" className="block font-medium mb-2">
                    What will the funds be used for?
                  </label>
                  <select
                    name="usage"
                    id="usage"
                    value={formValues.usage}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
                  >
                    <option value="" disabled>
                      Select your choice
                    </option>
                    <option value="cancer">Cancer Treatment</option>
                    <option value="accident">Accident Treatment</option>
                    <option value="liver_kidney_transplant">
                      Liver/Kidney Transplant
                    </option>
                    <option value="heart_operation">Heart operation</option>
                    <option value="nicu">Pre-mature baby care (NICU)</option>
                    <option value="medicines">
                      Medicines (Ongoing Treatment)
                    </option>
                    <option value="memorial">Memorial (Patient Expired)</option>
                  </select>
                </div>
              </div>
            </div>
            <input
              type="submit"
              className="w-full p-4 bg-red-400 hover:scale-105 transition-transform duration-300 ease-in-out hover:cursor-pointer text-white rounded-sm my-10 lg:w-[400px]"
              value="Start a Fundraiser"
            />
          </form>
        </div>
    </div>
  )
}

export default CrowdFundingForm
