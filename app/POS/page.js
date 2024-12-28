"use client"
import React, { useState, useEffect } from 'react';
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

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('/api/menu');
        setMenuItems(res.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchMenu();
  }, []);



  return (
    <div className="p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Point of Sale
        </h1>
        <div className="flex flex-wrap gap-2 justify-center">
          <button className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200">
            New
          </button>
          <button className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200">
            QR menu Orders
          </button>
          <button className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200">
            Drafts List
          </button>
          <button className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200">
            Table Orders
          </button>
        </div>
      </div>

      <div className="point-of-sale space-y-6 lg:space-y-0 lg:flex lg:gap-6">
        {/* Menu Section */}
        <div className="w-full lg:w-1/2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <input 
              type="text" 
              placeholder="Search for items" 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
            {menuItems.map(item => (
              <div key={item._id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200">
                {item.itemImage && (
                  <img 
                    src={item.itemImage} 
                    alt={item.itemName}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{item.itemName}</h3>
                  <p className="text-gray-600 mb-3">${item.itemPrice}</p>
                  <button 
                    className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
                    onClick={() => additems(item.itemName, item.itemPrice)}
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*====================Setting up Billing Portion of pos section==============================*/}
        <div className="billing w-full lg:w-1/3 bg-white rounded-xl shadow-lg min-h-screen overflow-hidden">
          {/* Table Selection Section */}
          <div className="p-6 border-b border-gray-200 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <label className="text-sm font-medium text-gray-700" htmlFor="table">
                Select Table Number:
              </label>
              <select
                id="table"
                className="w-1/2 p-2.5 text-gray-700 bg-gray-50 border border-gray-300 
                          rounded-lg appearance-none cursor-pointer
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                          transition-all duration-200"
                value={table}
                onChange={(e) => setTable(e.target.value)}
              >
                {Object.keys(billings).map((tableKey) => (
                  <option key={tableKey} value={tableKey}>Table {tableKey}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <input
                className="flex-1 p-3 bg-gray-50 border border-gray-300 rounded-lg
                          placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="New Table Number"
                value={newTable}
                onChange={(e) => setNewTable(e.target.value)}
              />
              <button 
                className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg
                          hover:bg-blue-600 transition-colors shadow-sm"
                onClick={addTable}
              >
                Add
              </button>
            </div>
          </div>

          {/* Order Items Section */}
          <div className="flex-1 overflow-auto px-4 py-2">
            {billings[table].items.map((item, index) => (
              <div key={index} 
                className="flex items-center justify-between p-4 mb-3 bg-gray-50 
                          rounded-lg border border-gray-100 hover:shadow-md 
                          transition-all duration-200"
              >
                <div className="flex-1">
                  <p className="font-medium">{index + 1}. {item.name} x {billings[table].quantities[item.name]}</p>
                  <p className="text-gray-600">${item.price * billings[table].quantities[item.name]}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={() => incrementQuantity(item.name, item.price)}
                  >+</button>
                  <button 
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    onClick={() => decrementQuantity(item.name, item.price)}
                  >-</button>
                  <button 
                    className="p-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors"
                    onClick={() => deleteItem(item.name, item.price)}
                  >×</button>
                </div>
              </div>
            ))}
            <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200">
              <p className="text-xl font-bold text-right">Total: ${billings[table].totalPrice}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-200 p-4 space-y-3 bg-white">
            <div className="grid grid-cols-2 gap-3">
              <button className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Draft
              </button>
              <button 
                className="p-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={sendToKitchen}
              >
                Send to Kitchen
              </button>
            </div>
            <button 
              className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              onClick={generatePDF}
            >
              Create Receipt and Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
