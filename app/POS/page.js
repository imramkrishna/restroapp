import React from 'react'

function page() {
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
          <input type="text" placeholder="Search for items" className="bg-slate-100 w-1/4 border-2 border-e-slate-300 rounded-2xl p-1 my-2 mx-2"/>
        </div>
        {/**================Showing Items portion============================ */}
        <div className="items-portion flex flex-wrap">
          <div className="items w-5/12 border-2 border-e-slate-100 m rounded-3xl m-2 px-3">
          <p className='text-xl font-medium'>Tuffle Fries</p>
          <p className='my-1'>Price: 200</p>

          <button className='bg-green-500 rounded-xl p-2'>Add</button>
        
          </div>
          <div className="items w-5/12 border-2 border-e-slate-100 rounded-3xl m-2 px-3">
          <p className='text-xl font-medium'>Biryani</p>
          <p className='my-1'>Price: 200</p>

          <button className='bg-green-500 rounded-xl p-2 my-1'>Add</button>
        
          </div>
          <div className="items w-5/12 border-2 border-e-slate-100 rounded-3xl m-2 px-3">
          <p className='text-xl font-medium'>Biryani</p>
          <p className='my-1'>Price: 200</p>

          <button className='bg-green-500 rounded-xl p-2 my-1'>Add</button>
        
          </div>
          <div className="items w-5/12 border-2 border-e-slate-100 rounded-3xl m-2 px-3">
          <p className='text-xl font-medium'>Biryani</p>
          <p className='my-1'>Price: 200</p>

          <button className='bg-green-500 rounded-xl p-2 my-1'>Add</button>
        
          </div>


        </div>

        </div>
        {/*====================Setting up Billing Portion of pos section==============================*/}
        <div className="billing w-1/3 border-2 border-e-slate-100 rounded-2xl mx-2 min-h-screen overflow-auto">
           <div className="top-portion h-1/5 border-b-2 border-e-slate-100 flex-wrap">
           <input className='mx-6 my-2 border-2 border-e-slate-100 w-9/12 h-9 rounded-xl' type="text" value="Walking Customer" /><br />
           <label className='mx-6 my-2 py-2 border-2 border-e-slate-100 w-9/12 rounded-xl' htmlFor="customer-type"><span className='mx-3'>Select Dining option:</span></label>
           <select id="customer-type" className="border rounded-xl  py-2">
              <option value="dine-in">Dine In</option>
              <option value="takeaway">Takeaway</option>
              <option value="delivery">Delivery</option>
            </select> <br /> <br />
            <label className='mx-6 py-2 border-2 border-e-slate-100 w-9/12 rounded-xl' htmlFor="table"><span className='mx-3'>Select Table:</span></label>
           <select id="table" className="border rounded-xl  py-2">
              <option >Table No.1</option>
              <option >Table No.1</option>
              <option >Table No.1</option>
              <option >Table No.1</option>
              <option >Table No.1</option>
              <option >Table No.1</option>
            </select>


           </div>
           <div className="middle-portion h-4/6">

           </div>

           <div className="bottom-portion h-1/6 border-t-2 border-e-slate-100">
           <div className="top flex">
           <button className="draft w-1/6 border-2 mx-2 border-e-slate-100 rounded-xl my-3">Draft</button>
           <button className="send-to-kitchen w-8/12 border-2 mx-2 border-e-slate-100 rounded-xl my-3">Send to Kitchen</button>
           </div>
           <div className="bottom w-4/5 mx-8 my-3 bg-green-500  text-center rounded-xl">
            <button className='receipt h-8'>Create Receipt and Pay</button>
           </div>
           
           </div>
        </div>


    </div>
    </>
  )
}

export default page;
