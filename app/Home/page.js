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
        <div className="p-4 md:p-6 lg:p-8">
            <h1 className='text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6'>Dashboard</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                {/* Reservations Section */}
                <div className="bg-white rounded-lg shadow-sm p-4 h-[400px] md:h-[500px] overflow-auto">
                    <h3 className='text-lg md:text-xl font-bold mb-4'>Reservations</h3>
                    <div className="space-y-4">
                        {reservations.map((reservation) => (
                            <div key={reservation._id} className='p-3 bg-gray-50 rounded-lg'>
                                <p className='text-xs text-gray-500'>
                                    {new Date(reservation.date).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true
                                    })}
                                </p>
                                <p className='font-semibold'>{reservation.customerName}</p>
                                <p className='text-sm text-gray-600'>
                                    {reservation.personCount} people • Table {reservation.tableNumber}
                                </p>
                                <p className='text-sm text-gray-600'>{reservation.phoneNumber}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Selling Items Section */}
                <div className="bg-white rounded-lg shadow-sm p-4 h-[400px] md:h-[500px] overflow-auto">
                    <h3 className='text-lg md:text-xl font-bold mb-4'>Top Selling Items</h3>
                    <div className="space-y-4">
                        {topSellingItems.map((item, index) => (
                            <div key={index} className='p-3 bg-gray-50 rounded-lg flex justify-between items-center'>
                                <div>
                                    <p className='font-semibold'>{item.name}</p>
                                    <p className='text-sm text-gray-600'>${item.price}</p>
                                </div>
                                <div className='text-lg font-semibold text-green-600'>
                                    {item.quantity}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Section */}
                <div className="space-y-4">
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <p className='text-gray-600'>Pending Orders</p>
                        <p className='text-2xl md:text-3xl font-bold'>{ordersCount}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <p className='text-gray-600'>Completed Orders</p>
                        <p className='text-2xl md:text-3xl font-bold'>{ordersCount}</p>
                    </div>
                    {/* Add more stats cards as needed */}
                </div>
            </div>
        </div>
    );
}

export default page
