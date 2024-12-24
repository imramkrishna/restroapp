"use client"
import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

function page() {
  const [billings, setBillings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    currentTable: null
  });

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
    setCustomerDetails(prev => ({...prev, currentTable: tableNum}));
    setShowModal(true);
  };

  const handleCancel = async (tableNum) => {
    console.log(`Cancel order for table ${tableNum}`);
    try {
      await axios.delete(`/api/orders/${tableNum}`);
      console.log(`Order for table ${tableNum} cancelled successfully`);
    } catch(error) {
      console.log(`Error cancelling order for table ${tableNum}`,error);
    }
  }

  const generatePDF = async (tableNum, customerName, customerPhone) => {
    const doc = new jsPDF();
    const tableOrders = groupedBillings[tableNum];
    const totalAmount = tableOrders.reduce((sum, order) => sum + order.totalPrice, 0);

    // Header
    doc.setFontSize(20);
    doc.text('Restaurant Receipt', 20, 20);
    
    // Customer Details
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40);
    doc.text(`Table: ${tableNum}`, 20, 50);
    doc.text(`Customer: ${customerName}`, 20, 60);
    doc.text(`Phone: ${customerPhone}`, 20, 70);
    
    // Order Details
    let yPos = 90;
    doc.text('Order Details:', 20, yPos);
    yPos += 10;

    tableOrders.forEach(order => {
      order.items.forEach(item => {
        doc.text(
          `${item.itemname} x ${item.quantity} = $${item.price * item.quantity}`,
          30,
          yPos
        );
        yPos += 10;
      });
    });

    // Total
    doc.setFontSize(14);
    doc.text(`Total Amount: $${totalAmount}`, 20, yPos + 10);

    // Save
    doc.save(`table${tableNum}_receipt.pdf`);
  };

  const handleSubmitCustomerDetails = (e) => {
    e.preventDefault();
    generatePDF(
      customerDetails.currentTable,
      customerDetails.name,
      customerDetails.phone
    );
    setShowModal(false);
    setCustomerDetails({ name: '', phone: '', currentTable: null });
  };

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
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl mb-4">Enter Customer Details</h2>
            <form onSubmit={handleSubmitCustomerDetails}>
              <input
                type="text"
                placeholder="Customer Name"
                className="block w-full mb-2 p-2 border rounded"
                value={customerDetails.name}
                onChange={(e) => setCustomerDetails(prev => ({...prev, name: e.target.value}))}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="block w-full mb-4 p-2 border rounded"
                value={customerDetails.phone}
                onChange={(e) => setCustomerDetails(prev => ({...prev, phone: e.target.value}))}
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Print Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
