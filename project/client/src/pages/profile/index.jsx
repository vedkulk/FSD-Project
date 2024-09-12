import { useAppStore } from '@/store'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { colors, getColor } from '@/lib/utils';
import {FaTrash, FaPlus} from 'react-icons/fa'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { UPDATE_PROFILE_ROUTE } from '@/utils/constants';
import { useEffect } from 'react';

const Profile = () => {
  const navigate = useNavigate();
  const {userInfo, setUserInfo} = useAppStore()
  const [firstName, setFirstName] = useState(userInfo.firstName || "")
  const [lastName, setLastName] = useState(userInfo.lastName || "")
  const [selectedColor, setSelectedColor] = useState(userInfo.color || 0)
  const [image, setImage] = useState(null)
  const [hovered, setHovered] = useState(false)
  
  useEffect(() => {
    if(userInfo.profileSetup){
      setFirstName(userInfo.firstName)
      setLastName(userInfo.lastName)
      setSelectedColor(userInfo.color)
    }
  }, [userInfo])
  
  const validateProfile = () => {
    if(!firstName){
      toast.error("First name is required.")
      return false
    }
    if(!lastName){
      toast.error("Last name is required.")
      return false
    }
    return true
  }
  const saveChanges = async () => {
    if(validateProfile()){
      try {
        const response = await apiClient.post(UPDATE_PROFILE_ROUTE,
          {firstName, lastName, color:selectedColor},
          {withCredentials:true})
          if(response.status===200 && response.data){
            setUserInfo({...response.data})
            toast.success("Profile updated successfully")
            navigate("/chat")
            console.log({response});
          }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleNavigate = () => {
    if(userInfo.profileSetup){
      navigate("/chat")
    }
    else{
      toast.error("Please setup profile.")
    }
  }
  return (
        <div className="bg-[#1b1c24] min-h-screen flex items-center justify-center flex-col gap-10 p-4">
          <div className="flex flex-col gap-10 w-full max-w-3xl">
            <div>
              <IoArrowBack className="text-4xl lg:text-4xl text-white/90 cursor-pointer" onClick={handleNavigate} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className="relative flex items-center justify-center"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
              <Avatar className="w-32 h-32 md:w-48 md:h-48 overflow-hidden">
              {image ? (
                <AvatarImage src={image} alt="profile" className="object-cover w-full h-full bg-black" />
              ) : (
                <div className={`uppercase w-32 h-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>
                  {firstName ? firstName.charAt(0) : userInfo.email.charAt(0)}
                </div>
              )}
              </Avatar>
              {hovered && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer">
                  {image ? <FaTrash className="text-white text-3xl" /> : <FaPlus className="text-white text-3xl" />}
                </div>
              )}
            </div>
            <div className='flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center '>
                <div className='w-full'>
                  <Input placeholder="Email" type="email" disabled value={userInfo.email} className="rounded-lg p-6 bg-[#2c2e3b] border-none"></Input>
                </div>
                <div className='w-full'>
                  <Input placeholder="First Name" type="text" onChange={e=>setFirstName(e.target.value)}  value={userInfo.firstName} className="rounded-lg p-6 bg-[#2c2e3b] border-none"></Input>
                </div>
                <div className='w-full'>
                  <Input placeholder="Last Name" type="text" onChange={e=>setLastName(e.target.value)} value={userInfo.lastName} className="rounded-lg p-6 bg-[#2c2e3b] border-none"></Input>
                </div>
                <div className='w-full flex gap-5 '>
                  {colors.map((color,index) => <div className= {`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${selectedColor === index ? "outline outline-white/50 outline-1":""}`} key={index} onClick={()=>setSelectedColor(index)}></div>)}
                </div>
            </div>
          </div>
        <div className="w-full">
          <Button className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" onClick={saveChanges}>
                Save Changes
          </Button>
        </div>
        </div>
      </div>
      );
    };

export default Profile