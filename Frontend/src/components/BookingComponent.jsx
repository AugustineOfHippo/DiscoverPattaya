import React from 'react'

export default function BookingComponent({bookDiving}) {
  return (
    <div className='mx-auto  bg-white p-2 rounded-md flex flex-col items-center w-1/6'>
            <h1>Scuba Diving 100 DPT</h1>
            <button
            onClick={bookDiving}
             className=' bg-orange-300 p-2 rounded-md hover:bg-orange-400'>Book a dive!</button>
        </div>
  )
}
