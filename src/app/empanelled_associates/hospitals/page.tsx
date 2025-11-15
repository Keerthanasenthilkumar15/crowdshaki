import React from 'react'
import Empanelled from "../../components/Empanelled"
import Navbar from '@/app/components/Navbar';

const getData = async () => {
    const res = await fetch(
        // 'https://crowdshaki.vercel.com/api/hospitals',
        'https://crowdshaki.vercel.app/api/hospitals',
        { cache: "no-store" }
    );
    if (!res.ok) {
        throw new Error("Something Went Wrong");
    }
    return res.json();
};

const page = async () => {
    const hospitals = await getData();
    console.log("Hospitals", hospitals);
    return (
        <div>
            <Navbar></Navbar>
            <div className='p-4 lg:p-8 space-y-6'>
                <h1 className='text-3xl font-semibold text-center'>Hospitals</h1>
                <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
                    {
                        hospitals.hospitals.map((hospital: any, index: any) => (
                            <div className='text-black p-2 lg:p-8' key={index}>
                                <div className='p-6 shadow-lg rounded-lg space-y-2'>
                                    <h1><span className='font-semibold'>Hospital Name: </span>{hospital['hospitalName']}</h1>
                                    <p><span className='font-semibold'>Contact: </span>{hospital.primaryContactNumber}</p>
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
