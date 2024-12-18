"use client"
import React, { use, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

function Navbar() {
    const [dropdown, setDropdown] = useState(false);
    const [searchdropdown,setsearchdropdown]=useState(false);

    const profiledropdown = () => {
        setDropdown(!dropdown);
    };
    const finddropdown = () => {
        setsearchdropdown(!searchdropdown);
    };

    return (
        <>
            <nav>
                <div className='bg-slate-100 w-36 min-h-screen md:bg-slate-100 md:w-72 fixed'>
                    <div className="navcontent md:p-7">
                        {/* ==================Restro Pro logo setting=================== */}
                        <div className='md:font-bold md:px-7 text-4xl md:m-auto'>
                            <h1 className='md:font-extrabold'>Restro</h1>
                            <h2 className='md:px-12 text-green-500 text-3xl md:font-extrabold'>Pro</h2>
                        </div>

                        {/*====================Setting up profile with profile name and image================*/}
                        <div className='flex py-8'>
                            <div className="m-3 md:w-9">
                                <FontAwesomeIcon className='border-4 rounded-full h-10 w-9' icon={faUser} />
                            </div>
                            <span className='py-4 text-sm'>UserName <br /> <span className='text-xs'>ADMIN</span></span>
                        </div>

                        {/*========================Dashboard, POS, Orders, Kitchen=========================*/}
                        <div className='mx-6 md:mx-12 font-serif'>
                            <ul>
                                <Link href="/Home"><li className='my-5'>Dashboard</li></Link>
                                <Link href="/POS"><li className='my-5'>POS</li></Link>
                                <Link href="/Orders"><li className='my-5'>Orders</li></Link>
                                <Link href="/Kitchen"><li>Kitchen</li></Link>
                            </ul>
                        </div>
                    </div>
                    {/* =============================Offering========================== */}
                    <div className='md:mx-12 font-serif'>
                        <p className='font-bold'>Offerings</p>
                        <ul>
                            <Link href="/Reservations"><li className='my-5 mx-6'>Reservations</li></Link>
                            <Link href="/Customers"><li className='my-5 mx-6'>Customers</li></Link>
                            <Link href="/Invoices"><li className='my-5 mx-6'>Invoices</li></Link>
                        </ul>
                    </div>

                    {/* =============================BACK OFFICE========================== */}
                    <div className='md:mx-12 font-serif'>
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
                <div className="max-w-full mx-36 md:mx-72 h-14 bg-white border-b-2 border-e-white flex md:justify-between">
                    <div className="search py-3 mx-3" onClick={finddropdown}>
                        <input className='rounded-full h-9 bg-slate-200 w-60' type="text" placeholder="     Search.." value="   Search"/>
                        {searchdropdown && (
                                    <div className="dropdown-menu bg-white shadow-lg rounded-lg mt-2 absolute w-64">
                                        <div className="dropdown-item px-4 py-2">Dashboard</div>
                                        <div className="dropdown-item px-4 py-2">Kitchen</div>
                                        <div className="dropdown-item px-4 py-2">POS</div>
                                        <div className="dropdown-item px-4 py-2">Orders</div>
                                        <div className="dropdown-item px-4 py-2">Reservation</div>
                                        <div className="dropdown-item px-4 py-2">Customer</div>
                                        <div className="dropdown-item px-4 py-2">Invoices</div>
                                        <div className="dropdown-item px-4 py-2">Feedbacks</div>
                                    </div>
                                )}
                    </div>
                    <div className="bg-slate-200 rounded-full h-9 my-2">
                        <div className="flex">
                            <FontAwesomeIcon className='border-4 rounded-full h-6 w-6' icon={faUser} />
                            <span className='py-1 px-1' onClick={profiledropdown} >
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
