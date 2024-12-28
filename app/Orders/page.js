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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    method: '',
    tableNum: null
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
    const totalAmount = groupedBillings[tableNum].reduce(
      (sum, order) => sum + order.totalPrice, 
      0
    );
    setPaymentDetails({ method: '', tableNum });
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setShowPaymentModal(false);
    
    // Show success message
    alert(`Payment of $${groupedBillings[paymentDetails.tableNum].reduce(
      (sum, order) => sum + order.totalPrice, 
      0
    )} received through ${paymentDetails.method}`);

    try {
      await axios.post('/api/payments', {
      tableNum: paymentDetails.tableNum,
      method: paymentDetails.method,
      amount: groupedBillings[paymentDetails.tableNum].reduce(
        (sum, order) => sum + order.totalPrice, 
        0
      )
      });
      console.log('Payment details saved successfully');
    } catch (error) {
      console.log('Error saving payment details', error);
    }
    try{
      await axios.delete(`/api/orders/${paymentDetails.tableNum}`);
      console.log(`Order for table ${paymentDetails.tableNum} deleted successfully`);
    }catch(error){
      console.log(`"Order cannot be completed for table ${paymentDetails.tableNum}"`, error);
    }
    
    // Trigger receipt printing
    handlePrintReceipt(paymentDetails.tableNum);
  };

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
    <div className="p-4 md:p-6 lg:p-8">
      <div className="orders-list space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Orders</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.entries(groupedBillings).map(([tableNum, tableBillings]) => {
            const totalTablePrice = tableBillings.reduce((sum, billing) => 
              sum + billing.totalPrice, 0
            );
            
            return (
              <div key={tableNum} className="card bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-xl font-bold text-gray-800">Table: {tableNum}</p>
                  <p className="text-lg font-bold text-green-600">
                    Total: ${totalTablePrice}
                  </p>
                </div>
                {tableBillings.map((billing) => (
                  <div key={billing._id} className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">{billing.name}</span>
                      <span className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">
                        {new Date(billing.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {billing.items.map((item, index) => (
                        <li key={index} className="flex justify-between text-gray-600">
                          <span>{item.itemname} x {item.quantity}</span>
                          <span>${item.price * item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 pt-3 border-t text-right font-bold">
                      Order Total: ${billing.totalPrice}
                    </p>
                  </div>
                ))}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <button 
                    className="col-span-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    onClick={() => handlePayment(tableNum)}
                  >
                    Pay
                  </button>
                  <button 
                    className="col-span-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    onClick={() => handleCancel(tableNum)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="col-span-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={() => handlePrintReceipt(tableNum)}
                  >
                    Print
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals with enhanced styling */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Enter Customer Details</h2>
            <form onSubmit={handleSubmitCustomerDetails} className="space-y-4">
              <input
                type="text"
                placeholder="Customer Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={customerDetails.name}
                onChange={(e) => setCustomerDetails(prev => ({...prev, name: e.target.value}))}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={customerDetails.phone}
                onChange={(e) => setCustomerDetails(prev => ({...prev, phone: e.target.value}))}
                required
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Print Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            <p className="text-lg mb-4">
              Total Amount: ${groupedBillings[paymentDetails.tableNum].reduce(
                (sum, order) => sum + order.totalPrice, 
                0
              )}
            </p>
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="space-y-3">
                {['Cash', 'Card', 'E-Wallet'].map((method) => (
                  <div key={method} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                    <input
                      type="radio"
                      id={method.toLowerCase()}
                      name="paymentMethod"
                      value={method}
                      onChange={(e) => setPaymentDetails(prev => ({
                        ...prev, 
                        method: e.target.value
                      }))}
                      required
                      className="mr-3"
                    />
                    <label htmlFor={method.toLowerCase()}>{method}</label>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Confirm Payment
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
