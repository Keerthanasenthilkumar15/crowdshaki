"use server";

import crypto from "crypto";
import AWS from "aws-sdk";
import { connectToDatabase } from "@/app/lib/database";

// Configure AWS SDK
const ses = new AWS.SES({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const sns = new AWS.SNS({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

function generateHtmlTable(data: any, token: any): string {
  const generateRows = (obj: any): string => {
    return Object.entries(obj)
      .map(([key, value]) => {
        if (typeof value === "object" && !Array.isArray(value)) {
          // Nested object handling
          return `
                          <tr>
                              <td style="font-weight: bold;" colspan="2">${key}</td>
                          </tr>
                          ${generateRows(value)}
                      `;
        } else {
          return `
                          <tr>
                              <td style="font-weight: bold;">${key}</td>
                              <td>${
                                Array.isArray(value) ? value.join(", ") : value
                              }</td>
                          </tr>
                      `;
        }
      })
      .join("");
  };

  return `
    <html>
      <head>
        <style>
            .buttons {
      margin-top: 40px;
    }

    .button {
      display: inline-block;
      padding: 16px 32px;
      margin-right: 16px;
      font-size: 16px;
      font-weight: 500;
      border-radius: 8px;
      text-decoration: none;
      color: white;
      text-align: center;
      transition: all 0.2s ease;
    }

    .approve-button {
      background-color: #28a745;
    }

    .approve-button:hover {
      background-color: #218838;
    }

    .reject-button {
      background-color: #dc3545;
    }

    .reject-button:hover {
      background-color: #c82333;
    }
        </style>
      </head>
      <body>
      <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
      <thead>
      <tr style="background-color: #f2f2f2;">
      <th style="text-align: left;">Field</th>
      <th style="text-align: left;">Value</th>
      </tr>
      </thead>
      <tbody>
      ${generateRows(data)}
      </tbody>
      
      </table>
      <div class="buttons">
      <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/hospitals" class="button approve-button">Approve</a>
      <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/hospitals" class="button reject-button">Reject</a>
      </div>
      </body>
      </html>
      `;
}
export const hospitalDetails = async (formData: FormData) => {
  console.log("Form Data:", formData);
  const token = crypto.randomBytes(32).toString("hex");

  const data = {
    hospitalName: formData.get("hospitalName") as string,
    address: formData.get("address") as string,
    street: formData.get("street") as string,
    city: formData.get("city") as string,
    state: formData.get("state") as string,
    pincode: formData.get("pincode") as string,
    country: formData.get("country") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    email: formData.get("email") as string,
    website: formData.get("website") as string,
    registrationNumber: formData.get("registrationNumber") as string,
    dateOfRegistration: formData.get("dateOfRegistration") as string,
    accreditationDetails: formData.get("accreditationDetails") as string,
    medicalDirector: formData.get("medicalDirector") as string,
    directorContact: formData.get("directorContact") as string,
    directorEmail: formData.get("directorEmail") as string,
    primaryContactName: formData.get("primaryContactName") as string,
    primaryContactDesignation: formData.get(
      "primaryContactDesignation"
    ) as string,
    primaryContactNumber: formData.get("primaryContactNumber") as string,
    primaryContactEmail: formData.get("primaryContactEmail") as string,
    totalBeds: formData.get("totalBeds") as string,
    icuBeds: formData.get("icuBeds") as string,
    emergencyBeds: formData.get("emergencyBeds") as string,
    specialties: formData.getAll("specialties") as string[],
    services: formData.getAll("services") as string[],
    availability: formData.get("availability") as string,
    emergencyContactNumber: formData.get("emergencyContactNumber") as string,
    doctors: formData.get("doctors") as string,
    specialists: formData.get("specialists") as string,
    nurses: formData.get("nurses") as string,
    residentDoctors: formData.get("residentDoctors") as string,
    keySpecialists: {
      specialty: formData.get("speciality") as string,
      name: formData.get("name") as string,
      qualification: formData.get("qualification") as string,
      contact: formData.get("contact") as string,
      email: formData.get("email") as string,
    },
    teleconsultationAvailable: formData.get(
      "teleconsultationAvailable"
    ) as string,
    technologyDetails: formData.get("technologyDetails") as string,
    diagnosticEquipment: formData.get("diagnosticEquipment") as string,
    surgicalEquipment: formData.get("surgicalEquipment") as string,
    isoCertified: formData.get("isoCertified") as string,
    nabhAccredited: formData.get("nabhAccredited") as string,
    otherCertifications: formData.get("otherCertifications") as string,
    regulatoryCompliance: formData.get("regulatoryCompliance") as string,
    complianceDetails: formData.get("complianceDetails") as string,
    declarerName: formData.get("declarerName") as string,
    declarerDesignation: formData.get("declarerDesignation") as string,
    declarationDate: formData.get("declarationDate") as string,
    additionalDocuments: formData.get("additionalDocuments") as string,
  };

  const response = await fetch("https://crowdshaki.vercel.app/api/hospitals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

   const apiResult = await response.json();
    const params: any = {
      Source: data.email, // Use the email from environment variables
      Destination: {
        ToAddresses: [process.env.ADMIN_EMAIL], // Admin's email from environment variables
      },
      Message: {
        Subject: {
          Data: "Form Approval",
        },
        Body: {
          Html: {
            Data: generateHtmlTable(data, token), // Send the static HTML content as a string
          },
        },
      },
    };
  
    const result = await ses.sendEmail(params).promise();
    console.log("Email sent successfully:", result);
  
    console.log(apiResult);
    return { apiResult, emailSent: true };
  };
  
  const OTP_EXPIRATION = 5 * 60 * 1000; // 5 minutes
  
  // Generate a random OTP
  function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  }
  
  async function storeOTP(email: string, otp: string, expiresAt: Date) {
    const client = await connectToDatabase();
    const db = client.db("crowdshaki");
    await db
      .collection("otps")
      .updateOne({ email }, { $set: { otp, expiresAt } }, { upsert: true });
  }
  
  async function sendOTPSMS(email: string, otp: string, phone: string) {
    const sourceEmail = process.env.ADMIN_EMAIL;
  
    if (!sourceEmail) {
      throw new Error("AWS_SES_FROM_EMAIL environment variable is not defined");
    }
  
    if (!email) {
      throw new Error("Recipient email is not defined");
    }
  
    const params: any = {
      Message: `Your OTP is: ${otp}`,
      PhoneNumber: phone, // Ensure the mobile number is in E.164 format
    };
  
    try {
      await sns.publish(params).promise();
      return { otpSent: true };
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      return { otpSent: false, error: error.message };
    }
  }
  
  export async function sendOTP(email: any, phone: any) {
    const phoneNumber = "+91" + phone;
    try {
      const otp = generateOTP();
      const expiresAt = new Date(Date.now() + OTP_EXPIRATION);
  
      await storeOTP(email, otp, expiresAt);
      await sendOTPSMS(email, otp, phoneNumber);
  
      return {
        success: true,
        message: "OTP sent successfully",
      };
    } catch (error) {
      console.error("Error sending OTP:", error);
      return {
        success: false,
        error: "Failed to send OTP",
      };
    }
  }
  
  async function validateOTP(email: string, otp: string) {
    const client = await connectToDatabase();
    const db = client.db("crowdshaki");
    const record = await db.collection("otps").findOne({ email });
  
    if (!record) return false;
  
    const { otp: storedOTP, expiresAt } = record;
  
    if (storedOTP === otp && new Date() < new Date(expiresAt)) {
      return true;
    }
    return false;
  }
  
  // Remove OTP after successful validation
  async function removeOTP(email: string) {
    const client = await connectToDatabase();
    const db = client.db("crowdshaki");
    await db.collection("otps").deleteOne({ email });
  }
  
  export async function verifyOTP(email: any, otp: any) {
    try {
      const isValid = await validateOTP(email, otp);
  
      if (!isValid) {
        console.log("Incorrect OTP");
        return {
          success: false,
          error: "Invalid or expired OTP",
        };
      }
  
      await removeOTP(email);
  
      return {
        success: true,
        message: "OTP verification successful",
      };
    } catch (error) {
      console.error("OTP verification error:", error);
      return {
        success: false,
        error: "OTP verification failed",
      };
    }
  }
  