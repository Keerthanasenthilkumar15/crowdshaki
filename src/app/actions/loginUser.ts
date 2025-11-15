// "use server";

// import { redirect } from "next/navigation";
// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import { z } from "zod";
// import { parseWithZod } from "@conform-to/zod";
// import {
//   loginWithPasswordSchema,
//   loginWithOTPSchema,
// } from "../schemas/zodSchemas";
// import { connectToDatabase } from "@/app/lib/database";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import AWS from "aws-sdk";

// const JWT_SECRET = process.env.JWT_SECRET as string;

// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET is not defined in environment variables");
// }

// const ses = new AWS.SES({
//   region: process.env.AWS_REGION,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// export async function loginWithPassword(
//   prevState: unknown,
//   formData: FormData,
// ) {
//   const submission = parseWithZod(formData, {
//     schema: loginWithPasswordSchema,
//   });

//   if (submission.status !== "success") {
//     return submission.reply();
//   }

//   const email = formData.get("email");
//   const password: FormDataEntryValue | null = formData.get("password");

//   if (password === null || typeof password !== "string") {
//     return { success: false, error: "Password is required" };
//   }

//   try {
//     const client = await connectToDatabase();
//     const db = client.db("crowdshaki");

//     const user = await db.collection("users").findOne({ email });

//     if (!user) {
//       return { success: false, error: "User not found" };
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return { success: false, error: "Invalid password" };
//     }

//     const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     console.log(user)
//     console.log(token)
//     // Create cookies on the edge runtime
//     const cookieStore = cookies();
//     cookieStore.set('token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 60 * 60 * 24 * 7 // 7 days
//     });

//     return {
//       success: true,
//       data: {
//         email: user.email,
//         token: token,
//         phone: user.phone
//       }
//     };

//   } catch (error) {
//     console.error('Login error:', error);
//     return {
//       success: false,
//       error: "An error occurred during login"
//     };
//   }
// }

// const OTP_EXPIRATION = 5 * 60 * 1000; // 5 minutes

// // Generate a random OTP
// function generateOTP(): string {
//   return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
// }

// // Store OTP in the database
// async function storeOTP(email: string, otp: string, expiresAt: Date) {
//   const client = await connectToDatabase();
//   const db = client.db("crowdshaki");
//   await db.collection("otps").updateOne(
//     { email },
//     { $set: { otp, expiresAt } },
//     { upsert: true }
//   );
// }

// // Validate OTP from the database
// async function validateOTP(email: string, otp: string) {
//   const client = await connectToDatabase();
//   const db = client.db("crowdshaki");
//   const record = await db.collection("otps").findOne({ email });

//   if (!record) return false;

//   const { otp: storedOTP, expiresAt } = record;

//   if (storedOTP === otp && new Date() < new Date(expiresAt)) {
//     return true;
//   }
//   return false;
// }

// // Remove OTP after successful validation
// async function removeOTP(email: string) {
//   const client = await connectToDatabase();
//   const db = client.db("crowdshaki");
//   await db.collection("otps").deleteOne({ email });
// }

// // Send OTP email using AWS SES
// async function sendOTPMail(email: string, otp: string) {
//   const sourceEmail = process.env.ADMIN_EMAIL;

//   if (!sourceEmail) {
//     throw new Error("AWS_SES_FROM_EMAIL environment variable is not defined");
//   }

//   if (!email) {
//     throw new Error("Recipient email is not defined");
//   }

//   const params = {
//     Source: sourceEmail, // Ensure this is defined
//     Destination: {
//       ToAddresses: [email], // Ensure this is a valid string array
//     },
//     Message: {
//       Body: {
//         Text: {
//           Data: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
//         },
//       },
//       Subject: {
//         Data: "Your OTP Code",
//       },
//     },
//   };

//   try {
//     const result = await ses.sendEmail(params).promise();
//     console.log("Email sent successfully:", result);
//     return result;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error("Failed to send OTP email");
//   }
// }


// export async function sendOTP(prevState: unknown, formData: FormData) {
//   const submission = parseWithZod(formData, {
//     schema: z.object({
//       email: z.string().email(),
//     }),
//   });

//   if (submission.status !== "success") {
//     return submission.reply();
//   }

//   const email = formData.get("email") as string;

//   try {
//     const otp = generateOTP();
//     const expiresAt = new Date(Date.now() + OTP_EXPIRATION);

//     await storeOTP(email, otp, expiresAt);
//     await sendOTPMail(email, otp);

//     return {
//       success: true,
//       message: "OTP sent successfully",
//     };
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     return {
//       success: false,
//       error: "Failed to send OTP",
//     };
//   }
// }

// export async function verifyOTP(prevState: unknown, formData: FormData) {
//   const submission = parseWithZod(formData, {
//     schema: loginWithOTPSchema,
//   });

//   if (submission.status !== "success") {
//     return submission.reply();
//   }

//   const email = formData.get("email") as string;
//   const otp = formData.get("otp") as string;
//   const client = await connectToDatabase();
//   const db = client.db("crowdshaki");
//   const user = await db.collection("users").findOne({ email });
//   const phoneNumber = user.phone
//   try {
//     const isValid = await validateOTP(email, otp);

//     if (!isValid) {
//       console.log("Incorrect OTP")
//       return {
//         success: false,
//         error: "Invalid or expired OTP",
//       };
//     }

//     await removeOTP(email);

//     const token = jwt.sign({ email }, JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     const cookieStore = cookies();
//     cookieStore.set("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 60 * 60 * 24 * 7, // 7 days
//     });

//     return {
//       success: true,
//       data: { email, token, phoneNumber },
//     };
//   } catch (error) {
//     console.error("OTP verification error:", error);
//     return {
//       success: false,
//       error: "OTP verification failed",
//     };
//   }
// }




"use server";

import { redirect } from "next/navigation";
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import {
  loginWithPasswordSchema,
  loginWithOTPSchema,
} from "../schemas/zodSchemas";
import { connectToDatabase } from "@/app/lib/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

// ============================================
// PASSWORD LOGIN
// ============================================

export async function loginWithPassword(
  prevState: unknown,
  formData: FormData,
) {
  const submission = parseWithZod(formData, {
    schema: loginWithPasswordSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const email = formData.get("email");
  const password: FormDataEntryValue | null = formData.get("password");

  if (password === null || typeof password !== "string") {
    return { success: false, error: "Password is required" };
  }

  try {
    const client = await connectToDatabase();
    const db = client.db("crowdshaki");

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { success: false, error: "Invalid password" };
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log(user)
    console.log(token)
    
    // Create cookies on the edge runtime
    const cookieStore = cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return {
      success: true,
      data: {
        email: user.email,
        token: token,
        phone: user.phone
      }
    };

  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: "An error occurred during login"
    };
  }
}

// ============================================
// OTP FUNCTIONS
// ============================================

const OTP_EXPIRATION = 5 * 60 * 1000; // 5 minutes

// Generate a random OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

// Store OTP in the database
async function storeOTP(email: string, otp: string, expiresAt: Date) {
  const client = await connectToDatabase();
  const db = client.db("crowdshaki");
  await db.collection("otps").updateOne(
    { email },
    { $set: { otp, expiresAt } },
    { upsert: true }
  );
}

// Validate OTP from the database
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

// ============================================
// SEND OTP EMAIL - GMAIL VERSION
// ============================================

async function sendOTPMail(email: string, otp: string) {
  const nodemailer = require('nodemailer');
  
  // Create Gmail transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  // Email content with beautiful design
  const mailOptions = {
    from: `"Crowdshaki" <${process.env.ADMIN_EMAIL}>`,
    to: email,
    subject: 'Your OTP Code - Crowdshaki',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
            }
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 40px 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              color: #ffffff;
              font-size: 32px;
              font-weight: bold;
            }
            .header p {
              margin: 10px 0 0 0;
              color: #ffffff;
              font-size: 16px;
              opacity: 0.9;
            }
            .content {
              padding: 40px 30px;
            }
            .content p {
              font-size: 16px;
              color: #333333;
              line-height: 1.5;
              margin: 0 0 20px 0;
            }
            .otp-box {
              text-align: center;
              padding: 30px;
              background-color: #f8f9fa;
              border-radius: 8px;
              margin: 20px 0;
              border: 2px dashed #667eea;
            }
            .otp-code {
              font-size: 36px;
              font-weight: bold;
              color: #667eea;
              letter-spacing: 8px;
              font-family: 'Courier New', monospace;
            }
            .warning {
              background-color: #fff5f5;
              border-left: 4px solid #e53e3e;
              padding: 15px;
              border-radius: 4px;
              margin: 20px 0;
            }
            .warning p {
              margin: 0;
              color: #c53030;
              font-size: 14px;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px 30px;
              text-align: center;
              border-top: 1px solid #e2e8f0;
            }
            .footer p {
              margin: 0;
              color: #999999;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <!-- Header -->
            <div class="header">
              <h1>Crowdshaki</h1>
              <p>Reliable means to help people needing fund</p>
            </div>
            
            <!-- Content -->
            <div class="content">
              <p>Hello,</p>
              <p>You have requested to login to your Crowdshaki account. Please use the following verification code:</p>
              
              <!-- OTP Box -->
              <div class="otp-box">
                <div class="otp-code">${otp}</div>
              </div>
              
              <p style="font-weight: bold; color: #e53e3e;">⏰ This code will expire in 5 minutes.</p>
              
              <p>If you did not request this code, please ignore this email or contact our support team if you have concerns.</p>
              
              <!-- Warning Box -->
              <div class="warning">
                <p><strong>🔒 Security Tip:</strong> Never share this code with anyone. Crowdshaki will never ask you for this code.</p>
              </div>
              
              <p>Best regards,<br><strong style="color: #667eea;">The Crowdshaki Team</strong></p>
            </div>
            
            <!-- Footer -->
            <div class="footer">
              <p>This is an automated email. Please do not reply to this message.</p>
              <p style="margin-top: 10px;">© 2024 Crowdshaki. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Your OTP is: ${otp}. It is valid for 5 minutes. If you did not request this code, please ignore this email.`,
  };

  try {
    console.log('📧 Attempting to send email via Gmail...');
    console.log('📧 From:', process.env.ADMIN_EMAIL);
    console.log('📧 To:', email);
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully via Gmail!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📧 Email delivered to:', email);
    
    return info;
  } catch (error: any) {
    console.error('❌ Error sending email via Gmail:', error);
    console.error('❌ Error details:', {
      message: error.message,
      code: error.code,
    });
    throw new Error('Failed to send OTP email');
  }
}

// ============================================
// SEND OTP ENDPOINT
// ============================================

export async function sendOTP(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: z.object({
      email: z.string().email(),
    }),
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const email = formData.get("email") as string;

  try {
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + OTP_EXPIRATION);

    console.log('🔐 Generated OTP for', email, ':', otp); // For testing - remove in production

    await storeOTP(email, otp, expiresAt);
    await sendOTPMail(email, otp);

    console.log('✅ OTP process completed successfully for:', email);

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

// ============================================
// VERIFY OTP ENDPOINT
// ============================================

export async function verifyOTP(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: loginWithOTPSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const email = formData.get("email") as string;
  const otp = formData.get("otp") as string;
  
  const client = await connectToDatabase();
  const db = client.db("crowdshaki");
  const user = await db.collection("users").findOne({ email });
  const phoneNumber = user?.phone;
  
  try {
    const isValid = await validateOTP(email, otp);

    if (!isValid) {
      console.log("Incorrect OTP")
      return {
        success: false,
        error: "Invalid or expired OTP",
      };
    }

    await removeOTP(email);

    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    const cookieStore = cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    console.log('✅ OTP verified and user logged in successfully:', email);

    return {
      success: true,
      data: { email, token, phoneNumber },
    };
  } catch (error) {
    console.error("OTP verification error:", error);
    return {
      success: false,
      error: "OTP verification failed",
    };
  }
}
