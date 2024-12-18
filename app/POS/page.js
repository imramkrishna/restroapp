"use client"
import React from 'react'
import { useState } from 'react'
import jsPDF from 'jspdf';

function page() {
  const [customerType, setCustomerType] = useState('dine-in');
  const [table, setTable] = useState('Table No.1');
  const [items, setitems] = useState([]);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState({});
  const additems = (name, price) => {
    // Check if the item already exists in the items array
    const existingItem = items.find(item => item.name === name);

    if (existingItem) {
      // If the item exists, update the quantity and total price
      setQuantities({ ...quantities, [name]: quantities[name] + 1 });
      setTotalPrice(TotalPrice + price);
    } else {
      // If the item does not exist, add it to the items array and initialize its quantity
      setitems([...items, { name, price }]);
      setQuantities({ ...quantities, [name]: 1 });
      setTotalPrice(TotalPrice + price);
    }
  };
  
  const incrementQuantity = (name, price) => {
    setQuantities({ ...quantities, [name]: quantities[name] + 1 });
    setTotalPrice(TotalPrice + price);
  };

  const decrementQuantity = (name, price) => {
    if (quantities[name] > 1) {
      setQuantities({ ...quantities, [name]: quantities[name] - 1 });
      setTotalPrice(TotalPrice - price);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Bill Summary", 10, 10);
    items.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} x ${quantities[item.name]} = ${item.price * quantities[item.name]}`, 10, 20 + (index * 10));
    });
    doc.text(`Total Price: ${TotalPrice}`, 10, 20 + (items.length * 10));
    doc.save("bill.pdf");
  };

  return (
    <>

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

        <div className="menu w-1/2 min-h-screen border-2 border-e-slate-100 rounded-2xl  overflow-auto">
          <div className="searchbar">
            <input type="text" placeholder="Search for items" className="bg-slate-100 w-1/4 border-2 border-e-slate-300 rounded-2xl p-1 my-2 mx-2" />
          </div>
          {/**================Showing Items portion============================ */}
          <div className="items-portion flex flex-wrap">
            <div className="items w-5/12 border-2 border-e-slate-100 m rounded-3xl m-2 px-3">
              <p className='text-xl font-medium'>Tuffle Fries</p>
              <p className='my-1'>Price: 200</p>

              <button className='bg-green-500 rounded-xl p-2' onClick={() => additems("Tuffle Fries", 200)}>Add</button>

            </div>
            <div className="items w-5/12 border-2 border-e-slate-100 rounded-3xl m-2 px-3">
              <p className='text-xl font-medium'>Biryani</p>
              <p className='my-1'>Price: 200</p>

              <button className='bg-green-500 rounded-xl p-2 my-1' onClick={() => additems("Biryani", 200)}>Add</button>

            </div>
            <div className="items w-5/12 border-2 border-e-slate-100 rounded-3xl m-2 px-3">
              <p className='text-xl font-medium'>Biryani</p>
              <p className='my-1'>Price: 200</p>

              <button className='bg-green-500 rounded-xl p-2 my-1' onClick={() => additems("Biryani", 200)}>Add</button>

            </div>
            <div className="items w-5/12 border-2 border-e-slate-100 rounded-3xl m-2 px-3">
              <p className='text-xl font-medium'>Biryani</p>
              <p className='my-1'>Price: 200</p>

              <button className='bg-green-500 rounded-xl p-2 my-1' onClick={() => additems("Biryani", 200)}>Add</button>

            </div>


          </div>

        </div>
        {/*====================Setting up Billing Portion of pos section==============================*/}
        <div className="billing w-1/3 border-2 border-e-slate-100 rounded-2xl mx-2 min-h-screen overflow-auto">
          <div className="top-portion h-1/5 border-b-2 border-e-slate-100 flex-wrap">
            <input className='mx-6 my-2 border-2 border-e-slate-100 w-9/12 h-9 rounded-xl' type="text" value="Walking Customer" /><br />
            <label className='mx-6 my-2 py-2 border-2 border-e-slate-100 w-9/12 rounded-xl' htmlFor="customer-type"><span className='mx-3'>Select Dining option:</span></label>
            <select
              id="customer-type"
              className="ml-2 p-1 border rounded"
              value={customerType}
              onChange={(e) => setCustomerType(e.target.value)}
            >
              <option value="dine-in">Dine In</option>
              <option value="takeaway">Takeaway</option>
              <option value="delivery">Delivery</option>
            </select> <br /> <br />
            <label className='mx-6 py-2 border-2 border-e-slate-100 w-9/12 rounded-xl' htmlFor="table"><span className='mx-3'>Select Table:</span></label>
            <select
              id="table"
              className="border rounded-xl py-2"
              value={table}
              onChange={(e) => setTable(e.target.value)}
            >
              <option >Table No.1</option>
              <option >Table No.2</option>
              <option >Table No.3</option>
              <option >Table No.4</option>
              <option >Table No.5</option>
              <option >Table No.6</option>
            </select>


          </div>
          <div className="middle-portion h-4/6 overflow-auto">
            {items.map((item, index,) => (

              <div key={index} className="item flex justify-around my-3 border-2 h-1/6 border-e-slate-100">

                <p>{index + 1}.{item.name}x {quantities[item.name]}</p>
                <p>{item.price*quantities[item.name]}</p>
                <div className="flex justify-center mt-2">
                  <button className="h-9 mx-3 bg-blue-500 text-white rounded px-2" onClick={() => incrementQuantity(item.name, item.price)}>+</button>
                  <button className="h-9 mx-3 bg-red-500 text-white rounded px-2" onClick={()=>decrementQuantity(item.name, item.price)} >-</button>
                </div>
              </div>

            ))}
            <div className="total-price mt-auto">
              <p>Total Price:{TotalPrice}</p>
            </div>

          </div>

          <div className="bottom-portion h-1/6 border-t-2 border-e-slate-100">
            <div className="top flex">
              <button className="draft w-1/6 border-2 mx-2 border-e-slate-100 rounded-xl my-3">Draft</button>
              <button className="send-to-kitchen w-8/12 border-2 mx-2 border-e-slate-100 rounded-xl my-3">Send to Kitchen</button>
            </div>
            <div className="bottom w-4/5 mx-8 my-3 bg-green-500  text-center rounded-xl">
              <button className='receipt h-8' onClick={generatePDF}>Create Receipt and Pay</button>
            </div>

          </div>
        </div>


      </div>
    </>
  )
}

export default page;
