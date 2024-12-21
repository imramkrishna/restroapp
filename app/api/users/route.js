
import { NextResponse } from 'next/server';
import connectDB from '../../../database/connect';

export async function GET(request) {
  await connectDB();
  const users = await User.find();
  return NextResponse.json(users);
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const newUser = await User.create(body);
  return NextResponse.json(newUser);
}
