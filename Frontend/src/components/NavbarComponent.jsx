import React from 'react'
import { useState } from 'react'
import { BigNumber, ethers } from "ethers";

export default function NavbarComponent({connectWallet,walletAddress,getClientInfo}) {


  return (
    <div className='bg-white text-white p-2 flex items-center justify-between sticky top-0'>
      <span className='text-orange-400 LogoFont text-2xl'>Discover Pattaya</span>
      <button
      onClick={connectWallet}
       className='text-orange-400 px-4 py-1 rounded-xl border border-orange-300'>{walletAddress ? 'Connected' : 'Connect' }</button>
      </div>
  )
}
