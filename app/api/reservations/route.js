import { NextResponse } from 'next/server';
import connectDB from '../../../database/connect';
import Reservation from '../../../models/reservations';

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();
    const reservation = new Reservation(data);
    await reservation.save();
    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  try {
    const reservations = await Reservation.find().sort({ date: 1 });
    return NextResponse.json(reservations);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}