import { NextResponse } from 'next/server';
import connectDB from '../../../database/connect';
import Payment from '../../../models/payments';

export async function POST(request) {
  await connectDB();

  try {
    const data = await request.json();
    const newPayment = new Payment({
      tableNum: data.tableNum,
      method: data.method,
      amount: data.amount,
      date: new Date()
    });

    await newPayment.save();
    return NextResponse.json(
      { message: 'Payment saved successfully', payment: newPayment },
      { status: 201 }
    );

  } catch (err) {
    console.error('Payment error:', err);
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}