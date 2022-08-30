import React, { createContext, useState, useEffect } from "react";
import io from 'socket.io-client';

export const socketInfoContext = createContext()

export const SocketInfoProvider = ({ children }) => {

    const socket = io('http://localhost:3000');

    const [socketInfo, setSocketInfo] = useState({
        nickname: "", 
        joinedRoom: "",
        welcomeMsg: ""
    });

    let socketInfoCopy = socketInfo

    useEffect(() => {

        socket.on("newSocketConnected", (socketId) => {
            console.log("New socket connected: " + socketId)
        })

        // Welcomes user when joining new room
        socket.on("welcome", (msg) => {
            socketInfoCopy.welcomeMsg = msg
        })

        console.log(socketInfo)

        return () => {
            socket.off('newSocketConnected');
            socket.off('welcome');
        };

    }, [])


    // funktioner till emit ? 



    return (
        <socketInfoContext.Provider value={{ socketInfo, setSocketInfo, socket }}>
            {children}
        </socketInfoContext.Provider>
    );
};