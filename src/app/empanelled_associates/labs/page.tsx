import React from 'react'
import Empanelled from "../../components/Empanelled"
import Navbar from '@/app/components/Navbar';

const getData = async () => {
    const res = await fetch(
        'https://crowdshaki.vercel.app/api/labs',
        { cache: "no-store" }
    );
    if (!res.ok) {
        throw new Error("Something Went Wrong");
    }
    return res.json();
};

const page = async () => {
    const labs = await getData();
    return (
        <div>
            <Navbar></Navbar>
            <div className='p-4 lg:p-8 space-y-6'>
            <h1 className='text-3xl font-semibold text-center'>Labs</h1>
            <Empanelled data={labs.labs} />
            </div>
        </div>
    )
}

export default page
