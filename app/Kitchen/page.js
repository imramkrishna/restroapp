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
    <div>
      <div className="orders-list">
        <h1>Kitchen</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {billings.map((billing) => (
            <div key={billing._id} className="card border rounded p-4 shadow"><div className="top flex justify-evenly">
              <p className="text-xl font-bold">Table: {billing.table} <span>{billing.name}</span></p>
              <p className="text-sm text-gray-500">
                {billing.createdAt ? new Date(billing.createdAt).toLocaleTimeString() : 'Date not available'}
              </p>
            </div>
              <ul>
                {billing.items.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{item.itemname} x {item.quantity}</span>
                    <button className="bg-slate-200 text-black rounded-xl m-1 p-1" onClick={() => foodmaking(item._id)}>{item.Kitchen}</button>
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
