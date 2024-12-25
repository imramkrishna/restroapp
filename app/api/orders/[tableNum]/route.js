import { NextResponse } from 'next/server';
import connectDB from '../../../../database/connect';
import Billing from '../../../../models/orders';

export async function DELETE(request, { params }) {
    await connectDB();
    
    try {
      const { tableNum } = params;
      // Ensure tableNum is treated as string for comparison
      const result = await Billing.deleteMany({ table: tableNum.toString() });
      
      if (result.deletedCount === 0) {
        return NextResponse.json(
          { message: "No orders found for this table" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { message: `Deleted ${result.deletedCount} orders` },
        { status: 200 }
      );
  
    } catch (err) {
      console.error('Delete error:', err);
      return NextResponse.json(
        { message: err.message },
        { status: 500 }
      );
    }
  } 