// pages/api/most-frequently-bought.js
import { NextResponse } from 'next/server';
import { connectToDatabase, disconnectFromDatabase } from '@/app/lib/database';
import { ObjectId } from 'mongodb';

export const GET = async (request, { params }) => {
  const ngoId = params.ngo; // Extracting the fund_id from the params
  console.log("ID", ngoId)
  try {
    const client = await connectToDatabase(); 
    const db = client.db('crowdshaki');

    // Convert ngoId to ObjectId before querying
    const ngo = await db.collection('ngoList').find({ _id: new ObjectId(ngoId) }).toArray();
  
    return NextResponse.json(ngo);
  } catch (error) {
    console.error(error);
    return NextResponse.error(new Error('Failed to fetch data'));
  }
};
