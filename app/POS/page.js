"use client"
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import axios from 'axios';



function Page() {

  const [customer, setCustomer] = useState('');
  const [phone, setPhone] = useState('');
  const [table, setTable] = useState('1');
  const [billings, setBillings] = useState({
    'Delivery': { items: [], quantities: {}, totalPrice: 0 },
    '1': { items: [], quantities: {}, totalPrice: 0 },
    '2': { items: [], quantities: {}, totalPrice: 0 },
    '3': { items: [], quantities: {}, totalPrice: 0 },
    '4': { items: [], quantities: {}, totalPrice: 0 },
    '5': { items: [], quantities: {}, totalPrice: 0 },
    '6': { items: [], quantities: {}, totalPrice: 0 },
  });

  const [newTable, setNewTable] = useState('');
  const addTable = () => {
    if (newTable && !billings[newTable]) {
      setBillings({
        ...billings,
        [newTable]: { items: [], quantities: {}, totalPrice: 0 },
      });
      setNewTable('');
    }
  };

  const additems = (name, price) => {
    const tableBilling = billings[table];
    const existingItem = tableBilling.items.find(item => item.name === name);

    if (existingItem) {
      const newQuantities = { ...tableBilling.quantities, [name]: tableBilling.quantities[name] + 1 };
      setBillings({
        ...billings,
        [table]: {
          ...tableBilling,
          quantities: newQuantities,
          totalPrice: tableBilling.totalPrice + price,
        },
      });
    } else {
      const newItems = [...tableBilling.items, { name, price }];
      const newQuantities = { ...tableBilling.quantities, [name]: 1 };
      setBillings({
        ...billings,
        [table]: {
          ...tableBilling,
          items: newItems,
          quantities: newQuantities,
          totalPrice: tableBilling.totalPrice + price,
        },
      });
    }
  };

  const incrementQuantity = (name, price) => {
    const tableBilling = billings[table];
    const newQuantities = { ...tableBilling.quantities, [name]: tableBilling.quantities[name] + 1 };
    setBillings({
      ...billings,
      [table]: {
        ...tableBilling,
        quantities: newQuantities,
        totalPrice: tableBilling.totalPrice + price,
      },
    });
  };

  const decrementQuantity = (name, price) => {
    const tableBilling = billings[table];
    if (tableBilling.quantities[name] > 1) {
      const newQuantities = { ...tableBilling.quantities, [name]: tableBilling.quantities[name] - 1 };
      setBillings({
        ...billings,
        [table]: {
          ...tableBilling,
          quantities: newQuantities,
          totalPrice: tableBilling.totalPrice - price,
        },
      });
    }
  };

  const deleteItem = (name, price) => {
    const tableBilling = billings[table];
    const newItems = tableBilling.items.filter(item => item.name !== name);
    const itemQuantity = tableBilling.quantities[name];
    const newQuantities = { ...tableBilling.quantities };
    delete newQuantities[name];
    setBillings({
      ...billings,
      [table]: {
        ...tableBilling,
        items: newItems,
        quantities: newQuantities,
        totalPrice: tableBilling.totalPrice - (price * itemQuantity),
      },
    });
  };

  const generatePDF = () => {
    const tableBilling = billings[table];
    if (tableBilling.items.length === 0) {
      alert("Please add items to the bill before generating the receipt.");
      return;
    }

    const doc = new jsPDF();
    doc.text(`Bill Summary for Table No.${table}`, 10, 10);
    tableBilling.items.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} x ${tableBilling.quantities[item.name]} = ${item.price * tableBilling.quantities[item.name]}`, 10, 20 + (index * 10));
    });
    doc.text(`Total Price: ${tableBilling.totalPrice}`, 10, 20 + (tableBilling.items.length * 10));
    doc.save("bill.pdf");
  };

  const sendToKitchen = async () => {
    const tableBilling = billings[table];
    try {
      const response = await axios.post('/api/orders', {
        table,
        name:customer,
        phone,
        items: tableBilling.items.map(item => ({
          itemname: item.name,
          price: item.price,
          quantity: tableBilling.quantities[item.name],
        })),
        totalPrice: tableBilling.totalPrice,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('Response:', response.data); // Add logging
      alert('Billing data sent to kitchen successfully!');
    } catch (error) {
      console.error('Error details:', error.response); // Add detailed error logging
      alert('Failed to send billing data to kitchen.');
    }
  };



  return (
    <div>
      {/*====================Setting up top titles of pos section==============================*/}
      <div className="top-portion flex justify-between">
        <div className="left font-bold text-xl mx-3">
          <p>Point of Sale</p>
        </div>
        <div className="right m-auto">
          <button className='border-2 mx-2 rounded-md bg-slate-100 px-1'>New</button>
          <button className='border-2 mx-2 rounded-md bg-slate-100 px-1'>QR menu Orders</button>
          <button className='border-2 mx-2 rounded-md bg-slate-100 px-1'>Drafts List</button>
          <button className='border-2 mx-2 rounded-md bg-slate-100 px-1'>Table Orders</button>
        </div>
      </div>

      <div className='point-of-sale m-4 flex'>
        {/*====================Setting up menu showing of pos section==============================*/}
        <div className="menu w-1/2 border-2 border-e-slate-100 rounded-2xl overflow-auto">
          <div className="searchbar">
            <input type="text" placeholder="Search for items" className="bg-slate-100 w-1/4 border-2 border-e-slate-300 rounded-2xl p-1 my-2 mx-2" />
          </div>
          {/**================Showing Items portion============================ */}
          <div className="items-portion flex flex-wrap">
            <div className="items w-5/12 border-2 border-e-slate-100 rounded-3xl m-2 px-3">
              <p className='text-xl font-medium'>Tuffle Fries</p>
              <p className='my-1'>Price: 200</p>
              <button className='bg-green-500 rounded-xl p-2' onClick={() => additems('Tuffle Fries', 200)}>Add</button>
            </div>
            <div className="items w-5/12 border-2 border-e-slate-100 rounded-3xl m-2 px-3">
              <p className='text-xl font-medium'>Biryani</p>
              <p className='my-1'>Price: 200</p>
              <button className='bg-green-500 rounded-xl p-2 my-1' onClick={() => additems('Biryani', 200)}>Add</button>
            </div>
            <div className="items w-5/12 border-2 border-e-slate-100 rounded-3xl m-2 px-3">
              <p className='text-xl font-medium'>Pizzaa</p>
              <p className='my-1'>Price: 300</p>
              <button className='bg-green-500 rounded-xl p-2 my-1' onClick={() => additems('Pizza', 300)}>Add</button>
            </div>
            <div className="items w-5/12 border-2 border-e-slate-100 rounded-3xl m-2 px-3">
              <p className='text-xl font-medium'>Coffee</p>
              <p className='my-1'>Price: 250</p>
              <button className='bg-green-500 rounded-xl p-2 my-1' onClick={() => additems('Coffee', 250)}>Add</button>
            </div>
          </div>
        </div>

        {/*====================Setting up Billing Portion of pos section==============================*/}
        <div className="billing w-1/3 border-2 border-e-slate-100 rounded-2xl mx-2 min-h-screen overflow-auto">
          <div className="top-portion h-1/4 border-b-2 border-e-slate-100 my-6 text-sm flex flex-col items-center justify-center space-y-4">
            <div className="flex flex-row w-full h-1/6">
              <label className='my-1' htmlFor="table">
                Select Table Number: 
              </label>
              <select
                id="table"
                className="border rounded-xl px-2 w-1/4 h-3/4"
                value={table}
                onChange={(e) => setTable(e.target.value)}
              >
                {Object.keys(billings).map((tableKey) => (
                  <option key={tableKey} value={tableKey}>{tableKey}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-full m-auto">
              <label htmlFor="name">Customer's Name:</label>
              <input
                className="rounded-xl border p-2 w-11/12 m-auto"
                type="text"
                placeholder="Customer's Name"
                id="name"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col w-full m-auto">
              <label htmlFor="phone">Customer's Phone:</label>
              <input
                className="rounded-xl border p-2 w-11/12 m-auto"
                type="text"
                placeholder="Customer's Phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}

              />
            </div>

            <div className="add-table flex flex-row w-full m-auto">
              <input
                className="rounded-xl border p-1 w-3/4"
                type="text"
                placeholder="New Table Number"
                value={newTable}
                onChange={(e) => setNewTable(e.target.value)}
              />
              <button className="ml-2 bg-blue-500 text-white rounded px-2" onClick={addTable}>Add Table</button>
            </div>
          </div>

          <div className="middle-portion h-4/6 overflow-auto flex flex-col">
            {billings[table].items.map((item, index) => (
              <div key={index} className="item flex justify-around my-3 border-2 h-1/6 border-e-slate-100 p-3">
                <div><p>{index + 1}. {item.name} x {billings[table].quantities[item.name]}</p></div>
                <div><p>{item.price * billings[table].quantities[item.name]}</p></div>
                <div className="justify-center mt-2">
                  <button className="h-7 mx-3 bg-blue-500 text-white rounded px-2" onClick={() => incrementQuantity(item.name, item.price)}>+</button>
                  <button className="h-7 mx-3 bg-red-500 text-white rounded px-2" onClick={() => decrementQuantity(item.name, item.price)}>-</button>
                  <button className="h-7 mx-3 bg-red-700 text-white rounded px-2" onClick={() => deleteItem(item.name, item.price)}>Remove</button>
                </div>
              </div>
            ))}
            <div className="total-price mt-auto">
              <p>Total Price: ${billings[table].totalPrice}</p>
            </div>
          </div>
          <div className="bottom-portion h-1/6 border-t-2 border-e-slate-100">
            <div className="top flex justify-between">
              <button className="draft w-1/6 border-2 mx-2 border-e-slate-100 rounded-xl my-3">Draft</button>
              <button className="send-to-kitchen w-8/12 border-2 mx-2 border-e-slate-100 rounded-xl my-3" onClick={sendToKitchen} >Send to Kitchen</button>
            </div>
            <div className="bottom w-4/5 mx-8 my-3 bg-green-500 text-center rounded-xl">
              <button className='receipt h-8' onClick={generatePDF}>Create Receipt and Pay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
