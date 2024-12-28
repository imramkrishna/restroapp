"use client"
import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';

function page() {
  const [billings, setBillings] = useState([]);

  useEffect(() => {
    const fetchBillings = async () => {
      try {
        const response = await axios.get("/api/orders")
        setBillings(response.data)
        console.log(`Data fetched successfully`);


      } catch (error) {
        console.log("Error fetching data")
      }
    }
    fetchBillings();
  }, [])

  const [itemStatus, setItemStatus] = useState({});

  const foodmaking = async (itemId) => {
    console.log('Updating item:', itemId);
    try {
      // Toggle status based on current state
      const currentStatus = itemStatus[itemId] || 'Start Making';
      const newStatus = currentStatus === 'Start Making' ? 'IsCompleted?' : 
                       currentStatus === 'IsCompleted?' ? 'Completed' : 'Completed';
      
      // Update local state
      setItemStatus(prev => ({
        ...prev,
        [itemId]: newStatus
      }));
  
      // Update database
      const response = await axios.post("/api/kitchen", {
        itemId: itemId,
        Kitchen: newStatus
      });
      
      // Refresh orders list
      const updatedOrders = await axios.get("/api/orders");
      setBillings(updatedOrders.data);
      
      console.log('Update successful:', response.data);
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    }
  };


  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="orders-list space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Kitchen</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {billings.map((billing) => (
            <div key={billing._id} className="card bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start mb-4 pb-3 border-b border-gray-100">
                <p className="text-lg font-bold text-gray-800">
                  Table: {billing.table} 
                  <span className="block text-sm text-gray-600 mt-1">{billing.name}</span>
                </p>
                <p className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                  {billing.createdAt ? new Date(billing.createdAt).toLocaleTimeString() : 'Date not available'}
                </p>
              </div>
              <ul className="space-y-3">
                {billing.items.map((item, index) => (
                  <li key={index} className="flex justify-between items-center py-2">
                    <span className="text-gray-700">{item.itemname} x {item.quantity}</span>
                    <button 
                      className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg 
                                hover:bg-gray-200 active:bg-gray-300 
                                transition-colors duration-150"
                      onClick={() => foodmaking(item._id)}
                    >
                      {item.Kitchen}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page;
