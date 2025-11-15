import React from 'react'

const FundPage = ({fund}) => {
  return (
    <div>
      <h1 className='my-10 text-3xl font-bold text-black'>{fund.amountForFund}</h1>
    </div>
  )
}

export default FundPage
