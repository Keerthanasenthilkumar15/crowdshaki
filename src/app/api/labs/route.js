import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/database';


export const GET = async (req) => {
  try {
    const client = await connectToDatabase();
    const db = client.db("crowdshaki");
    const labs = await db.collection("Labs").find().toArray();
    return NextResponse.json({ labs });
  } catch (error) {
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  }
};

export const POST = async (req) => {
  try {
    const data = await req.json();
    console.log(data)
    const client = await connectToDatabase();
    const db = client.db("crowdshaki");
    const labs = await db.collection("Labs").insertOne(data);
    return NextResponse.json({ message: "Labs added succesfully", data });
  } catch (error) {
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  }
};
