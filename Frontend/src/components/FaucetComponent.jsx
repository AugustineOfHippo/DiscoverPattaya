import React from 'react'

export default function FaucetComponent({requestFunds}) {
  return (
    <div className='mx-auto mt-2 bg-white p-2 rounded-md flex flex-col items-center'>
          <h1>How To Book ?</h1>
          <h1>1 - Connect Your Metamask Wallet & Register Your Account</h1>
          <h1>2 - Fill Your Wallet With Some SepoliaETH - <a href="https://faucet.sepolia.dev/" className='text-orange-400'>Sepolia Faucet</a></h1>
          <h1>3 - Click on "GET DPT's!" & Receive Your DPT Tokens</h1>
          <h1>4 - Book Your Scuba Dive! </h1>
          <button 
          onClick={requestFunds}
           className=' bg-orange-300 p-2 rounded-md hover:bg-orange-400'>Get DPT's!</button>
        </div>
  )
}
