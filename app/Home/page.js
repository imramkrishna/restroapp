'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function page() {
    const [reservations, setReservations] = useState([]);
    const [ordersCount, setOrdersCount] = useState(0);
    const [topSellingItems, setTopSellingItems] = useState([]);

    useEffect(() => {
        fetchReservations();
        fetchOrdersCount();
        fetchTopSellingItems();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await axios.get('/api/reservations');
            setReservations(response.data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    const fetchOrdersCount = async () => {
        try {
            const response = await axios.get('/api/orders');
            setOrdersCount(response.data.length);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const fetchTopSellingItems = async () => {
        try {
            const response = await axios.get('/api/orders');
            const orders = response.data;
            
            // Calculate item sales
            const itemSales = {};
            orders.forEach(order => {
                order.items.forEach(item => {
                    if (!itemSales[item.itemname]) {
                        itemSales[item.itemname] = {
                            name: item.itemname,
                            quantity: 0,
                            price: item.price
                        };
                    }
                    itemSales[item.itemname].quantity += item.quantity;
                });
            });

            // Convert to array and sort by quantity
            const sortedItems = Object.values(itemSales)
                .sort((a, b) => b.quantity - a.quantity)
                .slice(0, 5); // Get top 5

            setTopSellingItems(sortedItems);
        } catch (error) {
            console.error('Error fetching top selling items:', error);
        }
    };

    return (
        <>
            <h1 className='font-sans font-bold text-2xl p-3'>Dashboard</h1>

            {/* ============================Setting up Reservation block=============================*/}

            <div className='flex flex-col min-w-full md:flex-row md:max-w-md md:mx-5'>

                <div className="reservation overflow-auto md:h-96 md:w-1/4 rounded-2xl border-2">
                    <h3 className='font-bold text-xl p-2'>Reservations</h3>
                    {reservations.map((reservation) => (
                        <ul key={reservation._id} className='md:m-8'>
                            <li className='text-xs'>
                                {new Date(reservation.date).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true
                                })}
                            </li>
                            <li className='font-extrabold'>
                                {reservation.customerName} - ({reservation.phoneNumber})
                            </li>
                            <li className='text-sm'>
                                {reservation.personCount} people Table {reservation.tableNumber}
                            </li>
                        </ul>
                    ))}
                </div>


                {/* ============================Setting up Top Selling Items block=============================*/}



                <div className="top-selling-items rounded-2xl border-2 overflow-auto md:w-1/4 md:h-96 md:mx-10 md:">
                    <h3 className='md:m-5 font-extrabold text-xl'>Top Selling Items</h3>
                    {topSellingItems.map((item, index) => (
                        <div key={index} className="items flex justify-between m-5">
                            <ul>
                                <li>{item.name}</li>  
                                <li>${item.price}</li>
                            </ul>
                            <ul>
                                <li className='my-2'>{item.quantity}</li>
                            </ul>
                        </div>
                    ))}
                </div>


                {/* ======================Setting up orders,new registered customers and Repeat Customers==============*/}




                <div className="details block h-96 md:w-1/4">
                    <div className="orders h-1/3 border-2 rounded-2xl">
                        <p className='md:mx-6 font-semibold md:my-4'>Orders</p>
                        <span className='md:mx-7 font-extrabold text-4xl'>{ordersCount}</span>


                    </div>
                    <div className="orders h-1/3 border-2 rounded-2xl md:my-3">
                        <p className='md:mx-6 font-semibold md:my-5'>New Registered Customers</p>
                        <span className='md:mx-7 font-extrabold text-4xl'>18</span>


                    </div>
                    <div className="orders h-1/3 border-2 rounded-2xl">
                        <p className='md:mx-6 font-semibold md:my-4'>Repeat Customers</p>
                        <span className='md:mx-7 font-extrabold text-4xl'>18</span>


                    </div>

                </div>
            </div>

            {/* ============================Setting up Reports block=============================*/}


            <div className="reports my-14 h-24 w-1/4 border-2 rounded-2xl mx-7">
                <p className='my-5 mx-3'>View More data in Reports </p>
            </div>

        </>
    )
}

export default page
