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
      <a href="https://crowdshaki.vercel.app/api/approveForm/approve/${token}/gpa" class="button approve-button">Approve</a>
      <a href="https://crowdshaki.vercel.app/api/approveForm/reject/${token}/gpa" class="button reject-button">Reject</a>
      </div>
      </body>
      </html>
      `;
}

export const gpaDetails = async (formData: FormData) => {
  console.log("Form Data:", formData);
  const token = crypto.randomBytes(32).toString("hex");

  const data = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    email: formData.get("email") as string,
    residentialAddress: formData.get("residentialAddress") as string,
    clinicAddress: formData.get("clinicAddress") as string,
    dob: formData.get("dob") as string,
    medicalRegNumber: formData.get("medicalRegNumber") as string,
    medicalCouncil: formData.get("medicalCouncil") as string,
    dateOfReg: formData.get("dateOfReg") as string,
    qualification: formData.get("qualification") as string,
    institution: formData.get("institution") as string,
    yearOfPassing: formData.get("yearOfPassing") as string,
    totalExperience: formData.get("totalExperience") as string,
    gpExperience: formData.get("gpExperience") as string,
    hospitalName: formData.get("hospitalName") as string,
    designation: formData.get("designation") as string,
    affiliations: formData.get("affiliations") as string,
    teleconsultationExperience:
      formData.get("teleconsultationExperience") === "true",
    teleconsultationDetails: formData.get("teleconsultationDetails") as string,
    preferredDays: formData.getAll("preferredDays") as string[],
    preferredTimeSlots: formData.getAll("preferredTimeSlots") as string[],
    hasComputer: formData.get("hasComputer") === "true",
    hasInternet: formData.get("hasInternet") === "true",
    platformUsed: formData.get("platformUsed") as string,
    certifications: formData.get("certifications") as string,
    compliantWithGuidelines: formData.get("compliantWithGuidelines") === "true",
    signature: formData.get("signature") as string,
    date: formData.get("date") as string,
  };

  const response = await fetch("https://crowdshaki.vercel.app/api/gpa", {
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
