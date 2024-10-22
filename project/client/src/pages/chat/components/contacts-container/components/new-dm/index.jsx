import React, { useState, useEffect } from 'react'
import { animationDefaultOptions, getColor } from '@/lib/utils'
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
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { FaPlus } from 'react-icons/fa'
import { Input } from '@/components/ui/input'
import { apiClient } from '@/lib/api-client'
import { HOST, SEARCH_CONTACT_ROUTES } from '@/utils/constants'  
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useAppStore } from '@/store'

const NewDM = () => {
    const { setSelectedChatType, setSelectedChatData } = useAppStore()
    const [openNewContactModal, setOpenNewContactModal] = useState(false)
    const [searchedContacts, setSearchedContacts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const selectNewContact = (contact) => {
        setOpenNewContactModal(false)
        setSelectedChatType("contact")
        setSelectedChatData(contact)
        setSearchedContacts([])
    }

    const searchContacts = async (searchTerm) => {
        try {
            setIsLoading(true) // Start loading
            if (searchTerm.length > 0) {
                const response = await apiClient.post(SEARCH_CONTACT_ROUTES, 
                    { searchTerm }, { withCredentials: true })
                
                if (response.status === 200 && response.data.contacts) {
                    setSearchedContacts(response.data.contacts)
                } else {
                    setSearchedContacts([]) // Clear results if no contacts are found
                }
            } else {
                setSearchedContacts([]) // Clear results if search term is empty
            }
        } catch (error) {
            console.error("Error searching contacts:", error)
        } finally {
            setIsLoading(false) // Stop loading
        }
    }

    // Debounce logic for searching contacts
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            searchContacts(searchTerm)
        }, 300) // 300ms delay for debounce

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])

    return (
    <>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <FaPlus
                        className='text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100
                            cursor-pointer transition-all duration-300'
                        onClick={() => setOpenNewContactModal(true)}
                    />
                </TooltipTrigger>
                <TooltipContent className="bg-[#1b1c1e] border-none mb-2 p-3 text-white">
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
                    <Input 
                        placeholder="Search contacts" 
                        className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {
                    searchedContacts.length>0 && (  <ScrollArea className="h-[250px]">
                    <div className='flex flex-col gap-5'>
                        {isLoading ? (
                            <div className="text-center text-white mt-6">Loading...</div>
                        ) : (
                            searchedContacts.map((contact) => (
                                <div key={contact._id} className="flex gap-3 items-center cursor-pointer"
                                    onClick={() => selectNewContact(contact)}
                                >
                                    <div className='w-12 h-12 relative'>
                                        <Avatar className="w-12 h-12 rounded-full overflow-hidden">
                                            {contact.image ? (
                                                <AvatarImage src={`${HOST}/${contact.image}`} alt="profile" 
                                                className="object-cover w-full h-full bg-black" />
                                            ) : (
                                                <div className={`uppercase w-12 h-12 text-lg border-[1px] flex items-center justify-center rounded-full 
                                                ${getColor(contact.color)}`}>
                                                {contact.firstName ? contact.firstName.charAt(0) : contact.email.charAt(0)}
                                                </div>
                                            )}
                                        </Avatar>
                                    </div>
                                    <div className="flex flex-col">
                                        <span>{contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}` : `${contact.email}`}</span>
                                        <span className='text-xs'>{contact.email}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>)
                }
              

                {searchTerm === "" && searchedContacts.length === 0 ? (
                    <div className="flex-1 md:bg-[#181920] md:flex flex-col justify-center items-center duration-1000 transition-all mt-5 ">
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
                ) : searchTerm !== "" && searchedContacts.length === 0 ? (
                    <div className="text-center text-white mt-6">
                        No contacts found.
                    </div>
                ) : null}
            </DialogContent>
        </Dialog>
    </>
    )
}

export default NewDM
