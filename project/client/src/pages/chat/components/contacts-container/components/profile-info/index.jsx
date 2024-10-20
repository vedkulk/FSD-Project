import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { getColor } from '@/lib/utils'
import { useAppStore } from '@/store'
import { HOST } from '@/utils/constants'
import React from 'react'
import { FiEdit2 } from 'react-icons/fi'
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom'

const ProfileInfo = () => {
    const {userInfo} = useAppStore()
    const navigate = useNavigate()
  return (
    <div className='absolute bottom-0 h-16 flex items-center justify-between px-10 w-full
    bg-[#2a2b33]'>
        <div className="flex gap-3 items-center justify-between">
            <div className='w-12 h-12 relative'>
            <Avatar className="w-12 h-12 rounded-full overflow-hidden">
              {userInfo.image ? (
                <AvatarImage src={`${HOST}/${userInfo.image}`} alt="profile" className="object-cover w-full h-full bg-black" />
              ) : (
                <div className={`uppercase w-12 h-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(userInfo.color)}`}>
                  {userInfo.firstName ? userInfo.firstName.charAt(0) : userInfo.email.charAt(0)}
                </div>
              )}
              </Avatar>
            </div>
            <div>
                {
                    userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}`: ""
                }
            </div>
        </div>
        <div className='flex gap-5'>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                    <FiEdit2 
                        className={clsx(`text-${userInfo.color}-500`, 'text-xl font-medium')}
                        onClick={() => navigate('/profile')}
                    />
                    </TooltipTrigger>
                <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                    Edit Profile
                </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    </div>
  )
}

export default ProfileInfo