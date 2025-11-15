import React from 'react'
import Empanelled from "../../components/Empanelled"
import Navbar from '@/app/components/Navbar';

const getData = async () => {
    const res = await fetch(
        // 'https://crowdshaki.vercel.com/api/pharmacies',
        'https://crowdshaki.vercel.app/api/pharmacies',
        { cache: "no-store" }
    );
    if (!res.ok) {
        throw new Error("Something Went Wrong");
    }
    return res.json();
};

const page = async () => {
    const pharmacies = await getData();
    return (
        <div>
            <Navbar></Navbar>
            <div className='p-4 lg:p-8 space-y-6'>
                <h1 className='text-3xl font-semibold text-center'>Pharmacies</h1>
                <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
                    {
                        pharmacies.pharmacies.map((pharmacy: any, index: any) => (
                            <div className='text-black p-2 lg:p-8' key={index}>
                                <div className='p-6 shadow-lg rounded-lg space-y-2'>
                                    <h1><span className='font-semibold'>Pharmacy Name: </span>{pharmacy['pharmacyName']}</h1>
                                    <p><span className='font-semibold'>Contact: </span>{pharmacy.mobile}</p>
                                    <p><span className='font-semibold'>Email: </span>{pharmacy.email}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default page
