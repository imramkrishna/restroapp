import { NextResponse } from 'next/server';
import connectDB from '@/database/connect';
import Menu from '@/models/menu';

export async function GET() {
  await connectDB();
  try {
    const menuItems = await Menu.find();
    return NextResponse.json(menuItems, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();
  try {
    const payload = await request.json();
    const newItem = new Menu(payload);
    await newItem.save();
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}