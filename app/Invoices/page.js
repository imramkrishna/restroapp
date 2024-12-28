"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

function page() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("/api/payments");
      setInvoices(response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Invoice Statements</h1>
      <div className="space-y-8">
        {invoices.map((invoice) => (
          <div key={invoice._id} className="border rounded-lg p-6 bg-white shadow-sm">
            {/* Header */}
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">Restro Pro</h2>
                  <p className="text-gray-600">123 Restaurant Street</p>
                  <p className="text-gray-600">City, State 12345</p>
                  <p className="text-gray-600">Phone: (123) 456-7890</p>
                </div>
                <div className="text-right">
                  <h3 className="text-xl font-semibold">INVOICE</h3>
                  <p className="text-gray-600">#{invoice._id.slice(-6)}</p>
                  <p className="text-gray-600">
                    Date: {new Date(invoice.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-600">
                    Time: {new Date(invoice.date).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Order Details:</h4>
              <div className="bg-gray-50 p-4 rounded">
                <p><span className="font-medium">Table Number:</span> {invoice.tableNum}</p>
                <p><span className="font-medium">Payment Method:</span> {invoice.method}</p>
              </div>
            </div>

            {/* Amount */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Total Amount:</span>
                <span className="font-bold">${invoice.amount.toFixed(2)}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-gray-500 text-sm">
              <p>Thank you for dining with us!</p>
              <p>For any queries, please contact us at support@restropro.com</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
