import React, { useState } from 'react'
import { animationDefaultOptions } from '@/lib/utils'
import Lottie from 'react-lottie'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import {
Dialog,
DialogContent,
DialogDescription,
DialogHeader,
DialogTitle,
} from "@/components/ui/dialog"
  
import { FaPlus } from 'react-icons/fa'
import { Input } from '@/components/ui/input'
  
const NewDM = () => {
    const [openNewContactModal, setOpenNewContactModal] = useState(false)
    const [searchedContacts, setSearchedContacts] = useState([])
    const searchContacts = async (searchTerm) => {

    }
    return (
    <>
        <TooltipProvider>
            <Tooltip>
            <TooltipTrigger>
                <FaPlus
                    className='text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100
                        cursor-pointer transition-all duration-300 '
                    onClick={()=>setOpenNewContactModal(true)}
                />
            </TooltipTrigger>
            <TooltipContent
                className="bg-[#1b1c1e] border-none mb-2 p-3 text-white"
            >
                Select new contacts
            </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
            <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
                <DialogHeader>
                <DialogTitle>Please select a contact</DialogTitle>
                </DialogHeader>
                <div>
                    <Input placeholder="Search contacts" className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                        onChange={(e)=>setOpenNewContactModal(e.target.value)}
                    />
                </div>
                {
                    searchedContacts.length<=0 && <div>
                        <div className="flex-1 md:bg-[#181920] md:flex flex-col justify-center items-center hidden duration-1000 transition-all mt-10">
                            <Lottie
                                isClickToPauseDisabled={true}
                                height={100}
                                width={100}
                                options={animationDefaultOptions}
                            />
                                <div className='text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center'>
                                <h3 className='poppins-medium'>
                                    Hi! Welcome to chat<span className='text-red-500'>MIT</span>
                                </h3>
                                </div>
                            </div>
                    </div>
                }
            </DialogContent>
        </Dialog>
    </>
  )
}

export default NewDM