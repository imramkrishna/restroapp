import { NextResponse } from 'next/server';
import connectDB from '../../../../database/connect';
import Reservation from '../../../../models/reservations';

export async function DELETE(request, { params }) {
  await connectDB();
  try {
    const { id } = params;
    const result = await Reservation.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Reservation cancelled successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}