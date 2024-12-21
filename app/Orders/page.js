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
            <div key={billing._id} className="card border rounded p-4 shadow">
              <h2 className="text-xl font-bold">Table: {billing.table}</h2>
              <ul>
                {billing.items.map((item,index)=>(
                  <li key={index}>
                    {item.name} x {item.quantity} = ${item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p className="font-bold">Total Price: ${billing.totalPrice}</p>
            </div>
          ))}
        </div>
      </div>

      
      
    </div>
  )
}

export default page;
