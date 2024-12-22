"use client"
import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';

function page() {
  const [billings, setBillings] = useState([]);

  useEffect(()=>{
    const fetchBillings=async ()=>{
      try{
        const response =await axios.get("/api/orders")
        setBillings(response.data)
        console.log(`Data fetched successfully`);


      }catch(error){
        console.log("Error fetching data")
      }
    }
    fetchBillings();
  },[])

  return (
    <div>
      <div className="orders-list">
        <h1>Orders</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {billings.map((billing)=>(
            <div key={billing._id} className="card border rounded p-4 shadow"><div className="top flex justify-evenly">
              <p className="text-xl font-bold">Table: {billing.table} <span>{billing.name}</span></p>
              <p className="text-sm text-gray-500">
              {billing.createdAt ? new Date(billing.createdAt).toLocaleTimeString() : 'Date not available'}
            </p>
            </div>
              <ul>
                {billing.items.map((item,index)=>(
                  <li key={index}>
                    {item.itemname} x {item.quantity} = ${item.price * item.quantity}
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
