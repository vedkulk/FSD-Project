import { HOST } from "@/utils/constants";
import { io } from "socket.io-client";
import {createContext,useContext, useEffect, useRef } from "react"
import { useAppStore } from "@/store";

const SocketContext = createContext(null)

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({children}) => {
    const socket = useRef();
    const {userInfo} = useAppStore()
    useEffect(() => {
        if (userInfo) {
            socket.current = io(HOST, {
                withCredentials: true,
                query: { userId: userInfo.id }
            });
    
            // Ensure socket.current is used here
            socket.current.on("connect", () => {
                console.log("connected to socket server");
            });
    
            return () => {
                if (socket.current) {
                    socket.current.disconnect();
                }
            };
        }
    }, [userInfo]);    
    return(
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    )
};