"use client"
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faX } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

function Navbar() {
    const [dropdown, setDropdown] = useState(false);
    const [searchdropdown, setsearchdropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const profiledropdown = () => {
        setDropdown(!dropdown);
    };
    const finddropdown = () => {
        setsearchdropdown(!searchdropdown);
    };

    return (
        <>
            {/* Mobile Menu Toggle */}
            <button 
                className="fixed top-4 left-4 z-50 md:hidden"
                onClick={toggleMobileMenu}
            >
                <FontAwesomeIcon 
                    icon={isMobileMenuOpen ? faX : faBars} 
                    className="h-6 w-6"
                />
            </button>

            <nav>
                <div className={`
                    bg-slate-100 fixed 
                    ${isMobileMenuOpen ? 'w-64' : 'w-0'} 
                    md:w-72 
                    min-h-screen 
                    transition-all duration-300 ease-in-out
                    overflow-hidden
                    z-40
                `}>
                    <div className="navcontent h-full overflow-y-auto md:p-7">
                        {/* Logo */}
                        <div className='md:font-bold px-7 text-3xl md:text-4xl mt-16 md:mt-0'>
                            <h1 className='font-extrabold'>Restro</h1>
                            <h2 className='px-12 text-green-500 text-2xl md:text-3xl font-extrabold'>Pro</h2>
                        </div>

                        {/* Profile */}
                        <div className='flex py-6 md:py-8 px-4'>
                            <div className="md:w-9">
                                <FontAwesomeIcon className='border-4 rounded-full h-8 w-8 md:h-10 md:w-9' icon={faUser} />
                            </div>
                            <span className='py-2 md:py-2 text-sm ml-2'>
                                UserName <br /> 
                                <span className='text-xs'>ADMIN</span>
                            </span>
                        </div>

                        {/* Navigation Items */}
                        <div className='px-4 md:px-12 font-serif'>
                            <ul className='space-y-2'>
                                <Link href="/Home">
                                    <li className='my-5 flex items-center text-lg font-medium hover:text-gray-800'>
                                        <Image 
                                            src="/dashboardIcon.svg" 
                                            alt="Dashboard" 
                                            width={24} 
                                            height={24}
                                            className="mr-3"
                                        />
                                        Dashboard
                                    </li>
                                </Link>
                                <Link href="/POS">
                                    <li className='my-5 flex items-center text-lg font-medium hover:text-gray-800'>
                                        <Image 
                                            src="/posIcon.svg" 
                                            alt="POS" 
                                            width={24} 
                                            height={24}
                                            className="mr-3"
                                        />
                                        POS
                                    </li>
                                </Link>
                                <Link href="/Orders">
                                    <li className='my-5 flex items-center text-lg font-medium hover:text-gray-800'>
                                        <Image 
                                            src="/ordersIcon.svg" 
                                            alt="Orders" 
                                            width={24} 
                                            height={24}
                                            className="mr-3"
                                        />
                                        Orders
                                    </li>
                                </Link>
                                <Link href="/Kitchen">
                                    <li className='my-5 flex items-center text-lg font-medium hover:text-gray-800'>
                                        <Image 
                                            src="/kitchenIcon.svg" 
                                            alt="Kitchen" 
                                            width={24} 
                                            height={24}
                                            className="mr-3"
                                        />
                                        Kitchen
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                    {/* =============================Offering========================== */}
                    <div className='md:mx-12 font-serif'>
                        <p className='font-bold text-xl mb-4'>Offerings</p>
                        <ul>
                            <Link href="/Reservations">
                                <li className='my-5 mx-6 flex items-center text-lg font-medium hover:text-gray-800'>
                                    <Image 
                                        src="/reservationIcon.svg" 
                                        alt="Reservations" 
                                        width={24} 
                                        height={24}
                                        className="mr-3"
                                    />
                                    Reservations
                                </li>
                            </Link>
                            <Link href="/Menu">
                                <li className='my-5 mx-6 flex items-center text-lg font-medium hover:text-gray-800'>
                                    <Image 
                                        src="/menuIcon.svg" 
                                        alt="Menu" 
                                        width={24} 
                                        height={24}
                                        className="mr-3"
                                    />
                                    Menu Items
                                </li>
                            </Link>
                            <Link href="/Invoices">
                                <li className='my-5 mx-6 flex items-center text-lg font-medium hover:text-gray-800'>
                                    <Image 
                                        src="/invoiceIcon.svg" 
                                        alt="Invoices" 
                                        width={24} 
                                        height={24}
                                        className="mr-3"
                                    />
                                    Invoices
                                </li>
                            </Link>
                        </ul>
                    </div>

                    {/* =============================BACK OFFICE========================== */}
                    <div className='md:mx-12 font-serif'>
                        <p className='font-bold text-xl mb-4'>Back Office</p>
                        <ul>
                            <Link href="/Reports">
                                <li className='my-5 mx-6 flex items-center text-lg font-medium hover:text-gray-800'>
                                    <Image 
                                        src="/reportIcon.svg" 
                                        alt="Reports" 
                                        width={24} 
                                        height={24}
                                        className="mr-3"
                                    />
                                    Reports
                                </li>
                            </Link>
                            <Link href="/Settings">
                                <li className='my-5 mx-6 flex items-center text-lg font-medium hover:text-gray-800'>
                                    <Image 
                                        src="/settingsIcon.svg" 
                                        alt="Settings" 
                                        width={24} 
                                        height={24}
                                        className="mr-3"
                                    />
                                    Settings
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>

                {/* Overlay for mobile menu */}
                {isMobileMenuOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                        onClick={toggleMobileMenu}
                    />
                )}

                {/* =============================HORIZONTAL NAVBAR========================== */}
                <div className="fixed top-0 right-0 w-[calc(100%-16rem)] md:w-[calc(100%-18rem)] h-16 
                                bg-white border-b border-gray-200 flex justify-between items-center 
                                px-4 md:px-6 lg:px-8 z-40">
                    {/* Hide search on mobile, show on md and up */}
                    <div className="search relative hidden md:flex flex-1 max-w-md" onClick={finddropdown}>
                        <input 
                            className="w-full h-10 pl-4 pr-10 bg-gray-50 border border-gray-200 
                                        rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                                        transition-all duration-200 placeholder-gray-400" 
                            type="text" 
                            placeholder="Search.." 
                            value="Search"
                        />
                        {searchdropdown && (
                            <div className="dropdown-menu absolute top-12 left-0 w-full bg-white 
                                            shadow-lg rounded-lg border border-gray-100 overflow-hidden z-50">
                                <Link href="/Home">
                                    <div className="dropdown-item px-4 py-2.5 hover:bg-gray-50 transition-colors">Dashboard</div>
                                </Link>
                                <Link href="/Kitchen">
                                    <div className="dropdown-item px-4 py-2.5 hover:bg-gray-50 transition-colors">Kitchen</div>
                                </Link>
                                <Link href="/POS">
                                    <div className="dropdown-item px-4 py-2.5 hover:bg-gray-50 transition-colors">POS</div>
                                </Link>
                                <Link href="/Orders">
                                    <div className="dropdown-item px-4 py-2.5 hover:bg-gray-50 transition-colors">Orders</div>
                                </Link>
                                <Link href="/Reservation">
                                    <div className="dropdown-item px-4 py-2.5 hover:bg-gray-50 transition-colors">Reservations</div>
                                </Link>
                                <Link href="/Menu">
                                    <div className="dropdown-item px-4 py-2.5 hover:bg-gray-50 transition-colors">Menu Items</div>
                                </Link>
                                <Link href="/Invoices">
                                    <div className="dropdown-item px-4 py-2.5 hover:bg-gray-50 transition-colors">Invoices</div>
                                </Link>
                                <Link href="/Feedbacks">
                                    <div className="dropdown-item px-4 py-2.5 hover:bg-gray-50 transition-colors">Feedbacks</div>
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="relative ml-4">
                        <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 
                                        hover:bg-gray-100 transition-colors cursor-pointer">
                            <FontAwesomeIcon 
                                className="h-6 w-6 rounded-full border-2 border-gray-300 p-1" 
                                icon={faUser} 
                            />
                            <span className="ml-2 font-medium" onClick={profiledropdown}>
                                UserName
                                {dropdown && (
                                    <div className="dropdown-menu absolute top-12 right-0 w-48 bg-white 
                                                    shadow-lg rounded-lg border border-gray-100 overflow-hidden z-50">
                                        <Link href="/Home">
                                            <div className="dropdown-item px-4 py-2.5 hover:bg-gray-50 transition-colors">Profile</div>
                                        </Link>
                                        <div className="dropdown-item px-4 py-2.5 hover:bg-gray-50 transition-colors">My devices</div>
                                        <div className="dropdown-item px-4 py-2.5 hover:bg-gray-50 transition-colors">Support</div>
                                        <div className="dropdown-item px-4 py-2.5 hover:bg-gray-50 transition-colors">Logout</div>
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
