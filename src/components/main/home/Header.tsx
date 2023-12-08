"use client"
import React, { useEffect, useState } from 'react'
import  Cookies  from 'universal-cookie';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { IoIosNotificationsOutline } from "react-icons/io";

  

const Header = () => {
  const cookies = new Cookies();
  const [name,setName] = useState('')
  const[url,setUrl] = useState('') 

  useEffect(() => {
    const storedAccessToken = cookies.get('accessToken');
    const storedRefreshToken = cookies.get('refreshToken');
    const displayName=cookies.get('displayName');
    const profileUrl=cookies.get('profilePhotoUrl');
    const userID = cookies.get('userID');
    if(!cookies.get('token') )
    {

    cookies.set("token",
    {
      accestoken:storedAccessToken,
      refreshtoken:storedRefreshToken,
      profile:{
        displayName:displayName,
        profilePhotoUrl:profileUrl,
        userID:userID
      }
    })

    }
  }, []);
  useEffect(()=>{
    const token = cookies.get('token');
    setName(token.profile.displayName)
    setUrl(token.profile.profilePhotoUrl)
  },[])

  return (
    <div className='p-3'>
        <div className='flex justify-between'>
            <div className='flex gap-3'>

            <Avatar>
      <AvatarImage src={`${url}`} alt="@shadcn" />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
    <div>
        <h1 className=' text-gray-500'>Hello {name}</h1>
        <h1 className='text-sm font-bold'>Ready to play?</h1>

    </div>
    

    </div>

    <div className='bg-gray-200 rounded-full p-1 w-10 h-10 flex items-center justify-center'>
  <IoIosNotificationsOutline size={24} />
</div>


            </div>



        
    </div>
  )
}

export default Header