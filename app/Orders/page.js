"use client"
import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';

function page() {
  const [billings, setBillings] = useState([]);

  useEffect(() => {
    const fetchBillings = async () => {
      try {
        const response = await axios.get("/api/orders");
        setBillings(response.data);
        console.log(`Data fetched successfully`);
      } catch(error) {
        console.log("Error fetching data");
      }
    }
    fetchBillings();
  }, []);

  // Group orders by table number
  const groupedBillings = billings.reduce((acc, billing) => {
    const tableNumber = billing.table;
    if (!acc[tableNumber]) {
      acc[tableNumber] = [];
    }
    acc[tableNumber].push(billing);
    return acc;
  }, {});

  const handlePayment = async (tableNum) => {
    console.log(`Payment for table ${tableNum}`);
  }


const handlePrintReceipt = (tableNum) => {
  console.log(`Printing receipt for table ${tableNum}`);
}

const handleCancel = async (tableNum) => {
  console.log(`Cancel order for table ${tableNum}`);
  try {
    await axios.delete(`/api/orders/${tableNum}`);
    console.log(`Order for table ${tableNum} cancelled successfully`);
  } catch(error) {
    console.log(`Error cancelling order for table ${tableNum}`,error);
  }
}



  

  return (
    <div>
      <div className="orders-list">
        <h1>Orders</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(groupedBillings).map(([tableNum, tableBillings]) => {
            const totalTablePrice = tableBillings.reduce((sum, billing) => 
              sum + billing.totalPrice, 0
            );
            
            return (
              <div key={tableNum} className="card border rounded p-4 shadow">
                <div className="top flex justify-between">
                  <p className="text-xl font-bold">Table: {tableNum}</p>
                  <p className="text-xl font-bold text-green-600">
                    Total: ${totalTablePrice}
                  </p>
                </div>
                {tableBillings.map((billing) => (
                  <div key={billing._id} className="mt-4 border-t pt-2">
                    <div className="flex justify-between">
                      <span>{billing.name}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(billing.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <ul className="mt-2">
                      {billing.items.map((item, index) => (
                        <li key={index}>
                          {item.itemname} x {item.quantity} = ${item.price * item.quantity}
                        </li>
                      ))}
                    </ul>
                    <p className="font-bold">Order Total: ${billing.totalPrice}</p>
                  </div>
                ))}
                 <div className="mt-4 flex justify-between space-x-2">
                  <button 
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    onClick={() => handlePayment(tableNum)}
                  >
                    Pay and Complete
                  </button>
                  <button 
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    onClick={() => handleCancel(tableNum)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => handlePrintReceipt(tableNum)}
                  >
                    Print Receipt
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default page;
