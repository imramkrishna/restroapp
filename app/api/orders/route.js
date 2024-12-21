import { NextResponse } from 'next/server';
import connectDB from '../../../database/connect';
import Billing from '../../../models/orders';

export async function GET() {
  await connectDB();

  try {
    const billings = await Billing.find().lean();
    return NextResponse.json(billings);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  console.log("Post request received.")
    await connectDB();
  
    try {
      const data = await request.json();
      const newBilling = new Billing(data);
      await newBilling.save();
      return NextResponse.json(newBilling, { status: 201 });
    } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }
