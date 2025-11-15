"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { personalDetails } from "@/app/actions/personalDetails";
import 'react-toastify/dist/ReactToastify.css';

const UserDetailsForm = ({ user }: any) => {
  const searchParams = useSearchParams();
  const uid = searchParams.get('userId');

  const [formValues, setFormValues] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    address: user?.address || "",
    pincode: user?.pincode || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <div className="border-2 border-gray-300 shadow-lg rounded-xl my-20 px-14">
      <form
        action={async (formData) => {
          const data: any = await personalDetails(formData, uid);
          // try {
          //   const data: any = await personalDetails(formData, token);

          //   // Check if data is defined and has the expected structure
          //   if (data && data[0].acknowledged) {
          //     console.log("Data:", data[0].acknowledged); // For debugging
          //     if (data[0].modifiedCount > 0) {
          //       toast.success("Updated Successfully", {
          //         position: "bottom-right",
          //         autoClose: 4000,
          //         hideProgressBar: false,
          //         closeOnClick: true,
          //         pauseOnHover: true,
          //         draggable: true,
          //         progress: undefined,
          //         theme: "dark",
          //       });
          //     } else if (data[0].matchedCount > 0) {
          //       toast.info("No changes detected, nothing was updated.", {
          //         position: "bottom-right",
          //         autoClose: 4000,
          //         hideProgressBar: false,
          //         closeOnClick: true,
          //         pauseOnHover: true,
          //         draggable: true,
          //         progress: undefined,
          //         theme: "dark",
          //       });
          //     }
          //   } else {
          //     throw new Error("Unexpected response structure");
          //   }
          // } catch (error) {
          //   console.error("Error:", error);
          //   toast.error("An error occurred. Please try again.", {
          //     position: "bottom-right",
          //     autoClose: 4000,
          //     hideProgressBar: false,
          //     closeOnClick: true,
          //     pauseOnHover: true,
          //     draggable: true,
          //     progress: undefined,
          //     theme: "dark",
          //   });
          // }
        }}
      >
        <h1 className="m-2 mt-16 mb-12 text-2xl font-medium text-center">
          Personal Details
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
                value={formValues.firstName}
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
                value={formValues.lastName}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded-xl lg:w-[400px] bg-gray-100"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
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
          </div>
        </div>
        <h1 className="m-2 mt-8 text-2xl font-medium">Address</h1>
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
              value={formValues.address}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded-xl lg:w-[956px] bg-gray-100"
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
          <input
            type="submit"
            className="w-full p-4 bg-black text-white rounded-sm my-10 lg:w-[400px]"
            value="Save"
          />
        </div>
      </form>
    </div>
  );
};

export default UserDetailsForm;
