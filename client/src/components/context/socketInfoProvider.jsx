import React, { createContext, useState, useEffect, useRef } from "react";
import io from 'socket.io-client';

export const socketInfoContext = createContext()

const socket = io('http://localhost:3000', {autoConnect: false}); 

export const SocketInfoProvider = ({ children }) => {

    const socketInfoRef = useRef()
    const [socketInfo, setSocketInfo] = useState({
        nickname: "", 
        joinedRoom: "",
        welcomeMsg: "",
        avatarColor: "white"
    });

    const connectSocket = () => {
        socket.connect()
    }

    const getSocket = () => {
        return socket
    }
    
    console.log(socketInfo)

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


    return (
        <socketInfoContext.Provider value={{ socketInfo, setSocketInfo, getSocket, connectSocket, socket }}>
            {children}
        </socketInfoContext.Provider>
    );
};