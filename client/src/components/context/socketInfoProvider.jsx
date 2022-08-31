import React, { createContext, useState, useEffect, useRef } from "react";
import io from 'socket.io-client';

export const socketInfoContext = createContext()

export const SocketInfoProvider = ({ children }) => {

    const socket = io('http://localhost:3000');

    const socketInfoRef = useRef()
    const [socketInfo, setSocketInfo] = useState({
        nickname: "", 
        joinedRoom: "",
        welcomeMsg: ""
    });
    
    // socketInfoRef.current will always be updated with the latest from socketInfo 
    socketInfoRef.current = socketInfo

    useEffect(() => {
        // Test, remove later
        socket.on("newSocketConnected", (socketId) => {
            console.log("New socket connected: " + socketId)
        })

        // Welcomes user when joining new room 
        socket.on("welcome", (msg) => {
            let socketInfoCopy = {...socketInfoRef.current}
            socketInfoCopy.welcomeMsg = msg
            setSocketInfo(socketInfoCopy)
        })

        return () => {
            socket.off('newSocketConnected');
            socket.off('welcome');
        };

    }, [])

    console.log(socketInfo)

    // funktioner till emit ? 

    

    return (
        <socketInfoContext.Provider value={{ socketInfo, setSocketInfo, socket }}>
            {children}
        </socketInfoContext.Provider>
    );
};