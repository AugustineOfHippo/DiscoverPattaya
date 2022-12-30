import { BigNumber } from 'ethers'
import React from 'react'
import { useState,useEffect } from 'react'

export default function UserComponent({activities,setLoggedUser,loggedUser,smtContract,signer,walletAddress}) {

    const [user,setUser] = useState({
        email:"",
        fullName:"",
        phoneNumber:""
        }
      ) 

      const [newActivity,setNewActivity] = useState([])


      const getBookedDays = async() => {
        setNewActivity([]);
        activities.map(item => {
            const bookedDate = new Date(BigNumber.from(item.timeBooked._hex).toNumber() * 1000).toString();
            const expiredDate = new Date(BigNumber.from(item.expiresDate._hex).toNumber() * 1000).toString();
        const newact = {
            name:item.name,
            whenBooked:bookedDate,
            whenExpires:expiredDate
        };
        setNewActivity(prevState => [...prevState,newact])
    })
    }      

    const handleUser = (e) => {
        setUser(prevState => ({
          ...prevState,
          [e.target.name]:e.target.value
        }))
      }

      const newUser = async() => {
        try {
          const contractSigner = smtContract.connect(signer);
          const resp = await contractSigner.newClient(walletAddress,user.email,user.fullName,user.phoneNumber);
        //   await getClientInfo();
          setLoggedUser({
            email:user.email,
            fullName:user.fullName,
            phoneNumber:user.phoneNumber
          })
        } catch (error) {
          console.log(error);
        }
      }

    useEffect(() => {
        setNewActivity([])
    },[walletAddress])

  return (
    <div className=' mt-2  rounded-md p-2 mx-auto text-center'>
        {
            loggedUser.email !== '' ? 
            <>
                <div className='bg-white p-2 rounded-md'>
                    <h1>Your Info</h1>
                    <h1>Email: {loggedUser.email}</h1> 
                    <h1>Name: {loggedUser.fullName}</h1> 
                    <h1>Phone: {loggedUser.phoneNumber}</h1> 
                </div> 
                <div className='text-black '>
                    <button
                        onClick={getBookedDays}
                      className='p-2 mt-2 rounded-md bg-orange-300'>View Your Activities</button>
                    <ul >
                        {newActivity !== '' ?
                         <>
                         {newActivity.map(item => (
                        <>
                        <div className='bg-white p-2 rounded-md mt-2'>
                            <li>{item.name} Diving</li>
                            <li>Booked on {item.whenBooked}</li>
                            <li>Expires on {item.whenExpires}</li>
                        </div>
                        </>
                    ))}
                         </> 
                         : 
                         <h1>You don't have anything booked!</h1> 
                         }
                    
                    </ul>
                </div>
            </>
            : 
            <div className='bg-white mx-auto mt-2  p-2 rounded-md flex flex-col gap-1 text-center'>
            <h1 className='text-center font-semibold'>Create an account </h1>
            <div className='flex flex-col'>
              <label>Email</label>
              <input
              onChange={handleUser}
              name="email" 
              className='p-1 rounded-md bg-orange-100 ml-0'/>
            </div>
            <div className='flex flex-col'>
              <label>Full Name</label>
              <input
              onChange={handleUser}
              name="fullName" 
              className='p-1 rounded-md  bg-orange-100 ml-0'/>
            </div>
            <div className='flex flex-col'>
              <label>Phone Number</label>
              <input
              onChange={handleUser}
              name="phoneNumber" 
              className='p-1 rounded-md  bg-orange-100 ml-0'/>
            </div>
            <button
            onClick={newUser}
             className=' bg-orange-300 p-2 rounded-md hover:bg-orange-400 mt-2'>Create Your Account</button>
        </div>
         }
    </div>
  )
}
