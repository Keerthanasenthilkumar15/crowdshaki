// // pages/api/most-frequently-bought.js
// import { NextResponse } from 'next/server';
// import { connectToDatabase, disconnectFromDatabase } from '@/app/lib/database';
// import { ObjectId } from 'mongodb';

// export const GET = async (request, { params }) => {
//   const fundId = params.fund_id; // Extracting the fund_id from the params
//   console.log(fundId)
//   try {
//     const client = await connectToDatabase();
//     const db = client.db('crowdshaki');

//     // Convert fundId to ObjectId before querying
//     const fund = await db.collection('raisedFunds').find({ _id: new ObjectId(fundId) }).toArray();
//     // Return the fetched item as JSON
//     return NextResponse.json(fund);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.error(new Error('Failed to fetch data'));
//   }
// };




import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/database";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    const { fund_id } = params; // dynamic param name same as folder
    console.log("Fetching fund:", fund_id);

    const client = await connectToDatabase();
    const db = client.db("crowdshaki");

    // Find the fund using ObjectId
    const fund = await db
      .collection("raisedFunds")
      .findOne({ _id: new ObjectId(fund_id) });

    if (!fund) {
      return NextResponse.json(
        { error: "Fund not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(fund, { status: 200 });
  } catch (error) {
    console.error("Error fetching fund:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
