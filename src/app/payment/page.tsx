"use client"
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Image from 'next/image';

const Page = () => {
    const [amount, setAmount] = useState('');
    const [buyerName, setBuyerName] = useState('');
    const [buyerEmail, setBuyerEmail] = useState('');
    const [buyerPhone, setBuyerPhone] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <Navbar />
            <div className='mx-auto max-w-fit p-4 flex flex-col gap-8'>
                <div className='flex flex-col gap-8 lg:flex-row'>
                    <div className='lg:order-1'>
                        <h1 className='font-medium'>You are supporting a family of 5 lost everything in house fire</h1>
                        <p>Your donation will benefit ARIANA</p>
                    </div>
                    <div className='lg:flex'>
                        <Image
                            src="/assets/art2.jpg"
                            width={1000}
                            height={700}
                            alt="item"
                            className="lg:w-[300px] lg:h-[300px] object-cover rounded-br-none rounded-bl-none rounded-3xl"
                        />
                    </div>
                </div>

                <div className='flex flex-col gap-8'>
                    <label className="block">
                        <span className="text-xl">Enter Your Donation</span>
                        <div className="relative mt-2">
                            {/* Rupee symbol */}
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xl">
                                ₹
                            </span>
                            <input
                                type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                className="my-4 text-xl block w-full border-2 rounded-[6px] border-gray-300 pl-8 pr-12 py-4 sm:text-[20px]"
                            />
                        </div>
                    </label>

                    <label className="block">
                        <span className="text-xl">Your Name</span>
                        <input
                            type="text"
                            value={buyerName}
                            onChange={(e) => setBuyerName(e.target.value)}
                            className="my-4 text-xl block w-full border-2 rounded-[6px] border-gray-300 p-4 sm:text-[20px]"
                        />
                    </label>

                    <label className="block">
                        <span className="text-xl">Your Email</span>
                        <input
                            type="email"
                            value={buyerEmail}
                            onChange={(e) => setBuyerEmail(e.target.value)}
                            className="my-4 text-xl block w-full border-2 rounded-[6px] border-gray-300 p-4 sm:text-[20px]"
                        />
                    </label>

                    <label className="block">
                        <span className="text-xl">Your Phone</span>
                        <input
                            type="tel"
                            value={buyerPhone}
                            onChange={(e) => setBuyerPhone(e.target.value)}
                            className="my-4 text-xl block w-full border-2 rounded-[6px] border-gray-300 p-4 sm:text-[20px]"
                        />
                    </label>
                </div>

                <button
                    className='py-10 bg-teal-100 text-xl font-semibold'
                >
                    {loading ? 'Processing...' : 'Donate Now'}
                </button>
            </div>
        </div>
    );
};

export default Page;