import React from 'react'

function page() {
    return (
        <>
            <h1 className='py-5 px-4 font-sans font-bold text-2xl max-w-72 mx-72'>Dashboard</h1>

            {/* ============================Setting up Reservation block=============================*/}

            <div className='mx-72 min-w-full flex'>

                <div className="reservation h-96 w-1/4 rounded-2xl border-2 ">
                    <h3 className='font-bold text-xl m-5'>Reservations</h3>
                    <ul className='m-8'>
                        <li className='text-xs'>Dec 18, 2024, 5:25AM</li>
                        <li className='font-extrabold'>John Doe- (1234567)</li>
                        <li className='text-sm'>4 people  Table A2</li>

                    </ul>
                    <ul className='m-8'>
                        <li className='text-xs'>Dec 18, 2024, 5:25AM</li>
                        <li className='font-extrabold'>John Doe- (1234567)</li>
                        <li className='text-sm'>4 people  Table A2</li>

                    </ul>
                    <ul className='m-8'>
                        <li className='text-xs'>Dec 18, 2024, 5:25AM</li>
                        <li className='font-extrabold'>John Doe- (1234567)</li>
                        <li className='text-sm'>4 people  Table A2</li>

                    </ul>


                </div>


                {/* ============================Setting up Top Selling Items block=============================*/}

                <div className="top-selling-items mx-6 h-96 w-1/4">

                    <div className="top-selling-items rounded-2xl border-2">
                        <h3 className='m-5 font-extrabold text-xl'>Top Selling Items</h3>
                        <div className="items flex justify-between mx-5">
                            <ul>
                                <li className=''>Pizza</li>
                                <li>$15</li>
                            </ul>
                            <ul>
                                <li className='my-2'>15</li>
                            </ul>
                        </div>


                        <div className="items flex justify-between m-5">
                            <ul>
                                <li>Burger</li>
                                <li>$10</li>
                            </ul>
                            <ul>
                                <li className='my-2'>15</li>
                            </ul>
                        </div>

                        <div className="items flex justify-between m-5">
                            <ul>
                                <li>Momo</li>
                                <li>$5</li>
                            </ul>
                            <ul>
                                <li className='my-2'>15</li>
                            </ul>
                        </div>

                        <div className="items flex justify-between m-5">
                            <ul>
                                <li>Sizzler</li>
                                <li>$9</li>
                            </ul>
                            <ul>
                                <li className='my-2'>15</li>
                            </ul>
                        </div>

                        <div className="items flex justify-between m-5">
                            <ul>
                                <li>Biryani</li>
                                <li>$18</li>
                            </ul>
                            <ul>
                                <li className='my-2'>15</li>
                            </ul>
                        </div>


                    </div>
                </div>




                <div className="details block h-96 w-1/4">
                    <div className="orders h-1/3 border-2 rounded-2xl">
                        <p className='mx-6 font-semibold my-4'>Orders</p>
                        <span className='mx-7 font-extrabold text-4xl'>18</span>
                        
                        
                    </div>
                    <div className="new-registered h-1/3 border-2 rounded-2xl my-3">
                        <p className='mx-6 font-semibold my-4'>New Registered Customers</p>
                        <span className='mx-7 font-extrabold text-4xl'>18</span>
                        

                    </div>
                    <div className="repeat h-1/3 border-2 rounded-2xl">
                        <p className='mx-6 font-semibold my-4'>Repeat Customers</p>
                        <span className='mx-7 font-extrabold text-4xl'>18</span>
                        
                    </div>
                </div>
            </div>
            <div className="reports mx-72 my-14 h-24 w-1/4 border-2 rounded-2xl">
                <p className='my-5 mx-3'>View More data in Reports </p>
            </div>

        </>
    )
}

export default page
