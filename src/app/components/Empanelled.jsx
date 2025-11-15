import React from 'react'

const Empanelled = ({data}) => {
  return (
    <>
    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
        {
          data.map((lab, index) => (
            <div className='text-black p-2 lg:p-8' key={index}>
                <div className='p-6 shadow-lg rounded-lg space-y-2'>
                    <h1 className='font-semibold text-wrap'>{lab['labName']}</h1>
                    <h2><span className='font-semibold'>Owner: </span>{lab['ownerName']}</h2>
                    <p className='text-wrap'><span className='font-semibold'>Address: </span> {lab.address}</p>
                    <p><span className='font-semibold'>Contact: </span>{lab.mobile}</p>
                </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Empanelled
