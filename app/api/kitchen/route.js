import { NextResponse } from 'next/server';
import connectDB from '../../../database/connect';
import Billing from '../../../models/orders';

export async function POST(request) {
  await connectDB();
  try {
    const { itemId, Kitchen } = await request.json();
    console.log('Updating item:', itemId, 'with status:', Kitchen);

    // Find billing document containing the item and update its Kitchen status
    const updatedBilling = await Billing.findOneAndUpdate(
      { 'items._id': itemId },
      { 
        $set: { 
          'items.$.Kitchen': Kitchen 
        }
      },
      { new: true }
    );

    if (!updatedBilling) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(updatedBilling);
  } catch (err) {
    console.error('Update error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}