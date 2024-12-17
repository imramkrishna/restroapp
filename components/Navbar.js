"use client"
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

function Navbar() {
    const [dropdown, setDropdown] = useState(false);

    const profiledropdown = () => {
        setDropdown(!dropdown);
    };

    return (
        <>
            <nav>
                <div className='bg-slate-100 min-h-screen max-w-72 fixed'>
                    <div className="navcontent p-7">
                        {/* ==================Restro Pro logo setting=================== */}
                        <div className='font-bold px-7 text-4xl m-auto font-sans'>
                            <h1 className='font-extrabold'>Restro</h1>
                            <h2 className='px-12 text-green-500 text-3xl font-extrabold'>Pro</h2>
                        </div>

                        {/*====================Setting up profile with profile name and image================*/}
                        <div className='flex py-8'>
                            <div className="m-4 w-9">
                                <FontAwesomeIcon className='border-4 rounded-full h-10 w-9' icon={faUser} />
                            </div>
                            <span className='py-4'>UserName <br /> <span className='text-xs'>ADMIN</span></span>
                        </div>

                        {/*========================Dashboard, POS, Orders, Kitchen=========================*/}
                        <div className='mx-12 font-serif'>
                            <ul>
                                <Link href="/Home"><li className='my-5'>Dashboard</li></Link>
                                <Link href="/POS"><li className='my-5'>POS</li></Link>
                                <Link href="/Orders"><li className='my-5'>Orders</li></Link>
                                <Link href="/Kitchen"><li>Kitchen</li></Link>
                            </ul>
                        </div>
                    </div>
                    {/* =============================Offering========================== */}
                    <div className='mx-12 font-serif'>
                        <p className='font-bold'>Offerings</p>
                        <ul>
                            <Link href="/Reservations"><li className='my-5 mx-6'>Reservations</li></Link>
                            <Link href="/Customers"><li className='my-5 mx-6'>Customers</li></Link>
                            <Link href="/Invoices"><li className='my-5 mx-6'>Invoices</li></Link>
                        </ul>
                    </div>

                    {/* =============================BACK OFFICE========================== */}
                    <div className='mx-12 font-serif'>
                        <p className='font-bold'>Back Office</p>
                        <ul>
                            <Link href="/Feedbacks"><li className='my-5 mx-6'>Feedbacks</li></Link>
                            <Link href="/Users"><li className='my-5 mx-6'>Users</li></Link>
                            <Link href="/Reports"><li className='my-5 mx-6'>Reports</li></Link>
                            <Link href="/Settings"><li className='my-5 mx-6'>Settings</li></Link>
                        </ul>
                    </div>
                </div>

                {/* =============================HORIZONTAL NAVBAR========================== */}
                <div className="px-72 h-14 bg-white border-b-2 border-black flex justify-between">
                    <div className="search py-3">
                        <input className='rounded-full h-9 bg-slate-200 w-60' type="text" placeholder="     Search.." />
                    </div>
                    <div className="bg-slate-200 rounded-full h-12 my-1">
                        <div className="flex">
                            <FontAwesomeIcon className='border-4 rounded-full h-9 w-7' icon={faUser} />
                            <span className='py-3 px-1' onClick={profiledropdown}>
                                UserName
                                {dropdown && (
                                    <div className="dropdown-menu bg-white shadow-lg rounded-lg mt-2 absolute">
                                        <div className="dropdown-item px-4 py-2">Profile</div>
                                        <div className="dropdown-item px-4 py-2">My devices</div>
                                        <div className="dropdown-item px-4 py-2">Support</div>
                                        <div className="dropdown-item px-4 py-2">Logout</div>
                                    </div>
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
