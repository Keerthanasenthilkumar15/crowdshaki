import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/database";
import AWS from "aws-sdk";

// Configure AWS SDK for SES
const ses = new AWS.SES({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const GET = async (req, { params }) => {
const action = params.action
const token = params.token
const collection = params.form
  try {

    console.log("This is " + action)
    console.log(token)

    if (!token || !action) {
      return NextResponse.json({ error: "Token or action not provided" }, { status: 400 });
    }

    // Validate action type (approve or reject)
    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    // Connect to the database
    const client = await connectToDatabase();
    const db = client.db("crowdshaki");

    // Find the user by token
    const user = await db.collection(collection).findOne({ token });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Determine the new status
    const newStatus = action === "approve" ? "approved" : "rejected";

    // Update the user's status in the database
    await db.collection(collection).updateOne({ token }, { $set: { status: newStatus } });

    // Send an email to the user notifying them of the status change
    const emailSubject = action === "approve" ? "Your Account has been Approved" : "Your Account has been Rejected";
    const emailBody = `
      <html>
        <body>
          <p>Hello ${user.name},</p>
          <p>Your form has been ${newStatus}. If you have any questions, please reach out to our support team.</p>
          <p>Best Regards,<br/>CrowdShaki Team</p>
        </body>
      </html>
    `;

    const params = {
      Source: process.env.ADMIN_EMAIL,  // Sender's verified email
      Destination: {
        ToAddresses: [process.env.SES_VERIFIED_EMAIL],  // User's email
      },
      Message: {
        Subject: {
          Data: emailSubject,
        },
        Body: {
          Html: {
            Data: emailBody,  // Send the dynamic email content
          },
        },
      },
    };

    await ses.sendEmail(params).promise();

    // Return a success response
    return NextResponse.json({ message: `User ${newStatus} successfully, email sent.` }, { status: 200 });
  } catch (error) {
    console.error(`Error processing ${action} for user:`, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
